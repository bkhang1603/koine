/* eslint-disable no-unused-vars */
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { LinkIcon, Video } from 'lucide-react'

interface VideoLessonContentProps {
  lesson: {
    videoUrl?: string
    videoFile?: File
    videoSource: 'url' | 'file'
    videoContent?: string
  }
  chapterIndex: number
  lessonIndex: number
  handleLessonChange: (chapterIndex: number, lessonIndex: number, field: string, value: string | File) => void
}

export function VideoLessonContent({ lesson, chapterIndex, lessonIndex, handleLessonChange }: VideoLessonContentProps) {
  return (
    <div className='mt-4 space-y-6'>
      <div className='flex items-center space-x-2'>
        <Label htmlFor={`video-source-${chapterIndex}-${lessonIndex}`}>Video Source:</Label>
        <Switch
          id={`video-source-${chapterIndex}-${lessonIndex}`}
          checked={lesson.videoSource === 'file'}
          onCheckedChange={(checked) => {
            const newSource = checked ? 'file' : 'url'
            handleLessonChange(chapterIndex, lessonIndex, 'videoSource', newSource)
          }}
        />
        <span>{lesson.videoSource === 'file' ? 'File Upload' : 'URL'}</span>
      </div>
      <div className='grid md:grid-cols-2 gap-6'>
        {lesson.videoSource === 'url' ? (
          <div className='space-y-2'>
            <Label htmlFor={`video-url-${chapterIndex}-${lessonIndex}`}>Video URL</Label>
            <div className='flex items-center space-x-2'>
              <Input
                id={`video-url-${chapterIndex}-${lessonIndex}`}
                placeholder='Enter video URL'
                value={lesson.videoUrl || ''}
                onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'videoUrl', e.target.value)}
                className='flex-grow'
              />
              <Button
                type='button'
                variant='outline'
                size='icon'
                onClick={() => {
                  // Logic to validate and process the URL
                  console.log('Processing URL:', lesson.videoUrl)
                }}
              >
                <LinkIcon className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <Label htmlFor={`video-file-${chapterIndex}-${lessonIndex}`}>Upload Video</Label>
            <div className='flex items-center justify-center w-full'>
              <Label
                htmlFor={`video-file-${chapterIndex}-${lessonIndex}`}
                className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <Video className='w-10 h-10 mb-3 text-gray-400' />
                  <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>MP4, WebM or Ogg (MAX. 800x400px)</p>
                </div>
                <Input
                  id={`video-file-${chapterIndex}-${lessonIndex}`}
                  type='file'
                  accept='video/*'
                  className='hidden'
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleLessonChange(chapterIndex, lessonIndex, 'videoFile', file)
                    }
                  }}
                />
              </Label>
            </div>
            {lesson.videoFile && <p className='text-sm text-muted-foreground'>Selected: {lesson.videoFile.name}</p>}
          </div>
        )}
        <div className='space-y-2'>
          <Label>Video Preview</Label>
          <div className='aspect-video bg-gray-100 rounded-lg overflow-hidden'>
            {lesson.videoSource === 'url' && lesson.videoUrl ? (
              <iframe src={lesson.videoUrl} className='w-full h-full' allowFullScreen></iframe>
            ) : lesson.videoSource === 'file' && lesson.videoFile ? (
              <video controls className='w-full h-full'>
                <source src={URL.createObjectURL(lesson.videoFile)} type={lesson.videoFile.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className='flex items-center justify-center h-full'>
                <p className='text-sm text-muted-foreground'>
                  No video {lesson.videoSource === 'url' ? 'URL provided' : 'file uploaded'}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor={`video-description-${chapterIndex}-${lessonIndex}`}>Video Description</Label>
        <Textarea
          id={`video-description-${chapterIndex}-${lessonIndex}`}
          placeholder='Enter video description or additional content'
          value={lesson.videoContent || ''}
          onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, 'videoContent', e.target.value)}
          className='min-h-[100px]'
        />
      </div>
    </div>
  )
}
