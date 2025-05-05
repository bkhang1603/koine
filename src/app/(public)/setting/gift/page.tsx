'use client'

import { useMemo, useState } from 'react'
import { Gift, Search, Calendar, ArrowRight, RefreshCcw, CheckCircle2 } from 'lucide-react'
import { formatDateTimeToLocaleString, handleErrorApi } from '@/lib/utils'
import { useGetReceivedGifts, useGetSentGifts, useRefundGift, useRedeemGift } from '@/queries/useGift'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'

const GiftPage = () => {
  const [activeTab, setActiveTab] = useState('received')
  const [searchQuery, setSearchQuery] = useState('')
  const [refundGiftId, setRefundGiftId] = useState<string | null>(null)
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false)

  const { data: receivedGiftsData, isLoading: isLoadingReceived } = useGetReceivedGifts()
  const { data: sentGiftsData, isLoading: isLoadingSent } = useGetSentGifts()
  const refundGiftMutation = useRefundGift()
  const redeemGiftMutation = useRedeemGift()

  // Lọc các quà tặng theo từ khóa tìm kiếm
  const filteredReceivedGifts = useMemo(() => {
    const gifts = receivedGiftsData?.payload?.data || []
    if (!searchQuery.trim()) return gifts

    const query = searchQuery.toLowerCase()
    return gifts.filter(
      (gift) =>
        gift.receiverName.toLowerCase().includes(query) ||
        gift.receiverEmail.toLowerCase().includes(query) ||
        gift.message.toLowerCase().includes(query)
    )
  }, [receivedGiftsData, searchQuery])

  const filteredSentGifts = useMemo(() => {
    const gifts = sentGiftsData?.payload?.data || []
    if (!searchQuery.trim()) return gifts

    const query = searchQuery.toLowerCase()
    return gifts.filter(
      (gift) =>
        gift.receiverName.toLowerCase().includes(query) ||
        gift.receiverEmail.toLowerCase().includes(query) ||
        gift.message.toLowerCase().includes(query)
    )
  }, [sentGiftsData, searchQuery])

  const handleRefundGift = async () => {
    if (!refundGiftId) return

    try {
      await refundGiftMutation.mutateAsync(refundGiftId)
      toast({
        title: 'Hoàn trả quà tặng thành công',
        description: 'Khóa học đã được trả lại cho tài khoản của bạn'
      })
      setRefundGiftId(null)
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const handleRedeemGifts = async () => {
    try {
      await redeemGiftMutation.mutateAsync()
      toast({
        title: 'Kích hoạt quà tặng thành công',
        description: 'Các khóa học đã được kích hoạt và sẵn sàng để học'
      })
      setShowRedeemConfirm(false)
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  const hasReceivedGifts = receivedGiftsData?.payload?.data && receivedGiftsData.payload.data.length > 0

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-2'>
          <Gift className='h-5 w-5 text-primary' />
          <h2 className='text-xl font-medium text-gray-900'>Quà tặng khóa học</h2>
        </div>
        <p className='text-sm text-gray-500 mt-1 md:ml-7'>
          Quản lý các khóa học bạn đã gửi tặng hoặc nhận được từ người khác
        </p>
      </div>

      {/* Tabs và Search */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='bg-gray-100/80 w-full md:w-auto'>
            <TabsTrigger value='received' className='data-[state=active]:bg-white flex-1 md:flex-initial'>
              Quà đã nhận
            </TabsTrigger>
            <TabsTrigger value='sent' className='data-[state=active]:bg-white flex-1 md:flex-initial'>
              Quà đã gửi
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='flex items-center gap-3'>
          {activeTab === 'received' && hasReceivedGifts && (
            <Button
              size='sm'
              className='flex items-center gap-1.5'
              onClick={() => setShowRedeemConfirm(true)}
              disabled={redeemGiftMutation.isPending || filteredReceivedGifts.length === 0}
            >
              <CheckCircle2 className='h-4 w-4' />
              Kích hoạt tất cả
            </Button>
          )}

          <div className='relative w-full md:w-64'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
            <Input
              placeholder='Tìm kiếm quà tặng...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-9 border-gray-200'
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'received' ? (
        isLoadingReceived ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className='h-[260px] w-full rounded-lg' />
            ))}
          </div>
        ) : filteredReceivedGifts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {filteredReceivedGifts.map((gift) => (
              <Card key={gift.id} className='overflow-hidden flex flex-col h-full'>
                <CardHeader className='bg-gray-50 pb-2 pt-4'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='font-semibold text-lg leading-tight line-clamp-1'>Khóa học</h3>
                      <div className='flex items-center gap-1 text-gray-500 text-sm mt-1'>
                        <Calendar className='h-3.5 w-3.5' />
                        <span>{formatDateTimeToLocaleString(gift.createdAt)}</span>
                      </div>
                    </div>
                    <Badge variant='outline' className='bg-green-50 text-green-700 border-green-200 whitespace-nowrap'>
                      {gift.quantity} phần
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className='pt-4 flex-grow'>
                  <div className='space-y-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-700'>Người gửi:</p>
                      <p className='text-sm text-gray-600'>Người gửi #{gift.senderId}</p>
                    </div>

                    {gift.message ? (
                      <div>
                        <p className='text-sm font-medium text-gray-700'>Lời nhắn:</p>
                        <p className='text-sm text-gray-600 italic'>{`'${gift.message}'`}</p>
                      </div>
                    ) : (
                      <div>
                        <p className='text-sm font-medium text-gray-700'>Lời nhắn:</p>
                        <p className='text-sm text-gray-400 italic'>Không có lời nhắn</p>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className='border-t pt-4 flex gap-2 justify-end'>
                  {/* Removed individual activation button */}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className='py-12 flex flex-col items-center justify-center text-center'>
            <Gift className='h-12 w-12 text-gray-300 mb-4' />
            <h3 className='text-xl font-medium text-gray-700'>Bạn chưa nhận được quà tặng nào</h3>
            <p className='text-gray-500 mt-2 max-w-md'>
              Khi có người gửi khóa học cho bạn, chúng sẽ xuất hiện ở đây để bạn có thể kích hoạt và học ngay
            </p>
          </div>
        )
      ) : isLoadingSent ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[1, 2, 3, 4].map((n) => (
            <Skeleton key={n} className='h-[260px] w-full rounded-lg' />
          ))}
        </div>
      ) : filteredSentGifts.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {filteredSentGifts.map((gift) => (
            <Card key={gift.id} className='overflow-hidden flex flex-col h-full'>
              <CardHeader className='bg-gray-50 pb-2 pt-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='font-semibold text-lg leading-tight line-clamp-1'>Khóa học</h3>
                    <div className='flex items-center gap-1 text-gray-500 text-sm mt-1'>
                      <Calendar className='h-3.5 w-3.5' />
                      <span>{formatDateTimeToLocaleString(gift.createdAt)}</span>
                    </div>
                  </div>
                  <Badge variant='outline' className='bg-blue-50 text-blue-700 border-blue-200 whitespace-nowrap'>
                    {gift.quantity} phần
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className='pt-4 flex-grow'>
                <div className='space-y-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-700'>Người nhận:</p>
                    <div className='text-sm text-gray-600'>
                      <p>{gift.receiverName}</p>
                      <p>{gift.receiverEmail}</p>
                      <p>{gift.receiverPhone}</p>
                    </div>
                  </div>

                  {gift.message ? (
                    <div>
                      <p className='text-sm font-medium text-gray-700'>Lời nhắn:</p>
                      <p className='text-sm text-gray-600 italic'>{`'${gift.message}'`}</p>
                    </div>
                  ) : (
                    <div>
                      <p className='text-sm font-medium text-gray-700'>Lời nhắn:</p>
                      <p className='text-sm text-gray-400 italic'>Không có lời nhắn</p>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className='border-t pt-4 flex gap-2 justify-end'>
                <Button
                  size='sm'
                  variant='outline'
                  className='flex items-center gap-1.5'
                  onClick={() => setRefundGiftId(gift.id)}
                >
                  <RefreshCcw className='h-3.5 w-3.5' />
                  Hoàn trả
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className='py-12 flex flex-col items-center justify-center text-center'>
          <ArrowRight className='h-12 w-12 text-gray-300 mb-4' />
          <h3 className='text-xl font-medium text-gray-700'>Bạn chưa tặng khóa học nào</h3>
          <p className='text-gray-500 mt-2 max-w-md'>
            Hãy tặng khóa học cho bạn bè hoặc người thân trong phần &quot;Khóa học đã mua&quot; để chia sẻ kiến thức
          </p>
        </div>
      )}

      {/* Dialog xác nhận hoàn trả quà tặng */}
      <AlertDialog open={!!refundGiftId} onOpenChange={(open) => !open && setRefundGiftId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hoàn trả quà tặng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hoàn trả quà tặng này? Khóa học sẽ được trả lại vào tài khoản của bạn và người nhận
              sẽ không thể sử dụng được nữa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRefundGift}
              disabled={refundGiftMutation.isPending}
              className='flex items-center gap-2'
            >
              {refundGiftMutation.isPending && (
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent' />
              )}
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog xác nhận kích hoạt quà tặng */}
      <AlertDialog open={showRedeemConfirm} onOpenChange={setShowRedeemConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kích hoạt quà tặng</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn kích hoạt tất cả quà tặng đã nhận? Các khóa học sẽ được kích hoạt cho tài khoản của
              bạn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRedeemGifts}
              disabled={redeemGiftMutation.isPending}
              className='flex items-center gap-2'
            >
              {redeemGiftMutation.isPending && (
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent' />
              )}
              Kích hoạt tất cả
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default GiftPage
