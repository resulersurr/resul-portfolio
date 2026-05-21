'use client'

import { motion } from 'framer-motion'
import { Bot, Code2, Cpu, Database, Globe, Layers, Rocket, Server, Workflow, Zap } from 'lucide-react'

const skills = [
  { name: 'Next.js', level: 95, color: 'from-cyan-400 to-blue-500' },
  { name: 'TypeScript', level: 90, color: 'from-blue-400 to-indigo-500' },
  { name: 'Tailwind CSS', level: 90, color: 'from-sky-400 to-cyan-500' },
  { name: 'Vercel', level: 90, color: 'from-white to-slate-400' },
  { name: 'Prisma/PostgreSQL', level: 85, color: 'from-emerald-400 to-teal-500' },
  { name: 'AI Automation', level: 85, color: 'from-purple-400 to-pink-500' },
  { name: 'API Integrations', level: 85, color: 'from-amber-300 to-orange-500' },
  { name: 'ASP.NET Core', level: 70, color: 'from-slate-400 to-indigo-400' },
]

const techStack = [
  { icon: Code2, name: 'Next.js' },
  { icon: Rocket, name: 'Vercel' },
  { icon: Code2, name: 'TypeScript' },
  { icon: Globe, name: 'Tailwind CSS' },
  { icon: Database, name: 'Prisma' },
  { icon: Server, name: 'PostgreSQL' },
  { icon: Bot, name: 'AI Automation' },
  { icon: Workflow, name: 'API Integrations' },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Hakkımda</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
              Sadece Kod Yazmıyorum, <br />
              <span className="gradient-text">Ürünleştirilebilir Sistemler Kuruyorum</span>
            </h3>

            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Next.js, Vercel, modern web teknolojileri ve AI otomasyon araçlarıyla işletmeler için hızlı kurulabilen SaaS MVP’leri, admin paneller, web sistemleri ve dijital ürün altyapıları geliştiriyorum.
              </p>
              <p>
                Amacım, işletmelerin aylar süren yazılım süreçlerine girmeden daha hızlı yayına çıkmasını sağlamak. Hazır ürün altyapılarımı müşterinin sektörüne, iş akışına ve marka yapısına göre özelleştiriyorum.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-6 rounded-2xl glass border border-white/5">
                  <div className="text-3xl font-black text-white mb-1">5+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Yıllık Ürün Deneyimi</div>
                </div>
                <div className="p-6 rounded-2xl glass border border-white/5">
                  <div className="text-3xl font-black text-white mb-1">50+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Kurulabilir Sistem</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden"
            >
              <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Teknoloji Yığınım
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {techStack.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                    <tech.icon className="w-4 h-4 text-indigo-300" />
                    <span className="text-sm font-bold text-gray-300">{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-300 font-bold text-sm tracking-wide">{skill.name}</span>
                      <span className="text-indigo-400 font-black text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: 'circOut' }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-[2.5rem] gradient-bg relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-[0.2em] mb-4">
                  <Layers className="w-4 h-4 animate-bounce" />
                  Şu An Ne Geliştiriyorum?
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Hazır Next.js SaaS Ürün Altyapıları
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Turizm, ajans yönetimi, işletme operasyonları ve veri analizine uyarlanabilen, Vercel üzerinde hızlı yayına alınan ürün sistemleri geliştiriyorum.
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-white">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    Aktif Geliştirme
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10">Next.js + AI</span>
                </div>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Zap size={120} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
