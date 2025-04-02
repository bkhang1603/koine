export type EventStatus = 'OPENING' | 'PENDING' | 'DONE' | 'CANCELLED'

export type EventType = 'ONLINE' | 'OFFLINE' | 'HYBRID'

export type EventCategory = {
  id: string
  name: string
  slug: string
  iconUrl?: string
}

export interface EventHost {
  id: string
  fullName: string
  email: string
  avatarUrl: string
}

export type EventTicket = {
  id: string
  type: string
  price: number
  currency: string
  quantity: number
  quantityAvailable: number
  benefits: string[]
}

export type EventSchedule = {
  id: string
  title: string
  description: string
  startTime: string
  duration: number
  speakers: EventHost[]
}

export type EventLocation = {
  type: EventType
  venue?: string
  address?: string
  city?: string
  country?: string
  coordinates?: {
    lat: number
    lng: number
  }
  meetingUrl?: string
  meetingPlatform?: string
}

export interface ApiEvent {
  id: string
  title: string
  description: string
  startedAt: string
  durations: number
  status: string
  roomUrl: string | null
  roomHostUrl: string | null
  roomName: string | null
  recordUrl: string | null
  imageUrl: string
  totalParticipants: number
  hostInfo: {
    id: string
    email: string
    fullName: string
    avatarUrl: string
  }
  location?: {
    city: string | null
    address: string | null
    coordinates?: {
      lat: number
      lng: number
    }
  }
  tickets?: Array<{
    id: string
    name: string
    price: number
    quantity: number
    description?: string
  }>
}

export interface Event {
  id: string
  title: string
  description: string
  startedAt: string
  startAtFormatted: string
  durations: number
  durationsDisplay: string
  imageUrl: string
  roomHostUrl: string
  roomName: string
  roomUrl: string
  recordUrl: string
  status: string
  totalParticipants: number
  createdAt: string
  updateAt: string
  hostInfo: EventHost
}

export interface EventResponse {
  data: Event[]
}
