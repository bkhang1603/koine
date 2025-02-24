import KidHeader from '@/components/layout/kid-header'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <KidHeader />
      <div className='container pt-[60px] md:pt-[100px]'>{children}</div>
    </main>
  )
}

export default Layout
