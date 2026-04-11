import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back button */}
        <Link
          href="/login"
          className="text-sm text-gray-500 hover:text-gray-700 mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← Back to login
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 p-10 mt-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-400 mb-8">
            Effective Date: June 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">
            <section>
              <p>
                Please read these Terms carefully before using ImgStorage. By
                signing in and using the platform, you agree to be bound by
                these terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. About ImgStorage
              </h2>
              <p>
                ImgStorage is an open-source image storage API that routes
                uploaded files to a private Telegram group via the Telegram Bot
                API. ImgStorage does not operate its own file storage
                infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. No Guarantee of Data Availability
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-sm">
                <p className="font-semibold mb-2">⚠️ Important — Please Read</p>
                <p>
                  All images are stored in a private Telegram group. If that
                  group is deleted, banned, or becomes inaccessible for any
                  reason,{" "}
                  <strong>
                    all stored images will be permanently and irreversibly lost
                  </strong>
                  . ImgStorage does not maintain independent backups of any
                  uploaded files.
                </p>
              </div>
              <p className="mt-4">
                ImgStorage makes no guarantee regarding uptime, data
                availability, or service continuity. The service is provided on
                a best-effort basis only.
              </p>
              <p className="mt-3">
                If you require guaranteed data persistence, we strongly
                recommend self-hosting ImgStorage using your own Telegram bot
                and group.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. No Warranty
              </h2>
              <p>
                ImgStorage is provided "as is" and "as available" without
                warranty of any kind. We make no warranty that the service will
                be uninterrupted, error-free, secure, or that uploaded content
                will be reliably stored or served.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Limitation of Liability
              </h2>
              <p>
                ImgStorage and its maintainers shall not be liable for any loss
                of data, loss of revenue, or any indirect or consequential
                damages arising from your use of the service, including damages
                resulting from Telegram's actions or platform changes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Acceptable Use
              </h2>
              <p>
                You agree not to upload content that is illegal, infringes on
                intellectual property rights, contains malware, or violates
                Telegram's Terms of Service. ImgStorage reserves the right to
                terminate access for violations without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. Telegram Dependency
              </h2>
              <p>
                ImgStorage depends on the Telegram Bot API. ImgStorage has no
                affiliation with Telegram. Any changes to Telegram's platform or
                policies may directly affect ImgStorage's functionality.
                ImgStorage is not responsible for disruptions caused by
                Telegram.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. API Key Security
              </h2>
              <p>
                You are solely responsible for keeping your API key secure. Do
                not expose it in public repositories or client-side code.
                ImgStorage is not liable for unauthorized use resulting from
                compromised keys.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. Self-Hosting
              </h2>
              <p>
                ImgStorage is open source. Users who require greater reliability
                or data control are encouraged to self-host using their own
                infrastructure. The maintainers are not responsible for
                self-hosted deployments.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                9. Changes to Terms
              </h2>
              <p>
                ImgStorage may update these Terms at any time. Continued use of
                the service constitutes acceptance of any updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                10. Contact
              </h2>
              <p>
                Questions about these Terms? Open an issue on the ImgStorage
                GitHub repository or visit the dashboard.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
