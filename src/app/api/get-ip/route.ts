// src/app/api/get-ip/route.ts
import { HttpError } from '@/lib/http'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Lấy IP từ headers - thử nhiều nguồn khác nhau
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const cfConnectingIp = request.headers.get('cf-connecting-ip')

    // Trích xuất IP đầu tiên từ x-forwarded-for (vì nó có thể chứa nhiều IP)
    const forwardedIp = forwarded ? forwarded.split(',')[0].trim() : null

    // Ưu tiên theo thứ tự: CloudFlare IP > X-Real-IP > X-Forwarded-For > localhost
    let clientIp = cfConnectingIp || realIp || forwardedIp || '127.0.0.1'

    // Nếu đang ở localhost và đang trong môi trường development
    if ((clientIp === '::1' || clientIp === '127.0.0.1') && process.env.NODE_ENV === 'development') {
      // Sử dụng IP giả lập cho môi trường dev để test
      clientIp = '123.45.67.89'
    }

    // Cấu trúc payload chuẩn cho TanStack Query
    const payload = {
      data: {
        clientIp
      },
      message: 'Lấy IP thành công',
      statusCode: 200
    }

    // Cấu trúc response dạng chuẩn cho TanStack Query
    return NextResponse.json(payload)
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status
      })
    } else {
      return Response.json(
        {
          message: 'Có lỗi xảy ra'
        },
        {
          status: 500
        }
      )
    }
  }
}
