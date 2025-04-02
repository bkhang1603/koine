'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ShoppingCart, Package, CreditCard, Truck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import configRoute from '@/config/route'

const benefits = [
  {
    icon: <ShoppingCart className='w-6 h-6' />,
    title: 'Mua sắm linh hoạt',
    description: 'Kết hợp mua khóa học và sản phẩm trong cùng một đơn hàng'
  },
  {
    icon: <Package className='w-6 h-6' />,
    title: 'Đa dạng sản phẩm',
    description: 'Từ khóa học online đến tài liệu học tập, dụng cụ học tập'
  },
  {
    icon: <CreditCard className='w-6 h-6' />,
    title: 'Thanh toán đơn giản',
    description: 'Nhiều phương thức thanh toán, tích hợp ví điện tử'
  },
  {
    icon: <Truck className='w-6 h-6' />,
    title: 'Giao hàng nhanh chóng',
    description: 'Giao hàng tận nơi cho sản phẩm vật lý'
  }
]

export default function FlexibleShopping() {
  return (
    <section className='relative py-24 overflow-hidden bg-muted/30'>
      {/* Background Elements */}
      {/* <div className='absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background' /> */}
      {/* <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]' /> */}

      <div className='container relative'>
        {/* Header */}
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold mb-6'>
              Mua sắm linh hoạt
              <span className='block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2'>
                học tập hiệu quả
              </span>
            </h2>
            <p className='text-muted-foreground text-lg'>
              Kết hợp mua khóa học và sản phẩm trong cùng một đơn hàng. Tận hưởng trải nghiệm mua sắm tiện lợi và hiệu
              quả.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className='group relative overflow-hidden border-none bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm
                hover:from-white/10 hover:to-white/20 transition-all duration-300'
              >
                <div className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='relative'>
                      <div
                        className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 
                        flex items-center justify-center group-hover:scale-110 transition-transform duration-300'
                      >
                        <div className='text-primary'>{benefit.icon}</div>
                      </div>
                      {/* Decorative Elements */}
                      <div
                        className='absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl'
                      />
                    </div>
                    <div>
                      <h3 className='font-semibold text-lg mb-2'>{benefit.title}</h3>
                      <p className='text-muted-foreground text-sm'>{benefit.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              1000+
            </div>
            <div className='text-muted-foreground'>Đơn hàng kết hợp</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              50+
            </div>
            <div className='text-muted-foreground'>Sản phẩm đa dạng</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              5+
            </div>
            <div className='text-muted-foreground'>Phương thức thanh toán</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='text-center'
          >
            <div className='text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2'>
              24h
            </div>
            <div className='text-muted-foreground'>Giao hàng nhanh chóng</div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center flex items-center justify-center gap-4'
        >
          <Button asChild size='lg' className='h-12 px-6 text-base rounded-full'>
            <Link href={configRoute.customCourse}>Xem khóa học</Link>
          </Button>

          <Button asChild size='lg' variant='outline' className='h-12 px-6 text-base rounded-full'>
            <Link href={configRoute.product}>Xem sản phẩm</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
