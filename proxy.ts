import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from './app/api/auth/[...nextauth]/route'

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const pathname = request.nextUrl.pathname

  // If user is logged in
  if (session?.user) {                                  
    // Prevent logged-in users from accessing "/" and "/login"
    if (pathname === '/' || pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    // If user is NOT logged in
    // Prevent non-logged-in users from accessing "/dashboard"
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
}
