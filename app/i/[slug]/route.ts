import { prisma } from '@/lib/prisma'
import { getImageUrl } from '@/lib/telegram'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }  // ✅ Type as Promise
) {
  const { slug } = await params  // ✅ Await params before accessing
  
  const image = await prisma.image.findUnique({
    where: { slug: slug },
  })
  
  console.log('Fetched image from DB:', image)
  
  if (!image) { 
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }

  // Get fresh download URL from Telegram
  const telegramUrl = await getImageUrl(image.telegramFileId)

  // Fetch from Telegram and stream back
  const res = await fetch(telegramUrl)
  const buffer = await res.arrayBuffer()

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': image.mimeType || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': `inline; filename="${image.fileName}"`,
    },
  })
}