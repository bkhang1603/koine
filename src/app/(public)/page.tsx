import Blog from '@/components/home/blog'
import Feature from '@/components/home/feature'
import Hero from '@/components/home/hero'
import Recommend from '@/components/home/recommend'
import Service from '@/components/home/service'

function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <Recommend />
      <Service />
      <Blog />
    </>
  )
}

export default Home
