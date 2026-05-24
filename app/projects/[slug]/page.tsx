import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, CheckCircle, Activity, Layout, Terminal, Code2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Metadata } from 'next'
import Script from 'next/script'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

type Props = {
  params: { slug: string }
}

const mockCaseStudies: Record<string, any> = {
  'crm-platform': {
    title: 'Operasyon Paneli Modernizasyonu',
    description: 'Dağınık müşteri ve operasyon süreçlerini tek dashboard altında toplayan modern web sistemi.',
    problem: 'Mevcut müşteri ve operasyon takibi farklı araçlara dağılmıştı. Ekipler rapor, görev ve müşteri durumunu manuel kontrol ettiği için karar alma süreci yavaşlıyordu.',
    solution: 'Next.js tabanlı yönetim paneli, PostgreSQL veri modeli ve otomasyon akışlarıyla müşteri, görev ve raporlama süreçleri tek arayüzde toplandı.',
    architecture: 'Next.js App Router, Prisma, PostgreSQL, Dashboard UI',
    performanceMetrics: [
      { label: 'Rapor Hazırlama', before: 'Saatler', after: 'Dakikalar' },
      { label: 'Operasyon Görünürlüğü', before: 'Dağınık', after: 'Tek panel' },
      { label: 'Manuel İş Yükü', before: 'Yüksek', after: '%60+ azalma' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    businessResult: 'Operasyon ekibi müşteri ve görev takibini tek panelden yönetmeye başladı; manuel kontrol yükü azaldı ve süreç görünürlüğü arttı.',
    github: 'https://github.com/resulersurer',
    link: '#',
    relatedService: '/#contact?service=Admin%20Panel%20%2F%20Dashboard',
  },
  'admin-panel-system': {
    title: 'Admin Panel & Dashboard Sistemi',
    description: 'Operasyon ve veri takibi için rol bazlı, modern ve hızlı yönetim paneli.',
    problem: 'Şirket içi raporlar dağınık tutuluyor, veri tutarsızlıkları operasyonel kararları yavaşlatıyordu.',
    solution: 'Next.js, TypeScript ve Tailwind CSS ile filtreleme, dışa aktarma ve rol bazlı yönetim özellikleri olan sade bir dashboard kurgulandı.',
    architecture: 'Next.js Dashboard, Prisma Data Layer, Role-Based UI',
    performanceMetrics: [
      { label: 'Raporlama Süresi', before: '4 Saat', after: '<2 Dakika' },
      { label: 'Veri Tutarlılığı', before: '%85', after: '%100' },
      { label: 'Yönetim Hızı', before: 'Yavaş', after: 'Anlık' },
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    businessResult: 'Yönetim paneli üzerinden operasyonel görünürlük arttı, ekipler rapor ve müşteri verilerine daha hızlı ulaşmaya başladı.',
    github: 'https://github.com/resulersurer',
    link: '#',
    relatedService: '/#contact?service=Admin%20Panel%20%2F%20Dashboard',
  },
  'qr-menu-system': {
    title: 'Cloud-Based QR Menu System',
    description: 'Restoran zincirleri için bulut tabanlı, anlık senkronizasyon sağlayan QR menü altyapısı.',
    problem: 'Restoranlar menü değişikliklerini anlık olarak tüm şubelere yansıtamıyor ve sipariş süreçlerinde gecikmeler yaşıyordu.',
    solution: 'Bulut tabanlı, multi-tenant bir yapı kuruldu. Menü görselleri optimize edildi, şube bazlı içerik yönetimi ve hızlı yayın akışı oluşturuldu.',
    architecture: 'Next.js, Serverless Functions, CDN Entegrasyonu',
    performanceMetrics: [
      { label: 'Menü Yüklenme Hedefi', before: '5s+', after: '<500ms' },
      { label: 'Şube Senkronizasyon', before: '1 Gün', after: 'Anında' },
      { label: 'Aylık Trafik Kapasitesi', before: '10K', after: '1M+' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Vercel', 'CDN', 'PostgreSQL'],
    businessResult: 'Restoranların dijitalleşme süreci hızlandı, müşteri deneyimi iyileşti ve menü baskı maliyetleri azaldı.',
    github: 'https://github.com/resulersurer',
    link: '#',
    relatedService: '/#contact?service=İşletme%20Web%20Sitesi',
  },
}

async function getProject(slug: string) {
  // 1. Check mockCaseStudies first
  if (mockCaseStudies[slug]) {
    return {
      ...mockCaseStudies[slug],
      isMock: true,
    }
  }

  // 2. Try fetching from database by ID
  try {
    let dbProject = null
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug)
    if (isUuid) {
      dbProject = await prisma.project.findUnique({
        where: { id: slug }
      })
    }

    // 3. Fallback: try fetching by slugified title
    if (!dbProject) {
      const allProjects = await prisma.project.findMany({
        where: { isActive: true }
      })
      dbProject = allProjects.find(p => {
        const projectSlug = p.title
          .toLowerCase()
          .replace(/ğ/g, 'g')
          .replace(/ü/g, 'u')
          .replace(/ş/g, 's')
          .replace(/ı/g, 'i')
          .replace(/ö/g, 'o')
          .replace(/ç/g, 'c')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
        return projectSlug === slug
      })
    }

    if (dbProject) {
      return {
        title: dbProject.title,
        description: dbProject.description,
        problem: 'Bu ürün için problem ve ihtiyaç analizleri hazırlanıyor. Ayrıntılı bilgi ve demo talebi için iletişime geçebilirsiniz.',
        solution: 'Bu ürüne ait teknik mimari ve çözüm detayları hazırlanıyor.',
        architecture: 'Modern Web Mimarisi & Altyapısı',
        performanceMetrics: [
          { label: 'Geliştirme Hızı', before: 'Yüksek', after: 'Hızlı Kurulum' },
          { label: 'Entegrasyon', before: 'Karmaşık', after: 'Kolay Entegre' },
          { label: 'Maliyet', before: 'Yüksek', after: 'Optimize' },
        ],
        techStack: dbProject.tech ? dbProject.tech.split(',').map((t: string) => t.trim()) : [],
        businessResult: 'Bu dijital ürün, iş süreçlerini optimize etmek ve verimliliği artırmak amacıyla özel olarak geliştirilmiştir.',
        github: dbProject.github || '',
        link: dbProject.link || '#',
        image: dbProject.image,
        relatedService: `/#contact?service=${encodeURIComponent(dbProject.title)}`,
        isMock: false,
      }
    }
  } catch (error) {
    console.error('Error fetching project detail:', error)
  }

  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return { title: 'Ürün Detayı Bulunamadı' }

  return {
    title: `${project.title} | Dijital Ürün`,
    description: project.description,
    alternates: {
      canonical: `https://www.ersurer.com/projects/${params.slug}`,
    },
    openGraph: {
      title: `${project.title} | Dijital Ürün`,
      description: project.description,
      type: 'article',
      url: `https://www.ersurer.com/projects/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Dijital Ürün`,
      description: project.description,
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        author: {
          '@type': 'Person',
          name: 'Resul Ersürer',
          url: 'https://www.ersurer.com',
        },
        about: {
          '@type': 'Thing',
          name: 'Digital Product Case Study',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ersurer.com' },
          { '@type': 'ListItem', position: 2, name: 'Digital Products', item: 'https://www.ersurer.com/#portfolio' },
          { '@type': 'ListItem', position: 3, name: project.title, item: `https://www.ersurer.com/projects/${params.slug}` },
        ],
      },
    ],
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
          Dijital Ürünlere Dön
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Ürün Detayı
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light max-w-3xl mb-8">
            {project.description}
          </p>

          <div className="p-6 rounded-2xl glass border border-indigo-500/20 mb-8 inline-block">
            <p className="text-sm text-gray-300">
              <strong className="text-indigo-400 font-bold">Kısaca:</strong> Resul Ersürer, Next.js, Vercel ve AI otomasyonlarla işletmeler için hızlı kurulabilen SaaS MVP’leri, admin paneller ve web sistemleri geliştirir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform text-sm">
                Canlı Ürün <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
          </div>
        </header>

        {project.image && (
          <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10 mb-16 shadow-2xl">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              unoptimized={project.image.startsWith('data:')}
              className="object-cover filter saturate-[0.96] contrast-[0.98]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="p-8 rounded-3xl glass border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-red-400" /> Hedef ve Problem
              </h2>
              <p className="text-gray-300 leading-relaxed">{project.problem}</p>
            </section>

            <section className="p-8 rounded-3xl glass border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Layout className="w-32 h-32 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                <Terminal className="w-6 h-6 text-indigo-400" /> Ürün Kararları ve Çözüm
              </h2>
              <p className="text-gray-300 leading-relaxed relative z-10">{project.solution}</p>
              <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-white/5 relative z-10">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest block mb-2">Teknik Yaklaşım</span>
                <span className="text-white font-medium">{project.architecture}</span>
              </div>
            </section>

            <section className="p-8 rounded-3xl gradient-bg shadow-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400" /> Sonuçlar
              </h2>
              <p className="text-white/90 leading-relaxed font-medium">{project.businessResult}</p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-8 rounded-3xl glass border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" /> Ölçülebilir Metrikler
              </h3>
              <div className="space-y-6">
                {project.performanceMetrics.map((metric: any) => (
                  <div key={metric.label} className="space-y-2">
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
                {project.techStack.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl glass border border-white/5 text-center">
              <p className="text-sm text-gray-400 mb-4">Benzer bir sistemi işletmeniz için nasıl yayına alabileceğimizi netleştirelim.</p>
              <Link href={project.relatedService} className="text-indigo-400 hover:text-white hover:underline font-bold transition-all text-sm block mb-4">
                Yayın Planını Konuşalım →
              </Link>
              <Link href="/#contact" className="inline-block w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-colors">
                Projemi Birlikte Planlayalım
              </Link>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </main>
  )
}
