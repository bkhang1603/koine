import http from '@/lib/http'
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  RegisterBodyFormType,
  RegisterResType,
  ResendOTPResType
} from '@/schemaValidations/auth.schema'
import { OnlyMessageResType } from '@/schemaValidations/special.schema'

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number
    payload: RefreshTokenResType
  }> | null,
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseUrl: ''
    }),
  sLogout: (
    body: LogoutBodyType & {
      accessToken: string
    }
  ) =>
    http.post(
      '/auth/logout',
      {
        refreshToken: body.refreshToken
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`
        }
      }
    ),
  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi
  sRefreshToken: (body: RefreshTokenBodyType) => http.post<RefreshTokenResType>('/auth/refresh-token', body),
  async refreshToken() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>('/api/auth/refresh-token', null, {
      baseUrl: ''
    })
    const result = await this.refreshTokenRequest
    this.refreshTokenRequest = null
    return result
  },
  setTokenToCookie: (body: { accessToken: string; refreshToken: string }) =>
    http.post('/api/auth/token', body, { baseUrl: '' }),
  register: (body: RegisterBodyFormType) => http.post<RegisterResType>('/auth/register', body),
  sendOTP: ({ id, code }: { id: string; code: string }) =>
    http.post<LoginResType>('/api/auth/otp', { id, code }, { baseUrl: '' }),
  sSendOTP: ({ id, code }: { id: string; code: string }) => http.post<LoginResType>('/auth/active', { id, code }),
  resendOTP: (id: string) => http.post<ResendOTPResType>(`/auth/retry-active/${id}`, null),
  requestResetPassword: (email: string) => http.post<OnlyMessageResType>('/auth/forgot-password/request', { email }),
  changePassword: (body: { oldPassword: string; newPassword: string; confirmPassword: string }) =>
    http.post<OnlyMessageResType>('/auth/change-password', body)
}

export default authApiRequest
