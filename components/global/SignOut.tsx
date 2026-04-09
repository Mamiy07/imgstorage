'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="w-full text-left text-xs text-gray-400 hover:text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Sign out
    </button>
  )
}