import { formatPercentage } from '@/lib/utils'

interface DataNoteProps {
  filledStats: {
    filledDays: number
    totalDays: number
    filledPercentage: number
  }
  daysWithRevenue: number
}

export function DataNote({ filledStats, daysWithRevenue }: DataNoteProps) {
  return (
    <div className='mb-4 mt-2'>
      <div className='text-sm font-medium mb-1'>Ghi chú về dữ liệu:</div>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <div className='h-3 w-3 rounded-sm bg-red-500/20 border border-red-500/50'></div>
        <span>Khu vực màu đỏ: Dữ liệu rời rạc (chỉ có 5 ngày trong tháng 3-4/2025)</span>
      </div>
      {filledStats.filledDays > 0 && (
        <div className='flex items-center gap-2 text-sm text-muted-foreground mt-1'>
          <div className='h-3 w-3 rounded-sm bg-white border border-gray-400'></div>
          <span>
            Dữ liệu được điền tự động: {filledStats.filledDays} ngày ({formatPercentage(filledStats.filledPercentage)})
          </span>
        </div>
      )}
      <div className='text-xs text-muted-foreground mt-1 italic'>
        * Biểu đồ đảm bảo hiển thị đầy đủ dữ liệu cho tất cả các ngày trong khoảng thời gian đã chọn. Dữ liệu thực tế
        chỉ có 5 ngày trong tháng 3-4/2025, các ngày còn lại được bổ sung tự động.
        {daysWithRevenue > 0 && (
          <span> Trung bình doanh thu chỉ tính trên {daysWithRevenue} ngày có doanh thu thực tế.</span>
        )}
      </div>
    </div>
  )
}
