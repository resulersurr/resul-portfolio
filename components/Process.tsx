'use client'

import { useEffect, useState } from 'react'
import { Search, FileText, Code, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Analiz Et',
    description: 'Proje için sağlam bir temel oluşturmak amacıyla iş gereksinimlerinizi, zorluklarınızı ve hedeflerinizi anlama.',
  },
  {
    icon: FileText,
    title: 'Planla',
    description: 'Başarılı teslimatı sağlamak için detaylı proje mimarisi, zaman çizelgesi ve teknik spesifikasyonlar oluşturma.',
  },
  {
    icon: Code,
    title: 'Geliştir',
    description: 'Sürekli güncellemeler ve geri bildirim döngüleri ile temiz, ölçeklenebilir kod geliştirme.',
  },
  {
    icon: Rocket,
    title: 'Teslim Et',
    description: 'Çözümü dağıtma, dokümantasyon sağlama ve uzun vadeli başarı için sürekli destek sunma.',
  },
]

export default function Process() {
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

    const element = document.getElementById('process')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Süreç</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Olağanüstü yazılım çözümleri sunmak için yapılandırılmış bir yaklaşım
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-white">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="relative p-6 rounded-2xl bg-gray-900 border border-gray-800 hover-lift h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transform -translate-y-1/2" />
                )}
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Projenize başlamaya hazır mısınız? Fikirlerinizi hayata geçirmek için birlikte çalışalım.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 gradient-bg text-white font-medium rounded-full hover-lift transition-all duration-300"
          >
            Projenizi Başlatın
          </a>
        </div>
      </div>
    </section>
  )
}
