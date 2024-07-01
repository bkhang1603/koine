import Navbar from '@/components/layout/navbar'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}

export default PublicLayout
