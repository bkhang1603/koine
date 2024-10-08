import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}

export default PublicLayout
