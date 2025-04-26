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

export const useGetChatForUser = (enabled: boolean) => {
  return useQuery({
    queryKey: ['chat-for-user'],
    queryFn: chatApiRequest.getChatForUser,
    enabled
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

export const useGetSupporterChatRoomList = ({
  page_index,
  page_size
}: {
  page_index?: number | undefined
  page_size?: number | undefined
}) => {
  return useQuery({
    queryKey: ['supporter-chat-room-list', page_index, page_size],
    queryFn: () => chatApiRequest.getSupporterChatRoomList({ page_index, page_size })
  })
}

export const useGetChatRoom = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['chat-room', id],
    queryFn: async () => {
      const response = await chatApiRequest.getSupporterChatRoomList({
        page_index: 1,
        page_size: 100
      })

      const room = response.payload.data.find((room) => room.id === id)
      if (!room) {
        throw new Error('Phòng chat không tồn tại')
      }

      return room
    },
    enabled: !!id && enabled
  })
}

export const useRequestJoinChatRoom = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => chatApiRequest.requestJoinChatRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-room'] })
      queryClient.invalidateQueries({ queryKey: ['supporter-chat-room-list'] })
      if (options?.onSuccess) {
        options.onSuccess()
      }
    }
  })
}

export const useCloseChatRoom = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => chatApiRequest.closeChatRoom(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-room'] })
      queryClient.invalidateQueries({ queryKey: ['supporter-chat-room-list'] })
      if (options?.onSuccess) {
        options.onSuccess()
      }
    }
  })
}
