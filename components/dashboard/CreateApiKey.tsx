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
          className="bg-[#111] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-white/30 transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          autoFocus
        />
        <button
          onClick={handleCreate}
          disabled={loading || !name.trim()}
          className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 disabled:opacity-40 transition-colors"
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
        <button
          onClick={() => setShowInput(false)}
          className="text-[#555] hover:text-white px-3 py-2 text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowInput(true)}
      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      New API Key
    </button>
  )
}