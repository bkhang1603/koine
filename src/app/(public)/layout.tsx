import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/header'
import SupportButton from '@/components/support/SupportButton'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
      <SupportButton />
    </main>
  )
}

export default PublicLayout
