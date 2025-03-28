'use client'

import { ProductResType } from '@/schemaValidations/product.schema'
import Image from 'next/image'
import React, { useState } from 'react'
import { ImageOff } from 'lucide-react'

function ProductImage({
  imageData
}: {
  imageData: ProductResType['data']['images']
  // eslint-disable-next-line no-unused-vars
}) {
  const [mainImage, setMainImage] = useState(imageData[0])

  // Giới hạn hiển thị tối đa 4 ảnh
  const displayedImages = imageData.slice(0, 4)

  // Tính số placeholder cần thêm vào để đủ 3 ô
  const placeholdersNeeded = imageData.length < 4 ? 4 - imageData.length : 0

  if (!imageData || !Array.isArray(imageData)) {
    return <p>No images available</p>
  }

  return (
    <div className='flex flex-col gap-2'>
      <Image
        src={mainImage.imageUrl}
        alt={mainImage.name}
        width={800}
        height={800}
        className='w-full h-96 object-cover rounded-lg'
        priority={true}
      />

      {/* Grid hiển thị tối đa 3 ô, có thể giới hạn số ảnh hiển thị */}
      <div className='grid grid-cols-4 gap-2'>
        {/* Hiển thị ảnh thật */}
        {displayedImages.map((image, index) => (
          <div key={`image-${index}`} className='w-full h-28 overflow-hidden cursor-pointer rounded-lg'>
            <Image
              src={image.imageUrl}
              alt={image.name}
              width={800}
              height={800}
              className='w-full h-full object-cover hover:opacity-80 transition-opacity duration-200'
              priority={true}
              onClick={() => setMainImage(image)}
            />
          </div>
        ))}

        {/* Thêm placeholder nếu có ít hơn 3 ảnh */}
        {Array.from({ length: placeholdersNeeded }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className='w-full h-28 bg-gray-100 rounded-lg flex items-center justify-center'
          >
            <ImageOff className='w-8 h-8 text-gray-300' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImage
