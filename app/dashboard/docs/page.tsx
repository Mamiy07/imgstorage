export default function DocsPage() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://yourdomain.com'

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">API Documentation</h2>

      <div className="space-y-8">

        {/* Upload */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">POST</span>
            <code className="text-sm text-gray-700">/api/v1/upload</code>
          </div>
          <p className="text-gray-600 text-sm mb-4">Upload an image. Returns a permanent URL.</p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-xs overflow-x-auto">{`// Using fetch
const form = new FormData()
form.append('image', file)

const res = await fetch('${baseUrl}/api/v1/upload', {
  method: 'POST',
  headers: { 'x-api-key': 'your_api_key' },
  body: form
})

const data = await res.json()
// { success: true, url: '${baseUrl}/i/abc123', id: 'abc123' }`}</pre>
          </div>
        </section>

        {/* List */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">GET</span>
            <code className="text-sm text-gray-700">/api/v1/images</code>
          </div>
          <p className="text-gray-600 text-sm mb-4">List all uploaded images for your API key.</p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-xs overflow-x-auto">{`const res = await fetch('${baseUrl}/api/v1/images', {
  headers: { 'x-api-key': 'your_api_key' }
})

const data = await res.json()
// { success: true, count: 5, images: [...] }`}</pre>
          </div>
        </section>

        {/* Delete */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">DELETE</span>
            <code className="text-sm text-gray-700">/api/v1/images/:id</code>
          </div>
          <p className="text-gray-600 text-sm mb-4">Delete an image by its ID.</p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-xs overflow-x-auto">{`const res = await fetch('${baseUrl}/api/v1/images/abc123', {
  method: 'DELETE',
  headers: { 'x-api-key': 'your_api_key' }
})

// { success: true }`}</pre>
          </div>
        </section>

        {/* Serve */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">GET</span>
            <code className="text-sm text-gray-700">/i/:id</code>
          </div>
          <p className="text-gray-600 text-sm mb-4">Serve an image directly. Use this URL anywhere.</p>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 text-xs overflow-x-auto">{`<img src="${baseUrl}/i/abc123" alt="my image" />

// Works in any framework, any language
// Cached for 1 year via Cache-Control`}</pre>
          </div>
        </section>

        {/* Limits */}
        <section className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Limits</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>Max file size: 10MB per image</li>
            <li>Allowed types: JPG, PNG, GIF, WebP</li>
            <li>Storage: Unlimited (powered by Telegram)</li>
            <li>Requests: Unlimited</li>
            <li>Price: Free forever</li>
          </ul>
        </section>

      </div>
    </div>
  )
}