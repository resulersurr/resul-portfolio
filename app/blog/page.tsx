import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getAllBlogs } from '@/lib/mdx'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Technical Insights & Architecture',
  description: 'Enterprise architecture, backend development, and performance optimization articles by Resul Ersürer.',
  alternates: {
    canonical: 'https://ersurer.com/blog'
  }
}

export default function BlogIndex() {
  const blogs = getAllBlogs()

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Navigation />
      
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
            Technical <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            Derinlemesine teknik makaleler, yazılım mimarisi, backend geliştirme ve performans optimizasyonu.
          </p>
        </header>

        <div className="space-y-8">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="block group">
              <article className="p-8 rounded-3xl glass border border-white/5 group-hover:border-indigo-500/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <time dateTime={blog.date}>{new Date(blog.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  <span>•</span>
                  <span>{blog.readingTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {blog.title}
                </h2>
                
                <p className="text-gray-400 leading-relaxed">
                  {blog.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  )
}
