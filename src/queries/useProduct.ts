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
