'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Award, Download, Search, Trophy } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'
import { useGetMyCertificate } from '@/queries/useAccount'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

// Format date string (e.g., "2023-01-15T14:30:00Z" to "15/01/2023")
const formatDateString = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

// Sort options for the certificates
const sortOptions = [
  { value: 'recent', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'score', label: 'Điểm số cao nhất' }
]

export default function MyCertificatePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  // Fetch certificates data
  const { data, isLoading } = useGetMyCertificate()
  const allCertificates = data?.payload?.data || []

  // Filter certificates based on search query
  const filteredCertificates = allCertificates.filter((cert) =>
    cert.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort certificates based on selected option
  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
      case 'oldest':
        return new Date(a.completedDate).getTime() - new Date(b.completedDate).getTime()
      case 'score':
        return b.score - a.score
      default:
        return 0
    }
  })

  // Get certificate colors based on score
  const getCertificateColor = (score: number) => {
    if (score >= 90) return 'emerald'
    if (score >= 80) return 'blue'
    if (score >= 70) return 'violet'
    return 'amber'
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <div className='flex items-center gap-2'>
          <Award className='h-5 w-5 text-primary' />
          <h2 className='text-xl font-medium text-gray-900'>Chứng nhận của tôi</h2>
        </div>
        <p className='text-sm text-gray-500 mt-1 md:ml-7'>Danh sách tất cả các chứng nhận bạn đã đạt được</p>
      </div>

      {/* Stats Card */}
      <Card className='p-6 border-none bg-gradient-to-r from-blue-50 to-indigo-50'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='flex items-center gap-4'>
            <div className='p-3 rounded-full bg-blue-100'>
              <Trophy className='h-6 w-6 text-blue-500' />
            </div>
            <div>
              <span className='text-sm text-gray-500 block'>Tổng chứng nhận</span>
              <span className='text-2xl font-semibold block'>
                {isLoading ? <Skeleton className='h-8 w-12' /> : allCertificates.length}
              </span>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='p-3 rounded-full bg-emerald-100'>
              <Award className='h-6 w-6 text-emerald-500' />
            </div>
            <div>
              <span className='text-sm text-gray-500 block'>Điểm trung bình</span>
              <span className='text-2xl font-semibold block'>
                {isLoading ? (
                  <Skeleton className='h-8 w-12' />
                ) : allCertificates.length > 0 ? (
                  Math.round(allCertificates.reduce((sum, cert) => sum + cert.score, 0) / allCertificates.length)
                ) : (
                  '0'
                )}
              </span>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='p-3 rounded-full bg-violet-100'>
              <Award className='h-6 w-6 text-violet-500' />
            </div>
            <div>
              <span className='text-sm text-gray-500 block'>Chứng nhận tháng này</span>
              <span className='text-2xl font-semibold block'>
                {isLoading ? (
                  <Skeleton className='h-8 w-12' />
                ) : (
                  allCertificates.filter((cert) => {
                    const today = new Date()
                    const certDate = new Date(cert.completedDate)
                    return certDate.getMonth() === today.getMonth() && certDate.getFullYear() === today.getFullYear()
                  }).length
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div className='relative w-full sm:w-64'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
          <Input
            placeholder='Tìm kiếm chứng nhận...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9 border-gray-200'
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className='w-full sm:w-48 border-gray-200'>
            <SelectValue placeholder='Sắp xếp theo' />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Certificates List */}
      {isLoading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className='h-48 rounded-lg' />
            ))}
        </div>
      ) : sortedCertificates.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {sortedCertificates.map((cert) => {
            const colorClass = getCertificateColor(cert.score)
            return (
              <Card
                key={cert.courseId}
                className='overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow'
              >
                <div className='relative'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-${colorClass}-500/20 to-${colorClass}-600/20`}
                  />
                  {cert.courseImageUrl && (
                    <Image
                      src={cert.courseImageUrl}
                      alt={cert.courseTitle}
                      className='w-full h-32 object-cover object-center opacity-25'
                      width={100}
                      height={100}
                    />
                  )}
                  <div className='absolute top-0 left-0 w-full h-full p-5'>
                    <div className='flex items-start'>
                      <div className={`p-3 rounded-xl bg-${colorClass}-100`}>
                        <Award className={`w-6 h-6 text-${colorClass}-500`} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-5'>
                  <div className='flex items-start justify-between mb-2'>
                    <h3 className='font-medium text-gray-900 line-clamp-1'>{cert.courseTitle}</h3>
                    <Badge
                      variant='outline'
                      className={`bg-${colorClass}-50 text-${colorClass}-700 border-${colorClass}-200`}
                    >
                      {cert.score} điểm
                    </Badge>
                  </div>

                  <p className='text-sm text-gray-500 mb-4'>Hoàn thành vào: {formatDateString(cert.completedDate)}</p>

                  <div className='flex items-center justify-end'>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = cert.certificateUrl
                        link.download = `${cert.courseTitle} - Certificate.pdf`
                        link.click()
                      }}
                      className='flex items-center gap-1'
                    >
                      <Download className='h-3.5 w-3.5' />
                      Tải xuống
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className='p-12 border-none bg-gray-50 flex flex-col items-center justify-center text-center'>
          <Trophy className='w-16 h-16 text-gray-300 mb-4' />
          <h3 className='text-xl font-medium text-gray-700 mb-2'>
            {searchQuery ? 'Không tìm thấy chứng nhận phù hợp' : 'Chưa có chứng nhận nào'}
          </h3>
          <p className='text-gray-500 max-w-md mb-6'>
            {searchQuery
              ? 'Vui lòng thử tìm kiếm với từ khóa khác'
              : 'Hoàn thành các khóa học với điểm số tốt để nhận chứng nhận của bạn'}
          </p>
          {searchQuery && (
            <Button variant='outline' onClick={() => setSearchQuery('')}>
              Xóa tìm kiếm
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
