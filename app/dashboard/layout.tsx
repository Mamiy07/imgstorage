import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/global/SignOut";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="font-bold text-gray-900">ImgStorage</h1>
          <p className="text-xs text-gray-400 mt-0.5">Image Storage API</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: "/dashboard", label: "Overview" },
            { href: "/dashboard/images", label: "Images" },
            { href: "/dashboard/api-keys", label: "API Keys" },
            { href: "/dashboard/docs", label: "Docs" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            {session.user.image && (
              <img
                src={session.user.image}
                className="w-8 h-8 rounded-full"
                alt="avatar"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 p-8">{children}</main>
    </div>
  );
}
