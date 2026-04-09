import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { generateApiKey } from '@/lib/generate-key'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { apiKeys: { orderBy: { createdAt: 'desc' } } },
  })

  return NextResponse.json(user?.apiKeys ?? [])
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const apiKey = await prisma.apiKey.create({
    data: {
      userId: user.id,
      key: generateApiKey(),
      name: name || 'New Key',
    },
  })

  return NextResponse.json(apiKey)
}