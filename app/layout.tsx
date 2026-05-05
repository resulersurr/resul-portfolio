import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resul Ersürer - Backend Developer & System Builder',
  description: 'İşletmelerin özel yazılım çözümleri ile operasyonları otomatikleştirmesine ve büyümesine yardımcı oluyorum. ASP.NET Core, Web API, Admin Panel Sistemleri, CRM & Otomasyon uzmanlığı.',
  keywords: 'Backend Developer, ASP.NET Core, Web API, Admin Panel, CRM, Otomasyon, QR Menü, Rezervasyon Sistemleri',
  openGraph: {
    title: 'Resul Ersürer - Backend Developer & System Builder',
    description: 'İşletmelerin özel yazılım çözümleri ile operasyonları otomatikleştirmesine ve büyümesine yardımcı oluyorum.',
    type: 'website',
    locale: 'tr_TR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
