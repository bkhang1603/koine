/* eslint-disable no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Grip, Trash } from 'lucide-react'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { CoursesResType } from '@/schemaValidations/course.schema'

type Chapter = CoursesResType['data'][0]['chapters'][0]
// type Lesson = Chapter['lessons'][0]

interface CustomChapterListProps {
  chapters: Chapter[]
  onChange: (chapters: Chapter[]) => void
}

export function CustomChapterList({ chapters, onChange }: CustomChapterListProps) {
  const handleDeleteChapter = (id: string) => {
    onChange(chapters.filter((chapter) => chapter.id !== id))
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(chapters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onChange(items)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='chapters'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4'>
            {chapters.map((chapter, index) => (
              <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                {(provided) => (
                  <Card className='p-4' ref={provided.innerRef} {...provided.draggableProps}>
                    <div className='flex items-start gap-4'>
                      <div {...provided.dragHandleProps} className='cursor-move'>
                        <Grip className='w-5 h-5 text-muted-foreground mt-1' />
                      </div>
                      <div className='flex-1'>
                        <div className='font-medium'>{chapter.title}</div>
                        <div className='text-sm text-muted-foreground mt-1'>{chapter.description}</div>
                        <div className='text-sm text-muted-foreground mt-1'>{chapter.lessons.length} bài học</div>
                        {/* <div className='text-sm text-primary mt-2'>Từ khóa học: {chapter.courseName}</div> */}
                      </div>
                      <Button variant='ghost' size='icon' onClick={() => handleDeleteChapter(chapter.id)}>
                        <Trash className='w-4 h-4' />
                      </Button>
                    </div>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {chapters.length === 0 && (
              <div className='text-center text-muted-foreground py-8'>Chưa có chương nào được thêm vào</div>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
