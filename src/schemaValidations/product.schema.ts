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
        id: z.number(),
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

export const CreateProductBody = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  detail: z.string().min(1, 'Chi tiết không được để trống'),
  guide: z.string().min(1, 'Hướng dẫn không được để trống'),
  price: z.number().min(0, 'Giá không được âm'),
  stockQuantity: z.number().min(0, 'Số lượng không được âm'),
  discount: z.number().min(0, 'Giảm giá không được âm').max(100, 'Giảm giá không được quá 100%'),
  imageUrlArray: z.array(z.string()).min(1, 'Phải có ít nhất 1 hình ảnh'),
  categoryIds: z.array(z.string()).min(1, 'Phải chọn ít nhất 1 danh mục')
})

export const CreateProductRes = z.object({
  statusCode: z.number(),
  info: z.string(),
  message: z.string(),
  data: z.object({
    id: z.string(),
    creatorId: z.string(),
    name: z.string(),
    nameNoTone: z.string(),
    slug: z.string(),
    description: z.string(),
    detail: z.string(),
    guide: z.string(),
    price: z.number(),
    discount: z.number().nullable(),
    stockQuantity: z.number(),
    isDeleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    categories: z.array(
      z.object({
        id: z.string(),
        name: z.string()
      })
    )
  })
})

export type ProductsResType = z.TypeOf<typeof ProductsRes>

export type ProductResType = z.TypeOf<typeof ProductRes>

export type CategoryProductsResType = z.TypeOf<typeof CategoryProductsRes>

export type ProductReviewsResType = z.TypeOf<typeof ProductReviewsRes>

export type CreateProductBodyType = z.infer<typeof CreateProductBody>

export type CreateProductResType = z.infer<typeof CreateProductRes>
