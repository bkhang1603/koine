import chatApiRequest from '@/apiRequests/chat'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetChats = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: chatApiRequest.getChats
  })
}

export const useGetChatMessages = ({ id, limit, enabled }: { id: string; limit: number; enabled: boolean }) => {
  return useQuery({
    queryKey: ['chat', id, limit],
    queryFn: () => chatApiRequest.getChatMessages(id, limit),
    enabled
  })
}

export const useGetChatForUser = () => {
  return useQuery({
    queryKey: ['chat-for-user'],
    queryFn: chatApiRequest.getChatForUser
  })
}

export const useStartChat = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: chatApiRequest.createChatForUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat'] })
    }
  })
}
