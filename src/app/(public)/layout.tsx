import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  )
}

export default PublicLayout
