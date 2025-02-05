import Information from '@/components/public/parent/home/information'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <Information />
    </main>
  )
}

export default layout
