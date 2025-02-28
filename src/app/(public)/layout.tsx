import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/header'

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
