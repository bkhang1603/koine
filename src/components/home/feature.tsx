import icons from '@/assets/icons'
import Image from 'next/image'

function Feature() {
  return (
    <section className='bg-fourth'>
      <div className='container flex justify-center items-center flex-col relative pt-28 pb-24'>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          inline-block text-transparent bg-clip-text text-4xl font-bold'
        >
          Câu chuyện của chúng tôi
        </h2>
        <p className='mt-12 max-w-[700px] text-center'>
          Trong nhiều năm ròng rã, chúng ta cố tìm hạnh phúc và nhiều lần tưởng đã đạt được nó để hưởng một cách lâu
          bền. Nhưng lần nào ta cũng thất vọng. Sau đó, ta lại tiếp tục chạy theo ảo ảnh đó như trước. Nếu biết dừng
          chân suy nghĩ, ta sẽ thấy chúng ta đuổi theo hạnh phúc nhưng không hề biết đến bản chất thật sự của nó, và
          không biết phải dùng phương tiện nào để đạt được nó.
        </p>
        <Image src={icons.pinkStar} alt='Pink star' width={50} height={50} className='absolute top-20 left-0 ml-32' />
        <Image
          src={icons.blueStar}
          alt='Blue star'
          width={40}
          height={40}
          className='absolute bottom-10 right-0 mr-10'
        />
        <Image
          src={icons.blueStar}
          alt='Blue star'
          width={100}
          height={100}
          className='absolute -bottom-10 right-0 mr-24'
        />
      </div>
    </section>
  )
}

export default Feature
