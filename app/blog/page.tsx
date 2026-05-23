import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogs } from '@/lib/mdx'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js, SaaS MVP ve AI Otomasyon Notları',
  description:
    'İşletmeler için hızlı yayına alınabilen web uygulamaları, SaaS MVP’leri, Vercel deployment süreçleri ve AI destekli otomasyon sistemleri üzerine pratik içerikler.',
  alternates: {
    canonical: 'https://www.ersurer.com/blog',
  },
  openGraph: {
    title: 'Next.js, SaaS MVP ve AI Otomasyon Notları',
    description:
      'İşletmeler için hızlı yayına alınabilen web uygulamaları, SaaS MVP’leri, Vercel deployment süreçleri ve AI destekli otomasyon sistemleri üzerine pratik içerikler.',
    type: 'website',
    url: 'https://www.ersurer.com/blog',
    images: [
      {
        url: '/images/logo2.png',
        width: 1200,
        height: 630,
        alt: 'Resul Ersürer Blog - Next.js, SaaS MVP ve AI Otomasyon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js, SaaS MVP ve AI Otomasyon Notları',
    description:
      'Next.js, Vercel, SaaS MVP ve AI otomasyon üzerine işletmeler için uygulanabilir yazılım notları.',
    images: ['/images/logo2.png'],
  },
}

const categories = [
  'Next.js',
  'Vercel',
  'SaaS MVP',
  'AI Otomasyon',
  'İşletme Web Siteleri',
  'Admin Paneller',
  'Startup ve MVP Geliştirme',
  'Teknik Arşiv',
]

const categoryBySlug = [
  { match: 'nextjs', label: 'Next.js' },
  { match: 'vercel', label: 'Vercel' },
  { match: 'saas-mvp', label: 'SaaS MVP' },
  { match: 'ai-otomasyon', label: 'AI Otomasyon' },
  { match: 'isletme-web-sitesi', label: 'İşletme Web Siteleri' },
  { match: 'admin-panel', label: 'Admin Paneller' },
  { match: 'startup', label: 'Startup ve MVP Geliştirme' },
  { match: 'aspnet', label: 'Teknik Arşiv' },
  { match: 'clean', label: 'Teknik Arşiv' },
  { match: 'microservices', label: 'Teknik Arşiv' },
  { match: 'backend', label: 'Teknik Arşiv' },
  { match: 'security', label: 'Teknik Arşiv' },
  { match: 'api', label: 'Teknik Arşiv' },
]

function getCategory(slug: string) {
  return categoryBySlug.find((item) => slug.includes(item.match))?.label || 'Next.js'
}

function getPriority(slug: string) {
  const category = getCategory(slug)
  return category === 'Teknik Arşiv' ? 1 : 0
}

export default function BlogIndex() {
  const blogs = getAllBlogs().sort((a, b) => {
    const priorityDiff = getPriority(a.slug) - getPriority(b.slug)
    if (priorityDiff !== 0) return priorityDiff
    return a.date > b.date ? -1 : 1
  })

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Navigation />

      <article className="pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-36 px-5 sm:px-8 lg:px-10 max-w-6xl mx-auto">
        <header className="mb-16 lg:mb-20">
          <p className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Yazılım Notları</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-7 tracking-tight leading-tight">
            Next.js, SaaS MVP ve <span className="gradient-text">AI Otomasyon Notları</span>
          </h1>
          <p className="text-xl sm:text-[1.35rem] text-gray-400 leading-[1.75] font-light max-w-4xl">
            İşletmeler için hızlı yayına alınabilen web uygulamaları, SaaS MVP’leri, Vercel deployment süreçleri ve AI destekli otomasyon sistemleri üzerine pratik içerikler.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 sm:gap-4 mb-14 lg:mb-16" aria-label="Blog kategorileri">
          {categories.map((category) => (
            <span
              key={category}
            className={`rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-widest ${
                category === 'Teknik Arşiv'
                  ? 'border-white/10 bg-white/5 text-gray-400'
                  : 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300'
              }`}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="space-y-8 lg:space-y-10">
          {blogs.map((blog) => {
            const category = getCategory(blog.slug)

            return (
              <Link href={`/blog/${blog.slug}`} key={blog.slug} className="block group">
                <article className="p-8 sm:p-10 lg:p-12 rounded-3xl glass border border-white/5 group-hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${
                        category === 'Teknik Arşiv'
                          ? 'bg-white/5 border-white/10 text-gray-400'
                          : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                      }`}
                    >
                      {category}
                    </span>
                    <time dateTime={blog.date}>
                      {new Date(blog.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span aria-hidden="true">•</span>
                    <span>{blog.readingTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors leading-tight">
                    {blog.title}
                  </h2>

                  <p className="text-gray-400 text-lg leading-[1.75]">
                    {blog.description}
                  </p>
                </article>
              </Link>
            )
          })}
        </div>
      </article>

      <Footer />
    </main>
  )
}
