/* eslint-disable no-unused-vars */
export type Lesson = {
  id: string
  title: string
  type: string
  [key: string]: any
}

export type Chapter = {
  id: string
  title?: string
  lessons: Lesson[]
  description?: string
  durationsDisplay?: string
  [key: string]: any
}

export type Course = {
  id: string
  title: string
  description?: string
  imageUrl: string
  chapters: Chapter[]
  [key: string]: any
}

export type ChapterPickerDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (chapters: Chapter[]) => void
  courses: Course[]
  existingChapterIds: string[]
}
