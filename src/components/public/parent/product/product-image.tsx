'use client'

import { ProductResType } from '@/schemaValidations/product.schema'
import Image from 'next/image'
import React, { useState } from 'react'

function ProductImage({
  imageData
}: {
  imageData: ProductResType['data']['images']
  // eslint-disable-next-line no-unused-vars
}) {
  const [mainImage, setMainImage] = useState(imageData[0])
  const gridCols = `grid-cols-${imageData.length}`

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
      <div className={`grid ${gridCols} gap-2`}>
        {imageData.map((image, index) => (
          <div key={index} className='w-full h-28 overflow-hidden cursor-pointer rounded-lg'>
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
      </div>
    </div>
  )
}

export default ProductImage
