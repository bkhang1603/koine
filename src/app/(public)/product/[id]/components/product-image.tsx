'use client'

import Image from 'next/image'
import React, { useState } from 'react'

function ProductImage({
  imageData
}: {
  imageData: string[]
  // eslint-disable-next-line no-unused-vars
}) {
  const [mainImage, setMainImage] = useState(imageData[0])
  const gridCols = `grid-cols-${imageData.length}`

  if (!imageData || !Array.isArray(imageData)) {
    return <div>No images available</div>
  }

  return (
    <div className='flex flex-col gap-2'>
      <Image
        src={mainImage}
        alt='Koine product'
        width={800}
        height={800}
        className='w-full h-96 object-cover rounded-lg'
        priority={true}
      />
      <div className={`grid ${gridCols} gap-2`}>
        {imageData.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={image}
            width={800}
            height={800}
            className='w-full h-28 object-cover cursor-pointer rounded-lg'
            priority={true}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImage
