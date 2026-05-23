import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { ArrowLeft, CheckCircle, Compass } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

type SectorData = {
  slug: string
  title: string
  meta: string
  h1: string
  intro: string
  problem: string
  solution: string
  services: string[]
  useCases: string[]
  links: Array<{ label: string; href: string }>
  cta: string
}

const sectors: Record<string, SectorData> = {
  'turizm-sirketleri-yazilim': {
    slug: 'turizm-sirketleri-yazilim',
    title: 'Turizm Şirketleri İçin Yazılım ve Operasyon Paneli',
    meta: 'Turizm şirketleri için rezervasyon, araç, rehber, müşteri ve operasyon takibini tek panelde toplayan yazılım çözümleri.',
    h1: 'Turizm Şirketleri İçin Yazılım ve Operasyon Paneli',
    intro: 'Turizm operasyonlarınızı rezervasyon, ekip, araç, rehber ve müşteri takibiyle tek panelden yönetilebilir hale getiriyorum.',
    problem: 'Rezervasyon, transfer, ekip ve müşteri bilgileri farklı dosya ve mesajlarda kaldığında operasyon takibi yavaşlar.',
    solution: 'Next.js tabanlı dashboard, bildirim ve raporlama akışlarıyla turizm operasyonunu daha görünür ve ölçülebilir hale getiririm.',
    services: ['Admin panel ve dashboard', 'AI destekli raporlama', 'Next.js işletme web sitesi', 'Vercel deployment'],
    useCases: ['Rezervasyon takip paneli', 'Araç ve rehber planlama', 'Müşteri talep formu', 'Haftalık operasyon raporu'],
    links: [
      { label: 'Admin Panel ve Dashboard', href: '/services/admin-panel-dashboard' },
      { label: 'AI Otomasyon', href: '/services/ai-otomasyon' },
    ],
    cta: 'Turizm Yazılımımı Planlayalım',
  },
  'ajans-yonetim-paneli': {
    slug: 'ajans-yonetim-paneli',
    title: 'Ajanslar İçin Proje ve Müşteri Yönetim Paneli',
    meta: 'Ajanslar için müşteri, proje, görev, teklif ve raporlama süreçlerini tek dashboard altında toplayan yönetim paneli.',
    h1: 'Ajanslar İçin Proje ve Müşteri Yönetim Paneli',
    intro: 'Ajansların müşteri, proje, görev, teklif ve raporlama süreçlerini tek panelden takip edebileceği sistemler kuruyorum.',
    problem: 'Ajanslarda müşteri notları, görevler, teslim tarihleri ve raporlar dağınık kaldığında operasyon kontrolü zorlaşır.',
    solution: 'Proje, müşteri, görev ve rapor ekranlarını ajans akışına göre sade bir dashboard içinde toplarım.',
    services: ['Admin panel ve operasyon dashboard', 'SaaS MVP geliştirme', 'AI raporlama otomasyonu', 'Next.js web sitesi'],
    useCases: ['Müşteri portalı', 'Proje takip paneli', 'Teklif ve görev akışı', 'Rapor özetleme otomasyonu'],
    links: [
      { label: 'Admin Panel ve Dashboard', href: '/services/admin-panel-dashboard' },
      { label: 'SaaS MVP Geliştirme', href: '/services/saas-mvp-gelistirme' },
    ],
    cta: 'Ajans Panelimi Planlayalım',
  },
  'restoran-qr-menu-sistemi': {
    slug: 'restoran-qr-menu-sistemi',
    title: 'Restoranlar İçin QR Menü ve Sipariş Sistemi',
    meta: 'Restoranlar için QR menü, ürün yönetimi, sipariş takibi ve kampanya duyurularını kapsayan hızlı web sistemi.',
    h1: 'Restoranlar İçin QR Menü ve Sipariş Sistemi',
    intro: 'Restoran, kafe ve hizmet işletmeleri için QR menü, ürün yönetimi ve sipariş takibi odaklı dijital sistemler geliştiriyorum.',
    problem: 'Menü güncellemeleri, kampanyalar ve sipariş akışı manuel ilerlediğinde hem ekip hem müşteri deneyimi yavaşlar.',
    solution: 'Hazır SaaS altyapısı ve Next.js web sistemiyle ürünleri kolay yönetilebilir, hızlı açılan ve mobil uyumlu hale getiririm.',
    services: ['Hazır SaaS ürünleri', 'Next.js işletme web sitesi', 'Admin panel', 'Vercel yayını'],
    useCases: ['QR menü', 'Ürün ve kategori yönetimi', 'Kampanya duyuruları', 'Sipariş veya talep formu'],
    links: [
      { label: 'Hazır SaaS Ürünleri', href: '/services/hazir-saas-urunleri' },
      { label: 'Next.js İşletme Web Sitesi', href: '/services/nextjs-isletme-web-sitesi' },
    ],
    cta: 'Restoran Sistemimi Planlayalım',
  },
  'emlak-ofisi-yazilimi': {
    slug: 'emlak-ofisi-yazilimi',
    title: 'Emlak Ofisleri İçin İlan ve Müşteri Takip Yazılımı',
    meta: 'Emlak ofisleri için ilan, müşteri, görüşme ve portföy takibini düzenleyen web sitesi ve dashboard çözümleri.',
    h1: 'Emlak Ofisleri İçin İlan ve Müşteri Takip Yazılımı',
    intro: 'Emlak ofisleri için ilan, müşteri, portföy ve görüşme süreçlerini dijital olarak takip edebileceğiniz sistemler kuruyorum.',
    problem: 'Portföy, müşteri görüşmeleri ve ilan durumları farklı kanallarda tutulduğunda takip ve dönüşüm zorlaşır.',
    solution: 'İlan odaklı web sitesi ve müşteri takip dashboard’u ile satış sürecini tek veri yapısında toplarım.',
    services: ['Next.js işletme web sitesi', 'Admin panel ve dashboard', 'AI destekli takip notları', 'Vercel deployment'],
    useCases: ['İlan yönetimi', 'Müşteri takip paneli', 'Görüşme notları', 'Portföy raporları'],
    links: [
      { label: 'Next.js İşletme Web Sitesi', href: '/services/nextjs-isletme-web-sitesi' },
      { label: 'Admin Panel ve Dashboard', href: '/services/admin-panel-dashboard' },
    ],
    cta: 'Emlak Yazılımımı Planlayalım',
  },
  'danisman-web-sitesi': {
    slug: 'danisman-web-sitesi',
    title: 'Danışmanlar İçin Lead Odaklı Web Sitesi',
    meta: 'Danışmanlar için uzmanlığı net anlatan, hızlı açılan, SEO uyumlu ve müşteri adayı toplayan Next.js web sitesi.',
    h1: 'Danışmanlar İçin Lead Odaklı Web Sitesi',
    intro: 'Danışmanlar ve uzmanlar için güven veren, hızlı açılan, SEO uyumlu ve görüşme talebi toplayan web siteleri geliştiriyorum.',
    problem: 'Uzmanlığı net anlatmayan ve güçlü CTA sunmayan danışman web siteleri potansiyel müşteriyi aksiyona geçiremez.',
    solution: 'Net konumlandırma, hizmet sayfaları, blog altyapısı ve iletişim akışıyla lead odaklı Next.js web sitesi kurarım.',
    services: ['Next.js işletme web sitesi', 'Blog ve SEO altyapısı', 'AI destekli içerik akışları', 'Vercel yayını'],
    useCases: ['Danışman profil sitesi', 'Hizmet landing page’leri', 'Blog içerik sistemi', 'Görüşme talep formu'],
    links: [
      { label: 'Next.js İşletme Web Sitesi', href: '/services/nextjs-isletme-web-sitesi' },
      { label: 'Vercel Danışmanlık', href: '/services/vercel-danismanlik' },
    ],
    cta: 'Danışman Web Sitemi Planlayalım',
  },
  'kucuk-isletme-web-sitesi': {
    slug: 'kucuk-isletme-web-sitesi',
    title: 'Küçük İşletmeler İçin Web Sitesi ve Otomasyon',
    meta: 'Küçük işletmeler için hızlı açılan web sitesi, iletişim formları, admin panel ve AI destekli otomasyon çözümleri.',
    h1: 'Küçük İşletmeler İçin Web Sitesi ve Otomasyon',
    intro: 'Küçük işletmelerin dijital görünürlüğünü artıran, müşteri adayı toplayan ve operasyonu kolaylaştıran web sistemleri kuruyorum.',
    problem: 'Küçük işletmelerde web sitesi, teklif takibi ve müşteri iletişimi çoğu zaman ayrı ayrı ve manuel ilerler.',
    solution: 'Next.js web sitesi, iletişim formu, basit admin panel ve AI otomasyonlarla daha düzenli bir dijital altyapı oluştururum.',
    services: ['Next.js işletme web sitesi', 'AI otomasyon', 'Hazır SaaS ürünleri', 'Admin panel'],
    useCases: ['Lead toplayan web sitesi', 'Teklif formu', 'Müşteri takip paneli', 'Otomatik bildirim akışları'],
    links: [
      { label: 'Next.js İşletme Web Sitesi', href: '/services/nextjs-isletme-web-sitesi' },
      { label: 'AI Otomasyon', href: '/services/ai-otomasyon' },
    ],
    cta: 'İşletme Web Sitemi Planlayalım',
  },
}

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(sectors).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const sector = sectors[params.slug]

  if (!sector) {
    return { title: 'Sektör Sayfası Bulunamadı' }
  }

  return {
    title: `${sector.title} | Resul Ersürer`,
    description: sector.meta,
    alternates: {
      canonical: `https://www.ersurer.com/sektorler/${sector.slug}`,
    },
    openGraph: {
      title: sector.title,
      description: sector.meta,
      type: 'website',
      url: `https://www.ersurer.com/sektorler/${sector.slug}`,
      images: [
        {
          url: '/images/logo2.png',
          width: 1200,
          height: 630,
          alt: `${sector.h1} - Resul Ersürer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: sector.title,
      description: sector.meta,
      images: ['/images/logo2.png'],
    },
  }
}

export default function SectorPage({ params }: Props) {
  const sector = sectors[params.slug]

  if (!sector) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: sector.title,
        description: sector.meta,
        url: `https://www.ersurer.com/sektorler/${sector.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.ersurer.com' },
          { '@type': 'ListItem', position: 2, name: 'Sektörler', item: 'https://www.ersurer.com/sektorler' },
          { '@type': 'ListItem', position: 3, name: sector.h1, item: `https://www.ersurer.com/sektorler/${sector.slug}` },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Script
        id="sector-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Link href="/#services" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Hizmetlere Dön
        </Link>

        <header className="mb-14">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 border border-white/10 shadow-xl">
            <Compass className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Sektör Çözümü</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {sector.h1}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light max-w-3xl">
            {sector.intro}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <h2 className="text-2xl font-bold text-white mb-4">Problem</h2>
            <p className="text-gray-300 leading-relaxed">{sector.problem}</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <h2 className="text-2xl font-bold text-white mb-4">Çözüm</h2>
            <p className="text-gray-300 leading-relaxed">{sector.solution}</p>
          </section>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Uygun Hizmetler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sector.services.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/5 p-4">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Örnek Kullanım Senaryoları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sector.useCases.map((item) => (
              <div key={item} className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5 text-indigo-100">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">İlgili Hizmet Sayfaları</h2>
          <div className="flex flex-wrap gap-3">
            {sector.links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-gray-200 hover:text-white hover:border-indigo-400/40 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="p-8 sm:p-12 rounded-3xl mesh-gradient relative overflow-hidden text-center border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Sektörünüze Uygun Sistemi Birlikte Netleştirelim</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-7">
            İhtiyacınızı, mevcut sürecinizi ve yayına çıkış hedefinizi değerlendirip en hızlı uygulanabilir çözümü belirleyelim.
          </p>
          <Link href={`/#contact?service=${encodeURIComponent(sector.h1)}`} className="inline-flex px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform">
            {sector.cta}
          </Link>
        </section>
      </article>

      <Footer />
    </main>
  )
}
