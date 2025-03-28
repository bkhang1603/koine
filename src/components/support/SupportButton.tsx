'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Phone, MessagesSquare, Mail, Ticket, X, Headphones, MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

// Define form validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Họ tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }),
  message: z.string().min(10, { message: 'Nội dung cần ít nhất 10 ký tự' })
})

type FormValues = z.infer<typeof formSchema>

const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTicketFormOpen, setIsTicketFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  const toggleSupportOptions = () => {
    setIsOpen(!isOpen)
    if (isTicketFormOpen) setIsTicketFormOpen(false)
  }

  const toggleTicketForm = () => {
    setIsTicketFormOpen(!isTicketFormOpen)
    if (isTicketFormOpen) {
      form.reset()
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
      // Here you would send the data to your API
      console.log('Form data:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success handling
      alert('Yêu cầu hỗ trợ đã được gửi thành công!')
      form.reset()
      setIsTicketFormOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const supportOptions = [
    {
      icon: <MessageCircle className='w-5 h-5' />,
      label: 'Zalo',
      href: 'https://zalo.me/0934600600',
      color: 'bg-blue-500'
    },
    {
      icon: <Phone className='w-4 h-4' />,
      label: 'Hotline',
      href: 'tel:+84934600600',
      color: 'bg-green-500'
    },
    {
      icon: <MessagesSquare className='w-5 h-5' />,
      label: 'Facebook',
      href: 'https://m.me/kle1603',
      color: 'bg-[#0084FF]'
    },
    {
      icon: <Mail className='w-5 h-5' />,
      label: 'Email',
      href: 'mailto:bkhang160303@gmail.com',
      color: 'bg-red-500'
    },
    {
      icon: <Ticket className='w-5 h-5' />,
      label: 'Hỗ trợ',
      action: toggleTicketForm,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className='fixed bottom-5 right-5 z-50'>
      {/* Ticket Form - Increased z-index and repositioned */}
      <AnimatePresence>
        {isTicketFormOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className='absolute bottom-20 right-0 mb-2 z-[60]'
            style={{ width: '320px' }}
          >
            <Card>
              <CardHeader className='pb-3'>
                <div className='flex justify-between items-center'>
                  <CardTitle className='text-lg font-medium'>Gửi yêu cầu hỗ trợ</CardTitle>
                  <Button variant='ghost' size='icon' onClick={toggleTicketForm} className='h-8 w-8'>
                    <X size={18} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel>Họ tên</FormLabel>
                          <FormControl>
                            <Input placeholder='Họ tên của bạn' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type='email' placeholder='Email' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input type='tel' placeholder='Số điện thoại' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='message'
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel>Nội dung</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Nội dung cần hỗ trợ' rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className='w-full' type='submit' disabled={isSubmitting}>
                      {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='absolute bottom-16 right-0 space-y-2 z-50'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                {option.action ? (
                  <button
                    onClick={option.action}
                    className={`flex items-center justify-between w-36 px-3 py-2 rounded-full ${option.color} text-white shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <span>{option.icon}</span>
                    <span className='text-sm font-medium flex-1 text-center'>{option.label}</span>
                  </button>
                ) : (
                  <Link
                    href={option.href || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`flex items-center justify-between w-36 px-3 py-2 rounded-full ${option.color} text-white shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <span>{option.icon}</span>
                    <span className='text-sm font-medium flex-1 text-center'>{option.label}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button with Always-on Pulse Effect using Framer Motion */}
      <div className='relative'>
        {/* Pulse animations using Framer Motion */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <motion.span
            className='absolute inset-0 rounded-full bg-blue-400 opacity-30'
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.15, 0.3]
            }}
            transition={{
              duration: 3,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
              repeatType: 'loop' as const
            }}
          />
          <motion.span
            className='absolute inset-0 rounded-full bg-blue-500 opacity-20'
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.1, 0.2]
            }}
            transition={{
              duration: 3,
              ease: [0.4, 0, 0.6, 1],
              repeat: Infinity,
              repeatType: 'loop' as const,
              delay: 1
            }}
          />
        </div>

        <motion.button
          onClick={toggleSupportOptions}
          className='relative bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow z-10'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X className='w-6 h-6' /> : <Headphones className='w-6 h-6' />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}

export default SupportButton
