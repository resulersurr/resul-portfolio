'use client'

import { Mail, Bell, CheckCircle, Wallet, AlertCircle, Settings, ExternalLink, Bot, MessageSquare } from 'lucide-react'
import { Message, Payment, Service, Project, ChatSession } from '@/types/admin'

interface StatCardsProps {
  activeTab: 'messages' | 'payments' | 'services' | 'projects' | 'chats'
  messages: Message[]
  payments: Payment[]
  services: Service[]
  projects: Project[]
  chats?: ChatSession[]
  unreadCount: number
  pendingPayments: number
}

export default function StatCards({
  activeTab,
  messages,
  payments,
  services,
  projects,
  chats = [],
  unreadCount,
  pendingPayments
}: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-12">
      {activeTab === 'messages' ? (
        <>
          <div className="col-span-2 lg:col-span-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-blue-400">
                <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:inline">Canlı</span>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{messages.length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Toplam Mesaj</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-indigo-400">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{unreadCount}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Okunmamış</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{messages.filter(m => m.read).length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Okunmuş</div>
          </div>
        </>
      ) : activeTab === 'payments' ? (
        <>
          <div className="col-span-2 lg:col-span-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                <Wallet className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:inline">Canlı</span>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{payments.length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Toplam Ödeme</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-amber-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-amber-400">
                <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{pendingPayments}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Bekleyen</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{payments.filter(p => p.status === 'verified').length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Onaylanan</div>
          </div>
        </>
      ) : activeTab === 'services' ? (
        <>
          <div className="col-span-2 lg:col-span-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-blue-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-blue-400">
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{services.length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Toplam Hizmet</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{services.filter(s => s.isActive).length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktif</div>
          </div>
        </>
      ) : activeTab === 'chats' ? (
        <>
          <div className="col-span-2 lg:col-span-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-indigo-400">
                <Bot className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden lg:inline">Canlı</span>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{chats.length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Toplam AI Sohbet</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-blue-400">
                <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">
              {chats.reduce((acc, c) => {
                try {
                  return acc + JSON.parse(c.messages).length
                } catch {
                  return acc
                }
              }, 0)}
            </div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Toplam Mesaj</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">
              {chats.filter(c => {
                const today = new Date()
                const lastActive = new Date(c.updatedAt)
                return today.toDateString() === lastActive.toDateString()
              }).length}
            </div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Bugün Aktif</div>
          </div>
        </>
      ) : (
        <>
          <div className="col-span-2 lg:col-span-1 p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-purple-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-purple-400">
                <ExternalLink className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{projects.length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Toplam Proje</div>
          </div>
          <div className="p-4 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/20 transition-all">
            <div className="flex justify-between items-start mb-2 lg:mb-4">
              <div className="p-2 rounded-xl bg-white/5 text-emerald-400">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-black text-white mb-1">{projects.filter(p => p.isActive).length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aktif</div>
          </div>
        </>
      )}
    </div>
  )
}

