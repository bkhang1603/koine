import http from '@/lib/http'
import { GetProductDetailAdminResType, GetProductListAdminResType } from '@/schemaValidations/admin.schema'
import {
  CategoryProductsResType,
  CreateCategoryProductResType,
  CreateCategoryProductBodyType,
  CreateProductBodyType,
  CreateProductResType,
  DeleteCategoryProductResType,
  ProductResType,
  UpdateCategoryProductResType,
  UpdateCategoryProductBodyType,
  ProductsResType,
  ProductReviewsResType,
  GetCategoryProductDetailResType
} from '@/schemaValidations/product.schema'

const productApiRequest = {
  getProducts: ({
    page_index,
    page_size,
    search,
    range,
    category,
    sort
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    search?: string | string[] | undefined
    range?: number | undefined
    category?: string | undefined
    sort?: string | string[] | ['pa' | 'pd' | 'na' | 'nd'] | undefined
  }) =>
    http.get<ProductsResType>(
      `/products?page_index=${page_index}&page_size=${page_size}${search ? `&keyword=${search}` : ''}${range ? `&range=${range}` : ''}${category ? `&category=${category}` : ''}${sort ? `&sort=${sort}` : ''}`
    ),
  // getProducts with caching
  getProductsCache: ({
    page_index,
    page_size,
    search,
    range,
    category,
    sort
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    search?: string | string[] | undefined
    range?: number | undefined
    category?: string | undefined
    sort?: string | string[] | ['pa' | 'pd' | 'na' | 'nd'] | undefined
  }) =>
    http.get<ProductsResType>(
      `/products?page_index=${page_index}&page_size=${page_size}${search ? `&keyword=${search}` : ''}${range ? `&range=${range}` : ''}${category ? `&category=${category}` : ''}${sort ? `&sort=${sort}` : ''}`,
      { cache: 'force-cache', next: { revalidate: 12 * 60 * 60 } }
    ),
  getProduct: (id: string) => http.get<ProductResType>(`/products/${id}`),
  // getProduct with caching
  getProductCache: (id: string) =>
    http.get<ProductResType>(`/products/${id}`, { cache: 'force-cache', next: { revalidate: 12 * 60 * 60 } }),
  createProduct: (data: CreateProductBodyType) => http.post<CreateProductResType>('/products', data),
  updateProduct: (id: string, data: any) => http.put(`/products/${id}`, data),
  deleteProduct: (id: string) => http.delete(`/products/${id}`),
  getCategoryProducts: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<CategoryProductsResType>(
      `/category-products?${keyword ? `keyword=${keyword}` : ''}${page_index ? `&page_index=${page_index}` : ''}${page_size ? `&page_size=${page_size}` : ''}`
    ),
  // getCategoryProducts with caching
  getCategoryProductsCache: () =>
    http.get<CategoryProductsResType>('/category-products', {
      cache: 'force-cache',
      next: { revalidate: 24 * 60 * 60 }
    }),
  getProductReviews: ({
    id,
    star,
    page_index,
    page_size
  }: {
    id: string
    star?: number | undefined
    page_index?: number | undefined | 0
    page_size?: number | undefined | 10
  }) =>
    http.get<ProductReviewsResType>(
      `/products/${id}/reviews?star=${star}&page_index=${page_index}&page_size=${page_size}`
    ),
  getProductListAdmin: ({
    page_index,
    page_size,
    keyword
  }: {
    page_index?: number | undefined
    page_size?: number | undefined
    keyword?: string | string[] | undefined
  }) =>
    http.get<GetProductListAdminResType>(
      `/products/statistic?page_index=${page_index}&page_size=${page_size}&keyword=${keyword}`
    ),
  getProductDetailAdmin: (id: string) => http.get<GetProductDetailAdminResType>(`/products/${id}`),
  createCategoryProduct: (data: CreateCategoryProductBodyType) =>
    http.post<CreateCategoryProductResType>('/category-products', data),
  updateCategoryProduct: (id: string, data: UpdateCategoryProductBodyType) =>
    http.put<UpdateCategoryProductResType>(`/category-products/${id}`, data),
  deleteCategoryProduct: (id: string) => http.delete<DeleteCategoryProductResType>(`/category-products/${id}`),
  getCategoryProductDetail: (id: string) => http.get<GetCategoryProductDetailResType>(`/category-products/${id}`)
}

export default productApiRequest
