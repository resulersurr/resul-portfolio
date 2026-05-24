'use client'

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Project } from '@/types/admin'
import Image from 'next/image'

interface ProjectsTabProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export default function ProjectsTab({
  projects,
  onEdit,
  onDelete
}: ProjectsTabProps) {
  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <motion.div
          layout
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="p-4 lg:p-6 rounded-xl bg-slate-900/50 border border-white/5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 rounded-lg overflow-hidden border border-white/10 relative">
                <Image src={project.image} alt="" fill sizes="80px" unoptimized={project.image.startsWith('data:')} className="object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white">{project.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-1">{project.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{project.tech}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(project)}
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                Düzenle
              </button>
              <button
                onClick={() => onDelete(project.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
