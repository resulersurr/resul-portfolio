'use client'

import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:resul@example.com', label: 'Email' },
  ]

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src="/images/logo.png" alt="Ersürer Logo" className="h-8 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Backend Developer & System Builder, dünya çapındaki işletmeler için ölçeklenebilir yazılım çözümleri oluşturuyor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Hizmetler
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Portfolyo
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Hakkımda
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Bağlantı</h4>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Resul Ersürer. Tüm hakları saklıdır.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Next.js & Tailwind CSS ile <Heart className="w-4 h-4 text-red-500 fill-current" /> ile yapıldı
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
