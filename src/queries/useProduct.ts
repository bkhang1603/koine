import productApiRequest from '@/apiRequests/product'
import { useQuery } from '@tanstack/react-query'

export const useGetCategoryProductsQuery = () => {
  return useQuery({
    queryKey: ['categoryProducts'],
    queryFn: () => productApiRequest.getCategoryProducts()
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
