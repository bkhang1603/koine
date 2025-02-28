'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BackgroundDecoration() {
  return (
    <div className='fixed inset-0 pointer-events-none overflow-hidden'>
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className='absolute top-[10%] right-[15%] w-[30rem] h-[30rem] 
        bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl'
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.1, 0.2],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className='absolute bottom-[20%] left-[10%] w-[25rem] h-[25rem] 
        bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-full blur-3xl'
      />

      {/* Floating Stars */}
      <div className='absolute inset-0'>
        {/* Large Stars */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute top-[20%] left-[15%]'
        >
          <Star className='w-8 h-8 text-primary/20' fill='currentColor' />
        </motion.div>
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className='absolute bottom-32 right-[10%]'
        >
          <Star className='w-10 h-10 text-secondary/20' fill='currentColor' />
        </motion.div>

        {/* Medium Stars */}
        <motion.div
          animate={{
            x: [-5, 5, -5],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute top-1/3 right-[25%]'
        >
          <Star className='w-6 h-6 text-primary/15' fill='currentColor' />
        </motion.div>

        {/* Small Stars */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute top-1/2 left-[40%]'
        >
          <Star className='w-4 h-4 text-primary/10' fill='currentColor' />
        </motion.div>
      </div>

      {/* Subtle Grid */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20' />
    </div>
  )
}
