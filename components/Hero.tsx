'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Briefcase } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`space-y-8 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
            <span className="text-sm text-gray-300">Projeler İçin Uygun</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="block text-white">Ölçeklenebilir</span>
            <span className="block gradient-text">Web API & Admin Panel sistemleri kuruyorum</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            İşletmelerin özel yazılım çözümleri ile operasyonları otomatikleştirmesine ve büyümesine yardımcı oluyorum
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#contact"
              className="group inline-flex items-center px-8 py-4 gradient-bg text-white font-medium rounded-full hover-lift transition-all duration-300"
            >
              Teklif Al
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            <a
              href="#portfolio"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full border border-gray-800 hover:bg-gray-800 transition-all duration-300"
            >
              Portfolyoyu Görüntüle
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">50+</div>
              <div className="text-sm text-gray-400 mt-1">Tamamlanan Proje</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">5+</div>
              <div className="text-sm text-gray-400 mt-1">Yıllık Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-sm text-gray-400 mt-1">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
