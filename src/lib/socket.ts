import { io } from 'socket.io-client'

import envConfig from '@/config'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'

// Cấu hình chung cho socket
const socketOptions = {
  auth: {
    Authorization: `Bearer ${getAccessTokenFromLocalStorage()}`
  },
  withCredentials: true,
  transports: ['websocket', 'polling'], // Ưu tiên sử dụng websocket
  extraHeaders: {
    Origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  }
}

const socket = io(envConfig.NEXT_PUBLIC_SOCKET_ENDPOINT, socketOptions)

export const socketForChat = io(`${envConfig.NEXT_PUBLIC_SOCKET_ENDPOINT}/chat`, socketOptions)

export default socket
