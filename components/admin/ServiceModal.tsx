'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Service } from '@/types/admin'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service: Service | null
  onSubmit: (data: any) => Promise<void>
}

export default function ServiceModal({
  isOpen,
  onClose,
  service,
  onSubmit
}: ServiceModalProps) {
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
                {service ? 'Hizmeti Düzenle' : 'Yeni Hizmet'}
              </h3>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const data = Object.fromEntries(formData.entries())
              await onSubmit({
                ...data,
                price: parseFloat(data.price as string),
                order: parseInt(data.order as string),
                isActive: data.isActive === 'on'
              })
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Başlık</label>
                  <input name="title" defaultValue={service?.title} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">İkon</label>
                  <input name="icon" defaultValue={service?.icon} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Açıklama</label>
                <textarea name="description" defaultValue={service?.description} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fiyat</label>
                  <input name="price" type="number" step="0.01" defaultValue={service?.price} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Birim</label>
                  <input name="priceUnit" defaultValue={service?.priceUnit || 'USDT'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Renk (Tailwind)</label>
                  <input name="color" defaultValue={service?.color || 'from-blue-500 to-indigo-600'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sıralama</label>
                  <input name="order" type="number" defaultValue={service?.order || 0} className="w-16 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer pt-6">
                  <input name="isActive" type="checkbox" defaultChecked={service?.isActive ?? true} className="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/50" />
                  <span className="text-sm font-bold text-white">Aktif</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                  {service ? 'Güncelle' : 'Oluştur'}
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
