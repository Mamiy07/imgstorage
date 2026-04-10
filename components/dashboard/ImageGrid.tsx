'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
type ImageItem = {
  id: string
  slug: string
  fileName: string
  fileSizeMb: number | null
  mimeType: string | null
  createdAt: string
  telegramMsgId: string | null
}

export default function ImageGrid({ images }: { images: ImageItem[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  async function handleDelete(slug: string) {
    if (!confirm('Delete this image?')) return
    setDeleting(slug)
    await fetch(`/api/images/${slug}`, { method: 'DELETE' })
    setDeleting(null)
    router.refresh()
  }

  async function handleCopy(slug: string) {
    const url = `${window.location.origin}/i/${slug}`
    await navigator.clipboard.writeText(url)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-3">🖼️</p>
        <p className="font-medium">No images yet</p>
        <p className="text-sm mt-1">Upload an image above to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {images.map((img: typeof images[number]) => (
        <div
          key={img.id}
          className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square"
        >
          <img
            src={`/i/${img.slug}`}
            alt={img.fileName}
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
            <p className="text-white text-xs font-medium truncate w-full text-center">
              {img.fileName}
            </p>
            <button
              onClick={() => handleCopy(img.slug)}
              className="w-full bg-white text-gray-900 text-xs py-1.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {copied === img.slug ? 'Copied!' : 'Copy URL'}
            </button>
            <button
              onClick={() => handleDelete(img.slug)}
              disabled={deleting === img.slug}
              className="w-full bg-red-500 text-white text-xs py-1.5 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {deleting === img.slug ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}