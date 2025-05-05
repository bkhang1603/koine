// 'use client'

// import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
// import Artplayer from 'artplayer'
// import {
//   ArrowLeft,
//   ArrowRight,
//   BookOpen,
//   CheckCircle,
//   Clock,
//   Home,
//   Menu,
//   FileText,
//   MonitorPlay,
//   Loader2,
//   Smile
// } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import LearnSidebar from '@/components/public/learn/sidebar'
// import Link from 'next/link'
// import configRoute from '@/config/route'
// import { useGetCourseProgressQuery, useGetLessonQuery, useUpdateCourseProgressMutation } from '@/queries/useCourse'
// import { handleErrorApi } from '@/lib/utils'
// import { UserCourseProgressResType } from '@/schemaValidations/course.schema'
// import { cn } from '@/lib/utils'
// import { Badge } from '@/components/ui/badge'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// type Lesson = UserCourseProgressResType['data']['chapters'][0]['lessons'][0]

// export default function CoursePage() {
//   const { id } = useParams()
//   const search = useSearchParams()
//   const router = useRouter()

//   const { data: courseProgress } = useGetCourseProgressQuery({ id: id as string })
//   const courseProgressData = useMemo(() => courseProgress?.payload?.data?.chapters ?? [], [courseProgress])
//   const progress = courseProgress?.payload.data.courseCompletionPercentage
//   const totalLesson = courseProgress?.payload.data.totalLessonsInCourse
//   const totalCompletedLesson = courseProgress?.payload.data.totalCompletedLessonsInCourse
//   const courseName = courseProgress?.payload.data.title ?? 'Khóa học'

//   const rId = search.get('rId') ?? courseProgressData[0]?.lessons[0]?.id

//   const { data: lesson, isFetching: isLessonFetching } = useGetLessonQuery({ id: rId, enabled: !!rId })
//   const lessonData = lesson?.payload.data

//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const playerRef = useRef<HTMLDivElement>(null)

//   // Tìm chương hiện tại và vị trí bài học
//   const allLessons = courseProgressData.flatMap((chapter) => chapter.lessons)
//   const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === rId)

//   const currentChapter = courseProgressData.find((chapter) => chapter.lessons.some((lesson) => lesson.id === rId))
//   const currentChapterIndex = courseProgressData.findIndex((chapter) => chapter.id === currentChapter?.id)

//   const updateCourseProgressMutation = useUpdateCourseProgressMutation()

//   const handleUpdate = useCallback(
//     async ({ lessonId, status }: { lessonId: string; status: Lesson['status'] }) => {
//       try {
//         if (status === 'NOTYET') {
//           await updateCourseProgressMutation.mutateAsync(lessonId)
//         }
//       } catch (error) {
//         handleErrorApi({ error })
//       }
//     },
//     [updateCourseProgressMutation]
//   )

//   const toggleSidebar = useCallback(() => {
//     setSidebarOpen((prev) => !prev)
//   }, [])

//   const navigateLesson = useCallback(
//     (direction: 'prev' | 'next') => {
//       if (!rId) return

//       const allLessons = courseProgressData.flatMap((chapter) => chapter.lessons)
//       const currentLessonIndex = allLessons.findIndex((lesson) => lesson.id === rId)

//       if (direction === 'prev' && currentLessonIndex > 0) {
//         const prevLesson = allLessons[currentLessonIndex - 1]
//         router.replace(`?rId=${prevLesson.id}`)
//       } else if (direction === 'next' && currentLessonIndex < allLessons.length - 1) {
//         const nextLesson = allLessons[currentLessonIndex + 1]
//         router.replace(`?rId=${nextLesson.id}`)
//       }
//     },
//     [courseProgressData, rId, router]
//   )

//   useEffect(() => {
//     if (playerRef.current && (lessonData?.type === 'VIDEO' || lessonData?.type === 'BOTH') && lessonData?.videoUrl) {
//       const art = new Artplayer({
//         container: playerRef.current,
//         url: lessonData?.videoUrl,
//         volume: 0.5,
//         autoplay: false,
//         pip: true,
//         autoSize: true,
//         autoMini: true,
//         screenshot: true,
//         setting: true,
//         loop: true,
//         flip: true,
//         playbackRate: true,
//         aspectRatio: true,
//         fullscreen: true,
//         fullscreenWeb: true,
//         subtitleOffset: true,
//         miniProgressBar: true,
//         mutex: true,
//         backdrop: true,
//         playsInline: true,
//         autoPlayback: true,
//         airplay: true
//       })

//       return () => {
//         if (art && art.destroy) {
//           art.destroy(false)
//         }
//       }
//     }
//   }, [lessonData])

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       {/* Lighter Modern Header */}
//       <header className='relative bg-gradient-to-br from-sky-50 to-indigo-100 text-slate-800 shadow-sm'>
//         {/* Top navigation strip */}
//         <div className='py-2 px-4 bg-white/40 backdrop-blur-sm border-b border-slate-200/50 flex items-center justify-between'>
//           <div className='flex items-center space-x-4'>
//             <Link
//               href={configRoute.home}
//               className='flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors'
//             >
//               <Home className='h-3.5 w-3.5' />
//               <span className='text-xs font-medium'>Trang chủ</span>
//             </Link>
//             <span className='text-slate-300'>|</span>
//             <Link
//               href={configRoute.course}
//               className='flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors'
//             >
//               <BookOpen className='h-3.5 w-3.5' />
//               <span className='text-xs font-medium'>Khóa học</span>
//             </Link>
//             <span className='text-slate-300'>|</span>
//             <Link
//               href={configRoute.setting.profile}
//               className='flex items-center gap-1.5 text-slate-600 hover:text-primary transition-colors'
//             >
//               <Smile className='h-3.5 w-3.5' />
//               <span className='text-xs font-medium'>Tài khoản</span>
//             </Link>
//           </div>
//         </div>

//         {/* Main header content */}
//         <div className='relative pt-4 pb-6 px-4'>
//           <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>
//             {/* Left side - Course info */}
//             <div className='flex items-start gap-4'>
//               <Button
//                 variant='ghost'
//                 size='icon'
//                 onClick={toggleSidebar}
//                 className='xl:hidden bg-white/60 hover:bg-white/80 text-slate-700 rounded-lg h-10 w-10 shadow-sm'
//               >
//                 <Menu className='h-5 w-5' />
//               </Button>

//               {/* <div className='flex-shrink-0'>
//                 <div className='h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden flex items-center justify-center border-2 border-white shadow-md'>
//                   <Image src={icons.logo} alt='Koine logo' width={60} height={60} className='object-cover' />
//                 </div>
//               </div> */}

//               <div className='space-y-1.5'>
//                 <h1 className='text-xl md:text-2xl font-bold tracking-tight max-w-xl truncate text-slate-800'>
//                   {courseName || 'Đang tải khóa học...'}
//                 </h1>

//                 <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600'>
//                   <div className='flex items-center gap-1.5'>
//                     <svg
//                       xmlns='http://www.w3.org/2000/svg'
//                       width='16'
//                       height='16'
//                       viewBox='0 0 24 24'
//                       fill='none'
//                       stroke='currentColor'
//                       strokeWidth='2'
//                       strokeLinecap='round'
//                       strokeLinejoin='round'
//                       className='h-4 w-4 text-blue-500'
//                     >
//                       <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
//                     </svg>
//                     <span>
//                       Bài {currentLessonIndex + 1} / {totalLesson}
//                     </span>
//                   </div>

//                   <div className='flex items-center gap-1.5'>
//                     <CheckCircle className='h-4 w-4 text-green-500' />
//                     <span>{totalCompletedLesson} bài đã hoàn thành</span>
//                   </div>

//                   {currentChapter && (
//                     <div className='flex items-center gap-1.5'>
//                       <BookOpen className='h-4 w-4 text-blue-500' />
//                       <span className='truncate max-w-[400px]'>
//                         Chương {currentChapterIndex + 1}: {currentChapter.title}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right side - Progress indicator */}
//             <div className='md:flex-shrink-0 flex flex-col md:items-end gap-2 mt-2 md:mt-0'>
//               <div className='flex items-center gap-3'>
//                 <div className='text-right'>
//                   <span className='text-xs text-slate-500'>Tiến độ</span>
//                   <div className='text-xl font-bold text-slate-800'>{progress || 0}%</div>
//                 </div>

//                 <div className='relative h-14 w-14'>
//                   <svg className='h-14 w-14 transform -rotate-90' viewBox='0 0 100 100'>
//                     <circle cx='50' cy='50' r='40' fill='transparent' stroke='rgba(203,213,225,0.5)' strokeWidth='10' />
//                     <circle
//                       cx='50'
//                       cy='50'
//                       r='40'
//                       fill='transparent'
//                       stroke={progress === 100 ? 'rgb(34,197,94)' : 'rgb(59,130,246)'}
//                       strokeWidth='10'
//                       strokeDasharray={`${2 * Math.PI * 40}`}
//                       strokeDashoffset={`${2 * Math.PI * 40 * (1 - (progress || 0) / 100)}`}
//                       strokeLinecap='round'
//                     />
//                   </svg>
//                   <div className='absolute inset-0 flex items-center justify-center'>
//                     {progress === 100 ? (
//                       <CheckCircle className='h-6 w-6 text-green-500' />
//                     ) : (
//                       <Clock className='h-6 w-6 text-blue-500' />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* <div className='flex gap-2'>
//                 <Button
//                   variant='outline'
//                   size='sm'
//                   onClick={() => navigateLesson('prev')}
//                   disabled={currentLessonIndex === 0}
//                   className={cn(
//                     'px-2.5 text-xs bg-white/70 hover:bg-white/90 rounded-full border-slate-200 text-slate-700',
//                     currentLessonIndex === 0 && 'opacity-50'
//                   )}
//                 >
//                   <ArrowLeft className='h-3.5 w-3.5 mr-1' />
//                   Trước
//                 </Button>

//                 <Button
//                   variant='outline'
//                   size='sm'
//                   onClick={() => navigateLesson('next')}
//                   disabled={lessonData?.status === 'NOTYET' || currentLessonIndex === allLessons.length - 1}
//                   className={cn(
//                     'px-2.5 text-xs bg-white/70 hover:bg-white/90 rounded-full border-slate-200 text-slate-700',
//                     (lessonData?.status === 'NOTYET' || currentLessonIndex === allLessons.length - 1) && 'opacity-50'
//                   )}
//                 >
//                   Tiếp
//                   <ArrowRight className='h-3.5 w-3.5 ml-1' />
//                 </Button>
//               </div> */}
//             </div>
//           </div>
//         </div>

//         {/* Progress bar at bottom */}
//         <div className='h-1.5 bg-white/30 w-full overflow-hidden absolute bottom-0 left-0 right-0'>
//           <div
//             className={cn(
//               'h-full transition-all duration-700 ease-in-out',
//               progress === 100
//                 ? 'bg-gradient-to-r from-green-400 to-emerald-300'
//                 : 'bg-gradient-to-r from-blue-400 to-indigo-400'
//             )}
//             style={{ width: `${progress || 0}%` }}
//           />
//         </div>
//       </header>

//       <div className='flex flex-col md:flex-row'>
//         {/* Sidebar */}
//         {courseProgressData.length !== 0 && (
//           <LearnSidebar courseProgressData={courseProgressData} sidebarOpen={sidebarOpen} />
//         )}

//         {/* Main Content */}
//         <div className='flex-1 relative'>
//           <ScrollArea className='h-[calc(100vh-4rem)]'>
//             <div className='p-4 md:p-8 pb-20'>
//               {/* Video Player */}
//               {(lessonData?.type === 'VIDEO' || lessonData?.type === 'BOTH') && lessonData?.videoUrl && (
//                 <div className='bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-8'>
//                   <div ref={playerRef} className='w-full aspect-video !z-0' />
//                 </div>
//               )}

//               {/* Lesson Content */}
//               <div className='bg-white rounded-xl shadow-sm p-6 md:p-8'>
//                 {currentChapter && (
//                   <div className='mb-4'>
//                     <div className='flex items-center gap-2 text-muted-foreground mb-1'>
//                       <BookOpen className='h-4 w-4' />
//                       <span className='text-sm'>
//                         Chương {currentChapterIndex + 1}: {currentChapter.title}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 <div className='flex items-center justify-between mb-4'>
//                   <h1 className='text-2xl font-bold'>{lessonData?.title}</h1>

//                   {lessonData?.status === 'YET' && (
//                     <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200 px-3 py-1'>
//                       <CheckCircle className='h-4 w-4 mr-1.5' />
//                       Đã hoàn thành
//                     </Badge>
//                   )}
//                 </div>

//                 <div className='flex items-center gap-3 text-sm text-muted-foreground mb-6'>
//                   {lessonData?.type === 'VIDEO' && (
//                     <div className='flex items-center gap-1.5'>
//                       <MonitorPlay className='h-4 w-4' />
//                       <span>Video</span>
//                     </div>
//                   )}
//                   {lessonData?.type === 'DOCUMENT' && (
//                     <div className='flex items-center gap-1.5'>
//                       <FileText className='h-4 w-4' />
//                       <span>Tài liệu</span>
//                     </div>
//                   )}
//                   {lessonData?.type === 'BOTH' && (
//                     <div className='flex items-center gap-1.5'>
//                       <MonitorPlay className='h-4 w-4' />
//                       <span>Video & Tài liệu</span>
//                     </div>
//                   )}

//                   <span>•</span>

//                   <div className='flex items-center gap-1.5'>
//                     <Clock className='h-4 w-4' />
//                     <span>
//                       {lessonData?.durations
//                         ? `${Math.floor(lessonData.durations / 60)}:${String(lessonData.durations % 60).padStart(2, '0')} phút`
//                         : '45 phút'}
//                     </span>
//                   </div>
//                 </div>

//                 {lessonData?.description && (
//                   <div className='text-gray-600 mb-8 border-l-4 border-muted-foreground/20 pl-4 py-1 italic'>
//                     {lessonData.description}
//                   </div>
//                 )}

//                 {(lessonData?.type === 'DOCUMENT' || lessonData?.type === 'BOTH') && (
//                   <div className='mt-6 prose prose-slate max-w-none'>
//                     <div dangerouslySetInnerHTML={{ __html: lessonData?.content || '' }} />
//                   </div>
//                 )}

//                 {/* Navigation Controls */}
//                 <div className='mt-12 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div>
//                           <Button
//                             variant='outline'
//                             onClick={() => navigateLesson('prev')}
//                             disabled={currentLessonIndex === 0}
//                             className={cn(
//                               'gap-2 w-full sm:w-auto',
//                               currentLessonIndex === 0 ? 'opacity-50' : 'hover:bg-slate-100'
//                             )}
//                           >
//                             <ArrowLeft className='h-4 w-4' />
//                             Bài trước
//                           </Button>
//                         </div>
//                       </TooltipTrigger>
//                       {currentLessonIndex > 0 && (
//                         <TooltipContent side='bottom'>
//                           <p>{allLessons[currentLessonIndex - 1]?.title}</p>
//                         </TooltipContent>
//                       )}
//                     </Tooltip>
//                   </TooltipProvider>

//                   <Button
//                     variant='default'
//                     onClick={() =>
//                       lessonData &&
//                       handleUpdate({
//                         lessonId: lessonData.id,
//                         status: lessonData.status
//                       })
//                     }
//                     disabled={
//                       !lessonData ||
//                       lessonData.status === 'YET' ||
//                       updateCourseProgressMutation.isPending ||
//                       isLessonFetching
//                     }
//                     className={cn(
//                       'bg-primary hover:bg-primary/90 w-full sm:w-auto',
//                       (updateCourseProgressMutation.isPending || isLessonFetching) && 'opacity-50'
//                     )}
//                   >
//                     {updateCourseProgressMutation.isPending || isLessonFetching ? (
//                       <>
//                         <Loader2 className='h-4 w-4 mr-2 animate-spin' />
//                         Đang xử lý...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className='h-4 w-4 mr-2' />
//                         {lessonData?.status === 'YET' ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
//                       </>
//                     )}
//                   </Button>

//                   <TooltipProvider>
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div>
//                           <Button
//                             variant='outline'
//                             onClick={() => navigateLesson('next')}
//                             disabled={lessonData?.status === 'NOTYET' || currentLessonIndex === allLessons.length - 1}
//                             className={cn(
//                               'gap-2 w-full sm:w-auto',
//                               lessonData?.status === 'NOTYET' || currentLessonIndex === allLessons.length - 1
//                                 ? 'opacity-50'
//                                 : 'hover:bg-slate-100'
//                             )}
//                           >
//                             Bài tiếp theo
//                             <ArrowRight className='h-4 w-4' />
//                           </Button>
//                         </div>
//                       </TooltipTrigger>
//                       {currentLessonIndex < allLessons.length - 1 && (
//                         <TooltipContent side='bottom'>
//                           <p>{allLessons[currentLessonIndex + 1]?.title}</p>
//                         </TooltipContent>
//                       )}
//                     </Tooltip>
//                   </TooltipProvider>
//                 </div>
//               </div>
//             </div>
//           </ScrollArea>
//         </div>
//       </div>
//     </div>
//   )
// }

function page() {
  return <div>page</div>
}

export default page
