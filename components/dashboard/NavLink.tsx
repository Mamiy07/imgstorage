'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const routes = [
  '/dashboard',
  '/dashboard/images', 
  '/dashboard/api-keys',
  '/dashboard/docs',
]

type NavLinkProps = {
  href: string
  label: string
  icon: React.ReactNode
}

export function NavLink({ href, label, icon }: NavLinkProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname === href

  // Prefetch all routes on mount
  useEffect(() => {
    routes.forEach(route => router.prefetch(route))
  }, [router])

  return (
    <Link
      href={href}
      onMouseEnter={() => router.prefetch(href)}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all duration-150
        ${isActive
          ? 'text-white bg-white/[0.08]'
          : 'text-[#888] hover:text-white hover:bg-white/[0.06]'
        }`}
    >
      {icon}
      {label}
    </Link>
  )
}