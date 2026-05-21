import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const siteTitle = 'Resul Ersürer | Next.js, Vercel, SaaS MVP ve AI Otomasyon'
const siteDescription =
  'İşletmeler için Next.js, Vercel ve AI destekli SaaS MVP’leri, admin panelleri, web siteleri ve otomasyon sistemleri geliştiriyorum.'
const ogTitle = 'Next.js, Vercel ve AI Destekli SaaS MVP Geliştirme'
const ogDescription =
  'İşletmenize özel hızlı yayına alınabilen SaaS MVP, admin panel, web sitesi ve AI otomasyon sistemleri.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ersurer.com'),
  title: {
    default: siteTitle,
    template: '%s | Resul Ersürer',
  },
  description: siteDescription,
  keywords: [
    'Next.js developer',
    'Vercel developer',
    'SaaS MVP',
    'AI automation',
    'admin panel development',
    'business website',
    'TypeScript developer',
    'Prisma',
    'PostgreSQL',
    'Tailwind CSS',
    'Türkiye web geliştirici',
  ],
  authors: [{ name: 'Resul Ersürer', url: 'https://www.ersurer.com' }],
  creator: 'Resul Ersürer',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo2.png',
  },
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: 'https://www.ersurer.com',
    siteName: 'Resul Ersürer',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/images/logo2.png',
        width: 1200,
        height: 630,
        alt: 'Resul Ersürer - Next.js, Vercel, SaaS MVP ve AI Otomasyon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: ogTitle,
    description: ogDescription,
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
