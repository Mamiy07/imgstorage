
import UploadZone from '@/components/dashboard/UploadZone'
import ImageGrid from '@/components/dashboard/ImageGrid'
import { getImagesData } from '@/lib/dashboard-data'
import { getCurrentUser } from '@/lib/auth'

export default async function ImagesPage() {
  const { user } = await getCurrentUser()
  const images = await getImagesData(user.id)


  const serialized = images.map((img: typeof images[number]) => ({
    id: img.id,
    slug: img.slug,
    fileName: img.fileName,
    fileSizeMb: img.fileSizeMb,
    mimeType: img.mimeType,
    createdAt: img.createdAt.toString(),
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
