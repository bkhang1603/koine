/* eslint-disable no-unused-vars */
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Filter, Search } from 'lucide-react'

interface PurchasedCoursesFilterProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  viewMode: string
  onViewModeChange: (value: string) => void
}

export function PurchasedCoursesFilter({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange
}: PurchasedCoursesFilterProps) {
  return (
    <Card className='border-none shadow-sm bg-white'>
      <CardContent className='p-4'>
        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
          <div className='w-full sm:w-auto relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Tìm kiếm khóa học...'
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className='pl-9 w-full sm:w-[280px] border-gray-200 focus:border-primary/30'
            />
          </div>

          <div className='flex flex-wrap gap-2 ml-auto'>
            <Tabs value={viewMode} onValueChange={onViewModeChange} className='mr-2'>
              <TabsList className='h-9'>
                <TabsTrigger value='all' className='text-xs'>
                  Tất cả
                </TabsTrigger>
                <TabsTrigger value='activated' className='text-xs'>
                  Đã kích hoạt
                </TabsTrigger>
                <TabsTrigger value='not_activated' className='text-xs'>
                  Chưa kích hoạt
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='h-9 px-3 text-gray-500 border-gray-200'>
                  <Filter className='h-3.5 w-3.5 mr-2' />
                  <span className='text-xs'>Lọc thêm</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuItem>Tất cả thời gian</DropdownMenuItem>
                <DropdownMenuItem>Tháng này</DropdownMenuItem>
                <DropdownMenuItem>Tháng trước</DropdownMenuItem>
                <DropdownMenuItem>3 tháng gần đây</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
