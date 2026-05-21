'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Code2, Lightbulb, Rocket, Search } from 'lucide-react'

const steps = [
  {
    title: 'İhtiyaç Analizi',
    desc: 'İşletmenizin sürecini ve hangi ürün altyapısının size uygun olduğunu belirliyorum.',
    icon: Search,
    color: 'bg-blue-500/10 text-blue-400',
  },
  {
    title: 'Ürün Seçimi & Özelleştirme',
    desc: 'Hazır SaaS veya web altyapısını markanıza, iş akışınıza ve veri yapınıza göre uyarlıyorum.',
    icon: Lightbulb,
    color: 'bg-purple-500/10 text-purple-400',
  },
  {
    title: 'Geliştirme & Entegrasyon',
    desc: 'Panel, form, ödeme, bildirim, AI otomasyon veya API entegrasyonlarını ekliyorum.',
    icon: Code2,
    color: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    title: 'Yayına Alma & Destek',
    desc: 'Projeyi Vercel üzerinde yayına alıyor, performans ve kullanım sürecini takip ediyorum.',
    icon: Rocket,
    color: 'bg-cyan-500/10 text-cyan-400',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Süreç
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            Nasıl <span className="gradient-text">Çalışıyorum?</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Hazır ürün altyapılarını işletmenizin gerçek ihtiyacına göre seçip özelleştiriyor, hızlı ve ölçülebilir şekilde yayına alıyorum.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="absolute -top-6 -left-2 text-8xl font-black text-white/[0.03] select-none group-hover:text-white/[0.05] transition-colors duration-500">
                0{index + 1}
              </div>

              <div className={`w-20 h-20 rounded-3xl ${step.color} border border-white/5 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                <step.icon size={32} />
                <div className="absolute -right-2 -bottom-2 bg-slate-900 rounded-full p-1 border border-white/10">
                  <CheckCircle2 size={16} className="text-green-400" />
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed px-4 group-hover:text-gray-400 transition-colors duration-300">
                {step.desc}
              </p>

              {index !== steps.length - 1 && (
                <div className="md:hidden w-px h-12 bg-gradient-to-b from-indigo-500/20 to-transparent mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
