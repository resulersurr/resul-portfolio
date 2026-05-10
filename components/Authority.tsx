'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Award, ShieldCheck, GitCommit, Users } from 'lucide-react'

export default function Authority() {
  return (
    <section id="authority" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-slate-950/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Teknik Otorite
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Kanıtlanmış <span className="gradient-text">Uzmanlık ve Güven</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* GitHub Authority */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl glass border border-white/10 hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#24292e] flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">GitHub Açık Kaynak</h4>
                <a href="https://github.com/resulersurer" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:underline">@resulersurer</a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2"><GitCommit className="w-4 h-4" /> Yıllık Commit</span>
                <span className="text-white font-bold">1,200+</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2"><Users className="w-4 h-4" /> Açık Kaynak Proje</span>
                <span className="text-white font-bold">15+</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Modern backend mimarileri ve mikroservis tasarımları üzerine açık kaynak kod örnekleri ve kütüphane geliştirme çalışmaları.
            </p>
          </motion.article>

          {/* LinkedIn Authority */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-3xl glass border border-white/10 hover:border-[#0077b5]/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0077b5] flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Profesyonel Ağ</h4>
                <a href="https://linkedin.com/in/resulersurer" target="_blank" rel="noopener noreferrer" className="text-sm text-[#0077b5] hover:underline">LinkedIn Profilim</a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2"><Users className="w-4 h-4" /> Bağlantı</span>
                <span className="text-white font-bold">500+</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-2"><Award className="w-4 h-4" /> Endorsements</span>
                <span className="text-white font-bold">50+</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Kurumsal firmalarla başarılı projeler, mimari danışmanlıklar ve sektör profesyonelleri tarafından onaylanmış uzmanlık.
            </p>
          </motion.article>

          {/* Enterprise Certifications & Trust */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-3xl glass border border-white/10 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Kurumsal Güven</h4>
                <span className="text-sm text-emerald-400">Enterprise Standartlar</span>
              </div>
            </div>
            <ul className="space-y-3 mt-6">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>CQRS ve Clean Architecture Uygulamaları</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>%99.9 Uptime Hedefli Mimari Tasarımı</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Güvenli (OWASP uyumlu) API Geliştirme</span>
              </li>
            </ul>
          </motion.article>

        </div>
      </div>
    </section>
  )
}
