'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 px-5 sm:px-8 lg:px-10 border-t border-white/5 bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* CTA Banner */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl glass border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-1">Ürününüzü Konuşalım</p>
            <h3 className="text-2xl font-black text-white">Uygun Yazılım Çözümünü Birlikte Netleştirelim</h3>
            <p className="text-gray-400 mt-1 text-sm">Next.js web sitesi, SaaS MVP, admin panel veya AI otomasyon ihtiyacınızı değerlendirelim.</p>
          </div>
          <Link
            href="/#contact"
            className="shrink-0 px-9 py-5 rounded-xl gradient-bg text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20"
          >
            Ücretsiz Proje Analizi Al
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Link href="/">
                <img src="/images/logo.png" alt="Ersürer Logo" className="h-10 w-auto" />
              </Link>
            </motion.div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              Next.js, Vercel ve AI otomasyonlarla işletmeler için hızlı yayına alınabilen SaaS MVP’leri, admin paneller, web siteleri ve dijital ürün sistemleri geliştiriyorum.
            </p>
            {/* Social Links — prominent */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Profesyonel Profiller</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/resulersurr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-white hover:border-indigo-500/40 transition-all text-sm font-medium"
                  aria-label="GitHub Profili"
                >
                  <Github className="w-4 h-4" /> GitHub
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
                <a
                  href="https://www.linkedin.com/in/resulersurer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-white hover:border-indigo-500/40 transition-all text-sm font-medium"
                  aria-label="LinkedIn Profili"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
                <a
                  href="mailto:resul.ersurer@icloud.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-white hover:border-indigo-500/40 transition-all text-sm font-medium"
                  aria-label="E-posta"
                >
                  <Mail className="w-4 h-4" /> E-posta
                </a>
              </div>
            </div>
          </div>

          {/* Hizmetler */}
          <nav aria-label="Hizmetler">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6">Hizmetler</h4>
            <ul className="space-y-3">
              {[
                { name: 'SaaS MVP Geliştirme', href: '/services/saas-mvp-gelistirme' },
                { name: 'AI Otomasyon', href: '/services/ai-otomasyon' },
                { name: 'Next.js İşletme Web Sitesi', href: '/services/nextjs-isletme-web-sitesi' },
                { name: 'Admin Panel ve Dashboard', href: '/services/admin-panel-dashboard' },
                { name: 'Vercel Danışmanlık', href: '/services/vercel-danismanlik' },
                { name: 'Hazır SaaS Ürünleri', href: '/services/hazir-saas-urunleri' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group text-sm">
                    <span className="w-0 group-hover:w-4 h-px bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* İçerik & Ürünler */}
          <nav aria-label="İçerik ve Ürünler">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-6">İçerik & Ürünler</h4>
            <ul className="space-y-3">
              {[
                { name: 'Blog Yazıları', href: '/blog' },
                { name: 'Dijital Ürünler', href: '/#portfolio' },
                { name: 'Canlı Konum Takip', href: '/#portfolio' },
                { name: 'Admin Panel & Dashboard', href: '/#services' },
                { name: 'İletişim', href: '/#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group text-sm">
                    <span className="w-0 group-hover:w-4 h-px bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-500 text-sm">
            <p>© {currentYear} Resul Ersürer. Tüm hakları saklıdır.</p>
            <span className="hidden md:block w-1 h-1 bg-gray-700 rounded-full" />
            <p className="flex items-center gap-1.5">
              Next.js, Vercel & Tailwind ile <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> geliştirildi.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Sitemap</Link>
            <span className="text-gray-800">|</span>
            <Link href="/robots.txt" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Robots</Link>
            <span className="text-gray-800">|</span>
            <Link href="/llms.txt" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">llms.txt</Link>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 transition-all duration-300 ml-2"
              aria-label="Yukarı Çık"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}


