'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateApiKeyButton() {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [showInput, setShowInput] = useState(false)
  const router = useRouter()

  async function handleCreate() {
    if (!name.trim()) return
    setLoading(true)
    await fetch('/api/keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    setLoading(false)
    setShowInput(false)
    setName('')
    router.refresh()
  }

  if (showInput) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Key name e.g. Production"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          autoFocus
        />
        <button
          onClick={handleCreate}
          disabled={loading || !name.trim()}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
        <button
          onClick={() => setShowInput(false)}
          className="text-gray-400 hover:text-gray-600 px-3 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowInput(true)}
      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
    >
      + New API Key
    </button>
  )
}