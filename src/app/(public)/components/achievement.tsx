const achievementData = [
  {
    title: 'Người đăng ký',
    number: 300
  },
  {
    title: 'Giảng viên',
    number: 8
  },
  {
    title: 'Khóa học',
    number: 5
  },
  {
    title: 'Bài viết',
    number: 10
  },
  {
    title: 'Lượt xem',
    number: 4000
  }
]

function Achievement() {
  return (
    <section className='container py-20 text-center'>
      <h3>Thành tích đã đạt được</h3>
      <h2
        className='bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE]
        text-transparent bg-clip-text text-2xl md:text-3xl lg:text-4xl font-bold mt-4'
      >
        Các thành tựu của Koine
      </h2>
      <p className='mt-4 max-w-[500px] flex mx-auto'>
        Koine đã khẳng định vị thế là người tiên phong trong đổi mới cách giáo dục giới tính, cung cấp giải pháp học tập
        chất lượng.
      </p>

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-12 lg:grid-cols-5 mt-16'>
        {achievementData.map((item, index) => (
          <div
            key={index}
            className='border-primary border-4 bg-fifth rounded-xl py-2 md:py-4
          space-y-1 hover:border-secondary hover:bg-fourth transition-colors duration-300 cursor-pointer'
          >
            <p className='text-base md:text-2xl lg:text-3xl font-semibold'>{item.number.toLocaleString()}</p>
            <p className='text-gray-800 text-xs md:text-sm lg:text-base'>{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Achievement
