import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Bot,
  CheckCircle,
  Globe,
  LayoutDashboard,
  Rocket,
  Server,
  Settings,
} from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Script from 'next/script'

type ServicePageData = {
  slug: string
  title: string
  meta: string
  h1: string
  cta: string
  intro: string
  problem: string
  solution: string
  audience: string[]
  includes: string[]
  process: string[]
  useCases: string[]
  faqs: Array<{ question: string; answer: string }>
  keywords: string[]
  icon: typeof Rocket
}

const servicesData: Record<string, ServicePageData> = {
  'saas-mvp-gelistirme': {
    slug: 'saas-mvp-gelistirme',
    title: 'SaaS MVP Geliştirme | Next.js ve Vercel',
    meta: 'Fikrinizi Next.js, Vercel ve modern SaaS altyapısıyla hızlıca yayına hazır MVP’ye dönüştürün.',
    h1: 'SaaS MVP Geliştirme',
    cta: 'MVP Fikrimi Konuşalım',
    intro:
      'SaaS fikrinizi üyelik, dashboard, veri modeli, ödeme veya temel otomasyon akışlarıyla hızlıca test edilebilir bir ürüne dönüştürüyorum.',
    problem:
      'Birçok girişimci ve işletme ilk ürünü gereğinden büyük planladığı için aylarca yayına çıkamaz, bütçe tüketir ve gerçek kullanıcı geri bildirimi alamaz.',
    solution:
      'Next.js, Vercel, TypeScript, Prisma ve PostgreSQL ile önce temel değer önerisini çalışan bir MVP olarak kurar, sonra kullanıcı verisine göre genişletilebilir bir ürün altyapısı oluştururum.',
    audience: ['Startup kurucuları', 'Hızlı MVP çıkarmak isteyen girişimciler', 'Yeni dijital ürün test eden işletmeler', 'Ajanslar ve ürün ekipleri'],
    includes: ['MVP kapsam analizi', 'Next.js ürün altyapısı', 'Kullanıcı ve admin akışları', 'Veri modeli kurulumu', 'Vercel deployment', 'Temel analytics ve form akışları'],
    process: ['Kapsamı netleştirme', 'Ekran ve veri modeli planlama', 'MVP geliştirme', 'Test ve Vercel yayını', 'İlk geri bildirimlere göre iyileştirme'],
    useCases: ['Üyelikli SaaS paneli', 'Lead toplama ve teklif sistemi', 'Rezervasyon takip MVP’si', 'B2B müşteri portalı'],
    faqs: [
      { question: 'SaaS MVP ne kadar sürede çıkar?', answer: 'Kapsama göre değişir; sade bir MVP genellikle haftalar içinde yayına alınabilecek şekilde planlanır.' },
      { question: 'MVP’ye ödeme sistemi eklenebilir mi?', answer: 'Evet. Üyelik, ödeme, form, bildirim ve dashboard akışları MVP kapsamına göre eklenebilir.' },
      { question: 'İlk sürüm sonradan büyütülebilir mi?', answer: 'Evet. Veri modeli ve modüler ekran yapısı, sonraki özelliklerin eklenmesini kolaylaştıracak şekilde kurulur.' },
    ],
    keywords: ['saas mvp geliştirme', 'next.js saas', 'vercel mvp', 'startup mvp geliştirme'],
    icon: Rocket,
  },
  'ai-otomasyon': {
    slug: 'ai-otomasyon',
    title: 'AI Otomasyon Sistemleri | İş Süreçlerini Hızlandırın',
    meta: 'Tekrar eden iş süreçlerinizi AI destekli otomasyonlarla azaltın, raporlama ve takip akışlarını hızlandırın.',
    h1: 'AI Otomasyon Sistemleri',
    cta: 'Otomasyon Fikrimi Konuşalım',
    intro:
      'Tekrar eden müşteri takibi, raporlama, içerik, form değerlendirme ve bildirim süreçlerini AI destekli akışlarla hızlandırıyorum.',
    problem:
      'Manuel raporlama, kopyala-yapıştır işler, tekrar eden müşteri mesajları ve dağınık takip süreçleri ekiplerin zamanını tüketir.',
    solution:
      'AI servislerini form, dashboard, CRM, e-posta, WhatsApp veya mevcut API akışlarınıza bağlayarak kontrollü ve ölçülebilir otomasyonlar kurarım.',
    audience: ['Operasyon ekipleri', 'Danışmanlar', 'Ajanslar', 'Turizm ve hizmet işletmeleri', 'Raporlama yükü fazla olan KOBİ’ler'],
    includes: ['Süreç analizi', 'AI destekli sınıflandırma', 'Özet ve rapor üretimi', 'Bildirim akışları', 'Admin panel bağlantısı', 'API entegrasyonları'],
    process: ['Tekrarlayan işi seçme', 'Veri kaynaklarını belirleme', 'AI akışını tasarlama', 'Panel ve bildirim entegrasyonu', 'Canlı kullanım ve iyileştirme'],
    useCases: ['Form yanıtı özetleme', 'Müşteri taleplerini sınıflandırma', 'Haftalık operasyon raporu', 'AI destekli teklif hazırlığı'],
    faqs: [
      { question: 'AI otomasyon hangi işler için uygundur?', answer: 'Sık tekrarlanan, veriyle ilerleyen, özetleme, sınıflandırma veya karar desteği isteyen süreçler için uygundur.' },
      { question: 'AI çıktıları kontrol edilebilir mi?', answer: 'Evet. İnsan onaylı akışlar, kayıt ekranları ve panel içi kontrol adımları eklenebilir.' },
      { question: 'Mevcut sistemlere bağlanabilir mi?', answer: 'Uygun API veya veri erişimi varsa e-posta, form, CRM, dashboard ve üçüncü parti servislerle entegre edilebilir.' },
    ],
    keywords: ['ai otomasyon', 'iş süreci otomasyonu', 'ai raporlama', 'yapay zeka otomasyon'],
    icon: Bot,
  },
  'nextjs-isletme-web-sitesi': {
    slug: 'nextjs-isletme-web-sitesi',
    title: 'Next.js İşletme Web Sitesi | Hızlı ve SEO Uyumlu',
    meta: 'İşletmeniz için hızlı açılan, mobil uyumlu ve lead odaklı Next.js web sitesi geliştirme.',
    h1: 'Next.js İşletme Web Sitesi',
    cta: 'Web Sitemi Planlayalım',
    intro:
      'KOBİ’ler, danışmanlar, ajanslar ve hizmet işletmeleri için hızlı açılan, SEO uyumlu ve müşteri adayı toplamaya odaklanan web siteleri geliştiriyorum.',
    problem:
      'Yavaş, güncel olmayan veya net teklif sunmayan web siteleri organik görünürlüğü ve müşteri adayı dönüşümünü düşürür.',
    solution:
      'Next.js ve Vercel ile teknik SEO temeli güçlü, mobil uyumlu, hızlı ve net CTA’lara sahip işletme web siteleri kurarım.',
    audience: ['Küçük ve orta ölçekli işletmeler', 'Danışmanlar', 'Hizmet sektörü işletmeleri', 'Ajanslar', 'Turizm markaları'],
    includes: ['Ana sayfa', 'Hizmet sayfaları', 'Blog altyapısı', 'İletişim ve teklif formu', 'Open Graph ve sitemap', 'Vercel yayını'],
    process: ['Konumlandırma ve sayfa planı', 'İçerik ve tasarım düzeni', 'Next.js geliştirme', 'SEO teknik kontroller', 'Yayına alma'],
    useCases: ['Kurumsal hizmet sitesi', 'Danışman web sitesi', 'Ajans web sitesi', 'Turizm şirketi sitesi'],
    faqs: [
      { question: 'Next.js işletme sitesi SEO’ya uygun olur mu?', answer: 'Evet. Metadata, sitemap, schema, hızlı sayfa açılışı ve doğru içerik yapısıyla SEO’ya uygun kurulur.' },
      { question: 'Siteye blog eklenebilir mi?', answer: 'Evet. Blog altyapısı, hizmet sayfaları ve internal linking yapısı birlikte planlanabilir.' },
      { question: 'Vercel üzerinde yayınlanır mı?', answer: 'Evet. Domain, environment, deployment ve temel performans kontrolleriyle yayına alınır.' },
    ],
    keywords: ['next.js işletme web sitesi', 'hızlı web sitesi', 'seo uyumlu web sitesi', 'kobiler için web sitesi'],
    icon: Globe,
  },
  'admin-panel-dashboard': {
    slug: 'admin-panel-dashboard',
    title: 'Admin Panel ve Dashboard Geliştirme',
    meta: 'Müşteri, sipariş, rezervasyon, ekip ve operasyon verilerinizi tek panelden yönetin.',
    h1: 'Admin Panel ve Dashboard Geliştirme',
    cta: 'Panel İhtiyacımı Konuşalım',
    intro:
      'Müşteri, sipariş, rezervasyon, ekip, görev ve rapor verilerinizi tek yerden takip edebileceğiniz sade ve hızlı admin paneller geliştiriyorum.',
    problem:
      'Excel, mesajlaşma uygulamaları ve dağınık dosyalar operasyonu büyüdükçe yavaşlatır; ekipler aynı veriye aynı anda güvenle bakamaz.',
    solution:
      'İş akışınıza göre rol bazlı, filtrelenebilir, raporlanabilir ve otomasyonlara bağlanabilir dashboard sistemleri kurarım.',
    audience: ['Operasyon ekipleri', 'Turizm şirketleri', 'Ajanslar', 'Emlak ofisleri', 'Sipariş veya rezervasyon yöneten işletmeler'],
    includes: ['Dashboard ekranları', 'Rol bazlı erişim', 'Veri tabloları', 'Filtre ve arama', 'Raporlama alanları', 'Bildirim ve entegrasyonlar'],
    process: ['Operasyon akışını çıkarma', 'Veri modelini tasarlama', 'Panel ekranlarını geliştirme', 'Yetki ve güvenlik ayarları', 'Canlı kullanım desteği'],
    useCases: ['Rezervasyon takip paneli', 'Ajans proje dashboard’u', 'Müşteri ve teklif takibi', 'Ekip görev yönetimi'],
    faqs: [
      { question: 'Panelde rol bazlı yetki olur mu?', answer: 'Evet. Admin, ekip ve sınırlı kullanıcı rolleri ihtiyaca göre tanımlanabilir.' },
      { question: 'Excel yerine kullanılabilir mi?', answer: 'Evet. Dağınık Excel takipleri düzenli veri tabloları, filtreler ve raporlarla panele taşınabilir.' },
      { question: 'AI otomasyon eklenebilir mi?', answer: 'Evet. Panel içindeki veriler raporlama, sınıflandırma veya özetleme için AI akışlarına bağlanabilir.' },
    ],
    keywords: ['admin panel geliştirme', 'dashboard geliştirme', 'operasyon paneli', 'müşteri takip paneli'],
    icon: LayoutDashboard,
  },
  'vercel-danismanlik': {
    slug: 'vercel-danismanlik',
    title: 'Vercel Danışmanlık ve Deployment Hizmeti',
    meta: 'Next.js projelerinizi Vercel üzerinde performanslı, güvenli ve ölçeklenebilir şekilde yayına alın.',
    h1: 'Vercel Danışmanlık',
    cta: 'Vercel Kurulum Desteği Al',
    intro:
      'Next.js projelerinizi Vercel üzerinde doğru environment, domain, preview deployment ve performans ayarlarıyla yayına almanıza yardımcı oluyorum.',
    problem:
      'Yanlış deployment ayarları, eksik environment değişkenleri, domain sorunları ve performans problemleri ürünün canlıya çıkışını yavaşlatır.',
    solution:
      'Vercel deployment sürecini proje yapınıza göre düzenler; production, preview, domain, analytics ve temel performans kontrollerini netleştiririm.',
    audience: ['Next.js projesi olan işletmeler', 'Ajanslar', 'Startup ekipleri', 'Freelancer ekipleri', 'Mevcut sitesini Vercel’e taşımak isteyenler'],
    includes: ['Vercel proje kurulumu', 'Domain bağlantısı', 'Environment yönetimi', 'Preview deployment', 'Performans kontrolü', 'Yayın sonrası teknik destek'],
    process: ['Proje yapısını inceleme', 'Deployment ayarlarını planlama', 'Vercel kurulumu', 'Domain ve env kontrolleri', 'Yayın ve doğrulama'],
    useCases: ['Next.js site yayını', 'SaaS MVP deployment', 'Preview ortamı kurulumu', 'Mevcut projenin Vercel’e taşınması'],
    faqs: [
      { question: 'Mevcut Next.js projem Vercel’e taşınabilir mi?', answer: 'Evet. Proje yapısı uygunsa domain, environment ve build ayarlarıyla Vercel’e taşınabilir.' },
      { question: 'Performans optimizasyonu dahil mi?', answer: 'Temel Core Web Vitals, görsel, metadata ve deployment kontrolleri hizmet kapsamına alınabilir.' },
      { question: 'Preview deployment kurulabilir mi?', answer: 'Evet. Ekip ve müşteri onayı için preview deployment akışı kurulabilir.' },
    ],
    keywords: ['vercel danışmanlık', 'vercel deployment', 'next.js deployment', 'vercel kurulum'],
    icon: Server,
  },
  'hazir-saas-urunleri': {
    slug: 'hazir-saas-urunleri',
    title: 'Hazır SaaS Ürünleri ve Kurulum Hizmeti',
    meta: 'İşletmenize uyarlanabilen hazır SaaS altyapılarıyla daha hızlı ve ekonomik yayına çıkın.',
    h1: 'Hazır SaaS Ürünleri',
    cta: 'Uygun Ürünü Bulalım',
    intro:
      'Turizm, ajans, restoran, danışmanlık ve küçük işletme operasyonlarına uyarlanabilen hazır SaaS altyapılarıyla daha hızlı yayına çıkmanızı sağlarım.',
    problem:
      'Her projeyi sıfırdan yazmak çoğu işletme için pahalı, yavaş ve gereksiz risklidir; birçok ihtiyaç benzer ürün altyapılarıyla daha hızlı çözülebilir.',
    solution:
      'Hazır Next.js SaaS altyapılarını markanıza, sektörünüze, veri yapınıza ve iş akışınıza göre özelleştirerek kurulum yaparım.',
    audience: ['Hızlı dijitalleşmek isteyen KOBİ’ler', 'Turizm şirketleri', 'Ajanslar', 'Restoranlar', 'Danışmanlar', 'Emlak ofisleri'],
    includes: ['Hazır ürün seçimi', 'Marka ve içerik uyarlama', 'Veri modeli düzenleme', 'Panel kurulumu', 'Vercel yayını', 'Kullanım desteği'],
    process: ['İhtiyacı eşleştirme', 'Uygun hazır ürünü seçme', 'Özelleştirme', 'Entegrasyonlar', 'Yayına alma ve eğitim'],
    useCases: ['QR menü sistemi', 'Turizm operasyon paneli', 'Ajans proje takip sistemi', 'Danışman lead paneli'],
    faqs: [
      { question: 'Hazır SaaS ürünleri tamamen özelleşir mi?', answer: 'Marka, içerik, ekranlar, veri modeli ve iş akışları ihtiyaca göre uyarlanabilir.' },
      { question: 'Sıfırdan yazılıma göre avantajı nedir?', answer: 'Daha hızlı yayına çıkış, daha düşük başlangıç maliyeti ve test edilmiş temel akışlar sağlar.' },
      { question: 'Sonradan özel özellik eklenebilir mi?', answer: 'Evet. Hazır altyapı üzerine sektöre veya işletmeye özel modüller eklenebilir.' },
    ],
    keywords: ['hazır saas ürünleri', 'hazır yazılım kurulumu', 'saas ürün altyapısı', 'işletme yazılımı'],
    icon: Settings,
  },
}

const legacySlugMap: Record<string, string> = {
  'saas-mvp-development': 'saas-mvp-gelistirme',
  'ai-automation': 'ai-otomasyon',
  'business-website': 'nextjs-isletme-web-sitesi',
  'product-customization': 'hazir-saas-urunleri',
  'website-modernization': 'nextjs-isletme-web-sitesi',
  'aspnet-core-development': 'saas-mvp-gelistirme',
  'web-api-development': 'ai-otomasyon',
  'crm-software-development': 'admin-panel-dashboard',
  'admin-panel-development': 'admin-panel-dashboard',
  'enterprise-architecture': 'vercel-danismanlik',
}

function getService(slug: string) {
  return servicesData[slug] || servicesData[legacySlugMap[slug]]
}

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return [...Object.keys(servicesData), ...Object.keys(legacySlugMap)].map((slug) => ({ slug }))
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService(params.slug)

  if (!service) {
    return { title: 'Hizmet Bulunamadı' }
  }

  const canonicalSlug = service.slug

  return {
    title: service.title,
    description: service.meta,
    keywords: service.keywords,
    alternates: {
      canonical: `https://www.ersurer.com/services/${canonicalSlug}`,
    },
    openGraph: {
      title: service.title,
      description: service.meta,
      type: 'website',
      url: `https://www.ersurer.com/services/${canonicalSlug}`,
      images: [
        {
          url: '/images/logo2.png',
          width: 1200,
          height: 630,
          alt: `${service.h1} - Resul Ersürer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.meta,
      images: ['/images/logo2.png'],
    },
  }
}

export default function ServicePage({ params }: Props) {
  const service = getService(params.slug)

  if (!service) {
    notFound()
  }

  const Icon = service.icon
  const contactHref = `/#contact?service=${encodeURIComponent(service.h1)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.h1,
        description: service.meta,
        provider: {
          '@type': 'Person',
          name: 'Resul Ersürer',
          url: 'https://www.ersurer.com',
        },
        serviceType: service.h1,
        areaServed: 'TR',
        url: `https://www.ersurer.com/services/${service.slug}`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.ersurer.com' },
          { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: 'https://www.ersurer.com/#services' },
          { '@type': 'ListItem', position: 3, name: service.h1, item: `https://www.ersurer.com/services/${service.slug}` },
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

      <article className="pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-28 lg:pb-36 px-5 sm:px-8 lg:px-10 max-w-6xl mx-auto">
        <Link href="/#services" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Hizmetlere Dön
        </Link>

        <header className="mb-16 lg:mb-20">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 border border-white/10 shadow-xl">
            <Icon className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Hizmet</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-7 tracking-tight leading-tight">
            {service.h1}
          </h1>
          <p className="text-xl sm:text-[1.35rem] text-gray-400 leading-[1.75] font-light max-w-4xl">
            {service.intro}
          </p>
          <Link
            href={contactHref}
            className="mt-10 inline-flex items-center px-9 py-5 gradient-bg text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20"
          >
            {service.cta}
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Problem</h2>
            <p className="text-gray-300 text-lg leading-[1.75]">{service.problem}</p>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Çözüm</h2>
            <p className="text-gray-300 text-lg leading-[1.75]">{service.solution}</p>
          </section>
        </div>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Kimler İçin?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {service.audience.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/5 p-5 sm:p-6">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Neler Dahil?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {service.includes.map((item) => (
              <div key={item} className="rounded-xl bg-white/5 border border-white/5 px-6 py-5 text-gray-300 text-lg leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Süreç</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {service.process.map((step, index) => (
              <div key={step} className="rounded-xl bg-slate-900/70 border border-white/10 p-6">
                <div className="text-indigo-400 font-black mb-3">{String(index + 1).padStart(2, '0')}</div>
                <p className="text-gray-300 text-base leading-[1.7]">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Örnek Kullanım Senaryoları</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {service.useCases.map((item) => (
              <div key={item} className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-6 sm:p-7 text-indigo-100 text-lg leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">Sık Sorulan Sorular</h2>
          <div className="space-y-5">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 group">
                <summary className="cursor-pointer text-white font-bold">{faq.question}</summary>
                <p className="text-gray-300 text-lg leading-[1.75] mt-5">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="p-8 sm:p-12 lg:p-14 rounded-3xl mesh-gradient relative overflow-hidden text-center border border-white/10">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">İşletmeniz İçin Doğru Çözümü Netleştirelim</h2>
            <p className="text-gray-300 text-lg leading-[1.75] max-w-2xl mx-auto">
              İhtiyacınızı birlikte değerlendirip hızlı, ölçülebilir ve yayına hazır bir yol haritası çıkaralım.
            </p>
            <Link
              href={contactHref}
              className="inline-flex items-center px-9 py-5 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform"
            >
              {service.cta}
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
