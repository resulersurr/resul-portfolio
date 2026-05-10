'use client'

import { motion } from 'framer-motion'
import { Settings, Trash2 } from 'lucide-react'
import { Service } from '@/types/admin'

interface ServicesTabProps {
  services: Service[]
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
}

export default function ServicesTab({
  services,
  onEdit,
  onDelete
}: ServicesTabProps) {
  return (
    <div className="space-y-3">
      {services.map((service) => (
        <motion.div
          layout
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="p-4 lg:p-6 rounded-xl bg-slate-900/50 border border-white/5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-0.5`}>
                <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white">{service.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-1">{service.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-emerald-400 font-bold">{service.price} {service.priceUnit}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${service.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {service.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(service)}
                className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"
              >
                Düzenle
              </button>
              <button
                onClick={() => onDelete(service.id)}
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
