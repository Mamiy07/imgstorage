export default function DocsPage() {
  const baseUrl = 'https://imgstorage1.vercel.app'

  const endpoints = [
    {
      method: 'POST',
      methodColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      path: '/api/v1/upload',
      desc: 'Upload an image. Returns a permanent public URL.',
      code: `const form = new FormData()
form.append('image', file)

const res = await fetch('${baseUrl}/api/v1/upload', {
  method: 'POST',
  headers: { 'x-api-key': 'tdrive_your_key' },
  body: form
})

// Response
{
  "success": true,
  "url": "${baseUrl}/i/abc123",
  "id": "abc123",
  "fileName": "photo.jpg",
  "size": 204800,
  "type": "image/jpeg"
}`,
    },
    {
      method: 'GET',
      methodColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      path: '/api/v1/images',
      desc: 'List all images uploaded with this API key.',
      code: `const res = await fetch('${baseUrl}/api/v1/images', {
  headers: { 'x-api-key': 'tdrive_your_key' }
})

// Response
{
  "success": true,
  "count": 3,
  "images": [
    { "id": "abc123", "url": "${baseUrl}/i/abc123", ... }
  ]
}`,
    },
    {
      method: 'DELETE',
      methodColor: 'text-red-400 bg-red-400/10 border-red-400/20',
      path: '/api/v1/images/:id',
      desc: 'Delete an image by its ID. Removes from both database and Telegram.',
      code: `const res = await fetch('${baseUrl}/api/v1/images/abc123', {
  method: 'DELETE',
  headers: { 'x-api-key': 'tdrive_your_key' }
})

// Response
{ "success": true }`,
    },
    {
      method: 'GET',
      methodColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      path: '/i/:id',
      desc: 'Serve an image directly. No auth required. Cached for 1 year.',
      code: `<img src="${baseUrl}/i/abc123" alt="my image" />

// Works in any language, any framework
// Returns raw image with correct Content-Type`,
    },
  ]

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-white">API Reference</h1>
        <p className="text-sm text-[#555] mt-1">
          Authenticate every request with your{' '}
          <code className="text-[#888] bg-white/[0.06] px-1.5 py-0.5 rounded text-xs">x-api-key</code>{' '}
          header.
        </p>
      </div>

      {/* Auth reminder */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3">
        <div className="mt-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
          </svg>
        </div>
        <div>
          <p className="text-xs text-[#888] font-medium mb-1">Authentication</p>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-lg px-3 py-2 font-mono text-xs text-[#666]">
            x-api-key: tdrive_your_api_key_here
          </div>
        </div>
      </div>

      {/* Endpoints */}
      {endpoints.map((ep, i) => (
        <div key={i} className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
            <span className={`text-xs font-bold px-2 py-1 rounded border font-mono ${ep.methodColor}`}>
              {ep.method}
            </span>
            <code className="text-sm text-[#ccc] font-mono">{ep.path}</code>
          </div>
          <div className="px-5 py-3 border-b border-white/[0.04]">
            <p className="text-xs text-[#555]">{ep.desc}</p>
          </div>
          <div className="p-1">
            <div className="bg-[#0a0a0a] rounded-lg p-4">
              <pre className="text-xs font-mono text-[#888] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {ep.code}
              </pre>
            </div>
          </div>
        </div>
      ))}

      {/* Limits */}
      <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
        <p className="text-sm font-medium text-white mb-4">Limits & Specs</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Max file size', value: '10MB per image' },
            { label: 'Allowed types', value: 'JPG, PNG, GIF, WebP' },
            { label: 'Storage', value: 'Unlimited' },
            { label: 'Requests', value: 'Unlimited' },
            { label: 'Price', value: 'Free forever' },
            { label: 'Auth header', value: 'x-api-key' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
              <span className="text-xs text-[#555]">{item.label}</span>
              <span className="text-xs text-[#888] font-mono">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}