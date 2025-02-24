'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Search,
  HelpCircle,
  Lightbulb,
  CreditCard,
  Wrench,
  MessagesSquare,
  Users2,
  Clock,
  BookOpen,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FAQCategory {
  id: string
  title: string
  description: string
  questions: {
    id: string
    question: string
    answer: string
  }[]
}

const faqCategories: FAQCategory[] = [
  {
    id: 'general',
    title: 'Câu hỏi chung',
    description: 'Thông tin cơ bản về nền tảng và cách sử dụng',
    questions: [
      {
        id: 'what-is',
        question: 'Nền tảng này là gì?',
        answer:
          'Đây là nền tảng học tập trực tuyến dành cho trẻ em, cung cấp các khóa học tương tác và nội dung giáo dục chất lượng cao.'
      },
      {
        id: 'how-to-start',
        question: 'Làm thế nào để bắt đầu?',
        answer:
          'Bạn có thể bắt đầu bằng cách đăng ký tài khoản, sau đó duyệt qua các khóa học có sẵn và chọn khóa học phù hợp với con bạn.'
      }
    ]
  },
  {
    id: 'courses',
    title: 'Khóa học',
    description: 'Thông tin về khóa học và cách học',
    questions: [
      {
        id: 'course-access',
        question: 'Làm sao để truy cập khóa học đã mua?',
        answer:
          'Sau khi mua khóa học, bạn cần kích hoạt khóa học cho tài khoản của mình hoặc tài khoản con. Sau đó có thể truy cập khóa học trong phần "Khóa học của tôi".'
      },
      {
        id: 'course-duration',
        question: 'Thời hạn sử dụng khóa học là bao lâu?',
        answer:
          'Thời hạn sử dụng mỗi khóa học có thể khác nhau, thông thường là 12 tháng kể từ ngày kích hoạt. Bạn có thể xem thời hạn cụ thể trong thông tin khóa học.'
      }
    ]
  },
  {
    id: 'payment',
    title: 'Thanh toán',
    description: 'Thông tin về phương thức thanh toán và hoàn tiền',
    questions: [
      {
        id: 'payment-methods',
        question: 'Có những phương thức thanh toán nào?',
        answer:
          'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng và các ví điện tử phổ biến.'
      },
      {
        id: 'refund-policy',
        question: 'Chính sách hoàn tiền như thế nào?',
        answer:
          'Bạn có thể yêu cầu hoàn tiền trong vòng 7 ngày kể từ ngày mua nếu chưa kích hoạt khóa học. Sau khi kích hoạt, khóa học không được hoàn tiền.'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Kỹ thuật',
    description: 'Hỗ trợ các vấn đề kỹ thuật',
    questions: [
      {
        id: 'system-requirements',
        question: 'Yêu cầu hệ thống là gì?',
        answer:
          'Bạn cần có kết nối internet ổn định và trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge). Đối với ứng dụng di động, yêu cầu iOS 12+ hoặc Android 8+.'
      },
      {
        id: 'video-issues',
        question: 'Không xem được video bài giảng?',
        answer:
          'Hãy kiểm tra kết nối internet, làm mới trang web, xóa cache trình duyệt hoặc thử đăng nhập lại. Nếu vẫn không được, vui lòng liên hệ hỗ trợ kỹ thuật.'
      }
    ]
  }
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('general')

  const filteredQuestions = faqCategories
    .find((c) => c.id === activeCategory)
    ?.questions.filter(
      (q) =>
        !searchQuery ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'general':
        return <HelpCircle className='h-5 w-5' />
      case 'courses':
        return <Lightbulb className='h-5 w-5' />
      case 'payment':
        return <CreditCard className='h-5 w-5' />
      case 'technical':
        return <Wrench className='h-5 w-5' />
      default:
        return null
    }
  }

  const stats = [
    {
      title: 'Câu hỏi thường gặp',
      value: '200+',
      description: 'Câu hỏi đã được giải đáp',
      icon: <HelpCircle className='h-5 w-5' />,
      trend: '+12 câu hỏi mới',
      trendUp: true,
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      title: 'Thời gian phản hồi',
      value: '< 30p',
      description: 'Thời gian phản hồi trung bình',
      icon: <Clock className='h-5 w-5' />,
      trend: 'Nhanh hơn 25%',
      trendUp: true,
      color: 'from-green-500/20 to-green-600/20'
    },
    {
      title: 'Người dùng hài lòng',
      value: '98%',
      description: 'Tỷ lệ hài lòng với câu trả lời',
      icon: <Users2 className='h-5 w-5' />,
      trend: '+2.1% so với tháng trước',
      trendUp: true,
      color: 'from-purple-500/20 to-purple-600/20'
    },
    {
      title: 'Chủ đề hỗ trợ',
      value: '12+',
      description: 'Danh mục câu hỏi',
      icon: <BookOpen className='h-5 w-5' />,
      trend: '4 chủ đề mới',
      trendUp: true,
      color: 'from-orange-500/20 to-orange-600/20'
    }
  ]

  return (
    <div className='min-h-screen bg-dot-pattern'>
      {/* Hero Section with new design */}
      <div className='relative bg-gradient-to-b from-background/80 to-background border-b backdrop-blur-sm'>
        <div className='absolute inset-0 bg-grid-pattern opacity-10' />
        <div className='container relative pt-32 pb-20'>
          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
            {stats.map((stat, index) => (
              <Card
                key={index}
                className='relative overflow-hidden border-none bg-gradient-to-br from-background to-background/80 hover:shadow-lg transition-all duration-300'
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10`} />
                <div className='absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-foreground/5 to-foreground/10' />
                <CardContent className='relative p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='p-2 rounded-lg bg-gradient-to-br from-background to-background/80 shadow-sm'>
                      {stat.icon}
                    </div>
                    <div className='flex items-center text-xs font-medium text-green-600 dark:text-green-400'>
                      {stat.trendUp ? '↑' : '↓'} {stat.trend}
                    </div>
                  </div>
                  <div className='space-y-1'>
                    <h3 className='font-semibold text-muted-foreground'>{stat.title}</h3>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-3xl font-bold tracking-tight'>{stat.value}</span>
                    </div>
                    <p className='text-sm text-muted-foreground'>{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='text-center space-y-8 mb-16'>
            <div className='space-y-4'>
              <h1 className='text-5xl font-bold tracking-tight bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent h-14'>
                Chúng tôi có thể giúp gì cho bạn?
              </h1>
              <p className='text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed'>
                Khám phá các câu hỏi thường gặp hoặc liên hệ trực tiếp với đội ngũ hỗ trợ của chúng tôi để được giải đáp
                nhanh nhất
              </p>
            </div>

            {/* Enhanced Search Box */}
            <div className='max-w-2xl mx-auto'>
              <div className='relative group'>
                <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-primary/30 blur-lg group-hover:blur-xl transition-all' />
                <div className='relative bg-card rounded-lg shadow-lg'>
                  <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                  <Input
                    placeholder='Nhập từ khóa để tìm kiếm câu hỏi...'
                    className='pl-12 h-14 text-base border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {searchQuery && (
                <p className='text-sm text-muted-foreground mt-3 animate-in fade-in-0 slide-in-from-top-1'>
                  {filteredQuestions?.length || 0} kết quả được tìm thấy cho &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Categories */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {faqCategories.map((category) => (
              <Card
                key={category.id}
                className={cn(
                  'group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-2',
                  activeCategory === category.id
                    ? 'border-primary bg-gradient-to-b from-primary/10 to-transparent'
                    : 'border-border hover:border-primary/50'
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                <div className='absolute inset-0 bg-gradient-to-br from-background to-background/80' />
                <div className='absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-primary/5 to-primary/10 transition-transform group-hover:scale-110' />

                <CardContent className='relative p-6 h-full'>
                  <div className='space-y-4'>
                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center'>
                      {getCategoryIcon(category.id)}
                    </div>

                    <div className='space-y-2'>
                      <h3 className='font-semibold tracking-tight text-lg'>{category.title}</h3>
                      <p className='text-sm text-muted-foreground line-clamp-2'>{category.description}</p>
                    </div>
                  </div>

                  {activeCategory === category.id && (
                    <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent' />
                  )}

                  <div className='absolute bottom-6 right-6 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                      <ChevronRight className='w-4 h-4 text-primary' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Content with new design */}
      <div className='container max-w-4xl py-16'>
        <Card className='border-none shadow-xl bg-gradient-to-b from-card to-card/95'>
          <CardHeader className='border-b pb-6'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center'>
                {getCategoryIcon(activeCategory)}
              </div>
              <div>
                <CardTitle className='text-2xl'>{faqCategories.find((c) => c.id === activeCategory)?.title}</CardTitle>
                <CardDescription className='text-base mt-1'>
                  {faqCategories.find((c) => c.id === activeCategory)?.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className='pt-6'>
            {filteredQuestions?.length === 0 ? (
              <div className='text-center py-16'>
                <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-muted/50 to-muted mx-auto flex items-center justify-center mb-6'>
                  <MessagesSquare className='w-10 h-10 text-muted-foreground' />
                </div>
                <h3 className='text-xl font-semibold mb-3'>Không tìm thấy kết quả</h3>
                <p className='text-muted-foreground max-w-sm mx-auto mb-8'>
                  Không tìm thấy câu hỏi nào phù hợp với từ khóa &quot;{searchQuery}&quot;. Vui lòng thử lại với từ khóa
                  khác hoặc liên hệ với chúng tôi.
                </p>
                <Button
                  variant='default'
                  size='lg'
                  className='bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary'
                >
                  <MessagesSquare className='w-4 h-4 mr-2' />
                  Liên hệ hỗ trợ
                </Button>
              </div>
            ) : (
              <Accordion type='single' collapsible className='w-full'>
                {filteredQuestions?.map((question, index) => (
                  <AccordionItem
                    key={question.id}
                    value={question.id}
                    className={cn(
                      'border-b-0 bg-gradient-to-r hover:from-primary/5 hover:to-transparent rounded-lg mb-2 transition-all',
                      index === 0 && 'bg-primary/5'
                    )}
                  >
                    <AccordionTrigger className='text-left hover:no-underline px-4 py-4 [&[data-state=open]>div]:text-primary'>
                      <div className='flex items-center gap-3'>
                        <span className='text-sm font-medium px-2 py-1 rounded-md bg-primary/10 text-primary min-w-[24px]'>
                          {index + 1}
                        </span>
                        <span className='font-medium'>{question.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='text-muted-foreground px-4 pb-4'>
                      <div className='pl-10'>{question.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
