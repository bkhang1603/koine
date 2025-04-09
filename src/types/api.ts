export interface ApiResponse<T> {
  status: number
  payload: {
    data: T[]
    message?: string
    statusCode?: number
    pagination?: {
      totalItem: number
      pageSize: number
      currentPage: number
      maxPageSize: number
      totalPage: number
    }
  }
}

export interface Blog {
  id: string
  title: string
  content: string
  description: string
  imageUrl: string
  creatorId: string
  creatorInfo: {
    id: string
    firstName: string
    avatarUrl: string
  }
  categories: {
    id: string
    name: string
  }[]
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  categoryId: string
  categories: {
    id: string
    name: string
  }[]
  slug: string
  createdAt: string
  updatedAt: string
  detail: string
  totalRating: number
}

export interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  creatorId: string
  categories: {
    id: string
    name: string
  }[]
  slug: string
  createdAt: string
  updatedAt: string
  chapters: any[]
}

export interface Event {
  id: string
  title: string
  content: string
  description: string
  imageUrl: string
  status: string
  slug: string
  createdAt: string
  durations: number
  durationsDisplay: string
  startedAt: string
  updateAt: string
  hostInfo: {
    id: string
    avatarUrl: string
    fullName: string
    email: string
  }
}
