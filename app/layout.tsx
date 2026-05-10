import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ersurer.com'),
  title: {
    default: 'Resul Ersürer | Enterprise Software Architect & Backend Specialist',
    template: '%s | Resul Ersürer'
  },
  description: 'Kurumsal düzeyde ölçeklenebilir backend sistemleri, Web API ve otomasyon çözümleri. ASP.NET Core & Enterprise Architecture uzmanlığı.',
  keywords: ['Backend Architect', 'ASP.NET Core', 'Enterprise Software', 'Web API', 'System Design', 'C#', 'Microservices', 'Software Architecture', 'Node.js'],
  authors: [{ name: 'Resul Ersürer', url: 'https://www.ersurer.com' }],
  creator: 'Resul Ersürer',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo2.png',
  },
  openGraph: {
    title: 'Resul Ersürer | Enterprise Software Architect',
    description: 'Kurumsal düzeyde ölçeklenebilir backend sistemleri ve mimari çözümler.',
    url: 'https://www.ersurer.com',
    siteName: 'Resul Ersürer Portfolio',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/images/logo2.png',
        width: 1200,
        height: 630,
        alt: 'Resul Ersürer - Enterprise Software Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resul Ersürer | Enterprise Software Architect',
    description: 'Kurumsal düzeyde ölçeklenebilir backend sistemleri ve mimari çözümler.',
    images: ['/images/logo2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
