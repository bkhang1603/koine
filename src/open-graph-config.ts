import envConfig from '@/config'

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
        url: `${envConfig.NEXT_PUBLIC_URL}/images/welcome.png`
      }
    ]
  }
}

export default baseOpenGraphConfig
