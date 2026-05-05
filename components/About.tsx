'use client'

import { useEffect, useState } from 'react'
import { Code2, Database, Globe, Zap } from 'lucide-react'

const skills = [
  { icon: Code2, name: 'ASP.NET Core', level: 95 },
  { icon: Database, name: 'Web API Geliştirme', level: 90 },
  { icon: Globe, name: 'Admin Panel Sistemleri', level: 92 },
  { icon: Zap, name: 'CRM & Otomasyon', level: 88 },
]

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setSkillsVisible(true), 300)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('about')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Hakkımda</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Backend Developer & System Builder
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Modern teknolojileri kullanarak ölçeklenebilir backend sistemleri, admin panelleri ve iş otomasyon araçları oluşturma konusunda uzmanlaştım. ASP.NET Core ve Web API geliştirmede güçlü bir temelle, işletmelerin sağlam, verimli ve bakımı kolay yazılım çözümleri oluşturmasına yardımcı oluyorum.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Odağım, iş gereksinimlerini anlamak ve bunları büyümeyi ve verimliliği teşvik eden teknik çözümlere dönüştürmektir. Kurumsal düzeyde admin panellerinden otomatik CRM sistemlerine kadar, sadece işlevsel olmakla kalmayan aynı zamanda ölçeklenebilir ve geleceğe hazır kod teslim ediyorum.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Her proje, karmaşık sorunları çözmek ve teknoloji aracılığıyla değer yaratmak için bir fırsattır. Temiz kod, en iyi uygulamalar ve işletmelerin nasıl çalıştığında gerçek fark yaratan sistemler oluşturmak konusunda tutkuluyum.
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-white mb-6">Temel Uzmanlık Alanları</h4>
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return (
                <div
                  key={index}
                  className="space-y-2"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full gradient-bg rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: skillsVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 100 + 500}ms`
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-gray-800">
          {[
            { number: '50+', label: 'Tamamlanan Proje' },
            { number: '5+', label: 'Yıllık Deneyim' },
            { number: '30+', label: 'Mutlu Müşteri' },
            { number: '100%', label: 'Memnuniyet Oranı' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
