'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Mail, CheckCircle2, Star } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

export default function Information() {
  const [email, setEmail] = useState('')

  const handleSubmit = () => {
    if (!email) {
      toast({
        description: 'Vui lòng nhập email'
      })
      return
    }
    toast({
      description: 'Bạn đã đăng ký thành công'
    })
  }

  return (
    <section className='relative py-24 overflow-hidden'>
      <div className='container relative'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='max-w-3xl mx-auto text-center'
        >
          <span className='bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium'>
            Thông tin mới nhất
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mt-6'>
            Đừng bỏ lỡ những
            <span className='block mt-2 bg-gradient-to-r from-[#FF0059] via-[#FF597D] to-[#2945DE] text-transparent bg-clip-text h-14'>
              thông tin hữu ích
            </span>
          </h2>
          <p className='mt-4 text-muted-foreground text-lg max-w-2xl mx-auto'>
            Đăng ký nhận bản tin để cập nhật những thông tin mới nhất về giáo dục giới tính và các khóa học bổ ích
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className='mt-12 relative'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl blur-xl' />
            <div className='relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100'>
              <div className='flex flex-col sm:flex-row gap-4 max-w-xl mx-auto'>
                <div className='flex-1 relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                  <Input
                    type='email'
                    placeholder='Nhập email của bạn'
                    className='pl-10 h-12 bg-white/50'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button size='lg' className='h-12 px-8 group' onClick={handleSubmit}>
                  Đăng ký ngay
                  <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                </Button>
              </div>

              <div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-primary' />
                  <span>Cập nhật hàng tuần</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-primary' />
                  <span>Nội dung chất lượng</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle2 className='w-4 h-4 text-primary' />
                  <span>Hoàn toàn miễn phí</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Stars - Repositioned */}
        <div className='absolute left-0 top-1/3 animate-pulse'>
          <Star className='w-8 h-8 text-primary/40' />
        </div>
        <div className='absolute left-1/4 bottom-10 animate-pulse delay-300'>
          <Star className='w-6 h-6 text-secondary/40' />
        </div>
        <div className='absolute right-1/4 top-10 animate-pulse delay-150'>
          <Star className='w-5 h-5 text-primary/40' />
        </div>
        <div className='absolute right-0 bottom-1/3 animate-pulse delay-500'>
          <Star className='w-7 h-7 text-secondary/40' />
        </div>
      </div>
    </section>
  )
}
