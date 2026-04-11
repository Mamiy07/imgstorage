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

  const masked = apiKey.slice(0, 14) + '••••••••••••••••••••'

  return (
    <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-white">{name}</p>
          <p className="text-xs text-[#444] mt-0.5">
            Created {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#555] bg-white/[0.04] border border-white/[0.06] px-2 py-1 rounded-md">
            {usageCount.toLocaleString()} requests
          </span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-[#555] hover:text-red-400 transition-colors p-1"
          >
            {deleting ? (
              <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Key display */}
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-[#0a0a0a] border border-white/[0.06] rounded-lg px-3 py-2.5 font-mono text-xs text-[#666] truncate">
          {visible ? apiKey : masked}
        </div>
        <button
          onClick={() => setVisible(!visible)}
          className="p-2.5 bg-[#0a0a0a] border border-white/[0.06] rounded-lg text-[#555] hover:text-white hover:border-white/[0.1] transition-all"
          title={visible ? 'Hide' : 'Show'}
        >
          {visible ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
              <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
        <button
          onClick={handleCopy}
          className="p-2.5 bg-[#0a0a0a] border border-white/[0.06] rounded-lg text-[#555] hover:text-white hover:border-white/[0.1] transition-all"
          title="Copy"
        >
          {copied ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}