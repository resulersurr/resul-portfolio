'use client'

import { motion } from 'framer-motion'
import { User, CheckCircle, Circle, Trash2, CheckSquare, Square } from 'lucide-react'
import { Message } from '@/types/admin'
import { formatShortDate } from '@/lib/utils'

interface MessagesTabProps {
  messages: Message[]
  selectedItems: Set<string>
  toggleSelection: (id: string) => void
  setSelectedMessage: (message: Message) => void
  toggleRead: (id: string, read: boolean) => void
  onDelete: (id: string) => void
}

export default function MessagesTab({
  messages,
  selectedItems,
  toggleSelection,
  setSelectedMessage,
  toggleRead,
  onDelete
}: MessagesTabProps) {
  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <motion.div
          layout
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`group relative p-4 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 ${
            message.read 
              ? 'bg-slate-900/30 border-white/5' 
              : 'bg-slate-900/80 border-indigo-500/20 shadow-lg shadow-indigo-500/5'
          }`}
        >
          {/* Selection Checkbox */}
          <button
            onClick={() => toggleSelection(message.id)}
            className="absolute top-3 left-3 lg:top-4 lg:left-4 z-10"
          >
            {selectedItems.has(message.id) ? (
              <CheckSquare className="w-5 h-5 text-indigo-400" />
            ) : (
              <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
            )}
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pl-8 lg:pl-10">
            <div 
              className="flex-1 space-y-2 lg:space-y-3 cursor-pointer"
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex flex-wrap items-center gap-2">
                {!message.read && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase">
                    Yeni
                  </span>
                )}
                {message.projectType && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/20">
                    {message.projectType}
                  </span>
                )}
                <span className="text-xs text-slate-500">{formatShortDate(message.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white">{message.name}</span>
                {message.phone && (
                  <span className="text-sm text-emerald-400">• {message.phone}</span>
                )}
              </div>

              <p className="text-slate-300 text-sm lg:text-base line-clamp-2">
                {message.message}
              </p>
            </div>

            <div className="flex lg:flex-col gap-2 pl-8 lg:pl-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleRead(message.id, message.read)
                }}
                className={`p-2 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all ${
                  message.read
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {message.read ? <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" /> : <Circle className="w-4 h-4 lg:w-5 lg:h-5" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(message.id)
                }}
                className="p-2 lg:w-10 lg:h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
