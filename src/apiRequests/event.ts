import http from '@/lib/http'
import {
  CancelEventRequestType,
  CreateEventMeetingRequestType,
  CreateEventRoomRequestType,
  GetAllEventResType,
  UpdateEventRequestType
} from '@/schemaValidations/event.schema'

const eventRequestApi = {
  createEvent: (body: CreateEventMeetingRequestType) => http.post<any>('/events', body),
  getAllEvent: () => http.get<GetAllEventResType>('/events'),
  getAllEventForHost: () => http.get<GetAllEventResType>('/events/host'),
  updateEventWhenCreateRoom: (body: CreateEventRoomRequestType, eventId: string) =>
    http.put<any>(`/events/${eventId}/room`, body),
  updateEvent: (body: UpdateEventRequestType, eventId: string) => http.put<any>(`/events/${eventId}`, body),
  cancelEvent: (body: CancelEventRequestType) => http.put<any>('/events/cancel', body)
}

export default eventRequestApi
