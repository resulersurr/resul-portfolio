import Script from 'next/script'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Navigation from '@/components/Navigation'

// Lazy loaded components for better performance (LCP, TTI)
const About = dynamic(() => import('@/components/About'))
const Process = dynamic(() => import('@/components/Process'))
const Testimonials = dynamic(() => import('@/components/Testimonials'))
const Authority = dynamic(() => import('@/components/Authority'))
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ersurer.com/#person",
      "name": "Resul Ersürer",
      "jobTitle": "SaaS Product Developer & AI Automation Specialist",
      "url": "https://ersurer.com",
      "sameAs": [
        "https://github.com/resulersurer",
        "https://linkedin.com/in/resulersurer"
      ],
      "knowsAbout": ["Next.js", "Vercel", "TypeScript", "Tailwind CSS", "SaaS MVP", "AI Automation", "API Integrations", "Prisma", "PostgreSQL"]
    },
    {
      "@type": "Organization",
      "@id": "https://ersurer.com/#organization",
      "name": "Resul Ersürer Product Studio",
      "url": "https://ersurer.com",
      "logo": "https://ersurer.com/images/logo2.png"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Hangi teknolojilerle SaaS MVP ve web sistemleri geliştiriyorsunuz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Next.js, Vercel, TypeScript, Tailwind CSS, Prisma, PostgreSQL ve AI otomasyon araçlarıyla hızlı kurulabilen SaaS MVP, web sistemi ve admin panel altyapıları geliştiriyorum."
          }
        },
        {
          "@type": "Question",
          "name": "Hazır dijital ürünleri işletmeye göre özelleştiriyor musunuz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evet, hazır SaaS ve web ürün altyapılarını işletmenin sektörüne, marka yapısına, veri akışına ve entegrasyon ihtiyaçlarına göre özelleştirip yayına alıyorum."
          }
        }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://ersurer.com/#website",
      "url": "https://ersurer.com",
      "name": "Resul Ersürer | Next.js, SaaS MVP ve AI Otomasyon Çözümleri",
      "publisher": {
        "@id": "https://ersurer.com/#organization"
      }
    }
  ]
}

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-indigo-500/30">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <Hero />
      <div className="relative z-10 space-y-0">
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Testimonials />
        <Authority />
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
