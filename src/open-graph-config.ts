const baseOpenGraphConfig = {
  openGraph: {
    locale: 'vi_VN',
    type: 'website',
    siteName: 'Koine',
    title: 'Nền tảng giáo dục giới tính cho trẻ em | Koine',
    description:
      'Koine là nền tảng giáo dục giới tính cho trẻ em với các khóa học chất lượng cao từ các chuyên gia hàng đầu.',
    url: 'https://koine.id.vn',
    images: [
      {
        // url: `${envConfig.NEXT_PUBLIC_URL}/images/welcome.png`
        url: 'https://koine-bucket-v4.s3.ap-southeast-2.amazonaws.com/image_8318c5f6-5945-4e9a-8d0a-a7841bf139b4_png'
      }
    ]
  }
}

export default baseOpenGraphConfig
