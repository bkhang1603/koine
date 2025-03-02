import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const maintenanceMode = false
// const privatePaths = ['/content-creator', '/content-creator/blog']

const publicPaths = ['/', '/course', '/knowledge', '/about', '/contact', '/help/faq']
const privatePaths = [
  '/setting',
  '/setting/:path*',
  '/learn',
  '/learn/:path*',
  '/content-creator',
  '/content-creator/:path*'
]
const unAuthPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const refreshToken = request.cookies.get('refreshToken')?.value
  const accessToken = request.cookies.get('accessToken')?.value

  if (maintenanceMode) {
    const url = new URL('/maintenance', request.url)
    return NextResponse.redirect(url)
  }

  // 1. Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('clearTokens', 'true')
    return NextResponse.redirect(url)
  }

  // 2. Trường hợp đã đăng nhập
  if (refreshToken) {
    // 2.1 Nếu cố tình vào trang login sẽ redirect về trang chủ
    if (unAuthPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 2.2 Nhưng access token lại hết hạn
    if (publicPaths.some((path) => pathname.startsWith(path)) && !accessToken) {
      const url = new URL('/refresh-token', request.url)
      url.searchParams.set('refreshToken', refreshToken)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // 2.2 Nhưng access token lại hết hạn
    if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
      const url = new URL('/refresh-token', request.url)
      url.searchParams.set('refreshToken', refreshToken)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/course',
    '/about',
    '/knowledge',
    '/contact',
    '/help/faq',
    '/setting',
    '/setting/:path*',
    '/content-creator',
    '/content-creator/:path*',
    '/learn',
    '/learn/:path*'
  ]
}
