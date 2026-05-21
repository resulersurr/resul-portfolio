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
    default: 'Resul Ersürer | Next.js, SaaS MVP ve AI Otomasyon Çözümleri',
    template: '%s | Resul Ersürer',
  },
  description: 'Next.js, Vercel ve AI otomasyonlarla işletmeler için hızlı kurulabilen SaaS MVP’leri, web sistemleri ve dijital ürün altyapıları geliştiriyorum.',
  keywords: ['Next.js', 'Vercel', 'SaaS MVP', 'AI otomasyon', 'web sitesi', 'admin panel', 'dijital ürünler', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
  authors: [{ name: 'Resul Ersürer', url: 'https://www.ersurer.com' }],
  creator: 'Resul Ersürer',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo2.png',
  },
  openGraph: {
    title: 'Resul Ersürer | Next.js, SaaS MVP ve AI Otomasyon Çözümleri',
    description: 'Next.js, Vercel ve AI otomasyonlarla işletmeler için hızlı kurulabilen SaaS MVP’leri, web sistemleri ve dijital ürün altyapıları geliştiriyorum.',
    url: 'https://www.ersurer.com',
    siteName: 'Resul Ersürer',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: '/images/logo2.png',
        width: 1200,
        height: 630,
        alt: 'Resul Ersürer - Next.js SaaS Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resul Ersürer | Next.js, SaaS MVP ve AI Otomasyon Çözümleri',
    description: 'Next.js, Vercel ve AI otomasyonlarla işletmeler için hızlı kurulabilen SaaS MVP’leri, web sistemleri ve dijital ürün altyapıları geliştiriyorum.',
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
