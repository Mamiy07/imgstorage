import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-gray-900">TeleDrive</h1>
        <Link
          href="/login"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
          100% Free Forever
        </span>
        <h2 className="text-5xl font-bold text-gray-900 mt-6 leading-tight">
          Image Storage API<br />for Developers
        </h2>
        <p className="text-xl text-gray-500 mt-6 max-w-2xl mx-auto">
          Upload, store and serve images via a simple API. Powered by Telegram.
          No limits, no credit card, no BS.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link
            href="/login"
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            Get your API key
          </Link>
          
        </div>
      </div>

      {/* Code preview */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <div className="bg-gray-900 rounded-2xl p-6 text-left">
          <p className="text-gray-400 text-xs mb-4 font-mono">Upload an image</p>
          <pre className="text-green-400 text-sm font-mono overflow-x-auto">{`curl -X POST https://yourdomain.com/api/v1/upload \\
  -H "x-api-key: tdrive_your_key_here" \\
  -F "image=@photo.jpg"

// Response
{
  "success": true,
  "url": "https://yourdomain.com/i/abc123",
  "id": "abc123"
}`}</pre>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Simple API', desc: 'One endpoint to upload. One URL to serve. That is it.' },
          { title: 'Free Forever', desc: 'No storage limits, no bandwidth fees, no hidden costs.' },
          { title: 'Instant CDN', desc: 'Images served globally via Telegram\'s infrastructure.' },
        ].map((f) => (
          <div key={f.title} className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}