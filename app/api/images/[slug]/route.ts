import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { deleteImageFromTelegram } from '@/lib/telegram'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const image = await prisma.image.findFirst({
    where: { slug: params.slug, userId: user.id },
  })

  if (!image) return NextResponse.json({ error: 'Image not found' }, { status: 404 })

  if (image.telegramMsgId) {
    await deleteImageFromTelegram(Number(image.telegramMsgId))
  }

  await prisma.image.delete({ where: { id: image.id } })

  return NextResponse.json({ success: true })
}