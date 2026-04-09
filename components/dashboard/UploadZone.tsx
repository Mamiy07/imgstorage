'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useRouter } from 'next/navigation'

type UploadState = {
  name: string
  progress: string
  status: 'uploading' | 'done' | 'error'
  url?: string
  error?: string
}

export default function UploadZone() {
  const [uploads, setUploads] = useState<UploadState[]>([])
  const router = useRouter()

  function updateUpload(name: string, patch: Partial<UploadState>) {
    setUploads((prev) =>
      prev.map((u) => (u.name === name ? { ...u, ...patch } : u))
    )
  }

  async function uploadFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setUploads((prev) => [
        { name: file.name, progress: '', status: 'error', error: 'Only images allowed' },
        ...prev,
      ])
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploads((prev) => [
        { name: file.name, progress: '', status: 'error', error: 'Max 10MB' },
        ...prev,
      ])
      return
    }

    setUploads((prev) => [
      { name: file.name, progress: 'Uploading...', status: 'uploading' },
      ...prev,
    ])

    const form = new FormData()
    form.append('image', file)

    const res = await fetch('/api/v1/upload-dashboard', {
      method: 'POST',
      body: form,
    })

    const data = await res.json()

    if (res.ok) {
      updateUpload(file.name, {
        status: 'done',
        progress: 'Done',
        url: data.url,
      })
      router.refresh()
    } else {
      updateUpload(file.name, {
        status: 'error',
        error: data.error || 'Upload failed',
      })
    }
  }

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      await uploadFile(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 10 * 1024 * 1024,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <p className="text-3xl mb-3">🖼️</p>
        {isDragActive ? (
          <p className="text-blue-500 font-medium">Drop images here...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium">Drag & drop images here</p>
            <p className="text-gray-400 text-sm mt-1">or click to browse — JPG, PNG, GIF, WebP up to 10MB</p>
          </>
        )}
      </div>

      {uploads.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploads.map((u, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {u.status === 'done' ? '✅' : u.status === 'error' ? '❌' : '⏳'}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{u.name}</p>
                  {u.error && <p className="text-xs text-red-500">{u.error}</p>}
                  {u.url && (
                    <a href={u.url} target="_blank" className="text-xs text-blue-500 hover:underline">
                      {u.url}
                    </a>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-400">{u.progress}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}