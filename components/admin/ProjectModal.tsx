'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Project } from '@/types/admin'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
  onSubmit: (data: FormData) => Promise<void>
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
  onSubmit
}: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-slate-900 border border-white/10 rounded-3xl p-6 lg:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-white">
                {project ? 'Projeyi Düzenle' : 'Yeni Proje'}
              </h3>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const image = formData.get('image')

              formData.set('order', String(parseInt(String(formData.get('order') || '0'), 10) || 0))
              formData.set('isActive', formData.get('isActive') === 'on' ? 'true' : 'false')

              if (project && image instanceof File && image.size === 0) {
                formData.delete('image')
              }

              await onSubmit(formData)
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Başlık</label>
                  <input name="title" defaultValue={project?.title} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori</label>
                  <input name="category" defaultValue={project?.category} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Açıklama</label>
                <textarea name="description" defaultValue={project?.description} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Teknolojiler (Virgülle ayırın)</label>
                  <input name="tech" defaultValue={project?.tech} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resim</label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    required={!project}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-indigo-600 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                  />
                  {project?.image && (
                    <p className="text-xs text-slate-500">Mevcut resim: {project.image}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Link</label>
                  <input name="link" defaultValue={project?.link || '#'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GitHub</label>
                  <input name="github" defaultValue={project?.github || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sıralama</label>
                  <input name="order" type="number" defaultValue={project?.order || 0} className="w-16 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer pt-6">
                  <input name="isActive" type="checkbox" defaultChecked={project?.isActive ?? true} className="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/50" />
                  <span className="text-sm font-bold text-white">Aktif</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                  {project ? 'Güncelle' : 'Oluştur'}
                </button>
                <button type="button" onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all">
                  Vazgeç
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
