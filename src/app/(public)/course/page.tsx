import images from '@/assets/images'
import CardCategory from '@/components/card-category'

function CoursePage() {
  return (
    <main>
      <section className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
        <CardCategory title='Khóa học chung' images={images.course} />
        <CardCategory title='Cẩm nang bé gái' images={images.course2} />
        <CardCategory title='Cảm xúc gia đình' images={images.course3} />
        <CardCategory title='Tâm lý' images={images.course4} />
        <CardCategory title='Cẩm nang bé trai' images={images.course5} />
        <CardCategory title='Xã hội' images={images.course6} />
      </section>
    </main>
  )
}

export default CoursePage
