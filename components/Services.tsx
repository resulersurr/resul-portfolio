'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Globe, Zap, Settings, ShieldCheck, Copy, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const services = [
  {
    title: 'Özel Backend Geliştirme',
    desc: 'ASP.NET Core ve Web API kullanarak yüksek performanslı, güvenli ve ölçeklenebilir sunucu taraflı çözümler.',
    icon: Code2,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Kurumsal Admin Panelleri',
    desc: 'İş süreçlerinizi yönetmek için modern, hızlı ve kullanıcı dostu özel yönetim arayüzleri ve dashboardlar.',
    icon: Settings,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'CRM & Otomasyon',
    desc: 'Manuel işlemleri azaltan, verimliliği artıran ve müşteri ilişkilerinizi güçlendiren akıllı otomasyon sistemleri.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Sistem Entegrasyonları',
    desc: 'Farklı platformlar ve API\'lar arasında sorunsuz veri akışı sağlayan mimari tasarımlar ve implementasyonlar.',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Bulut Mimarisi & DevOps',
    desc: 'Azure ve Docker kullanarak uygulamalarınızın kesintisiz ve yüksek erişilebilirlikte çalışmasını sağlayan kurulumlar.',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Güvenlik & Optimizasyon',
    desc: 'Mevcut sistemlerinizin güvenlik açıklarını kapatma ve performans darboğazlarını giderme çalışmaları.',
    icon: ShieldCheck,
    color: 'from-rose-500 to-red-600',
  },
]

const WALLET_ADDRESS = 'TWResKHqM7tpuAuFyioAWfQbrj5XfV2LCi'

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [txid, setTxid] = useState('')
  const [copied, setCopied] = useState(false)

  const openPaymentModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
    setTxid('')
    setCopied(false)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Hizmetlerim
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            İşletmeniz İçin <span className="gradient-text">Güçlü Çözümler</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Teknoloji yığınım ve deneyimimle, işletmenizin dijital dönüşümünü hızlandırıyor ve operasyonel mükemmellik sağlıyorum.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl glass border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-8 shadow-lg shadow-black/20`}>
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                {service.desc}
              </p>

              {/* USDT Payment Button */}
              <button
                onClick={() => openPaymentModal(service.title)}
                className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                USDT ile Öde
              </button>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* USDT Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">USDT TRC20 ile Ödeme</h3>
            {selectedService && (
              <p className="text-sm text-gray-400 mb-6">{selectedService}</p>
            )}

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white rounded-xl">
                <QRCodeSVG value={WALLET_ADDRESS} size={160} />
              </div>
            </div>

            {/* Wallet Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Cüzdan Adresi</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={WALLET_ADDRESS}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono"
                />
                <button
                  onClick={copyAddress}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  title="Kopyala"
                >
                  <Copy className="w-4 h-4 text-white" />
                </button>
              </div>
              {copied && (
                <p className="text-xs text-emerald-400 mt-1">Adres kopyalandı!</p>
              )}
            </div>

            {/* Warning */}
            <div className="mb-4 p-3 bg-amber-900/30 border border-amber-800/50 rounded-lg">
              <p className="text-xs text-amber-300">
                Sadece USDT TRC20 ağı üzerinden gönderim yapınız. Yanlış ağdan yapılan transferlerde varlık kaybı yaşanabilir.
              </p>
            </div>

            {/* TXID Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                TXID / Transaction Hash
              </label>
              <input
                type="text"
                value={txid}
                onChange={(e) => setTxid(e.target.value)}
                placeholder="Ödeme işlem numarasını girin"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Ödeme yaptıktan sonra TXID bilgisini bizimle paylaşınız.
            </p>

            <button
              onClick={closeModal}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Kapat
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}
