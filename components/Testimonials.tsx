'use client'

import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Ayşe Yılmaz',
    role: 'CEO, TechStart Inc.',
    content: 'Resul, operasyonlarımızı dönüştüren olağanüstü bir admin panel sistemi teslim etti. Detaylara dikkat etmesi ve iş ihtiyaçlarımızı anlama yeteneği etkileyiciydi. Sistem sağlam, ölçeklenebilir ve tam olarak ihtiyacımız olan şeydi.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  },
  {
    name: 'Mehmet Kaya',
    role: 'Restoran Sahibi, Modern Masa',
    content: 'Resul\'in restoranımız için oluşturduğu QR menü ve rezervasyon sistemi gerçekten oyun değiştirdi. Müşterilerimiz kolaylığı seviyor ve personel verimliliğimiz önemli ölçüde arttı. Hizmetlerini kesinlikle tavsiye ederim!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
]

export default function Testimonials() {
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

    const element = document.getElementById('testimonials')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Müşteri Yorumları</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Müşteriler benimle çalışma hakkında ne diyor
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-gray-900 border border-gray-800 hover-lift transition-all duration-700 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-purple-600/20" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-gray-900/50 border border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-sm text-gray-300">Projeler İçin Uygun</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Yanıt Süresi:</span>
              <span className="text-sm text-white font-medium">24 saat içinde</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
