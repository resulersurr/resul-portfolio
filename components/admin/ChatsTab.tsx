'use client'

import { motion } from 'framer-motion'
import { CheckSquare, Square, Trash2, Bot, Smartphone, MessageSquare, ArrowRight } from 'lucide-react'
import { ChatSession } from '@/types/admin'
import { formatShortDate } from '@/lib/utils'

interface ChatsTabProps {
  chats: ChatSession[]
  selectedItems: Set<string>
  toggleSelection: (id: string) => void
  setSelectedChat: (chat: ChatSession) => void
  onDelete: (id: string) => void
}

export default function ChatsTab({
  chats,
  selectedItems,
  toggleSelection,
  setSelectedChat,
  onDelete,
}: ChatsTabProps) {
  const getMessageCount = (messagesJson: string) => {
    try {
      return JSON.parse(messagesJson).length
    } catch {
      return 0
    }
  }

  const getLastMessageText = (messagesJson: string) => {
    try {
      const messages = JSON.parse(messagesJson)
      if (messages.length > 0) {
        const lastMsg = messages[messages.length - 1]
        return lastMsg.content
      }
      return ''
    } catch {
      return ''
    }
  }

  return (
    <div className="space-y-3">
      {chats.map((chat) => {
        const messageCount = getMessageCount(chat.messages)
        const lastMsgText = getLastMessageText(chat.messages)

        return (
          <motion.div
            layout
            key={chat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group relative p-4 lg:p-6 rounded-xl lg:rounded-2xl border bg-slate-900/80 border-white/5 shadow-lg hover:border-indigo-500/20 transition-all duration-300"
          >
            {/* Selection Checkbox */}
            <button
              onClick={() => toggleSelection(chat.id)}
              className="absolute top-3 left-3 lg:top-4 lg:left-4 z-10"
            >
              {selectedItems.has(chat.id) ? (
                <CheckSquare className="w-5 h-5 text-indigo-400" />
              ) : (
                <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
              )}
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-8 lg:pl-10">
              <div
                className="flex-1 space-y-2 lg:space-y-3 cursor-pointer"
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/20 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {messageCount} Mesaj
                  </span>
                  <span className="text-xs text-slate-500">{formatShortDate(chat.updatedAt)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white text-base lg:text-lg">{chat.name}</span>
                  {chat.phone && (
                    <span className="text-sm text-emerald-400 flex items-center gap-1 ml-2">
                      <Smartphone className="w-3.5 h-3.5" />
                      {chat.phone}
                    </span>
                  )}
                </div>

                {lastMsgText && (
                  <p className="text-slate-400 text-sm italic line-clamp-1 pl-1">
                    Son: &ldquo;{lastMsgText}&rdquo;
                  </p>
                )}
              </div>

              <div className="flex lg:flex-row gap-2 pl-8 lg:pl-0 shrink-0">
                <button
                  onClick={() => setSelectedChat(chat)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all text-xs font-bold"
                >
                  Sohbeti Oku
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(chat.id)
                  }}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4 lg:w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
