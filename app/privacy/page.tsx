import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/login"
          className="text-sm text-gray-500 hover:text-gray-700 mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to login
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-10 mt-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Effective Date: June 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section>
              <p>
                This Privacy Policy describes how ImgStorage collects, uses, and
                handles your information. By using ImgStorage, you agree to
                these practices.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. What We Collect
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Account info:</strong> Your name, email, and profile
                  picture from Google or GitHub OAuth.
                </li>
                <li>
                  <strong>API keys:</strong> Generated keys associated with your
                  account.
                </li>
                <li>
                  <strong>Image metadata:</strong> Filename, file size, MIME
                  type, upload timestamp, and Telegram file ID. We do NOT store
                  the actual image binary in our database.
                </li>
                <li>
                  <strong>Usage data:</strong> Number of API requests per key
                  for dashboard display.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. Where Your Data Lives
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 text-yellow-800 text-sm mb-4">
                <p className="font-semibold mb-2">⚠️ Important</p>
                <p>
                  Your actual image files are stored on{" "}
                  <strong>Telegram's servers</strong>, not on ImgStorage's own
                  infrastructure. ImgStorage only stores a reference ID. Images
                  served at <strong>/i/:id are publicly accessible</strong> to
                  anyone with the URL — they are not access-controlled by
                  default.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Database:</strong> Account info and metadata stored on
                  NeonDB (PostgreSQL).
                </li>
                <li>
                  <strong>Images:</strong> Stored on Telegram's infrastructure
                  via the Bot API.
                </li>
                <li>
                  <strong>Hosting:</strong> Platform hosted on Vercel.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. No Guarantee of Privacy or Security
              </h2>
              <p>
                ImgStorage does not encrypt images before sending them to
                Telegram. ImgStorage cannot guarantee that uploaded images will
                remain private or secure. Do not upload sensitive, private, or
                personally identifiable images using the hosted service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. How We Use Your Information
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  To authenticate your identity and maintain your session.
                </li>
                <li>To associate images with your account and API key.</li>
                <li>To display usage statistics in your dashboard.</li>
                <li>To serve images via the /i/:slug endpoint.</li>
              </ul>
              <p className="mt-3">
                We do not use your data for advertising or sell it to third
                parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Third Parties
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Telegram:</strong> Stores your image files.{" "}
                  <a
                    href="https://telegram.org/privacy"
                    className="underline"
                    target="_blank"
                  >
                    Telegram Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>NeonDB:</strong> Hosts our database.{" "}
                  <a
                    href="https://neon.tech/privacy"
                    className="underline"
                    target="_blank"
                  >
                    NeonDB Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Vercel:</strong> Hosts the platform.{" "}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    className="underline"
                    target="_blank"
                  >
                    Vercel Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Google / GitHub:</strong> Used for OAuth sign-in only.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. Data Deletion
              </h2>
              <p>
                Deleting an image removes the metadata from our database and
                sends a deletion request to Telegram. To delete your account
                entirely, contact us via GitHub or the dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. Self-Hosting
              </h2>
              <p>
                For complete control over your data, self-host ImgStorage using
                your own Telegram bot and infrastructure. When self-hosting, you
                are the data controller and responsible for your own compliance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. Contact
              </h2>
              <p>
                Questions about this policy? Open an issue on the ImgStorage
                GitHub repository or visit{" "}
                <a
                  href="https://imgstorage1.vercel.app/dashboard"
                  className="underline"
                >
                  the dashboard
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
