'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string
  image: string
  link: string | null
  github: string | null
}

const PRODUCT_ORDER = [
  'Canlı Konum Takip',
  'TurTakip',
  'CoreDesk',
  'StudioFlow',
  'Founder Website Kit',
  'Crypto MA100 Scanner',
  'Trend Scanner',
]

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      if (data.projects) setProjects(data.projects)
    } catch (err) {
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const sortedProjects = [...projects].sort((a, b) => {
    const aIndex = PRODUCT_ORDER.indexOf(a.title)
    const bIndex = PRODUCT_ORDER.indexOf(b.title)

    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  return (
    <section id="portfolio" className="py-24 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-10 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-24 gap-10">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
            >
              Dijital Ürünler
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Hazır Kurulabilir <span className="gradient-text">Yazılım Ürünleri</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg sm:text-xl leading-[1.75] mt-7"
            >
              Turizmden ajans yönetimine, işletme operasyonlarından veri analizine kadar farklı alanlarda hızlı kurulabilen web ve SaaS ürünleri.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="group flex items-center gap-2 text-white font-semibold hover:text-indigo-400 transition-colors">
              Tüm Ürünleri Gör
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {sortedProjects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white/[0.82] shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-[250ms] ease-out hover:border-black/[0.08] hover:shadow-[0_28px_80px_rgba(0,0,0,0.08)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-white">
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/[0.04]" />
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={project.image.startsWith('data:')}
                  className="object-cover filter saturate-[0.96] contrast-[0.98] transition-transform duration-[350ms] ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute left-5 top-5 z-20">
                  <span className="rounded-full border border-black/[0.06] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.04em] text-slate-900 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col px-6 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-8 lg:px-10 lg:pb-10 lg:pt-9">
                <h4 className="mb-4 text-[26px] font-bold leading-tight tracking-[-0.02em] text-white transition-colors duration-[250ms] group-hover:text-indigo-400 lg:text-[28px]">
                  {project.title}
                </h4>
                <p className="mb-8 text-base leading-[1.65] text-gray-400 lg:text-[17px]">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-8 flex max-h-[74px] flex-wrap gap-2 overflow-hidden">
                  {project.tech.split(',').map((t, i) => (
                    <span key={i} className="rounded-full border border-[rgba(0,113,227,0.10)] bg-indigo-500/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-indigo-300">
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex flex-col items-stretch gap-3 pt-8 sm:flex-row lg:flex-col xl:flex-row xl:items-center">
                  <a 
                    href={`/projects/${project.id}`}
                    className="flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white/75 px-5 py-4 text-sm font-bold text-black shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-[250ms] hover:border-black/[0.12] hover:bg-white"
                  >
                    Ürünü İncele
                    <ChevronRight className="h-4 w-4" />
                  </a>
                  <a 
                    href={`/#contact?service=${encodeURIComponent(project.title)}`}
                    className="flex min-h-[54px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-5 py-4 text-sm font-bold text-[#FFFFFF] shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-[250ms] hover:bg-black xl:flex-1"
                    aria-label="Planı konuşalım"
                  >
                    Planı Konuşalım
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
