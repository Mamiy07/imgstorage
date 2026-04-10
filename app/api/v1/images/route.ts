import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) return NextResponse.json({ error: 'Missing x-api-key' }, { status: 401 })

  const keyRecord = await prisma.apiKey.findUnique({
    where: { key: apiKey },
  })

  if (!keyRecord) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })

  const images = await prisma.image.findMany({
    where: { apiKeyId: keyRecord.id },
    orderBy: { createdAt: 'desc' },
  })

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  return NextResponse.json({
    success: true,  
    count: images.length,
    images: images.map((img: typeof images[number])=> ({
      id: img.slug,
      url: `${baseUrl}/i/${img.slug}`,
      fileName: img.fileName,
      size: img.fileSizeMb,
      type: img.mimeType,
      uploadedAt: img.createdAt,
    })),
  })
}