import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')

  // If trying to access admin pages (except login) without session
  if (isAdminPath && !isLoginPage && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // If trying to access login page with an active session
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
}
