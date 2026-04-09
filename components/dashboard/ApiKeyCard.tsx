'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  id: string
  name: string
  apiKey: string
  usageCount: number
  createdAt: string
}

export default function ApiKeyCard({ id, name, apiKey, usageCount, createdAt }: Props) {
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  async function handleCopy() {
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDelete() {
    if (!confirm(`Delete key "${name}"?`)) return
    setDeleting(true)
    await fetch(`/api/keys/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const masked = apiKey.slice(0, 12) + '••••••••••••••••••••••••'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Created {new Date(createdAt).toLocaleDateString()} • {usageCount} requests
          </p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 font-mono text-sm text-gray-700 truncate">
          {visible ? apiKey : masked}
        </div>
        <button
          onClick={() => setVisible(!visible)}
          className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2.5 border border-gray-200 rounded-lg transition-colors"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
        <button
          onClick={handleCopy}
          className="text-xs bg-gray-900 text-white px-3 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}