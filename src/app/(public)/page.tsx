import Achievement from '@/components/public/parent/home/achievement'
import Blog from '@/components/public/parent/home/blog'
import Feature from '@/components/public/parent/home/feature'
import Hero from '@/components/public/parent/home/hero'
import Information from '@/components/public/parent/home/information'
import Promo from '@/components/public/parent/home/promo'
import Recommend from '@/components/public/parent/home/recommend'
import Service from '@/components/public/parent/home/service'
import Sharing from '@/components/public/parent/home/sharing'

function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <Recommend />
      <Service />
      <Blog />
      <Promo />
      <Achievement />
      <Sharing />
      <Information />
    </>
  )
}
export default Home
