import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import CreateApiKeyButton from '@/components/dashboard/CreateApiKey'
import ApiKeyCard from '@/components/dashboard/ApiKeyCard'

export default async function ApiKeysPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { apiKeys: { orderBy: { createdAt: 'desc' } } },
  })

  if (!user) redirect('/login')

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
          <p className="text-sm text-gray-500 mt-1">
            Use these keys to authenticate requests to the API
          </p>
        </div>
        <CreateApiKeyButton />
      </div>

      {user.apiKeys.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔑</p>
          <p className="font-medium">No API keys yet</p>
          <p className="text-sm mt-1">Create one to start using the API</p>
        </div>
      ) : (
        <div className="space-y-4">
          {user.apiKeys.map((key) => (
            <ApiKeyCard
              key={key.id}
              id={key.id}
              name={key.name}
              apiKey={key.key}
              usageCount={key.usageCount}
              createdAt={key.createdAt.toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  )
}