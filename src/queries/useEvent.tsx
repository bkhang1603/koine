import eventApiRequest from '@/apiRequests/event'
import {
  CancelEventRequestType,
  CreateEventMeetingRequestType,
  CreateEventRoomRequestType,
  UpdateEventRequestType
} from '@/schemaValidations/event.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useEvent = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: eventApiRequest.getAllEvent
  })
}

export const useEventForHost = () => {
  return useQuery({
    queryKey: ['events-host'],
    queryFn: eventApiRequest.getAllEventForHost
  })
}

export const useCreateEventMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body }: { body: CreateEventMeetingRequestType }) => eventApiRequest.createEvent(body),
    onSuccess: () => {
      // Invalidate queries liên quan đến giỏ hàng sau khi update
      queryClient.invalidateQueries({
        queryKey: ['events'] // Tùy chọn, nếu bạn muốn invalidate chỉ những query khớp chính xác
      })
      queryClient.invalidateQueries({
        queryKey: ['events-host'] // Tùy chọn, nếu bạn muốn invalidate chỉ những query khớp chính xác
      })
    }
  })
}

export const useUpdateEventWhenCreateRoomMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body, eventId }: { body: CreateEventRoomRequestType; eventId: string }) =>
      eventApiRequest.updateEventWhenCreateRoom(body, eventId),
    onSuccess: () => {
      // Invalidate queries liên quan đến giỏ hàng sau khi update
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
      queryClient.invalidateQueries({
        queryKey: ['events-host']
      })
    }
  })
}

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body, eventId }: { body: UpdateEventRequestType; eventId: string }) =>
      eventApiRequest.updateEvent(body, eventId),
    onSuccess: () => {
      // Invalidate queries liên quan đến giỏ hàng sau khi update
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
      queryClient.invalidateQueries({
        queryKey: ['events-host']
      })
    }
  })
}

export const useCancelEventMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ body }: { body: CancelEventRequestType }) => eventApiRequest.cancelEvent(body),
    onSuccess: () => {
      // Invalidate queries liên quan đến giỏ hàng sau khi update
      queryClient.invalidateQueries({
        queryKey: ['events']
      })
      queryClient.invalidateQueries({
        queryKey: ['events-host']
      })
    }
  })
}
