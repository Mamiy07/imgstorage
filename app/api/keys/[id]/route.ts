import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
 { params }: { params: Promise<{ id: string }> }  
) {
  const param = (await params).id
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Make sure the key belongs to this user
  await prisma.apiKey.deleteMany({
    where: { id: param, userId: user.id },
  })

  return NextResponse.json({ success: true })
}