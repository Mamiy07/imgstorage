import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/global/SignOut";
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans ${inter.variable}`}>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-[#111111] border-r border-white/[0.06] flex flex-col">

        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#0a0a0a"/>
              </svg>
            </div>
            <span className="font-semibold text-sm text-white">ImgStorage</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {[
            {
              href: "/dashboard",
              label: "Overview",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              ),
            },
            {
              href: "/dashboard/images",
              label: "Images",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              ),
            },
            {
              href: "/dashboard/api-keys",
              label: "API Keys",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              ),
            },
            {
              href: "/dashboard/docs",
              label: "Docs",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-[#888] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.06] space-y-2">
          <div className="flex gap-2 px-3">
            <Link href="/terms" className="text-xs text-[#555] hover:text-[#888] transition-colors">Terms</Link>
            <span className="text-[#333]">·</span>
            <Link href="/privacy" className="text-xs text-[#555] hover:text-[#888] transition-colors">Privacy</Link>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-white/[0.04] transition-colors">
            {session.user.image ? (
              <img src={session.user.image} className="w-6 h-6 rounded-full" alt="avatar"/>
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                {session.user.name?.[0]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#ccc] truncate">{session.user.name}</p>
              <p className="text-xs text-[#555] truncate">{session.user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}