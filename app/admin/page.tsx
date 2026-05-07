'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, LogOut, Mail, CheckCircle, Circle, RefreshCw, 
  User, Calendar, Tag, ChevronRight, Search, Filter,
  LayoutDashboard, Bell, Settings, ExternalLink
} from 'lucide-react'

interface Message {
  id: string
  name: string
  email: string | null
  subject: string | null
  phone: string | null
  message: string
  createdAt: string
  read: boolean
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/messages')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Mesajlar getirilemedi')
      const data = await response.json()
      setMessages(data.messages)
    } catch {
      setError('Mesajlar yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Mesaj silinemedi')
      setMessages(messages.filter((m) => m.id !== id))
    } catch {
      alert('Mesaj silinirken bir hata oluştu')
    }
  }

  const toggleRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !read }),
      })
      if (!response.ok) throw new Error('Mesaj güncellenemedi')
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, read: !read } : m))
      )
    } catch {
      alert('Mesaj güncellenirken bir hata oluştu')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Sidebar Overlay */}
      <div className="fixed inset-0 bg-indigo-500/5 pointer-events-none" />

      <div className="flex h-screen overflow-hidden relative">
        
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Admin<span className="text-indigo-400">Hub</span></span>
            </div>

            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold text-sm transition-all">
                <Mail className="w-4 h-4" />
                Gelen Mesajlar
                <span className="ml-auto bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold text-sm transition-all group">
                <User className="w-4 h-4" />
                Profil Ayarları
                <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold text-sm transition-all group">
                <Settings className="w-4 h-4" />
                Sistem Paneli
                <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          {/* Header */}
          <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-10 py-6">
            <div className="flex items-center justify-between gap-8 max-w-5xl mx-auto">
              <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Mesajlarda ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={fetchMessages}
                  disabled={loading}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 p-0.5">
                  <img src="/images/logo2.png" className="w-full h-full rounded-full bg-slate-900 object-contain" alt="Admin" />
                </div>
              </div>
            </div>
          </header>

          <div className="px-10 py-12 max-w-5xl mx-auto">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Toplam Mesaj', value: messages.length, icon: Mail, color: 'text-blue-400' },
                { label: 'Okunmamış', value: unreadCount, icon: Bell, color: 'text-indigo-400' },
                { label: 'Aktif Görüşme', value: '12', icon: ExternalLink, color: 'text-emerald-400' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Canlı Veri</span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Messages List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-white">Mesaj Akışı</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">SIRALA:</span>
                  <select className="bg-transparent text-xs font-bold text-white border-none focus:ring-0 cursor-pointer">
                    <option>En Yeni</option>
                    <option>En Eski</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-40 rounded-3xl bg-white/5 animate-pulse" />
                  ))}
                </div>
              ) : error ? (
                <div className="p-10 rounded-3xl bg-red-500/5 border border-red-500/10 text-center">
                  <p className="text-red-400 font-bold mb-4">{error}</p>
                  <button onClick={fetchMessages} className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold text-sm">Tekrar Dene</button>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-20 rounded-[3rem] bg-white/[0.02] border border-dashed border-white/5 text-center">
                  <Mail className="w-12 h-12 text-slate-700 mx-auto mb-6" />
                  <p className="text-slate-500 font-bold">Henüz mesaj bulunmuyor.</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredMessages.map((message) => (
                    <motion.div
                      layout
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`group p-8 rounded-[2rem] border transition-all duration-500 ${
                        message.read 
                          ? 'bg-slate-900/30 border-white/5 opacity-60 grayscale-[0.5]' 
                          : 'bg-slate-900/80 border-indigo-500/20 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/10'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white">
                              <User className="w-3 h-3 text-indigo-400" />
                              {message.name}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white">
                              <Calendar className="w-3 h-3 text-indigo-400" />
                              {formatDate(message.createdAt)}
                            </div>
                            {!message.read && (
                              <div className="px-3 py-1.5 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30">
                                Yeni
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            {message.subject && (
                              <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest">
                                <Tag className="w-3 h-3" />
                                {message.subject}
                              </div>
                            )}
                            {message.email && (
                              <div className="text-slate-400 text-sm font-medium">{message.email}</div>
                            )}
                          </div>

                          <p className="text-slate-200 text-lg leading-relaxed font-medium">
                            {message.message}
                          </p>
                        </div>

                        <div className="flex md:flex-col gap-3">
                          <button
                            onClick={() => toggleRead(message.id, message.read)}
                            className={`flex-1 md:w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                              message.read
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-slate-800 text-slate-400 border border-white/5 hover:text-white hover:bg-slate-700'
                            }`}
                            title={message.read ? 'Okunmadı olarak işaretle' : 'Okundu olarak işaretle'}
                          >
                            {message.read ? <CheckCircle size={20} /> : <Circle size={20} />}
                          </button>
                          <button
                            onClick={() => handleDelete(message.id)}
                            className="flex-1 md:w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg hover:shadow-red-500/20"
                            title="Mesajı Sil"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
