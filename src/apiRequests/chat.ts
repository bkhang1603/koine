import http from '@/lib/http'
import {
  ChatDataResType,
  ChatForUserResType,
  ChatMessageDataResType,
  CreateChatForUserBodyResType,
  CreateChatForUserBodyType,
  RequestJoinChatRoomResType,
  SupporterChatRoomListResType
} from '@/schemaValidations/chat.schema'

const chatApiRequest = {
  getChats: () => http.get<ChatDataResType>('/chats'),
  getChatMessages: (id: string, limit: number) =>
    http.get<ChatMessageDataResType>(`/chats/rooms/${id}/messages?limit=${limit}`),
  getChatForUser: () => http.get<ChatForUserResType>('/chats/support-request'),
  createChatForUser: (body: CreateChatForUserBodyType) =>
    http.post<CreateChatForUserBodyResType>('/chats/support-request', body),
  getSupporterChatRoomList: ({
    page_index,
    page_size
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
  }) =>
    http.get<SupporterChatRoomListResType>(`/chats/supporter/rooms?page_index=${page_index}&page_size=${page_size}`),
  requestJoinChatRoom: (id: string) =>
    http.put<RequestJoinChatRoomResType>(`/chats/support-request/${id}/join-support`, {}),
  closeChatRoom: (id: string) => http.put<RequestJoinChatRoomResType>(`/chats/support-request/${id}/close`, {})
}

export default chatApiRequest
