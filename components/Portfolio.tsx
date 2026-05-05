'use client'

import { useEffect, useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'Admin Panel Sistemi',
    description: 'Kurumsal uygulamalar için gerçek zamanlı analiz, kullanıcı yönetimi ve veri görselleştirme özellikli kapsamlı admin panel.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['ASP.NET Core', 'React', 'PostgreSQL'],
  },
  {
    title: 'QR Menü Web Sitesi',
    description: 'QR kod menüler, online sipariş ve rezervasyon yönetimi özellikleri ile modern restoran yönetim sistemi.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
  },
  {
    title: 'CRM Sistemi',
    description: 'Potansiyel müşteri takibi, satış pipeline\'ı ve otomatik iş akışı özellikli müşteri ilişkileri yönetim platformu.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['ASP.NET Core', 'Angular', 'SQL Server'],
  },
]

export default function Portfolio() {
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

    const element = document.getElementById('portfolio')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Portfolyo</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Ölçeklenebilir yazılım çözümleri oluşturma konusundaki uzmanlığı gösteren son projeler
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover-lift transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                      <Github className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full border border-gray-800 hover:bg-gray-800 transition-all duration-300"
          >
            Daha Fazla Proje
          </a>
        </div>
      </div>
    </section>
  )
}
