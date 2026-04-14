import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import UploadZone from '@/components/dashboard/UploadZone'
import ImageGrid from '@/components/dashboard/ImageGrid'

export default async function ImagesPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  })

  if (!user) redirect('/login')

  const images = await prisma.image.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  const serialized = images.map((img: typeof images[number]) => ({
    id: img.id,
    slug: img.slug,
    fileName: img.fileName,
    fileSizeMb: img.fileSizeMb,
    mimeType: img.mimeType,
    createdAt: img.createdAt.toISOString(),
    telegramMsgId: img.telegramMsgId?.toString() ?? null,
  }))

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-8">Images</h2>
      <div className="mb-8">
        <UploadZone />
      </div>
      <ImageGrid images={serialized} />
    </div>
  )
}
