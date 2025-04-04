import http from '@/lib/http'
import {
  CancelEventRequestType,
  CreateEventMeetingRequestType,
  CreateEventRoomRequestType,
  GetAllEventResType,
  GetEventByIdResType,
  UpdateEventRequestType
} from '@/schemaValidations/event.schema'

const eventApiRequest = {
  createEvent: (body: CreateEventMeetingRequestType) => http.post<any>('/events', body),
  // get event with caching
  getAllEvent: () =>
    http.get<GetAllEventResType>('/events', {
      cache: 'force-cache',
      next: { revalidate: 4 * 60 * 60 }
    }),
  getEventById: (body: { id: string }) =>
    http.get<GetEventByIdResType>(`/events/${body.id}`, {
      cache: 'force-cache',
      next: { revalidate: 4 * 60 * 60 }
    }),
  getAllEventForHost: () => http.get<GetAllEventResType>('/events/host'),
  updateEventWhenCreateRoom: (body: CreateEventRoomRequestType, eventId: string) =>
    http.put<any>(`/events/${eventId}/room`, body),
  updateEvent: (body: UpdateEventRequestType, eventId: string) => http.put<any>(`/events/${eventId}`, body),
  cancelEvent: (body: CancelEventRequestType) => http.put<any>('/events/cancel', body)
}

export default eventApiRequest
