// lib/data/dashboard.ts
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export const getDashboardData = (userId: string) =>
  unstable_cache(
    async () => {
      const [user, totalSizeMb] = await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          include: {
            apiKeys: { orderBy: { createdAt: 'desc' } },
            images: { orderBy: { createdAt: 'desc' }, take: 8 },
            _count: { select: { images: true } },
          },
        }),
        prisma.image.aggregate({
          where: { userId },
          _sum: { fileSizeMb: true },
        }),
      ])
      return { user, totalSizeMb }
    },
    [`dashboard-${userId}`],
    { tags: [`dashboard-${userId}`, `user-${userId}`], revalidate: 300 }
  )()

export const getApiKeysData = (userId: string) =>
  unstable_cache(
    async () => {
      const keys = await prisma.apiKey.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })
      return keys.map(k => ({
        ...k,
        createdAt: k.createdAt.toString(),  // ✅
      }))
    },
    [`apikeys-${userId}`],
    { tags: [`apikeys-${userId}`], revalidate: 300 }
  )()

export const getImagesData = (userId: string) =>
    
  unstable_cache(

    async () => {
      const images = await prisma.image.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })

      // ✅ serialize inside the cache — return plain JSON-safe objects
      return images.map(img => ({
        id: img.id,
        slug: img.slug,
        fileName: img.fileName,
        fileSizeMb: img.fileSizeMb,
        mimeType: img.mimeType,
        createdAt: img.createdAt.toString(),  // string, survives JSON round-trip
        telegramMsgId: img.telegramMsgId != null ? String(img.telegramMsgId) : null,
      }))
    },
    [`images-${userId}`],
    { tags: [`images-${userId}`], revalidate: 300 }
  )()