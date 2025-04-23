import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const maintenanceMode = false

const publicPaths = ['/', '/course', '/knowledge', '/about', '/contact', '/help/faq']

// Phân chia rõ ràng các đường dẫn theo role
const roleBasedPaths = {
  ADMIN: ['/admin', '/admin/:path*'],
  MANAGER: ['/manager', '/manager/:path*'],
  CONTENT_CREATOR: ['/content-creator', '/content-creator/:path*'],
  EXPERT: ['/expert', '/expert/:path*'],
  CHILD: ['/kid', '/kid/:path*'],
  SALESMAN: ['/salesman', '/salesman/:path*'],
  SUPPORTER: ['/support', '/support/:path*']
}

// Đường dẫn cần xác thực nhưng không ràng buộc role
const commonPrivatePaths = ['/setting', '/setting/:path*', '/learn', '/learn/:path*', '/cart', '/checkout']

// Kết hợp tất cả đường dẫn cần xác thực
const privatePaths = [...commonPrivatePaths, ...Object.values(roleBasedPaths).flat()]

// Đường dẫn không cho phép tìm thấy nếu không đăng nhập đúng role
const unAuthPrivatePaths = [...Object.values(roleBasedPaths).flat()]

const unAuthPaths = ['/login', '/register']

// Danh sách đường dẫn chỉ dành cho người dùng ADULT
const adultOnlyPaths = [
  '/',
  '/setting',
  '/setting/:path*',
  '/product',
  '/product/:path*',
  '/course',
  '/course/:path*',
  '/cart',
  '/checkout',
  '/event',
  '/event/:path*',
  '/knowledge',
  '/knowledge/:path*',
  '/contact',
  '/help/faq'
]

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

  // Đường dẫn không thuộc role nào cụ thể (common paths)
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const refreshToken = request.cookies.get('refreshToken')?.value
  const accessToken = request.cookies.get('accessToken')?.value

  // Decode JWT token để lấy role
  let userRole:
    | 'ADMIN'
    | 'CONTENT-CREATOR'
    | 'CHILD'
    | 'ADULT'
    | 'MANAGER'
    | 'EXPERT'
    | 'SALESMAN'
    | 'SUPPORTER'
    | undefined
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
      return NextResponse.rewrite(new URL('/unauthorized', request.url))
    }

    // 2.1 Nếu không phải role ADULT và cố truy cập các trang chỉ dành cho ADULT
    if (adultOnlyPaths.some((path) => pathname.startsWith(path.split('/:')[0])) && userRole !== 'ADULT') {
      // Tìm đường dẫn phù hợp với role của người dùng
      const redirectPath = roleBasedPaths[userRole as keyof typeof roleBasedPaths]?.[0] || '/'
      // Chỉ redirect nếu không phải CHILD hoặc nếu là CHILD nhưng cố truy cập đường dẫn không phải /kid
      if (userRole !== 'CHILD' || !pathname.startsWith('/kid')) {
        return NextResponse.redirect(new URL(redirectPath, request.url))
      }
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
    '/course/:path*',
    '/product',
    '/product/:path*',
    '/about',
    '/knowledge',
    '/knowledge/:path*',
    '/event',
    '/event/:path*',
    '/contact',
    '/help/faq',
    '/order/:path*',

    // Thêm các đường dẫn giới hạn theo role
    '/setting/:path*',
    '/learn/:path*',
    '/admin',
    '/admin/:path*',
    '/manager',
    '/manager/:path*',
    '/support',
    '/support/:path*',
    '/salesman',
    '/salesman/:path*',
    '/expert',
    '/expert/:path*',
    '/content-creator',
    '/content-creator/:path*',
    '/kid',
    '/kid/:path*',
    '/unauthorized',
    '/cart',
    '/checkout'
  ]
}
