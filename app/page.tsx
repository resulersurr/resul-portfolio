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
const Contact = dynamic(() => import('@/components/Contact'))
const Footer = dynamic(() => import('@/components/Footer'))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://resulersurer.com/#person",
      "name": "Resul Ersürer",
      "jobTitle": "Enterprise Software Architect",
      "url": "https://resulersurer.com",
      "sameAs": [
        "https://github.com/resulersurer",
        "https://linkedin.com/in/resulersurer"
      ],
      "knowsAbout": ["ASP.NET Core", "Backend Architecture", "Microservices", "System Design", "Node.js", "Next.js"]
    },
    {
      "@type": "Organization",
      "@id": "https://resulersurer.com/#organization",
      "name": "Resul Ersürer Consulting",
      "url": "https://resulersurer.com",
      "logo": "https://resulersurer.com/images/logo2.png"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Hangi teknolojilerle backend geliştiriyorsunuz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Temel olarak ASP.NET Core, C#, Node.js ve mikroservis mimarileri üzerine uzmanlığım bulunmaktadır. Veritabanı olarak PostgreSQL, SQL Server ve Redis gibi teknolojileri kullanıyorum."
          }
        },
        {
          "@type": "Question",
          "name": "Kurumsal mimari çözümleri sunuyor musunuz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evet, ölçeklenebilir, yüksek performanslı ve güvenli kurumsal seviye yazılım mimarileri tasarlayıp geliştiriyorum."
          }
        }
      ]
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
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
