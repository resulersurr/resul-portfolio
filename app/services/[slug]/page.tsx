import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Bot, CheckCircle, Globe, LayoutDashboard, RefreshCcw, Rocket, Settings } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Script from 'next/script'

const servicesData = {
  'saas-mvp-development': {
    title: 'SaaS MVP Geliştirme',
    description: 'Next.js ve Vercel ile fikrinizi hızlıca çalışan, yayına hazır bir SaaS MVP’ye dönüştürüyorum.',
    longDescription: 'Startup kurucuları ve işletmeler için aylar süren yazılım süreçlerini kısaltan, ölçeklenebilir ve özelleştirilebilir SaaS MVP altyapıları geliştiriyorum. Üyelik, dashboard, form, ödeme, bildirim ve temel veri akışları gibi ürün ihtiyaçlarını hızlıca yayına alınabilir hale getiriyorum.',
    features: ['Next.js ürün altyapısı', 'Vercel deployment', 'Prisma & PostgreSQL veri modeli', 'Dashboard ve kullanıcı akışları'],
    icon: Rocket,
  },
  'ai-automation': {
    title: 'AI Otomasyon Sistemleri',
    description: 'Tekrar eden iş süreçlerinizi AI destekli otomasyonlarla hızlandırıp daha verimli hale getiriyorum.',
    longDescription: 'Müşteri takibi, raporlama, form değerlendirme, içerik üretimi ve operasyon bildirimleri gibi tekrar eden süreçleri AI destekli otomasyonlarla sadeleştiriyorum. Amaç, ekibinizin manuel iş yükünü azaltmak ve karar süreçlerini hızlandırmak.',
    features: ['AI destekli iş akışları', 'Form ve veri otomasyonları', 'Bildirim ve raporlama akışları', 'API entegrasyonları'],
    icon: Bot,
  },
  'business-website': {
    title: 'İşletme Web Sitesi',
    description: 'İşletmeniz için modern, hızlı, mobil uyumlu ve dönüşüm odaklı web sitesi hazırlıyorum.',
    longDescription: 'KOBİ’ler, hizmet işletmeleri, ajanslar ve turizm markaları için güven veren, hızlı açılan, SEO uyumlu ve teklif/lead toplama odaklı web siteleri hazırlıyorum. Tasarım dili sade, profesyonel ve satış hedeflerinize uygun olur.',
    features: ['Modern landing page', 'Mobil uyumlu arayüz', 'SEO temel yapısı', 'Lead ve iletişim formları'],
    icon: Globe,
  },
  'admin-panel-dashboard': {
    title: 'Admin Panel & Dashboard',
    description: 'Müşteri, sipariş, operasyon ve verilerinizi tek panelden yönetebileceğiniz özel dashboard geliştiriyorum.',
    longDescription: 'Operasyonlarını dijitalleştirmek isteyen işletmeler için müşteri, ekip, görev, sipariş, rezervasyon veya rapor verilerini tek panelden yönetebilecekleri dashboard sistemleri geliştiriyorum.',
    features: ['Rol bazlı yönetim', 'Veri tabloları ve filtreler', 'Raporlama ekranları', 'Operasyon takip panelleri'],
    icon: LayoutDashboard,
  },
  'product-customization': {
    title: 'Ürün Özelleştirme & Kurulum',
    description: 'Hazır dijital ürünlerimi işletmenizin süreçlerine göre özelleştirip yayına alıyorum.',
    longDescription: 'Hazır SaaS ve web ürün altyapılarımı sektörünüze, marka yapınıza, veri modelinize ve iş akışınıza göre uyarlıyorum. Böylece sıfırdan geliştirmeye göre daha hızlı, kontrollü ve ekonomik bir yayına çıkış sağlanır.',
    features: ['Hazır ürün adaptasyonu', 'Marka ve arayüz uyarlaması', 'Veri modeli özelleştirme', 'Yayına alma desteği'],
    icon: Settings,
  },
  'website-modernization': {
    title: 'Mevcut Siteyi Modernleştirme',
    description: 'Eski veya yavaş web sitenizi modern tasarım, hızlı altyapı ve SEO uyumuyla yeniliyorum.',
    longDescription: 'Eski, yavaş veya dönüşüm üretmeyen web sitelerini Next.js, Tailwind CSS ve Vercel altyapısıyla yeniliyorum. Performans, mobil kullanım, içerik yapısı ve teklif alma akışı birlikte iyileştirilir.',
    features: ['Modern arayüz yenileme', 'Performans iyileştirme', 'SEO ve içerik düzeni', 'Vercel yayına alma'],
    icon: RefreshCcw,
  },
  'aspnet-core-development': {
    title: 'Geçmiş Backend Deneyimi',
    description: 'ASP.NET Core geçmişim, modern SaaS ve web ürünlerinde sağlam API ve veri modeli kararlarına destek olur.',
    longDescription: 'Ana odağım artık Next.js, Vercel, SaaS MVP ve AI otomasyon sistemleri olsa da geçmiş backend deneyimim; API tasarımı, veri modelleme, güvenlik ve operasyonel ölçeklenebilirlik kararlarında projelere teknik derinlik katar.',
    features: ['API tasarım deneyimi', 'Veri modeli yaklaşımı', 'Güvenlik farkındalığı', 'Sistem tasarımı geçmişi'],
    icon: CheckCircle,
  },
  'web-api-development': {
    title: 'API Entegrasyonları',
    description: 'Web sistemlerinizi ödeme, bildirim, harita, AI ve üçüncü parti servislerle entegre ediyorum.',
    longDescription: 'Modern SaaS ve web ürünlerinin ihtiyaç duyduğu ödeme, e-posta, WhatsApp, harita, AI, CRM veya veri servislerini kontrollü API entegrasyonlarıyla ürüne bağlıyorum.',
    features: ['Üçüncü parti servis bağlantıları', 'Form ve bildirim akışları', 'AI servis entegrasyonları', 'Güvenli veri aktarımı'],
    icon: CheckCircle,
  },
  'crm-software-development': {
    title: 'Operasyon & Müşteri Paneli',
    description: 'Müşteri, görev ve operasyon süreçlerini takip edebileceğiniz sade yönetim panelleri geliştiriyorum.',
    longDescription: 'Klasik CRM yaklaşımından ziyade, işletmenizin gerçek operasyon akışına uygun müşteri, görev, görüşme, rezervasyon veya teklif takip panelleri oluşturuyorum.',
    features: ['Müşteri takibi', 'Görev ve süreç yönetimi', 'Teklif ve form akışları', 'Raporlama ekranları'],
    icon: LayoutDashboard,
  },
  'admin-panel-development': {
    title: 'Admin Panel & Dashboard',
    description: 'Müşteri, sipariş, operasyon ve verilerinizi tek panelden yönetebileceğiniz özel dashboard geliştiriyorum.',
    longDescription: 'İşletme operasyonları için sade, hızlı ve rol bazlı yönetim panelleri geliştiriyorum. Panel yapısı Next.js, TypeScript ve modern arayüz standartlarına uygun kurulur.',
    features: ['Dashboard arayüzü', 'Rol bazlı erişim', 'Veri tabloları', 'Raporlama ve filtreler'],
    icon: LayoutDashboard,
  },
  'enterprise-architecture': {
    title: 'Ürün Altyapısı Danışmanlığı',
    description: 'SaaS MVP veya dijital ürününüz için doğru teknik kapsamı, veri modelini ve yayına çıkış planını belirliyorum.',
    longDescription: 'Yeni bir dijital ürün fikriniz varsa, önce hangi özelliklerin MVP için gerekli olduğunu, hangi hazır altyapının kullanılabileceğini ve hangi entegrasyonların değer yaratacağını birlikte netleştiriyorum.',
    features: ['MVP kapsam analizi', 'Teknik yol haritası', 'Veri modeli planlama', 'Yayına çıkış stratejisi'],
    icon: Rocket,
  },
}

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    return { title: 'Hizmet Bulunamadı' }
  }

  return {
    title: `${service.title} | Resul Ersürer`,
    description: service.description,
    alternates: {
      canonical: `https://ersurer.com/services/${params.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      type: 'article',
      url: `https://ersurer.com/services/${params.slug}`,
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  const Icon = service.icon
  const contactHref = `/#contact?service=${encodeURIComponent(service.title)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        description: service.longDescription,
        provider: {
          '@type': 'Person',
          name: 'Resul Ersürer',
          url: 'https://www.ersurer.com',
        },
        serviceType: 'SaaS MVP and AI Automation Development',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.ersurer.com' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.ersurer.com/#services' },
          { '@type': 'ListItem', position: 3, name: service.title, item: `https://www.ersurer.com/services/${params.slug}` },
        ],
      },
    ],
  }

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link href="/#services" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Hizmetlere Dön
        </Link>

        <header className="mb-12">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 border border-white/10 shadow-xl">
            <Icon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {service.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            {service.description}
          </p>
        </header>

        <section className="prose prose-invert prose-indigo max-w-none mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Hizmet Detayları</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {service.longDescription}
          </p>

          <h3 className="text-xl font-bold text-white mt-12 mb-6">Öne Çıkan Özellikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 sm:p-12 rounded-3xl mesh-gradient relative overflow-hidden text-center border border-white/10">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-white">Bu Hizmet İşletmeniz İçin Uygun mu?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              İhtiyacınızı birlikte netleştirip hazır altyapılarla en hızlı yayına çıkış yolunu belirleyelim.
            </p>
            <Link
              href={contactHref}
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Projemi Birlikte Planlayalım
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
