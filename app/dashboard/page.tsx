import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      apiKeys: true,
      images: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  })

  if (!user) redirect('/login')

  const totalImages = await prisma.image.count({ where: { userId: user.id } })
  const totalUsage = user.apiKeys.reduce((sum, k) => sum + k.usageCount, 0)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Images', value: totalImages },
          { label: 'API Calls', value: totalUsage },
          { label: 'API Keys', value: user.apiKeys.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* API Key quick view */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Your API Key</h3>
        {user.apiKeys[0] ? (
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 flex items-center justify-between">
            <span>{user.apiKeys[0].key}</span>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No API key yet</p>
        )}
      </div>

      {/* Recent images */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Images</h3>
        {user.images.length === 0 ? (
          <p className="text-gray-400 text-sm">No images uploaded yet</p>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            {user.images.map((img) => (
              <div
                key={img.id}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={`/i/${img.slug}`}
                  alt={img.fileName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}