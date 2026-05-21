'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, Code2, Globe, LayoutDashboard, RefreshCcw, Rocket, Settings } from 'lucide-react'

const SERVICE_ITEMS = [
  {
    title: 'SaaS MVP Geliştirme',
    icon: Rocket,
    description: 'Next.js ve Vercel ile fikrinizi hızlıca çalışan, yayına hazır bir SaaS MVP’ye dönüştürüyorum.',
  },
  {
    title: 'AI Otomasyon Sistemleri',
    icon: Bot,
    description: 'Tekrar eden iş süreçlerinizi AI destekli otomasyonlarla hızlandırıp daha verimli hale getiriyorum.',
  },
  {
    title: 'İşletme Web Sitesi',
    icon: Globe,
    description: 'İşletmeniz için modern, hızlı, mobil uyumlu ve dönüşüm odaklı web sitesi hazırlıyorum.',
  },
  {
    title: 'Admin Panel & Dashboard',
    icon: LayoutDashboard,
    description: 'Müşteri, sipariş, operasyon ve verilerinizi tek panelden yönetebileceğiniz özel dashboard geliştiriyorum.',
  },
  {
    title: 'Ürün Özelleştirme & Kurulum',
    icon: Settings,
    description: 'Hazır dijital ürünlerimi işletmenizin süreçlerine göre özelleştirip yayına alıyorum.',
  },
  {
    title: 'Mevcut Siteyi Modernleştirme',
    icon: RefreshCcw,
    description: 'Eski veya yavaş web sitenizi modern tasarım, hızlı altyapı ve SEO uyumuyla yeniliyorum.',
  },
]

const ICON_MAP: Record<string, any> = {
  Rocket,
  Bot,
  Globe,
  LayoutDashboard,
  RefreshCcw,
  Settings,
  Code2,
}

interface Service {
  id: string
  title: string
  description: string
  price: number
  priceUnit: string
  icon: string
  color: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      if (data.services) setServices(data.services)
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const displayServices = useMemo(() => {
    return SERVICE_ITEMS.map((item, index) => {
      const existing = services.find((service) => service.title === item.title) || services[index]

      return {
        ...item,
        id: existing?.id || item.title,
        price: existing?.price ?? 0,
        priceUnit: existing?.priceUnit || 'USDT',
        color: existing?.color || 'from-indigo-500 to-cyan-500',
        iconName: existing?.icon,
      }
    })
  }, [services])

  const requestQuote = (serviceTitle: string) => {
    const encodedService = encodeURIComponent(serviceTitle)
    window.history.pushState(null, '', `/#contact?service=${encodedService}`)
    window.dispatchEvent(new CustomEvent('service-selected', { detail: serviceTitle }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Yazılım Hizmetleri
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            SaaS, web sistemleri ve <span className="gradient-text">AI otomasyon</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            SaaS MVP geliştirme, işletme web siteleri, admin paneller ve AI destekli otomasyonlarla dijital süreçlerinizi hızlandırıyorum.
          </motion.p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[420px] rounded-3xl glass border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => {
              const Icon = service.icon || ICON_MAP[service.iconName || ''] || Code2

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-7 sm:p-8 rounded-3xl glass border border-white/5 hover:border-indigo-400/30 transition-all duration-500 overflow-hidden flex flex-col min-h-[420px] shadow-xl shadow-black/5 hover:shadow-indigo-500/10"
                >
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-25 blur-3xl transition-opacity duration-500`} />

                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-7 shadow-lg shadow-black/20 transition-transform duration-500 group-hover:scale-105`}>
                    <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
                    {service.title}
                  </h4>

                  <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                    {service.description}
                  </p>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Başlangıç:</span>
                      <span className="text-2xl font-black text-white">{service.price}</span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{service.priceUnit}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => requestQuote(service.title)}
                    className="mt-4 w-full py-3.5 px-4 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2 group/button"
                  >
                    Teklif Al
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </button>

                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent group-hover:w-full transition-all duration-700" />
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
