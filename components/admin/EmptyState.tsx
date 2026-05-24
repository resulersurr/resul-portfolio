'use client'

import { Mail, Wallet, Settings, ExternalLink, Bot } from 'lucide-react'

interface EmptyStateProps {
  activeTab: 'messages' | 'payments' | 'services' | 'projects' | 'chats'
}

export default function EmptyState({ activeTab }: EmptyStateProps) {
  const config = {
    messages: {
      icon: Mail,
      text: 'Henüz mesaj bulunmuyor.'
    },
    payments: {
      icon: Wallet,
      text: 'Henüz ödeme bildirimi yok.'
    },
    services: {
      icon: Settings,
      text: 'Henüz hizmet bulunmuyor.'
    },
    projects: {
      icon: ExternalLink,
      text: 'Henüz proje bulunmuyor.'
    },
    chats: {
      icon: Bot,
      text: 'Henüz AI sohbet geçmişi bulunmuyor.'
    }
  }

  const { icon: Icon, text } = config[activeTab]

  return (
    <div className="p-10 lg:p-20 rounded-2xl lg:rounded-[3rem] bg-white/[0.02] border border-dashed border-white/5 text-center">
      <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-slate-700 mx-auto mb-4 lg:mb-6" />
      <p className="text-slate-500 font-bold">{text}</p>
    </div>
  )
}

