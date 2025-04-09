import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EventStatus } from './types'
import Image from 'next/image'
import { Filter, Sparkles } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import images from '@/assets/images'
import { wrapServerApi } from '@/lib/server-utils'
import eventApiRequest from '@/apiRequests/event'
import { EventList } from '@/app/(public)/event/components/event-list'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import configRoute from '@/config/route'
import { SearchBar } from '@/app/(public)/event/components/search-bar'

const eventStatusConfig: Record<EventStatus, { label: string; color: string }> = {
  OPENING: {
    label: 'Đang diễn ra',
    color: 'bg-green-50 text-green-600'
  },
  PENDING: {
    label: 'Sắp diễn ra',
    color: 'bg-blue-50 text-blue-600'
  },
  DONE: {
    label: 'Đã kết thúc',
    color: 'bg-gray-50 text-gray-600'
  },
  CANCELLED: {
    label: 'Đã hủy',
    color: 'bg-red-50 text-red-600'
  }
}

const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Sắp diễn ra', value: 'upcoming' },
  { label: 'Số người tham gia', value: 'participants' }
]

export default async function EventPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string; sort?: string; q?: string }>
}) {
  // Lấy các giá trị từ searchParams
  const params = await searchParams
  const { status, sort, q } = params ?? {
    status: 'ALL',
    sort: 'newest',
    q: ''
  }

  // Chuyển đổi searchParams thành object thường để tránh lỗi "Only plain objects can be passed"
  const createQueryObject = (overrides: Record<string, string>) => {
    // Tạo một object mới chỉ với các thuộc tính cần thiết
    const query: Record<string, string> = {}

    // Thêm các searchParams hiện tại (nếu có giá trị)
    if (q) query.q = q
    if (sort) query.sort = sort
    if (status) query.status = status

    // Áp dụng các override
    return { ...query, ...overrides }
  }

  // Lấy toàn bộ dữ liệu sự kiện, không filter hay sort
  const data = await wrapServerApi(() => eventApiRequest.getAllEvent())
  const events = data?.payload?.data || []

  return (
    <main className='min-h-screen pb-32'>
      {/* Hero Section */}
      <section className='relative h-[40vh] bg-black'>
        <div className='absolute inset-0'>
          <Image src={images.eventBanner} alt='Events' fill className='object-cover opacity-50' />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60' />
        </div>

        <div className='relative h-full container flex flex-col justify-center items-center text-center'>
          <Badge className='bg-white/10 text-white backdrop-blur-sm mb-6 px-4 py-2'>
            <Sparkles className='h-4 w-4 mr-2' />
            Khám phá sự kiện nổi bật
          </Badge>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl'>
            Tham gia các sự kiện độc đáo và truyền cảm hứng
          </h1>
          <p className='text-lg text-white/80 max-w-2xl mb-8'>
            Khám phá và tham gia các sự kiện trực tuyến và trực tiếp từ những người dẫn đầu trong ngành
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='container -mt-16 relative'>
        <div className='bg-white rounded-2xl shadow-lg p-6 md:p-8'>
          <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'>
            <SearchBar initialValue={q} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='gap-2'>
                  <Filter className='h-4 w-4' />
                  {sortOptions.find((option) => option.value === sort)?.label || 'Sắp xếp theo'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                {sortOptions.map((option) => (
                  <DropdownMenuItem key={option.value} asChild>
                    <Link
                      href={{
                        pathname: configRoute.event,
                        query: createQueryObject({ sort: option.value })
                      }}
                      className={cn(
                        'cursor-pointer w-full',
                        sort === option.value && 'bg-primary/10 text-primary font-medium'
                      )}
                    >
                      {option.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Event List */}
      <section className='container mt-16'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
          <div>
            <h2 className='text-2xl font-bold mb-2'>Tất cả sự kiện</h2>
            <p className='text-gray-500'>Khám phá các sự kiện phù hợp với bạn</p>
          </div>
          <Tabs defaultValue={status ?? 'ALL'} className='w-full md:w-auto'>
            <TabsList className='w-full md:w-auto justify-start md:justify-center overflow-x-auto'>
              <TabsTrigger value='ALL' className='min-w-[100px]' asChild>
                <Link
                  href={{
                    pathname: configRoute.event,
                    query: createQueryObject({ status: 'ALL' })
                  }}
                >
                  Tất cả
                </Link>
              </TabsTrigger>
              {Object.entries(eventStatusConfig).map(
                ([statusKey, config]) =>
                  statusKey !== 'CANCELLED' && (
                    <TabsTrigger key={statusKey} value={statusKey} className='min-w-[120px]' asChild>
                      <Link
                        href={{
                          pathname: configRoute.event,
                          query: createQueryObject({ status: statusKey })
                        }}
                      >
                        {config.label}
                      </Link>
                    </TabsTrigger>
                  )
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* Truyền tất cả sự kiện mà không thực hiện filter/sort */}
        <EventList events={events} />
      </section>
    </main>
  )
}
