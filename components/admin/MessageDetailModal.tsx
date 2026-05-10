'use client'

import { motion } from 'framer-motion'
import { X, User, Calendar, Smartphone, Trash2 } from 'lucide-react'
import { Message } from '@/types/admin'
import { formatDate } from '@/lib/utils'

interface MessageDetailModalProps {
  message: Message
  onClose: () => void
  onToggleRead: (id: string, read: boolean) => void
  onDelete: (id: string) => void
}

export default function MessageDetailModal({
  message,
  onClose,
  onToggleRead,
  onDelete
}: MessageDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <User className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{message.name}</h3>
              {message.email && (
                <p className="text-sm text-gray-400">{message.email}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            {formatDate(message.createdAt)}
          </div>

          {message.phone && (
            <div className="flex items-center gap-2 mb-4 text-sm text-emerald-400">
              <Smartphone className="w-4 h-4" />
              {message.phone}
            </div>
          )}
          
          {message.subject && (
            <div className="mb-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Konu</span>
              <p className="text-white font-medium">{message.subject}</p>
            </div>
          )}

          {(message.projectType || message.budget || message.timeline) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {message.projectType && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Proje Türü</span>
                  <span className="text-sm text-indigo-300 font-bold">{message.projectType}</span>
                </div>
              )}
              {message.budget && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Bütçe</span>
                  <span className="text-sm text-emerald-400 font-bold">{message.budget}</span>
                </div>
              )}
              {message.timeline && (
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Hedef Süre</span>
                  <span className="text-sm text-amber-400 font-bold">{message.timeline}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="p-4 bg-gray-800/50 rounded-xl">
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{message.message}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggleRead(message.id, message.read)}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium text-sm hover:bg-indigo-500/20 transition-all"
          >
            {message.read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}
          </button>
          <button
            onClick={() => onDelete(message.id)}
            className="py-3 px-4 rounded-xl bg-red-500/10 text-red-400 font-medium text-sm hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
