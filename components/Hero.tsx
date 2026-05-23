'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bot, Boxes, Rocket, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden mesh-gradient">
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />

      <div className="max-w-5xl mx-auto text-center relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/10 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wide uppercase">
              Next.js, Vercel, SaaS MVP ve AI otomasyon
            </span>
          </motion.div>

          <header className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight"
            >
              <span className="block text-white">Next.js, Vercel ve AI Otomasyon ile</span>
              <span className="gradient-text">İşletmeniz İçin Hızlı Dijital Ürünler</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              KOBİ’ler, ajanslar, danışmanlar ve girişimciler için hızlı açılan işletme web siteleri, SaaS MVP’leri, admin paneller ve AI destekli otomasyonlar geliştiriyorum.
            </motion.p>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-10 py-5 gradient-bg text-white font-bold rounded-2xl shadow-2xl shadow-indigo-500/40 transition-all duration-300 text-center leading-snug"
            >
              Ücretsiz Proje Analizi Al
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex w-full sm:w-auto items-center justify-center px-6 sm:px-10 py-5 glass text-white font-bold rounded-2xl border border-white/10 transition-all duration-300 text-center leading-snug"
            >
              Hizmetleri İncele
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 max-w-4xl mx-auto"
          >
            {[
              { icon: Sparkles, label: 'Next.js & Vercel', desc: 'Modern web altyapısı' },
              { icon: Rocket, label: 'SaaS MVP', desc: 'Hızlı yayına çıkış' },
              { icon: Bot, label: 'AI Otomasyon', desc: 'Verimli iş akışları' },
              { icon: Boxes, label: 'Hazır Dijital Ürünler', desc: 'Kurulabilir sistemler' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center space-y-2 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-indigo-400" />
                <span className="text-white font-semibold text-sm">{item.label}</span>
                <span className="text-gray-500 text-xs text-center">{item.desc}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-1/4 left-10 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
      <div className="absolute top-3/4 right-20 w-3 h-3 bg-purple-500 rounded-full animate-ping" />
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
    </section>
  )
}
