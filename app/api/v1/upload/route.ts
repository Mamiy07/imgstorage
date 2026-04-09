import { prisma } from '@/lib/prisma'
import { uploadImageToTelegram } from '@/lib/telegram'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { corsHeaders, handleOptions } from './cors'

export async function OPTIONS() {
  return handleOptions()
}

export const dynamic = 'force-dynamic'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_SIZE = 4 * 1024 * 1024 // 4MB

export async function POST(req: NextRequest) {
  // ✅ Get API key from header
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing x-api-key header' }, { status: 401 })
  }

  // ✅ Validate API key
  const keyRecord = await prisma.apiKey.findUnique({
    where: { key: apiKey },
    include: { user: true },
  })

  if (!keyRecord) {
    return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
  }

  // ✅ Get image from request
  const formData = await req.formData()
  const image = formData.get('image') as File

  if (!image) {
    return NextResponse.json({ error: 'No image provided. Send image as multipart/form-data with key "image"' }, { status: 400 })
  }

  // ✅ Validate file type
  if (!ALLOWED_TYPES.includes(image.type)) {
    return NextResponse.json({
      error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(', ')}`
    }, { status: 400 })
  }

  // ✅ Validate file size
  if (image.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large. Max 4MB.' }, { status: 400 })
  }

  // ✅ Upload to Telegram
  const { file_id, message_id } = await uploadImageToTelegram(image)

  // ✅ Generate unique slug for the image URL
  const slug = nanoid(12)

  // ✅ Save to DB
  const saved = await prisma.image.create({
    data: {
      userId: keyRecord.userId,
      apiKeyId: keyRecord.id,
      telegramFileId: file_id,
      telegramMsgId: String(message_id),
      slug,
      fileName: image.name,
      fileSizeMb: parseFloat((image.size / 1024 / 1024).toFixed(2)),
      mimeType: image.type,
    },
  })

  // ✅ Increment usage count
  await prisma.apiKey.update({
    where: { id: keyRecord.id },
    data: { usageCount: { increment: 1 } },
  })

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  return NextResponse.json({
    success: true,
    id: saved.slug,
    url: `${baseUrl}/i/${slug}`,
    fileName: image.name,
    size: image.size,
    type: image.type,
    uploadedAt: saved.createdAt,
  }, { headers: corsHeaders() })
}