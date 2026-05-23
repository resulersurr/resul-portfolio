import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { getBlogBySlug, getBlogSlugs } from '@/lib/mdx'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Metadata } from 'next'
import Script from 'next/script'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug)
  
  if (!blog) {
    return { title: 'Blog Not Found' }
  }

  return {
    title: `${blog.title} | Resul Ersürer Blog`,
    description: blog.description,
    alternates: {
      canonical: `https://www.ersurer.com/blog/${params.slug}`
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      url: `https://www.ersurer.com/blog/${params.slug}`,
      publishedTime: blog.date,
      authors: ['Resul Ersürer'],
      images: [
        {
          url: '/images/logo2.png',
          width: 1200,
          height: 630,
          alt: `${blog.title} - Resul Ersürer Blog`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: ['/images/logo2.png'],
    }
  }
}

const components = {
  h1: (props: any) => <h1 className="text-4xl sm:text-5xl font-black text-white mt-14 mb-7 leading-tight" {...props} />,
  h2: (props: any) => <h2 className="text-3xl sm:text-4xl font-bold text-white mt-12 mb-5 leading-tight" {...props} />,
  h3: (props: any) => <h3 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-5 leading-tight" {...props} />,
  p: (props: any) => <p className="text-gray-300 leading-[1.85] text-lg sm:text-xl mb-7" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 text-gray-300 mb-8 space-y-3 text-lg sm:text-xl leading-[1.75]" {...props} />,
  li: (props: any) => <li className="text-gray-300" {...props} />,
  a: (props: any) => <a className="text-indigo-400 hover:text-indigo-300 underline" {...props} />,
  pre: (props: any) => <pre className="bg-slate-900 border border-white/10 rounded-xl p-6 overflow-x-auto mb-8" {...props} />,
  code: (props: any) => <code className="bg-slate-900 text-indigo-300 px-1.5 py-0.5 rounded-md font-mono text-sm" {...props} />,
  strong: (props: any) => <strong className="font-bold text-white" {...props} />
}

export default function BlogPost({ params }: Props) {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": blog.title,
        "description": blog.description,
        "author": {
          "@type": "Person",
          "name": "Resul Ersürer",
          "url": "https://www.ersurer.com"
        },
        "datePublished": blog.date,
        "publisher": {
          "@type": "Organization",
          "name": "Resul Ersürer Product Studio",
          "logo": "https://ersurer.com/images/logo2.png"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://www.ersurer.com/blog/${params.slug}`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ersurer.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.ersurer.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blog.title,
            "item": `https://www.ersurer.com/blog/${params.slug}`
          }
        ]
      }
    ]
  }

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navigation />
      
      <article className="pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-36 px-5 sm:px-8 lg:px-10 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-12 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Blog&apos;a Dön
        </Link>
        
        <header className="mb-14 lg:mb-16 border-b border-white/10 pb-14 lg:pb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-7 tracking-tight leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readingTime}</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-400">
              <span className="w-6 h-px bg-indigo-400/50" />
              Resul Ersürer
            </div>
          </div>
        </header>

        {/* Using semantic HTML, MDXRemote will map standard markdown to our styled Tailwind components */}
        <div className="prose-container">
          <MDXRemote source={blog.content} components={components} />
        </div>
        
        {/* Smart Internal Linking CTA */}
        <aside className="mt-24 p-8 sm:p-10 lg:p-12 rounded-3xl mesh-gradient relative overflow-hidden border border-white/10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5">Ürününüzü Hızlıca Yayına Alalım</h3>
          <p className="text-gray-300 text-lg leading-[1.75] mb-8 max-w-xl mx-auto">
            Hazır Next.js, Vercel ve AI otomasyon altyapılarıyla işletmenize uygun SaaS MVP, admin panel veya web sistemi kuralım.
          </p>
          <div className="mb-7 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <Link href="/services/saas-mvp-gelistirme" className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-white hover:border-indigo-300/60 transition-colors">
              SaaS MVP Geliştirme
            </Link>
            <Link href="/blog/nextjs-ile-isletme-web-sitesi-neden-daha-hizlidir" className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-white hover:border-indigo-300/60 transition-colors">
              İlgili Blog
            </Link>
            <Link href="/sektorler/kucuk-isletme-web-sitesi" className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-white hover:border-indigo-300/60 transition-colors">
              Küçük İşletme Çözümü
            </Link>
          </div>
          <Link href="/#contact" className="inline-flex px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform">
            Projemi Birlikte Planlayalım
          </Link>
        </aside>
      </article>

      <Footer />
    </main>
  )
}
