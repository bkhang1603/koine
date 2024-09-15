import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default PublicLayout
