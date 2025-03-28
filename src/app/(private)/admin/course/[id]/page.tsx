'use client'
import { use } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, BookOpen, AlertCircle, ChevronDown, ChevronUp, Clock, User, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { useCourseDetailAdminQuery } from '@/queries/useCourse'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { vi } from 'date-fns/locale'
import { format } from 'date-fns'

export default function AdminCourseDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params)
  const { isLoading, error, data } = useCourseDetailAdminQuery({ courseId: params.id })
  const course = data?.payload.data

  // State for expanded chapters and selected lesson
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [selectedLesson, setSelectedLesson] = useState<any>(null)

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    )
  }

  const openLessonDialog = (lesson: any) => {
    setSelectedLesson(lesson)
  }

  if (isLoading) {
    return (
      <div className='container max-w-7xl mx-auto py-6 space-y-8'>
        {/* Back button skeleton */}
        <Skeleton className='w-[200px] h-10' />

        {/* Header skeleton */}
        <div>
          <div className='flex items-center justify-between mb-4'>
            <Skeleton className='w-[300px] h-8' />
            <Skeleton className='w-[80px] h-6' />
          </div>
          <div className='flex items-center gap-6'>
            <Skeleton className='w-[100px] h-5' />
            <Skeleton className='w-[80px] h-5' />
            <Skeleton className='w-[120px] h-5' />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-2 space-y-6'>
            {/* Course images skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Main image skeleton */}
                <div>
                  <div className='text-sm text-gray-500 mb-2'>
                    <Skeleton className='w-[80px] h-4' />
                  </div>
                  <Skeleton className='w-full h-[300px] rounded-lg' />
                </div>

                {/* Banner image skeleton */}
                <div>
                  <div className='text-sm text-gray-500 mb-2'>
                    <Skeleton className='w-[120px] h-4' />
                  </div>
                  <Skeleton className='w-full h-[200px] rounded-lg' />
                </div>
              </CardContent>
            </Card>

            {/* Description skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-full h-20' />
              </CardContent>
            </Card>

            {/* Chapters skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className='w-[200px] h-6' />
              </CardHeader>
              <CardContent className='space-y-4'>
                {[1, 2, 3].map((chapter) => (
                  <div key={chapter} className='border rounded-lg'>
                    <div className='p-4'>
                      <div className='flex justify-between items-center'>
                        <div className='space-y-2'>
                          <Skeleton className='w-[250px] h-6' />
                          <Skeleton className='w-[100px] h-4' />
                        </div>
                        <Skeleton className='w-6 h-6 rounded-full' />
                      </div>
                    </div>

                    {chapter === 1 && (
                      <div className='border-t'>
                        {[1, 2].map((lesson) => (
                          <div key={lesson} className='p-4 pl-8 border-b last:border-b-0'>
                            <div className='flex justify-between items-center'>
                              <div className='space-y-2'>
                                <Skeleton className='w-[220px] h-5' />
                                <Skeleton className='w-[80px] h-4' />
                              </div>
                              <Skeleton className='w-[60px] h-6 rounded-md' />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Course info skeleton */}
          <div className='space-y-6'>
            <Card>
              <CardHeader>
                <Skeleton className='w-[150px] h-6' />
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-5' />
                    <Skeleton className='w-[80px] h-5' />
                  </div>
                  <div className='flex justify-between'>
                    <Skeleton className='w-[100px] h-5' />
                    <Skeleton className='w-[60px] h-5' />
                  </div>
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  {[1, 2, 3].map((item) => (
                    <div key={item} className='flex justify-between'>
                      <Skeleton className='w-[120px] h-5' />
                      <Skeleton className='w-[100px] h-5' />
                    </div>
                  ))}
                </div>

                <Skeleton className='w-full h-px' />

                <div className='space-y-3'>
                  <Skeleton className='w-[100px] h-5' />
                  <div className='flex flex-wrap gap-2'>
                    <Skeleton className='w-[80px] h-6 rounded-full' />
                    <Skeleton className='w-[60px] h-6 rounded-full' />
                    <Skeleton className='w-[70px] h-6 rounded-full' />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons skeleton */}
            <div className='space-y-3'>
              <Skeleton className='w-full h-10 rounded-md' />
              <Skeleton className='w-full h-10 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] gap-4'>
        <AlertCircle className='w-12 h-12 text-red-500' />
        <div className='text-center'>
          <h3 className='text-lg font-medium text-gray-900 mb-1'>Không tìm thấy khoá học</h3>
          <p className='text-gray-500'>Khoá học không tồn tại hoặc đã bị xóa</p>
        </div>
        <Button variant='outline' asChild>
          <Link href='/admin/course'>Quay lại danh sách khoá học</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='container max-w-7xl mx-auto py-6 space-y-8'>
      {/* Back button */}
      <Button variant='ghost' asChild className='gap-2 hover:bg-gray-100'>
        <Link href='/admin/course'>
          <ArrowLeft className='h-4 w-4' />
          Quay lại danh sách khoá học
        </Link>
      </Button>

      {/* Header */}
      <div>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-2xl font-bold text-gray-900'>{course.title}</h1>
          <Badge variant={course.isBanned ? 'destructive' : 'secondary'}>
            {course.isBanned ? 'Đã khoá' : 'Hoạt động'}
          </Badge>
        </div>
        <div className='flex items-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            {course.durationsDisplay}
          </div>
          <div className='flex items-center gap-2'>
            <Star className='h-4 w-4' />
            {course.aveRating} sao
          </div>
          <div className='flex items-center gap-2'>
            <User className='h-4 w-4' />
            {course.totalEnrollment} học viên
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-6'>
        <div className='col-span-2 space-y-6'>
          {/* Course Images */}
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh khoá học</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Main Image */}
              <div>
                <p className='text-sm text-gray-500 mb-2 font-medium'>Ảnh hiển thị</p>
                <div className='relative w-full h-[600px]'>
                  <Image src={course.imageUrl} alt={course.title} fill className='object-cover rounded-lg' />
                </div>
              </div>

              {/* Banner Image */}
              <div>
                <p className='text-sm text-gray-500 mb-2 font-medium'>Ảnh banner</p>
                <div className='relative w-full h-[300px]'>
                  <Image
                    src={course.imageBanner}
                    alt={`${course.title} banner`}
                    fill
                    className='object-cover rounded-lg'
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Description */}
          <Card>
            <CardHeader>
              <CardTitle>Mô tả khoá học</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-600'>{course.description}</p>
            </CardContent>
          </Card>

          {/* Chapters */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <BookOpen className='w-5 h-5' />
                Nội dung khoá học
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {course.chapters?.map((chapter: any, index: number) => (
                <div key={chapter.id} className='border rounded-lg overflow-hidden'>
                  <div
                    className='flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors'
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <span className='bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium'>
                          {index + 1}
                        </span>
                        <h3 className='font-medium'>{chapter.title}</h3>
                      </div>
                      <p className='text-sm text-gray-500 mt-1'>
                        {chapter.durationsDisplay} • {chapter.lessons.length} bài học
                      </p>
                    </div>
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronUp className='h-5 w-5 flex-shrink-0' />
                    ) : (
                      <ChevronDown className='h-5 w-5 flex-shrink-0' />
                    )}
                  </div>

                  {expandedChapters.includes(chapter.id) && (
                    <div className='border-t'>
                      {chapter.lessons.map((lesson: any, lessonIndex: number) => (
                        <div
                          key={lesson.id}
                          className='p-4 pl-12 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors'
                          onClick={() => openLessonDialog(lesson)}
                        >
                          <div className='flex items-center justify-between'>
                            <div className='flex-1'>
                              <div className='flex items-center gap-2'>
                                <span className='text-primary font-medium'>
                                  {index + 1}.{lessonIndex + 1}
                                </span>
                                <h4 className='font-medium'>{lesson.title}</h4>
                              </div>
                              <p className='text-sm text-gray-500 mt-1'>{lesson.durationsDisplay}</p>
                            </div>
                            <Badge
                              variant={
                                lesson.type === 'VIDEO'
                                  ? 'default'
                                  : lesson.type === 'DOCUMENT'
                                    ? 'secondary'
                                    : 'destructive'
                              }
                              className='flex-shrink-0'
                            >
                              {lesson.type === 'VIDEO'
                                ? 'Video'
                                : lesson.type === 'DOCUMENT'
                                  ? 'Tài liệu'
                                  : 'Video + Tài liệu'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Course Info */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khoá học</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Giá gốc</span>
                  <span>{course.price.toLocaleString()}đ</span>
                </div>
                {course.discount > 0 && (
                  <div className='flex justify-between text-sm'>
                    <span className='text-muted-foreground'>Giảm giá</span>
                    <span className='text-red-500'>{(course.discount * 100).toFixed(0)}%</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cấp độ</span>
                  <span>{course.level}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Ngày tạo</span>
                  <span>{format(new Date(course.createdAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Cập nhật lần cuối</span>
                  <span>{format(new Date(course.updatedAt), 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className='text-sm font-medium mb-2'>Danh mục</h3>
                <div className='flex flex-wrap gap-2'>
                  {course.categories.map((category: any) => (
                    <Badge key={category.id} variant='outline'>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className='space-y-3'>
            <Button className='w-full' variant='default'>
              Chỉnh sửa khoá học
            </Button>
            <Button className='w-full' variant='outline'>
              {course.isBanned ? 'Mở khoá' : 'Khoá'}
            </Button>
          </div>
        </div>
      </div>

      {/* Lesson Dialog */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>{selectedLesson?.title}</DialogTitle>
            <DialogDescription>{selectedLesson?.description}</DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            {selectedLesson?.content && (
              <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
            )}
            {selectedLesson?.videoUrl && (
              <div className='aspect-video'>
                <video src={selectedLesson.videoUrl} controls className='w-full h-full rounded-lg' />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
