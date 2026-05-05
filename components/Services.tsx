'use client'

import { useEffect, useState } from 'react'
import { 
  Server, 
  LayoutDashboard, 
  Users, 
  QrCode 
} from 'lucide-react'

const services = [
  {
    icon: Server,
    title: 'Web API Geliştirme',
    description: 'ASP.NET Core kullanarak modern mimari desenleri ve en iyi uygulamalar ile ölçeklenebilir ve güvenli RESTful API\'ler.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Panel Sistemleri',
    description: 'İş operasyonlarını ve verileri yönetmek için sezgisel arayüzlere sahip özel admin panelleri.',
  },
  {
    icon: Users,
    title: 'CRM & Otomasyon Çözümleri',
    description: 'Özel CRM sistemleri ve iş akışı otomasyon araçları ile iş süreçlerinizi kolaylaştırın.',
  },
  {
    icon: QrCode,
    title: 'QR Menü & Rezervasyon Sistemleri',
    description: 'QR kod menüler ve online rezervasyon sistemleri ile modern restoran yönetim çözümleri.',
  },
]

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('services')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Hizmetler</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            İşletmenizin dijital çağda başarılı olması için özel çözümler
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover-lift transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
