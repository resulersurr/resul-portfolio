import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, CheckCircle, Activity, Layout, Terminal, Code2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import Script from 'next/script'

type Props = {
  params: { id: string }
}

// In a real scenario, this would come from the database (e.g. Prisma)
const mockCaseStudies: Record<string, any> = {
  '1': { // fallback for demo purposes. DB fetch is typically preferred
    title: 'Enterprise CRM Migration & Architecture',
    description: 'A complete overhaul of a legacy CRM system using ASP.NET Core Microservices.',
    problem: 'Mevcut CRM altyapısı monolitik bir yapıda olup, günde 1 milyon üzeri isteği karşılamakta zorlanıyordu. API yanıt süreleri ortalama 2.5 saniyeye kadar çıkıyordu.',
    solution: 'CQRS ve Event-Driven Architecture kullanılarak sistem mikroservislere bölündü. RabbitMQ ile asenkron işlemler yönetildi ve Redis kullanılarak response süresi optimize edildi.',
    architecture: 'Clean Architecture, CQRS (MediatR), Domain-Driven Design (DDD)',
    performanceMetrics: [
      { label: 'API Response Time', before: '2.5s', after: '45ms' },
      { label: 'Uptime', before: '98.5%', after: '99.99%' },
      { label: 'Server Costs', before: '$2000/mo', after: '$850/mo' }
    ],
    techStack: ['ASP.NET Core', 'SQL Server', 'Redis', 'RabbitMQ', 'Next.js', 'Docker', 'Azure'],
    businessResult: 'Sistem 10 kat daha hızlı çalışmaya başladı, altyapı maliyetleri %50 azaldı ve geliştirme süreçlerindeki darboğazlar ortadan kalktı.',
    github: 'https://github.com/resulersurer',
    link: '#'
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // If we had Prisma, we'd fetch the title. For now, generic fallback
  return {
    title: `Case Study | Enterprise Solutions`,
    description: `Detaylı vaka analizi ve mimari çözümler.`,
    alternates: {
      canonical: `https://ersurer.com/portfolio/${params.id}`
    }
  }
}

export default async function CaseStudyPage({ params }: Props) {
  // Mock data usage or fetching from `/api/projects/[id]`
  // Using mock for static demonstration as requested by constraints
  const project = mockCaseStudies[params.id] || mockCaseStudies['1']

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": "Resul Ersürer",
      "url": "https://ersurer.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Resul Ersürer Consulting",
      "logo": "https://ersurer.com/images/logo2.png"
    }
  }

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Script
        id="casestudy-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navigation />
      
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/#portfolio" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-12 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Portfolyoya Dön
        </Link>
        
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Vaka Analizi (Case Study)
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
            {project.description}
          </p>

          <div className="flex items-center gap-4 mt-8">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform text-sm">
                Canlı Proje <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 glass border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors text-sm">
                Kaynak Kod <Github className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            <section className="p-8 rounded-3xl glass border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-red-400" /> Problem
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {project.problem}
              </p>
            </section>

            <section className="p-8 rounded-3xl glass border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Layout className="w-32 h-32 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                <Terminal className="w-6 h-6 text-indigo-400" /> Mimari ve Çözüm
              </h2>
              <p className="text-gray-300 leading-relaxed relative z-10">
                {project.solution}
              </p>
              <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-white/5 relative z-10">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-2">Mimari Yaklaşım</span>
                <span className="text-white font-medium">{project.architecture}</span>
              </div>
            </section>

            <section className="p-8 rounded-3xl gradient-bg shadow-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400" /> İş Sonuçları
              </h2>
              <p className="text-white/90 leading-relaxed font-medium">
                {project.businessResult}
              </p>
            </section>

          </div>

          {/* Sidebar Area */}
          <aside className="space-y-8">
            <div className="p-8 rounded-3xl glass border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" /> Performans Metrikleri
              </h3>
              <div className="space-y-6">
                {project.performanceMetrics.map((metric: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <span className="text-sm font-medium text-gray-400">{metric.label}</span>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-white/5">
                      <span className="text-red-400 font-mono text-sm">{metric.before}</span>
                      <ArrowLeft className="w-4 h-4 text-gray-600 rotate-180" />
                      <span className="text-emerald-400 font-mono font-bold text-sm">{metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl glass border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" /> Teknoloji Yığını
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* SEO Silo internal link */}
            <div className="p-8 rounded-3xl glass border border-white/5 text-center">
              <p className="text-sm text-gray-400 mb-4">Bu ölçekte bir mimariye mi ihtiyacınız var?</p>
              <Link href="/services/enterprise-architecture" className="text-indigo-400 hover:text-white hover:underline font-bold transition-all text-sm">
                Danışmanlık Hizmetleri →
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  )
}
