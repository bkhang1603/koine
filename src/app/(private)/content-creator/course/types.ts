export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  banner: string
  categories: string[]
  level: string
  ageGroup: string
  status: string
  totalLessons: number
  duration: number
  durationDisplay: string
  chapters: Chapter[]
  creatorId: string
  creator: {
    id: string
    username: string
  }
}

export interface Chapter {
  id: string
  courseId: string
  title: string
  description: string
  duration: number
  durationDisplay: string
  sequence: number
  lessons: Lesson[]
  creatorId: string
  creator: {
    id: string
    username: string
  }
}

export interface Lesson {
  id: string
  chapterId: string
  type: 'text' | 'video' | 'quiz'
  title: string
  description: string
  content: string | null
  videoUrl: string | null
  duration: number
  durationDisplay: string
  sequence: number
  status: string
  creator: {
    id: string
    username: string
  }
}

export interface QuizQuestion {
  id: string
  lessonId: string
  question: string
  options: string[]
  correctAnswer: number
  sequence: number
}
