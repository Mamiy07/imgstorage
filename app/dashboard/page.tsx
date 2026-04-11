import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      apiKeys: { orderBy: { createdAt: 'desc' } },
      images: { orderBy: { createdAt: 'desc' }, take: 8 },
    },
  })

  if (!user) redirect('/login')

  const totalImages = await prisma.image.count({ where: { userId: user.id } })
  const totalUsage = user.apiKeys.reduce((sum: number, k: typeof user.apiKeys[number]) => sum + k.usageCount, 0)
  const totalSizeMb = await prisma.image.aggregate({
    where: { userId: user.id },
    _sum: { fileSizeMb: true },
  })

  const stats = [
    {
      label: 'Total Images',
      value: totalImages.toLocaleString(),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
        </svg>
      ),
    },
    {
      label: 'API Requests',
      value: totalUsage.toLocaleString(),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
    {
      label: 'Storage Used',
      value: `${(totalSizeMb._sum.fileSizeMb ?? 0).toFixed(1)} MB`,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      ),
    },
    {
      label: 'API Keys',
      value: user.apiKeys.length.toString(),
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
          {session.user.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-[#555] mt-1">
          Here's what's happening with your images today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#555] font-medium">{stat.label}</span>
              <span className="text-[#444]">{stat.icon}</span>
            </div>
            <p className="text-2xl font-semibold text-white tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Images — takes 2 cols */}
        <div className="lg:col-span-2 bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <p className="text-sm font-medium text-white">Recent Images</p>
            <Link
              href="/dashboard/images"
              className="text-xs text-[#555] hover:text-white transition-colors"
            >
              View all →
            </Link>
          </div>

          {user.images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <p className="text-sm text-[#555]">No images yet</p>
              <Link href="/dashboard/images" className="text-xs text-white/40 hover:text-white mt-1 transition-colors">
                Upload your first image →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1 p-1">
              {user.images.map((img: typeof user.images[number]) => (
                <div
                  key={img.id}
                  className="aspect-square bg-white/[0.03] rounded-lg overflow-hidden group relative"
                >
                  <img
                    src={`/i/${img.slug}`}
                    alt={img.fileName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <p className="text-white text-[10px] truncate w-full">{img.fileName}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Quick API Key */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <p className="text-sm font-medium text-white">Your API Key</p>
              <Link
                href="/dashboard/api-keys"
                className="text-xs text-[#555] hover:text-white transition-colors"
              >
                Manage →
              </Link>
            </div>
            <div className="p-5">
              {user.apiKeys[0] ? (
                <div className="space-y-3">
                  <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg px-3 py-2.5 font-mono text-xs text-[#555] truncate">
                    {user.apiKeys[0].key.slice(0, 20)}••••••••••••
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#444]">
                    <span>{user.apiKeys[0].name}</span>
                    <span>{user.apiKeys[0].usageCount} requests</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#555]">No keys yet</p>
              )}
            </div>
          </div>

          {/* Quick start */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <p className="text-sm font-medium text-white">Quick Start</p>
            </div>
            <div className="p-5">
              <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg p-3">
                <p className="text-[10px] text-[#555] font-mono mb-2">Upload an image</p>
                <pre className="text-[11px] font-mono text-[#888] overflow-x-auto whitespace-pre-wrap leading-relaxed">{`curl -X POST \\
  /api/v1/upload \\
  -H "x-api-key: YOUR_KEY" \\
  -F "image=@photo.jpg"`}</pre>
              </div>
              <Link
                href="/dashboard/docs"
                className="mt-3 flex items-center justify-center gap-1.5 w-full text-xs text-[#555] hover:text-white py-2 rounded-lg border border-white/[0.06] hover:border-white/[0.1] transition-all"
              >
                View full docs
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}