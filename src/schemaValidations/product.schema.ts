import z from 'zod'

export const ProductData = z
  .object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
    detail: z.string(),
    guide: z.string(),
    discount: z.number(),
    stockQuantity: z.number(),
    images: z.array(
      z.object({
        name: z.string(),
        imageUrl: z.string()
      })
    ),
    categoryId: z.string(),
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    ),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
    averageRating: z.number(),
    totalRating: z.number()
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

export const CategoryProductData = z
  .object({
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAtFormatted: z.string(),
    updatedAtFormatted: z.string()
  })
  .strict()

export const CategoryProductsRes = z.object({
  data: z.array(CategoryProductData),
  message: z.string(),
  statusCode: z.number()
})

export const ProductReviewsData = z
  .object({
    ratingInfos: z.array(
      z.object({
        isDeleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        productId: z.string(),
        userId: z.string(),
        rating: z.number(),
        review: z.string(),
        user: z.object({
          id: z.string(),
          username: z.string()
        }),
        createdAtFormatted: z.string(),
        updatedAtFormatted: z.string()
      })
    ),
    stars: z.object({
      ratings: z.object({
        1: z.number(),
        2: z.number(),
        3: z.number(),
        4: z.number(),
        5: z.number()
      }),
      averageRating: z.number(),
      totalRating: z.number()
    })
  })
  .strict()

export const ProductReviewsRes = z.object({
  data: ProductReviewsData,
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

export type ProductsResType = z.TypeOf<typeof ProductsRes>

export type ProductResType = z.TypeOf<typeof ProductRes>

export type CategoryProductsResType = z.TypeOf<typeof CategoryProductsRes>

export type ProductReviewsResType = z.TypeOf<typeof ProductReviewsRes>
