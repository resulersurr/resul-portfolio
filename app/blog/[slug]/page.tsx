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
      canonical: `https://ersurer.com/blog/${params.slug}`
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: 'article',
      url: `https://ersurer.com/blog/${params.slug}`,
      publishedTime: blog.date,
      authors: ['Resul Ersürer']
    }
  }
}

const components = {
  h1: (props: any) => <h1 className="text-4xl font-black text-white mt-12 mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold text-white mt-10 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
  p: (props: any) => <p className="text-gray-300 leading-relaxed text-lg mb-6" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2" {...props} />,
  li: (props: any) => <li className="text-gray-300" {...props} />,
  a: (props: any) => <a className="text-indigo-400 hover:text-indigo-300 underline" {...props} />,
  pre: (props: any) => <pre className="bg-slate-900 border border-white/10 rounded-xl p-4 overflow-x-auto mb-6" {...props} />,
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
          "url": "https://ersurer.com"
        },
        "datePublished": blog.date,
        "publisher": {
          "@type": "Organization",
          "name": "Resul Ersürer Product Studio",
          "logo": "https://ersurer.com/images/logo2.png"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://ersurer.com/blog/${params.slug}`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://ersurer.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://ersurer.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": blog.title,
            "item": `https://ersurer.com/blog/${params.slug}`
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
      
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-12 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Blog&apos;a Dön
        </Link>
        
        <header className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
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
        <aside className="mt-20 p-8 rounded-3xl mesh-gradient relative overflow-hidden border border-white/10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ürününüzü Hızlıca Yayına Alalım</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Hazır Next.js, Vercel ve AI otomasyon altyapılarıyla işletmenize uygun SaaS MVP, admin panel veya web sistemi kuralım.
          </p>
          <Link href="/#contact" className="inline-flex px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform">
            Projemi Birlikte Planlayalım
          </Link>
        </aside>
      </article>

      <Footer />
    </main>
  )
}
