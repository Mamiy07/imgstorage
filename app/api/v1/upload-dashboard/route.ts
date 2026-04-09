import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { uploadImageToTelegram } from '@/lib/telegram'
import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { apiKeys: { take: 1 } },
  })

  if (!user || user.apiKeys.length === 0) {
    return NextResponse.json({ error: 'No API key found' }, { status: 400 })
  }

  const formData = await req.formData()
  const image = formData.get('image') as File

  if (!image) return NextResponse.json({ error: 'No image' }, { status: 400 })
  if (!image.type.startsWith('image/')) return NextResponse.json({ error: 'Only images allowed' }, { status: 400 })
  if (image.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Max 10MB' }, { status: 400 })

  const { file_id, message_id } = await uploadImageToTelegram(image)
  const slug = nanoid(12)

  const saved = await prisma.image.create({
    data: {
      userId: user.id,
      apiKeyId: user.apiKeys[0].id,
      telegramFileId: file_id,
      telegramMsgId: String(message_id),
      slug,
      fileName: image.name,
      fileSizeMb: parseFloat((image.size / 1024 / 1024).toFixed(2)),
      mimeType: image.type,
    },
  })

  await prisma.apiKey.update({
    where: { id: user.apiKeys[0].id },
    data: { usageCount: { increment: 1 } },
  })

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  return NextResponse.json({
    success: true,
    url: `${baseUrl}/i/${slug}`,
    id: slug,
  })
}