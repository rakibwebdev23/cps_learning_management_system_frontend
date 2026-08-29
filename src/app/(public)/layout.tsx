import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24">{children}</main>
      <Footer />
    </div>
  )
}
