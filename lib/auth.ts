// lib/data/auth.ts
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { cache } from 'react'

// cache() deduplicates this within a single request — 
// layout + page both call it, DB is only hit once
export const getCurrentUser = cache(async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, image: true },
  })

  if (!user) redirect('/login')
  return { session, user }
})