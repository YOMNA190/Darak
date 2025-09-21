import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'دارك - الجودة التي تليق بدارك',
  description: 'شركة دارك للتشطيبات والديكور الفاخر في المملكة العربية السعودية. نقدم خدمات الرخام والسيراميك، الجبس بورد، والدهانات بأعلى معايير الجودة.',
  keywords: 'تشطيبات, ديكور, رخام, سيراميك, جبس بورد, دهانات, السعودية',
  authors: [{ name: 'Darak Company' }],
  openGraph: {
    title: 'دارك - الجودة التي تليق بدارك',
    description: 'شركة دارك للتشطيبات والديكور الفاخر في المملكة العربية السعودية',
    type: 'website',
    locale: 'ar_SA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-body bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

