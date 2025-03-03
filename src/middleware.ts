// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const maintenanceMode = false
// // const privatePaths = ['/content-creator', '/content-creator/blog']

// const publicPaths = ['/', '/course', '/knowledge', '/about', '/contact', '/help/faq']
// const privatePaths = [
//   '/setting',
//   '/setting/:path*',
//   '/learn',
//   '/learn/:path*',
//   '/content-creator',
//   '/content-creator/:path*'
// ]
// const unAuthPaths = ['/login', '/register']

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   const refreshToken = request.cookies.get('refreshToken')?.value
//   const accessToken = request.cookies.get('accessToken')?.value

//   if (maintenanceMode) {
//     const url = new URL('/maintenance', request.url)
//     return NextResponse.redirect(url)
//   }

//   // 1. Chưa đăng nhập thì không cho vào private paths
//   if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
//     const url = new URL('/login', request.url)
//     url.searchParams.set('clearTokens', 'true')
//     return NextResponse.redirect(url)
//   }

//   // 2. Trường hợp đã đăng nhập
//   if (refreshToken) {
//     // 2.1 Nếu cố tình vào trang login sẽ redirect về trang chủ
//     if (unAuthPaths.some((path) => pathname.startsWith(path))) {
//       return NextResponse.redirect(new URL('/', request.url))
//     }

//     // 2.2 Nhưng access token lại hết hạn
//     if (publicPaths.some((path) => pathname.startsWith(path)) && !accessToken) {
//       const url = new URL('/refresh-token', request.url)
//       url.searchParams.set('refreshToken', refreshToken)
//       url.searchParams.set('redirect', pathname)
//       return NextResponse.redirect(url)
//     }

//     // 2.2 Nhưng access token lại hết hạn
//     if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
//       const url = new URL('/refresh-token', request.url)
//       url.searchParams.set('refreshToken', refreshToken)
//       url.searchParams.set('redirect', pathname)
//       return NextResponse.redirect(url)
//     }

//     return NextResponse.next()
//   }

//   return NextResponse.next()
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/register',
//     '/course',
//     '/about',
//     '/knowledge',
//     '/contact',
//     '/help/faq',
//     '/setting',
//     '/setting/:path*',
//     '/content-creator',
//     '/content-creator/:path*',
//     '/learn',
//     '/learn/:path*'
//   ]
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const maintenanceMode = false

const publicPaths = ['/', '/course', '/knowledge', '/about', '/contact', '/help/faq']

// Phân chia rõ ràng các đường dẫn theo role
const roleBasedPaths = {
  ADMIN: ['/admin', '/admin/:path*'],
  'CONTENT-CREATOR': ['/content-creator', '/content-creator/:path*'],
  CHILD: ['/kid', '/kid/:path*']
}

// Đường dẫn cần xác thực nhưng không ràng buộc role
const commonPrivatePaths = ['/setting', '/setting/:path*', '/learn', '/learn/:path*']

// Kết hợp tất cả đường dẫn cần xác thực
const privatePaths = [...commonPrivatePaths, ...Object.values(roleBasedPaths).flat()]

// Đường dẫn không cho phép tìm thấy nếu không đăng nhập đúng role
const unAuthPrivatePaths = [...Object.values(roleBasedPaths).flat()]

const unAuthPaths = ['/login', '/register']

// Hàm decode JWT không cần thư viện
function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

// Kiểm tra xem người dùng có quyền truy cập vào path không
function hasPermission(path: string, role?: string) {
  if (!role) return false

  // Phân tích đường dẫn cơ bản (loại bỏ các tham số động)
  const basePath = path.split('/').slice(0, 3).join('/')

  // Kiểm tra xem đường dẫn hiện tại thuộc role nào
  for (const [pathRole, paths] of Object.entries(roleBasedPaths)) {
    if (paths.some((p) => basePath.startsWith(p.split('/:')[0]))) {
      // Nếu đường dẫn thuộc về một role cụ thể
      return role === pathRole
    }
  }

  // Đường dẫn không thuộc role nào cụ thể
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const refreshToken = request.cookies.get('refreshToken')?.value
  const accessToken = request.cookies.get('accessToken')?.value

  // Decode JWT token để lấy role
  let userRole: 'ADMIN' | 'CONTENT-CREATOR' | 'CHILD' | 'ADULT' | undefined
  if (accessToken) {
    const decodedToken = decodeJwt(accessToken)
    userRole = decodedToken?.role || decodedToken?.sub?.role
  }

  if (maintenanceMode) {
    const url = new URL('/maintenance', request.url)
    return NextResponse.redirect(url)
  }

  // 0. Nếu chưa đăng nhập mà cố tình vào các role đặc biệt thì sẽ hiện trang maintenance
  if (unAuthPrivatePaths.some((path) => pathname.startsWith(path.split('/:')[0]) && !refreshToken)) {
    return NextResponse.rewrite(new URL('/unauthorized', request.url))
  }

  // 1. Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path.split('/:')[0])) && !refreshToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('clearTokens', 'true')
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // 2. Đã đăng nhập nhưng không có quyền truy cập đường dẫn này
  if (refreshToken && accessToken) {
    const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path.split('/:')[0]))

    if (isPrivatePath && !hasPermission(pathname, userRole)) {
      // Chuyển hướng đến trang không có quyền
      // return NextResponse.redirect(new URL('/unauthorized', request.url))
      return NextResponse.rewrite(new URL('/unauthorized', request.url))
    }
  }

  // 3. Trường hợp đã đăng nhập
  if (refreshToken) {
    // 3.1 Nếu cố tình vào trang login sẽ redirect về trang chủ
    if (unAuthPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 3.2 Nếu access token hết hạn, cần refresh token
    if (
      (publicPaths.some((path) => pathname.startsWith(path)) ||
        privatePaths.some((path) => pathname.startsWith(path.split('/:')[0]))) &&
      !accessToken
    ) {
      const url = new URL('/refresh-token', request.url)
      url.searchParams.set('refreshToken', refreshToken)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Cập nhật matcher để bao gồm tất cả các đường dẫn cần kiểm tra
export const config = {
  matcher: [
    // Các đường dẫn công khai và cần xác thực
    '/',
    '/login',
    '/register',
    '/course',
    '/about',
    '/knowledge',
    '/contact',
    '/help/faq',

    // Thêm các đường dẫn giới hạn theo role
    '/setting/:path*',
    '/learn/:path*',
    '/admin/:path*',
    '/content-creator/:path*',
    '/kid/:path*',
    '/unauthorized'
  ]
}
