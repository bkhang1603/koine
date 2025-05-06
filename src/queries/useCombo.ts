import comboApiRequest from '@/apiRequests/combo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UpdateComboBodyType } from '@/schemaValidations/admin.schema'

export const useComboListQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
}) => {
  return useQuery({
    queryKey: ['combo-list', page_index, page_size, keyword],
    queryFn: () => comboApiRequest.getComboList({ page_index, page_size, keyword })
  })
}

export const useComboDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['combo-detail', id],
    queryFn: () => comboApiRequest.getComboDetail(id)
  })
}

export const useComboCreateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: comboApiRequest.createCombo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['combo-list']
      })
    }
  })
}

export const useComboUpdateMutation = (comboId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateComboBodyType) => comboApiRequest.updateCombo(comboId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['combo-list']
      })
      queryClient.invalidateQueries({
        queryKey: ['combo-detail', comboId]
      })
    }
  })
}

export const useComboDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: comboApiRequest.deleteCombo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['combo-list']
      })
    }
  })
}

export const useAddCourseToComboMutation = (comboId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: string) => comboApiRequest.addCourseToCombo(comboId, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['combo-detail', comboId]
      })
    }
  })
}

export const useRemoveCourseFromComboMutation = (comboId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: string) => comboApiRequest.removeCourseFromCombo(comboId, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['combo-detail', comboId]
      })
    }
  })
}
