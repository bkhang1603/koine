import http from '@/lib/http'
import {
  ChatDataResType,
  ChatForUserResType,
  ChatMessageDataResType,
  CreateChatForUserBodyResType,
  CreateChatForUserBodyType
} from '@/schemaValidations/chat.schema'

const chatApiRequest = {
  getChats: () => http.get<ChatDataResType>('/chats'),
  getChatMessages: (id: string, limit: number) =>
    http.get<ChatMessageDataResType>(`/chats/rooms/${id}/messages?limit=${limit}&sort=desc&sortBy=createdAt`),
  getChatForUser: () => http.get<ChatForUserResType>('/chats/support-request'),
  createChatForUser: (body: CreateChatForUserBodyType) =>
    http.post<CreateChatForUserBodyResType>('/chats/support-request', body)
}

export default chatApiRequest
