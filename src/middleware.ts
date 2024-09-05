import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const maintenanceMode = true

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (maintenanceMode) {
    const url = new URL('/maintenance', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/']
}
