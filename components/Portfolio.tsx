'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

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
    <section id="portfolio" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
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
              className="text-4xl sm:text-6xl font-bold text-white"
            >
              Hazır Kurulabilir <span className="gradient-text">Yazılım Ürünleri</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mt-6"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {sortedProjects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group flex flex-col bg-slate-900/40 rounded-[2rem] border border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10 opacity-60" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.split(',').map((t, i) => (
                    <span key={i} className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest px-2 py-1 rounded bg-indigo-500/10">
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3">
                  <a 
                    href={`/projects/${project.id}`}
                    className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-indigo-400 hover:text-white transition-all duration-300"
                  >
                    Ürünü İncele
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a 
                    href={`/#contact?service=${encodeURIComponent(project.title)}`}
                    className="shrink-0 flex items-center justify-center gap-2 py-3 px-4 rounded-xl glass border border-white/10 text-white hover:bg-white/10 transition-all duration-300 text-sm font-bold"
                    aria-label="Planı konuşalım"
                  >
                    Planı Konuşalım
                    <ExternalLink className="w-4 h-4" />
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
