import http from '@/lib/http'
import {
  CancelEventRequestType,
  CreateEventMeetingRequestType,
  CreateEventRoomResType,
  GetAllEventResType,
  GetEventByIdResType,
  ReportEventBodyType,
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
  // Caching
  getEventById: (body: { id: string }) => http.get<GetEventByIdResType>(`/events/${body.id}`),
  // Without caching
  getEventByIdWithoutCaching: (body: { id: string }) => http.get<GetEventByIdResType>(`/events/${body.id}`),
  getAllEventForHost: () => http.get<GetAllEventResType>('/events/host'),
  updateEvent: (body: UpdateEventRequestType, eventId: string) => http.put<any>(`/events/${eventId}`, body),
  cancelEvent: (body: CancelEventRequestType) => http.put<any>('/events/cancel', body),
  createEventRoom: (eventId: string) => http.post<CreateEventRoomResType>(`/events/room/${eventId}`, {}),
  reportEvent: (body: ReportEventBodyType) => http.put<any>(`/events/report`, body)
}

export default eventApiRequest
