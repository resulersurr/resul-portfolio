'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Turizm Operasyon Paneli',
    role: 'Canlı Konum & Ekip Takibi',
    content: 'Araç, rehber ve müşteri hareketleri tek panelde toplandı. Operasyon ekibi günlük takip sürecini daha az manuel iş ve daha hızlı koordinasyonla yönetmeye başladı.',
    image: '/images/logo2.png',
  },
  {
    name: 'Ajans Yönetim Sistemi',
    role: 'SaaS Dashboard Altyapısı',
    content: 'Müşteri, proje, görev ve raporlama süreçleri tek dashboard altında birleşti. Hazır Next.js altyapısı sayesinde ürün haftalar içinde kullanılabilir hale geldi.',
    image: '/images/logo2.png',
  },
  {
    name: 'AI Raporlama Otomasyonu',
    role: 'Tekrarlayan İş Süreçleri',
    content: 'Manuel veri kontrolü ve raporlama adımları AI destekli otomasyonlarla hızlandı. Ekip, tekrar eden işlerden stratejik kararlara daha fazla zaman ayırabildi.',
    image: '/images/logo2.png',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-10 bg-slate-950/20">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-20 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Ürün Çıktıları
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-7 leading-tight"
          >
            Hazır Sistemlerle <span className="gradient-text">Hızlı Sonuçlar</span>
          </motion.h3>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 sm:p-10 rounded-[2rem] glass border border-white/5 flex flex-col relative group overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-indigo-500/20 transition-colors duration-500">
                <Quote size={80} />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-indigo-400 text-indigo-400" />
                ))}
              </div>

              <p className="text-gray-300 text-base leading-[1.75] italic mb-10 flex-grow relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 relative">
                  <Image src={testimonial.image} alt={testimonial.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
