'use client'

import { motion } from 'framer-motion'

export const AnimatedBackground = () => (
  <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0]
      }}
      transition={{ duration: 20, repeat: Infinity }}
      className='absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full mix-blend-multiply filter blur-3xl'
    />
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, -60, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, delay: 1 }}
      className='absolute top-40 -right-20 w-80 h-80 bg-gradient-to-br from-yellow-100/30 to-orange-100/30 rounded-full mix-blend-multiply filter blur-3xl'
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, 45, 0]
      }}
      transition={{ duration: 18, repeat: Infinity, delay: 2 }}
      className='absolute -bottom-20 left-40 w-88 h-88 bg-gradient-to-br from-blue-100/30 to-cyan-100/30 rounded-full mix-blend-multiply filter blur-3xl'
    />
  </div>
)
