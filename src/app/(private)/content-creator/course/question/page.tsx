'use client'

import { use, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchParams } from '@/types/query'
import {
  useGetQuestionListQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation
} from '@/queries/useCourse'
import { TableCustom, dataListType } from '@/components/table-custom'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { QuestionMoreOptions } from '@/components/private/common/course/question-more-options'
import { CreateQuestionDialog } from '@/components/private/common/course/create-question-dialog'
import { EditQuestionDialog } from '@/components/private/common/course/edit-question-dialog'
import { handleErrorApi } from '@/lib/utils'
import { z } from 'zod'
import { createQuestionBody, updateQuestionBody } from '@/schemaValidations/admin.schema'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function CourseQuestionPage(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams)

  // States for dialog and selected question
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)

  // Lấy giá trị từ searchParams hoặc sử dụng giá trị mặc định
  const currentPageSize = Number(searchParams.page_size) || 10
  const currentPageIndex = Number(searchParams.page_index) || 1

  // Gọi API với giá trị từ URL
  const { data: responseData, isLoading } = useGetQuestionListQuery({
    page_size: currentPageSize,
    page_index: currentPageIndex
  })

  // Mutation hooks
  const createQuestionMutation = useCreateQuestionMutation()
  const updateQuestionMutation = useUpdateQuestionMutation()
  const deleteQuestionMutation = useDeleteQuestionMutation()

  const data = responseData?.payload.data || []
  const pagination = responseData?.payload.pagination || {
    pageSize: currentPageSize,
    totalItem: 0,
    currentPage: currentPageIndex,
    totalPage: 1,
    maxPageSize: 50
  }

  // handlers for actions
  const handleViewQuestion = (question: any) => {
    // Set full question data with options in both formats to ensure compatibility
    setSelectedQuestion({
      id: question.id,
      content: question.content,
      options: [], // Empty default to avoid map errors
      questionOptions: question.questionOptions || []
    })
    setTimeout(() => setViewDialogOpen(true), 50)
  }

  const handleUpdateQuestion = (question: any) => {
    try {
      // Transform question structure to match expected format in EditQuestionDialog
      const transformedQuestion = {
        id: question.id,
        content: question.content,
        options:
          question.questionOptions?.map((opt: any) => ({
            id: opt.id,
            optionData: opt.optionData,
            isCorrect: opt.isCorrect
          })) || [] // Provide empty array fallback if map fails
      }
      setSelectedQuestion(transformedQuestion)
      setTimeout(() => setUpdateDialogOpen(true), 50)
    } catch (error) {
      console.error('Error transforming question data:', error)
      toast({
        variant: 'destructive',
        description: 'Có lỗi xảy ra khi chuẩn bị dữ liệu câu hỏi'
      })
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestionMutation.mutateAsync(id)
      toast({
        description: 'Xóa câu hỏi thành công'
      })
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleCreateQuestion = async (data: z.infer<typeof createQuestionBody>) => {
    try {
      await createQuestionMutation.mutateAsync(data)
      toast({
        description: 'Tạo câu hỏi mới thành công'
      })
      setCreateDialogOpen(false)
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleUpdateQuestionSubmit = async (data: z.infer<typeof updateQuestionBody>, id: string) => {
    try {
      await updateQuestionMutation.mutateAsync({ id, data })
      toast({
        description: 'Cập nhật câu hỏi thành công'
      })
      setUpdateDialogOpen(false)
      setTimeout(() => setSelectedQuestion(null), 200)
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false)
    setTimeout(() => {
      setSelectedQuestion(null)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }, 200)
  }

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false)
    setTimeout(() => {
      setSelectedQuestion(null)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }, 200)
  }

  // Table configuration
  const headerColumn = [
    { id: 1, name: 'Nội dung câu hỏi' },
    { id: 2, name: 'Ngày tạo' },
    { id: 3, name: 'Số đáp án đúng' },
    { id: 4, name: 'Số lựa chọn' },
    { id: 5, name: '' }
  ]

  const bodyColumn = [
    {
      id: 1,
      render: (question: any) => (
        <div className='max-w-[400px]'>
          <div className='font-medium truncate' title={question.content}>
            {question.content}
          </div>
        </div>
      )
    },
    {
      id: 2,
      render: (question: any) => (
        <div className='min-w-[120px]'>
          <div className='text-sm'>{format(new Date(question.createdAt), 'dd/MM/yyyy', { locale: vi })}</div>
          <div className='text-xs text-muted-foreground'>
            {format(new Date(question.createdAt), 'HH:mm', { locale: vi })}
          </div>
        </div>
      )
    },
    {
      id: 3,
      render: (question: any) => (
        <div className='flex items-center'>
          <Badge variant='green' className='w-fit'>
            {question.numCorrect}
          </Badge>
        </div>
      )
    },
    {
      id: 4,
      render: (question: any) => (
        <div className='flex items-center'>
          <Badge variant='outline' className='w-fit'>
            {question.questionOptions.length}
          </Badge>
        </div>
      )
    },
    {
      id: 5,
      render: (question: any) => (
        <div className='flex justify-end'>
          <QuestionMoreOptions
            question={question}
            onView={() => handleViewQuestion(question)}
            onUpdate={() => handleUpdateQuestion(question)}
            onDelete={() => handleDeleteQuestion(question.id)}
          />
        </div>
      )
    }
  ]

  const tableData: dataListType = {
    data,
    message: '',
    pagination
  }

  return (
    <div className='container mx-auto px-4 py-6 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>Quản lý câu hỏi</h1>
          <p className='text-muted-foreground mt-1'>Quản lý và theo dõi tất cả câu hỏi trắc nghiệm</p>
        </div>
        <div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className='w-4 h-4 mr-2' />
            Tạo câu hỏi mới
          </Button>
        </div>
      </div>

      {/* Table */}
      <TableCustom
        data={tableData}
        headerColumn={headerColumn}
        bodyColumn={bodyColumn}
        href='/content-creator/course/question'
        loading={isLoading}
        showSearch={false}
      />

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseViewDialog()
        }}
      >
        <DialogContent
          className='sm:max-w-lg'
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
        >
          <DialogHeader>
            <DialogTitle>Chi tiết câu hỏi</DialogTitle>
            <DialogDescription>Xem thông tin chi tiết của câu hỏi</DialogDescription>
          </DialogHeader>

          {selectedQuestion && (
            <div className='space-y-4 mt-4'>
              <div>
                <h3 className='font-medium text-sm text-muted-foreground'>Nội dung câu hỏi:</h3>
                <p className='mt-1 text-base'>{selectedQuestion.content}</p>
              </div>

              <div>
                <h3 className='font-medium text-sm text-muted-foreground mb-2'>Các lựa chọn:</h3>
                <div className='space-y-3'>
                  {selectedQuestion.questionOptions && selectedQuestion.questionOptions.length > 0 ? (
                    selectedQuestion.questionOptions.map((option: any, index: number) => (
                      <div key={option.id || index} className='flex items-start gap-3 bg-gray-50 p-2 rounded-md'>
                        <div className='min-w-[50px] pt-0.5'>
                          <Badge variant={option.isCorrect ? 'green' : 'outline'} className='w-full text-center'>
                            {option.isCorrect ? 'Đúng' : 'Sai'}
                          </Badge>
                        </div>
                        <div className='flex-1'>
                          <span className='font-medium'>{index + 1}.</span> <span>{option.optionData}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-sm text-muted-foreground'>Không có lựa chọn nào</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Question Dialog */}
      <CreateQuestionDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateQuestion}
        isLoading={createQuestionMutation.isPending}
      />

      {/* Edit Question Dialog */}
      {selectedQuestion && (
        <EditQuestionDialog
          open={updateDialogOpen}
          onOpenChange={handleCloseUpdateDialog}
          onSubmit={handleUpdateQuestionSubmit}
          question={selectedQuestion}
          isLoading={updateQuestionMutation.isPending}
        />
      )}
    </div>
  )
}
