import CreateApiKeyButton from '@/components/dashboard/CreateApiKey'
import ApiKeyCard from '@/components/dashboard/ApiKeyCard'
import { getApiKeysData } from '@/lib/dashboard-data'
import { getCurrentUser } from '@/lib/auth'

export default async function ApiKeysPage() {
   const { user } = await getCurrentUser()
  const apiKeys = await getApiKeysData(user.id)
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">API Keys</h1>
          <p className="text-sm text-[#555] mt-1">
            Authenticate your API requests with these keys
          </p>
        </div>
        <CreateApiKeyButton />
      </div>

      {/* Info banner */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
        <div className="mt-0.5 text-[#555]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <p className="text-xs text-[#555] leading-relaxed">
          Keep your API keys secret. Do not commit them to public repositories or expose them in client-side code.
          Pass them via the <code className="text-[#888] bg-white/[0.06] px-1 py-0.5 rounded text-[10px]">x-api-key</code> header on every request.
        </p>
      </div>

      {/* Keys */}
      {apiKeys.length === 0 ? (
        <div className="bg-[#111] border border-white/[0.06] rounded-xl flex flex-col items-center justify-center py-20 text-center">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
          <p className="text-sm text-[#555]">No API keys yet</p>
          <p className="text-xs text-[#444] mt-1">Create a key to start using the API</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apiKeys.map((key: (typeof apiKeys)[number]) => (
            <ApiKeyCard
              key={key.id}
              id={key.id}
              name={key.name}
              apiKey={key.key}
              usageCount={key.usageCount}
              createdAt={key.createdAt.toString()}
            />
          ))}
        </div>
      )}
    </div>
  )
} 