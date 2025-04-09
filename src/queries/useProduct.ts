import productApiRequest from '@/apiRequests/product'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateProductBodyType, UpdateCategoryProductBodyType } from '@/schemaValidations/product.schema'

export const useGetCategoryProductsQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
}) => {
  return useQuery({
    queryKey: ['categoryProducts', page_index, page_size, keyword],
    queryFn: () => productApiRequest.getCategoryProducts({ page_index, page_size, keyword })
  })
}

export const useGetProductReviewsQuery = ({
  id,
  star,
  page_index,
  page_size
}: {
  id: string
  star?: number
  page_index?: number
  page_size?: number
}) => {
  return useQuery({
    queryKey: ['productReviews', id, star, page_index, page_size],
    queryFn: () =>
      productApiRequest.getProductReviews({
        id,
        star,
        page_index,
        page_size
      })
  })
}

export const useGetProductsQuery = ({
  page_index,
  page_size,
  search,
  range,
  category,
  sort
}: {
  page_index?: number
  page_size?: number
  search?: string
  range?: number
  category?: string
  sort?: string
}) => {
  return useQuery({
    queryKey: ['products', page_index, page_size, search, range, category, sort],
    queryFn: () => productApiRequest.getProducts({ page_index, page_size, search, range, category, sort })
  })
}

export const useGetProductListAdminQuery = ({
  page_index,
  page_size,
  keyword
}: {
  page_index?: number | undefined
  page_size?: number | undefined
  keyword?: string | string[] | undefined
}) => {
  return useQuery({
    queryKey: ['productListAdmin', page_index, page_size, keyword],
    queryFn: () =>
      productApiRequest.getProductListAdmin({
        page_index,
        page_size,
        keyword
      })
  })
}

export const useProductDetailAdminQuery = ({ productId }: { productId: string }) => {
  return useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => productApiRequest.getProductDetailAdmin(productId),
    enabled: !!productId
  })
}

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: (data: CreateProductBodyType) => productApiRequest.createProduct(data)
  })
}

export const useCreateCategoryProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productApiRequest.createCategoryProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryProducts']
      })
    }
  })
}

export const useUpdateCategoryProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryProductBodyType }) =>
      productApiRequest.updateCategoryProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryProducts']
      })
    }
  })
}

export const useDeleteCategoryProductMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productApiRequest.deleteCategoryProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryProducts']
      })
    }
  })
}

export const useGetCategoryProductDetailQuery = ({ id, enabled }: { id: string; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['categoryProductDetail', id],
    queryFn: () => productApiRequest.getCategoryProductDetail(id),
    enabled: enabled ?? !!id
  })
}
