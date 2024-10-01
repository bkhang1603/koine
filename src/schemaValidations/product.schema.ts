import z from 'zod'

export const ProductData = z
  .object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    discount: z.number(),
    stockQuantity: z.number(),
    images: z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string()
      })
    ),
    categoryId: z.string(),
    category: z.object({
      id: z.number(),
      name: z.string()
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
  })
  .strict()

export const ProductsRes = z.object({
  data: z.array(ProductData),
  message: z.string(),
  statusCode: z.number(),
  pagination: z.object({
    totalItem: z.number(),
    pageSize: z.number(),
    currentPage: z.number(),
    maxPageSize: z.number(),
    totalPage: z.number()
  })
})

export const ProductRes = z.object({
  data: ProductData,
  message: z.string(),
  statusCode: z.number()
})

export type ProductsResType = z.TypeOf<typeof ProductsRes>

export type ProductResType = z.TypeOf<typeof ProductRes>
