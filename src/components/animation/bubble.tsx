'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // Create initial bubbles
    const initialBubbles = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random starting position (%)
      y: Math.random() * 100,
      size: Math.random() * 60 + 20, // Random size between 20-80px
      duration: Math.random() * 20 + 10, // Random duration between 10-30s
      delay: Math.random() * -20 // Random start time
    }))
    setBubbles(initialBubbles)
  }, [])

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className='absolute rounded-full bg-gradient-to-br from-blue-100/50 to-pink-100/50'
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`
          }}
          animate={{
            x: [
              0,
              Math.random() * 200 - 100, // Random movement between -100px and 100px
              Math.random() * 200 - 100,
              0
            ],
            y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}
