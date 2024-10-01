import http from '@/lib/http'
import { ProductResType, ProductsResType } from '@/schemaValidations/product.schema'

const productApiRequest = {
  getProducts: ({ page_index, search }: { page_index?: number | undefined; search?: string | string[] | undefined }) =>
    http.get<ProductsResType>(`/products?page_index=${page_index}&keyword=${search}`),
  getProduct: (id: string) => http.get<ProductResType>(`/products/${id}`),
  createProduct: (data: any) => http.post('/products', data),
  updateProduct: (id: string, data: any) => http.put(`/products/${id}`, data),
  deleteProduct: (id: string) => http.delete(`/products/${id}`)
}

export default productApiRequest
