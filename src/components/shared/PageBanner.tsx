import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

type PageBannerProps = {
  icon: LucideIcon
  badge: string
  title: string
  highlightText: string
  description: string
  gradient?: {
    background: string
    blur1: string
    blur2: string
  }
}

export const PageBanner = ({
  icon: Icon,
  badge,
  title,
  highlightText,
  description,
  gradient = {
    background: 'from-amber-100 via-orange-100 to-rose-100',
    blur1: 'bg-amber-200/50',
    blur2: 'bg-rose-200/50'
  }
}: PageBannerProps) => {
  return (
    <div className='relative overflow-hidden rounded-3xl mb-12'>
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient.background}`}></div>

      {/* Soft Decorative Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-full h-full bg-white/40'></div>
        <div
          className={`absolute -top-20 -left-20 w-72 h-72 ${gradient.blur1} rounded-full mix-blend-multiply filter blur-3xl`}
        ></div>
        <div
          className={`absolute -bottom-20 -right-20 w-72 h-72 ${gradient.blur2} rounded-full mix-blend-multiply filter blur-3xl`}
        ></div>
      </div>

      <div className='relative px-8 py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='inline-flex items-center bg-white/70 rounded-full px-4 py-2 mb-6 backdrop-blur-sm shadow-sm'
          >
            <Icon className='w-5 h-5 text-amber-400 mr-2' />
            <span className='text-slate-700 font-medium'>{badge}</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-4xl md:text-5xl font-bold text-slate-800 mb-6'
          >
            {title}
            <br />
            <span className='text-amber-500'>{highlightText}</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='text-lg text-slate-600 max-w-2xl mx-auto'
          >
            {description}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
