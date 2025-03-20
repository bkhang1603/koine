/* eslint-disable no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Check, Search, X, BookOpen, Layers, CheckCircle2 } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Chapter, Course, ChapterPickerDialogProps } from './chapter-picker-types'
import { CourseBrowseView } from './CourseBrowseView'
import { ChapterView } from './ChapterView'
import { SelectedChaptersView } from './SelectedChaptersView'

export const ChapterPickerDialog = ({
  open,
  onOpenChange,
  onSelect,
  courses = [],
  existingChapterIds = []
}: ChapterPickerDialogProps) => {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChapterIds, setSelectedChapterIds] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState<'browse' | 'selected'>('browse')
  const [activeSection, setActiveSection] = useState<'courses' | 'chapters'>('courses')
  const [activeCourse, setActiveCourse] = useState<Course | null>(null)

  // Reset selections when dialog opens/closes
  useEffect(() => {
    if (open) {
      setSelectedChapterIds(new Set(existingChapterIds))
      setSearchQuery('')
      setActiveTab('browse')
      setActiveSection('courses')
      setActiveCourse(null)
    }
  }, [open, existingChapterIds])

  // Filter courses based on search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim() || !courses?.length) return courses || []

    const query = searchQuery.toLowerCase()
    return courses
      .map((course) => {
        if (!course) return null

        // Course title match
        const courseMatches = course.title?.toLowerCase().includes(query)

        // Filter chapters that match
        const filteredChapters =
          course.chapters?.filter(
            (chapter) =>
              chapter?.title?.toLowerCase().includes(query) ||
              chapter?.lessons?.some((lesson) => lesson?.title?.toLowerCase().includes(query))
          ) || []

        if (courseMatches || filteredChapters.length > 0) {
          return {
            ...course,
            chapters: courseMatches ? course.chapters : filteredChapters
          }
        }

        return null
      })
      .filter(Boolean) as Course[]
  }, [courses, searchQuery])

  // Get selected chapters data
  const selectedChapters = useMemo(() => {
    const result: { courseId: string; chapter: Chapter }[] = []

    courses.forEach((course) => {
      course.chapters?.forEach((chapter) => {
        if (selectedChapterIds.has(chapter.id)) {
          result.push({ courseId: course.id, chapter })
        }
      })
    })

    return result
  }, [courses, selectedChapterIds])

  // Handler functions
  const handleToggleChapter = (chapterId: string) => {
    setSelectedChapterIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(chapterId)) {
        newSet.delete(chapterId)
      } else {
        newSet.add(chapterId)
      }
      return newSet
    })
  }

  const handleCourseClick = (course: Course) => {
    setActiveCourse(course)
    setActiveSection('chapters')
  }

  const handleBackToCourses = () => {
    setActiveSection('courses')
    setActiveCourse(null)
  }

  const handleSelectAllInCourse = (courseId: string, isSelected: boolean) => {
    const course = courses?.find((c) => c.id === courseId)
    if (!course?.chapters?.length) return

    setSelectedChapterIds((prev) => {
      const newSet = new Set(prev)

      course.chapters.forEach((chapter) => {
        if (isSelected) {
          newSet.add(chapter.id)
        } else {
          newSet.delete(chapter.id)
        }
      })

      return newSet
    })
  }

  const isCourseFullySelected = (courseId: string): boolean => {
    const course = courses?.find((c) => c.id === courseId)
    if (!course?.chapters?.length) return false

    return course.chapters.every((chapter) => selectedChapterIds.has(chapter.id))
  }

  const isCourseSemiSelected = (courseId: string): boolean => {
    const course = courses?.find((c) => c.id === courseId)
    if (!course?.chapters?.length) return false

    const hasSelected = course.chapters.some((chapter) => selectedChapterIds.has(chapter.id))
    return hasSelected && !isCourseFullySelected(courseId)
  }

  const handleConfirm = () => {
    const selectedChaptersData: Chapter[] = []

    courses?.forEach((course) => {
      course?.chapters?.forEach((chapter) => {
        if (selectedChapterIds.has(chapter.id)) {
          selectedChaptersData.push(chapter)
        }
      })
    })

    if (selectedChaptersData.length > 0) {
      onSelect(selectedChaptersData)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-6xl p-0 overflow-hidden rounded-xl'>
        <div className='flex flex-col h-[85vh]'>
          {/* Header */}
          <DialogHeader className='px-8 py-6 border-b bg-gradient-to-r from-muted/40 to-background shrink-0'>
            <div className='flex items-center justify-between'>
              <DialogTitle className='text-xl font-semibold'>Thư viện nội dung</DialogTitle>

              <div className='flex items-center gap-4'>
                <Badge variant='outline' className='px-3 py-1 gap-1.5'>
                  <CheckCircle2 className='h-3.5 w-3.5 text-primary' />
                  <span className='font-medium'>{selectedChapterIds.size}</span> chương đã chọn
                </Badge>

                <Tabs
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as 'browse' | 'selected')}
                  className='w-[400px]'
                >
                  <TabsList className='grid w-full grid-cols-2 h-10'>
                    <TabsTrigger
                      value='browse'
                      className='data-[state=active]:bg-background data-[state=active]:shadow-md'
                    >
                      <BookOpen className='h-4 w-4 mr-2' />
                      Duyệt nội dung
                    </TabsTrigger>
                    <TabsTrigger
                      value='selected'
                      className='data-[state=active]:bg-background data-[state=active]:shadow-md'
                    >
                      <Layers className='h-4 w-4 mr-2' />
                      Đã chọn ({selectedChapterIds.size})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Search input */}
            {activeTab === 'browse' && activeSection !== 'chapters' && (
              <div className='relative mt-4 max-w-md'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Tìm kiếm khóa học, chương...'
                  className='pl-10'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7'
                    onClick={() => setSearchQuery('')}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                )}
              </div>
            )}
          </DialogHeader>

          {/* Main Content Area */}
          <div className='flex-1 overflow-hidden'>
            <Tabs value={activeTab} className='h-full'>
              {/* Browse Tab */}
              <TabsContent value='browse' className='h-full data-[state=inactive]:hidden m-0 relative'>
                {activeSection !== 'chapters' ? (
                  <div className='h-full overflow-auto'>
                    <CourseBrowseView
                      courses={filteredCourses}
                      searchQuery={searchQuery}
                      onCourseClick={handleCourseClick}
                      onSelectAll={handleSelectAllInCourse}
                      isCourseFullySelected={isCourseFullySelected}
                      isCourseSemiSelected={isCourseSemiSelected}
                    />
                  </div>
                ) : (
                  <div className='h-full'>
                    {activeCourse && (
                      <ChapterView
                        activeCourse={activeCourse}
                        selectedChapterIds={selectedChapterIds}
                        onBackClick={handleBackToCourses}
                        onToggleChapter={handleToggleChapter}
                        onSelectAll={handleSelectAllInCourse}
                        isCourseFullySelected={isCourseFullySelected}
                      />
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Selected Tab */}
              <TabsContent value='selected' className='flex-1 data-[state=inactive]:hidden m-0 relative'>
                <SelectedChaptersView
                  selectedChapters={selectedChapters}
                  courses={courses}
                  onClearAll={() => setSelectedChapterIds(new Set())}
                  onToggleChapter={handleToggleChapter}
                  onChangeTab={() => setActiveTab('browse')}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <DialogFooter className='border-t p-4 px-8 bg-gradient-to-r from-muted/10 to-background shrink-0'>
            <div className='flex justify-between items-center w-full'>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Hủy
              </Button>

              <Button
                variant='default'
                onClick={handleConfirm}
                disabled={selectedChapterIds.size === 0}
                className='gap-2'
              >
                <Check className='h-4 w-4' />
                Xác nhận ({selectedChapterIds.size} chương)
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
