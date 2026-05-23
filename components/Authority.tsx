'use client'

import { motion } from 'framer-motion'
import { Bot, Gauge, MapPinned, Rocket } from 'lucide-react'

const outcomes = [
  {
    icon: MapPinned,
    title: 'Operasyon Takibi',
    desc: 'Araç, rehber, müşteri veya ekip hareketlerini tek panelden takip edin.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Rocket,
    title: 'Daha Hızlı Yayına Çıkış',
    desc: 'Hazır Next.js altyapılarıyla haftalar içinde kullanılabilir ürün sahibi olun.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Bot,
    title: 'AI Destekli Otomasyon',
    desc: 'Tekrar eden müşteri, raporlama ve takip süreçlerini otomatikleştirin.',
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    icon: Gauge,
    title: 'Modern Web Altyapısı',
    desc: 'Vercel, Next.js ve TypeScript ile hızlı, güvenli ve ölçeklenebilir web sistemleri kurun.',
    color: 'from-emerald-500 to-teal-600',
  },
]

export default function Authority() {
  return (
    <section id="authority" className="py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-10 relative bg-slate-950/50 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Sonuç Odaklı Sistemler
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-7 leading-tight"
          >
            Ürünleşmiş Çözümlerle Elde Edebileceğiniz <span className="gradient-text">Sonuçlar</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {outcomes.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 sm:p-9 rounded-3xl glass border border-white/10 hover:border-indigo-500/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-base text-gray-500 leading-[1.7] group-hover:text-gray-400 transition-colors">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
