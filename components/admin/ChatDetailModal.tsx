'use client'

import { motion } from 'framer-motion'
import { X, User, Calendar, Smartphone, Trash2, Bot } from 'lucide-react'
import { ChatSession } from '@/types/admin'
import { formatDate } from '@/lib/utils'

interface ChatDetailModalProps {
  chat: ChatSession
  onClose: () => void
  onDelete: (id: string) => void
}

interface MessageBubble {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatDetailModal({
  chat,
  onClose,
  onDelete,
}: ChatDetailModalProps) {
  let messageList: MessageBubble[] = []
  try {
    messageList = JSON.parse(chat.messages)
  } catch (err) {
    console.error('Failed to parse chat messages:', err)
  }

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
        className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-xl w-full max-h-[85vh] flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lead Info Header */}
        <div className="mb-6 shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/20">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {chat.name}
              </h3>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">AI Sohbet Logu</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>{formatDate(chat.updatedAt)}</span>
            </div>
            {chat.phone && (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Smartphone className="w-4 h-4" />
                <a href={`tel:${chat.phone}`} className="hover:underline">
                  {chat.phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Chat Transcript Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950/50 border border-white/5 rounded-xl space-y-4 mb-6 min-h-[300px]">
          {messageList.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-sm">Mesaj bulunamadı.</div>
          ) : (
            messageList.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[85%] flex flex-col">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-sm font-medium'
                        : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className={`text-[10px] text-gray-500 mt-1 block ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.role === 'user' ? 'Kullanıcı' : 'AI Asistan'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-grow py-3 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 hover:text-white transition-all"
          >
            Kapat
          </button>
          <button
            onClick={() => onDelete(chat.id)}
            className="py-3 px-5 rounded-xl bg-red-500/10 text-red-400 font-bold text-sm hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-500/10"
            title="Sohbeti Sil"
          >
            <Trash2 className="w-5 h-5" />
            Sohbeti Sil
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
