import { prisma } from '@/lib/prisma'
import { deleteImageFromTelegram } from '@/lib/telegram'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
 { params }: { params: Promise<{ slug: string }> }  
) {
  const param = (await params).slug
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) return NextResponse.json({ error: 'Missing x-api-key' }, { status: 401 })

  const keyRecord = await prisma.apiKey.findUnique({
    where: { key: apiKey },
  })

  if (!keyRecord) return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })

  const image = await prisma.image.findFirst({
    where: { slug: param, apiKeyId: keyRecord.id },
  })

  if (!image) return NextResponse.json({ error: 'Image not found' }, { status: 404 })

  // Delete from Telegram
  if (image.telegramMsgId) {
    await deleteImageFromTelegram(Number(image.telegramMsgId))
  }

  // Delete from DB
  await prisma.image.delete({ where: { id: image.id } })

  return NextResponse.json({ success: true })
}