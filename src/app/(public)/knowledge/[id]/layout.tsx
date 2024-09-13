import Information from '@/app/(public)/components/information'
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
