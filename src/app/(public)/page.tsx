import Achievement from '@/app/(public)/components/achievement'
import Blog from '@/app/(public)/components/blog'
import Feature from '@/app/(public)/components/feature'
import Hero from '@/app/(public)/components/hero'
import Information from '@/app/(public)/components/information'
import Promo from '@/app/(public)/components/promo'
import Recommend from '@/app/(public)/components/recommend'
import Service from '@/app/(public)/components/service'

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
      <Information />
    </>
  )
}

export default Home
