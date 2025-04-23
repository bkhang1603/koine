import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/header'
import SupportButton from '@/components/support/SupportButton'
import ChatSupportButton from '@/components/support/ChatSupportButton'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
      <ChatSupportButton />
      <SupportButton />
    </main>
  )
}

export default PublicLayout
