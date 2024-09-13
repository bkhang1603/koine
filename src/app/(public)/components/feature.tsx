import icons from '@/assets/icons'
import Image from 'next/image'

function Feature() {
  return (
    <section className='bg-fourth'>
      <div className='container flex justify-center items-center flex-col relative pt-28 pb-24'>
        <h2
          className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
          text-transparent bg-clip-text text-3xl md:text-4xl lg:text-5xl font-bold text-center lg:leading-14'
        >
          Sứ mệnh của Koine
        </h2>
        <p className='mt-8 max-w-[1000px] text-center text-sm md:text-lg text-gray-600'>
          Ai trong chúng ta cũng từng là những đứa trẻ với dáng hình nhỏ nhắn xinh xinh mang trong mình là một tâm hồn
          ngây ngô không thôi tò mò về thế giới. Một trong số đó chính là sự thay đổi không hề nhỏ cũng như góp phần rất
          quan trọng về cả thể chất lẫn tinh thần của các em sau này. Với âm từ quen thuộc mà có lẽ các em vẫn hay nghe
          ba mẹ nhắc tới hằng ngày: “dậy thì”. Chúng tôi - Koine sẽ cùng đồng hành với các em trên con đường phát triển
          bản thân trong độ tuổi dậy thì này. Với mong muốn mang những kiến thức về giáo dục giới tính, góp phần giúp
          các em có thể hiểu được về cơ thể mình cũng như biết rõ những gì nên làm và nên tránh trong khoảng thời gian
          “vàng có một không hai”. Chúng tôi - Koine đã được thành lập để thực hiện sứ mệnh cao cả đó.
        </p>
        <Image
          src={icons.pinkStar}
          alt='pink star'
          width={50}
          height={50}
          className='hidden md:block absolute top-20 left-0 ml-32'
        />
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
