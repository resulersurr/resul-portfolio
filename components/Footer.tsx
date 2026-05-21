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
    <footer className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto">

        {/* CTA Banner */}
        <div className="mb-20 p-8 rounded-3xl glass border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-1">Ürününüzü Konuşalım</p>
            <h3 className="text-2xl font-black text-white">Uygun Yazılım Çözümünü Birlikte Netleştirelim</h3>
            <p className="text-gray-400 mt-1 text-sm">SaaS MVP, web sistemi veya AI otomasyon ihtiyacınızı değerlendirelim.</p>
          </div>
          <Link
            href="/#contact"
            className="shrink-0 px-8 py-4 rounded-xl gradient-bg text-white font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-indigo-500/20"
          >
            Hemen İletişime Geç →
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
              Next.js, Vercel ve AI otomasyonlarla işletmeler için hızlı kurulabilen SaaS MVP’leri, web sistemleri ve dijital ürün altyapıları geliştiriyorum.
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
                { name: 'SaaS MVP Geliştirme', href: '/#contact?service=SaaS%20MVP%20Geli%C5%9Ftirme' },
                { name: 'AI Otomasyon', href: '/#contact?service=AI%20Otomasyon%20Sistemi' },
                { name: 'İşletme Web Sitesi', href: '/#contact?service=%C4%B0%C5%9Fletme%20Web%20Sitesi' },
                { name: 'Admin Panel', href: '/#contact?service=Admin%20Panel%20%2F%20Dashboard' },
                { name: 'Ürün Özelleştirme', href: '/#contact?service=Haz%C4%B1r%20%C3%9Cr%C3%BCn%20%C3%96zelle%C5%9Ftirme' },
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


