'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trash2, LogOut, Mail, CheckCircle, Circle, RefreshCw, 
  User, Calendar, Tag, ChevronRight, Search, Filter,
  LayoutDashboard, Bell, Settings, ExternalLink, Wallet,
  X, Eye, CheckSquare, Square, CreditCard, AlertCircle,
  ArrowUpDown, Smartphone, ChevronLeft, ExternalLink as ExternalLinkIcon
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

interface Payment {
  id: string
  serviceName: string
  txid: string
  walletAddress: string
  status: 'pending' | 'verified' | 'rejected'
  createdAt: string
  verifiedAt: string | null
  notes: string | null
}

interface Service {
  id: string
  title: string
  description: string
  price: number
  priceUnit: string
  icon: string
  color: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string
  image: string
  link: string | null
  github: string | null
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [activeTab, setActiveTab] = useState<'messages' | 'payments' | 'services' | 'projects'>('messages')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editType, setEditType] = useState<'service' | 'project' | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
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

  const fetchPayments = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/payments')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Ödemeler getirilemedi')
      const data = await response.json()
      setPayments(data.payments)
    } catch {
      console.error('Ödemeler yüklenirken hata')
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/services')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Hizmetler getirilemedi')
      const data = await response.json()
      setServices(data.services)
    } catch {
      console.error('Hizmetler yüklenirken hata')
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/projects')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Projeler getirilemedi')
      const data = await response.json()
      setProjects(data.projects)
    } catch {
      console.error('Projeler yüklenirken hata')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    fetchPayments()
    fetchServices()
    fetchProjects()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const handleDelete = async (id: string, type: 'message' | 'payment' = 'message') => {
    const itemName = type === 'message' ? 'mesajı' : 'ödemeyi'
    if (!confirm(`Bu ${itemName} silmek istediğinizden emin misiniz?`)) return

    try {
      const endpoint = type === 'message' ? `/api/admin/messages/${id}` : `/api/admin/payments/${id}`
      const response = await fetch(endpoint, { method: 'DELETE' })
      if (!response.ok) throw new Error('Silinemedi')
      
      if (type === 'message') {
        setMessages(messages.filter((m) => m.id !== id))
      } else {
        setPayments(payments.filter((p) => p.id !== id))
      }
    } catch {
      alert('Silinirken bir hata oluştu')
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedItems.size} öğeyi silmek istediğinizden emin misiniz?`)) return
    
    const ids = Array.from(selectedItems)
    for (const id of ids) {
      await handleDelete(id, activeTab === 'messages' ? 'message' : 'payment')
    }
    setSelectedItems(new Set())
  }

  const handleBulkRead = async () => {
    const ids = Array.from(selectedItems)
    for (const id of ids) {
      const message = messages.find(m => m.id === id)
      if (message && !message.read) {
        await toggleRead(id, false)
      }
    }
    setSelectedItems(new Set())
  }

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedItems(newSelected)
  }

  const selectAll = () => {
    const currentItems = 
      activeTab === 'messages' ? filteredMessages : 
      activeTab === 'payments' ? filteredPayments :
      activeTab === 'services' ? services : projects
      
    if (selectedItems.size === currentItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(currentItems.map(item => item.id)))
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

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredMessages = messages
    .filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  const filteredPayments = payments
    .filter(p =>
      p.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.txid.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })

  const unreadCount = messages.filter((m) => !m.read).length
  const pendingPayments = payments.filter((p) => p.status === 'pending').length

  const updatePaymentStatus = async (id: string, status: 'verified' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/payments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Güncellenemedi')
      
      setPayments(payments.map(p => 
        p.id === id ? { ...p, status, verifiedAt: status === 'verified' ? new Date().toISOString() : null } : p
      ))
    } catch {
      alert('Ödeme durumu güncellenirken hata oluştu')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/5 text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
          </button>
          <span className="font-black text-white">Admin<span className="text-indigo-400">Hub</span></span>
          <div className="w-8 h-8 rounded-full bg-slate-800" />
        </div>
      </div>

      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      {/* Fixed background */}
      <div className="fixed inset-0 bg-indigo-500/5 pointer-events-none" />

      <div className="flex h-screen overflow-hidden relative pt-14 lg:pt-0">
        
        {/* Navigation Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900/95 lg:bg-slate-900/50 
          backdrop-blur-xl border-r border-white/5 flex flex-col
          transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-8 lg:mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <LayoutDashboard className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Admin<span className="text-indigo-400">Hub</span></span>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => { setActiveTab('messages'); setSidebarOpen(false); setSelectedItems(new Set()); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'messages' 
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Mail className="w-4 h-4" />
                Gelen Mesajlar
                {unreadCount > 0 && (
                  <span className="ml-auto bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab('payments'); setSidebarOpen(false); setSelectedItems(new Set()); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'payments' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Wallet className="w-4 h-4" />
                USDT Ödemeleri
                {pendingPayments > 0 && (
                  <span className="ml-auto bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingPayments}</span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab('services'); setSidebarOpen(false); setSelectedItems(new Set()); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'services' 
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
                Hizmet Yönetimi
              </button>
              <button 
                onClick={() => { setActiveTab('projects'); setSidebarOpen(false); setSelectedItems(new Set()); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === 'projects' 
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                Proje Yönetimi
              </button>
            </nav>
          </div>

          <div className="mt-auto p-4 lg:p-6 border-t border-white/5">
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
          <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-10 py-4 lg:py-6">
            <div className="flex items-center justify-between gap-4 lg:gap-8 max-w-5xl mx-auto">
              {/* Mobile back button when viewing detail */}
              {(selectedMessage || selectedPayment) && (
                <button
                  onClick={() => {
                    setSelectedMessage(null)
                    setSelectedPayment(null)
                  }}
                  className="lg:hidden p-2 rounded-lg bg-white/5 text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              <div className="flex-1 max-w-md relative group">
                <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                <input 
                  type="text" 
                  placeholder={activeTab === 'messages' ? "Mesajlarda ara..." : "Ödemelerde ara..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-xl lg:rounded-2xl pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                <button 
                  onClick={activeTab === 'messages' ? fetchMessages : fetchPayments}
                  disabled={loading}
                  className="p-2.5 lg:p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <div className="hidden lg:block w-10 h-10 rounded-full border-2 border-indigo-500/20 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-400">
                    A
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Detail View Modals */}
          <AnimatePresence>
            {selectedMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedMessage(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                >
                  <button
                    onClick={() => setSelectedMessage(null)}
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
                        <h3 className="text-xl font-bold text-white">{selectedMessage.name}</h3>
                        {selectedMessage.email && (
                          <p className="text-sm text-gray-400">{selectedMessage.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedMessage.createdAt)}
                    </div>

                    {selectedMessage.phone && (
                      <div className="flex items-center gap-2 mb-4 text-sm text-emerald-400">
                        <Smartphone className="w-4 h-4" />
                        {selectedMessage.phone}
                      </div>
                    )}
                    
                    {selectedMessage.subject && (
                      <div className="mb-4">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Konu</span>
                        <p className="text-white font-medium">{selectedMessage.subject}</p>
                      </div>
                    )}
                    
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        toggleRead(selectedMessage.id, selectedMessage.read)
                        setSelectedMessage({ ...selectedMessage, read: !selectedMessage.read })
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-indigo-500/10 text-indigo-400 font-medium text-sm hover:bg-indigo-500/20 transition-all"
                    >
                      {selectedMessage.read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(selectedMessage.id, 'message')
                        setSelectedMessage(null)
                      }}
                      className="py-3 px-4 rounded-xl bg-red-500/10 text-red-400 font-medium text-sm hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {selectedPayment && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedPayment(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
                >
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">USDT Ödeme</h3>
                        <p className="text-sm text-gray-400">{selectedPayment.serviceName}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl">
                        <span className="text-sm text-gray-400">Durum</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          selectedPayment.status === 'verified' ? 'bg-emerald-500 text-white' :
                          selectedPayment.status === 'rejected' ? 'bg-red-500 text-white' :
                          'bg-amber-500 text-white'
                        }`}>
                          {selectedPayment.status === 'verified' ? 'Onaylandı' :
                           selectedPayment.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">TXID</span>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 p-3 bg-gray-800 rounded-lg text-xs font-mono text-gray-300 break-all">
                            {selectedPayment.txid}
                          </code>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(selectedPayment.txid)
                            }}
                            className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
                          >
                            <ExternalLinkIcon className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Cüzdan Adresi</span>
                        <code className="block p-3 bg-gray-800 rounded-lg text-xs font-mono text-gray-300 break-all">
                          {selectedPayment.walletAddress}
                        </code>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Tarih</span>
                        <span className="text-white">{formatDate(selectedPayment.createdAt)}</span>
                      </div>

                      {selectedPayment.verifiedAt && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Onay Tarihi</span>
                          <span className="text-emerald-400">{formatDate(selectedPayment.verifiedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedPayment.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          updatePaymentStatus(selectedPayment.id, 'verified')
                          setSelectedPayment({ ...selectedPayment, status: 'verified', verifiedAt: new Date().toISOString() })
                        }}
                        className="flex-1 py-3 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 font-medium text-sm hover:bg-emerald-500/20 transition-all"
                      >
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Onayla
                      </button>
                      <button
                        onClick={() => {
                          updatePaymentStatus(selectedPayment.id, 'rejected')
                          setSelectedPayment({ ...selectedPayment, status: 'rejected' })
                        }}
                        className="flex-1 py-3 px-4 rounded-xl bg-red-500/10 text-red-400 font-medium text-sm hover:bg-red-500/20 transition-all"
                      >
                        <AlertCircle className="w-4 h-4 inline mr-2" />
                        Reddet
                      </button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="px-4 lg:px-10 py-6 lg:py-12 max-w-5xl mx-auto">
            {/* Stats Summary */}
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

            {/* List Header with Bulk Actions */}
            <div className="mb-4 lg:mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <h2 className="text-xl lg:text-2xl font-black text-white">
                  {activeTab === 'messages' ? 'Mesajlar' : 
                   activeTab === 'payments' ? 'USDT Ödemeleri' :
                   activeTab === 'services' ? 'Hizmetler' : 'Projeler'}
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white text-sm transition-all"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    <span className="hidden sm:inline">{sortOrder === 'newest' ? 'En Yeni' : 'En Eski'}</span>
                  </button>
                  {(activeTab === 'services' || activeTab === 'projects') && (
                    <button
                      onClick={() => {
                        setEditType(activeTab === 'services' ? 'service' : 'project')
                        setSelectedService(null)
                        setSelectedProject(null)
                        setIsEditModalOpen(true)
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 text-sm font-bold transition-all"
                    >
                      Yeni Ekle
                    </button>
                  )}
                </div>
              </div>

              {/* Bulk Actions Toolbar */}
              {selectedItems.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-4"
                >
                  <span className="text-sm text-indigo-400 font-medium">
                    {selectedItems.size} öğe seçildi
                  </span>
                  <div className="flex-1" />
                  {activeTab === 'messages' && (
                    <button
                      onClick={handleBulkRead}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Okundu İşaretle</span>
                    </button>
                  )}
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Sil</span>
                  </button>
                  <button
                    onClick={() => setSelectedItems(new Set())}
                    className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Select All Checkbox */}
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/30 rounded-lg">
                <button
                  onClick={selectAll}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all"
                >
                  {selectedItems.size === (
                    activeTab === 'messages' ? filteredMessages.length : 
                    activeTab === 'payments' ? filteredPayments.length :
                    activeTab === 'services' ? services.length : projects.length
                  ) && (
                    activeTab === 'messages' ? filteredMessages : 
                    activeTab === 'payments' ? filteredPayments :
                    activeTab === 'services' ? services : projects
                  ).length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                  Tümünü Seç
                </button>
              </div>
            </div>

            {loading ? (
              <div className="space-y-3 lg:space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 lg:h-32 rounded-2xl lg:rounded-3xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="p-6 lg:p-10 rounded-2xl lg:rounded-3xl bg-red-500/5 border border-red-500/10 text-center">
                <p className="text-red-400 font-bold mb-4">{error}</p>
                <button 
                  onClick={() => {
                    if (activeTab === 'messages') fetchMessages();
                    else if (activeTab === 'payments') fetchPayments();
                    else if (activeTab === 'services') fetchServices();
                    else fetchProjects();
                  }} 
                  className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold text-sm"
                >
                  Tekrar Dene
                </button>
              </div>
            ) : (
              activeTab === 'messages' ? filteredMessages : 
              activeTab === 'payments' ? filteredPayments :
              activeTab === 'services' ? services : projects
            ).length === 0 ? (
              <div className="p-10 lg:p-20 rounded-2xl lg:rounded-[3rem] bg-white/[0.02] border border-dashed border-white/5 text-center">
                {activeTab === 'messages' ? (
                  <>
                    <Mail className="w-10 h-10 lg:w-12 lg:h-12 text-slate-700 mx-auto mb-4 lg:mb-6" />
                    <p className="text-slate-500 font-bold">Henüz mesaj bulunmuyor.</p>
                  </>
                ) : activeTab === 'payments' ? (
                  <>
                    <Wallet className="w-10 h-10 lg:w-12 lg:h-12 text-slate-700 mx-auto mb-4 lg:mb-6" />
                    <p className="text-slate-500 font-bold">Henüz ödeme bildirimi yok.</p>
                  </>
                ) : activeTab === 'services' ? (
                  <>
                    <Settings className="w-10 h-10 lg:w-12 lg:h-12 text-slate-700 mx-auto mb-4 lg:mb-6" />
                    <p className="text-slate-500 font-bold">Henüz hizmet bulunmuyor.</p>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-10 h-10 lg:w-12 lg:h-12 text-slate-700 mx-auto mb-4 lg:mb-6" />
                    <p className="text-slate-500 font-bold">Henüz proje bulunmuyor.</p>
                  </>
                )}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {activeTab === 'messages' && filteredMessages.map((message) => (
                  <motion.div
                    layout
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group relative p-4 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 mb-3 ${
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
                            handleDelete(message.id, 'message')
                          }}
                          className="p-2 lg:w-10 lg:h-10 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {activeTab === 'payments' && filteredPayments.map((payment) => (
                  <motion.div
                    layout
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group relative p-4 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 mb-3 ${
                      payment.status === 'verified'
                        ? 'bg-slate-900/30 border-white/5'
                        : payment.status === 'rejected'
                        ? 'bg-red-900/10 border-red-500/20'
                        : 'bg-slate-900/80 border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                    }`}
                  >
                    {/* Selection Checkbox */}
                    <button
                      onClick={() => toggleSelection(payment.id)}
                      className="absolute top-3 left-3 lg:top-4 lg:left-4 z-10"
                    >
                      {selectedItems.has(payment.id) ? (
                        <CheckSquare className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                      )}
                    </button>

                    <div 
                      className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-8 lg:pl-10 cursor-pointer"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            payment.status === 'verified' ? 'bg-emerald-500 text-white' :
                            payment.status === 'rejected' ? 'bg-red-500 text-white' :
                            'bg-amber-500 text-white'
                          }`}>
                            {payment.status === 'verified' ? 'Onaylandı' :
                             payment.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                          </span>
                          <span className="text-xs text-slate-500">{formatShortDate(payment.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-white">{payment.serviceName}</span>
                        </div>

                        <code className="block text-xs font-mono text-slate-400 truncate max-w-xs">
                          {payment.txid}
                        </code>
                      </div>

                      <div className="flex lg:flex-col gap-2 pl-8 lg:pl-0">
                        {payment.status === 'pending' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                updatePaymentStatus(payment.id, 'verified')
                              }}
                              className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                            >
                              <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                updatePaymentStatus(payment.id, 'rejected')
                              }}
                              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(payment.id, 'payment')
                          }}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {activeTab === 'services' && services.map((service) => (
                  <motion.div
                    layout
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 lg:p-6 rounded-xl bg-slate-900/50 border border-white/5 mb-3"
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
                          onClick={() => {
                            setSelectedService(service)
                            setEditType('service')
                            setIsEditModalOpen(true)
                          }}
                          className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
                              fetch(`/api/admin/services/${service.id}`, { method: 'DELETE' })
                                .then(() => fetchServices())
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {activeTab === 'projects' && projects.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 lg:p-6 rounded-xl bg-slate-900/50 border border-white/5 mb-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-lg overflow-hidden border border-white/10">
                          <img src={project.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{project.title}</h4>
                          <p className="text-sm text-slate-400 line-clamp-1">{project.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{project.tech}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProject(project)
                            setEditType('project')
                            setIsEditModalOpen(true)
                          }}
                          className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
                              fetch(`/api/admin/projects/${project.id}`, { method: 'DELETE' })
                                .then(() => fetchProjects())
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
          {/* Edit Modal */}
          <AnimatePresence>
            {isEditModalOpen && (
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
                      {editType === 'service' ? (selectedService ? 'Hizmeti Düzenle' : 'Yeni Hizmet') : (selectedProject ? 'Projeyi Düzenle' : 'Yeni Proje')}
                    </h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const data = Object.fromEntries(formData.entries())
                    
                    if (editType === 'service') {
                      const url = selectedService ? `/api/admin/services/${selectedService.id}` : '/api/admin/services'
                      const method = selectedService ? 'PATCH' : 'POST'
                      await fetch(url, {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          ...data,
                          price: parseFloat(data.price as string),
                          order: parseInt(data.order as string),
                          isActive: data.isActive === 'on'
                        })
                      })
                      fetchServices()
                    } else {
                      const url = selectedProject ? `/api/admin/projects/${selectedProject.id}` : '/api/admin/projects'
                      const method = selectedProject ? 'PATCH' : 'POST'
                      await fetch(url, {
                        method,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          ...data,
                          order: parseInt(data.order as string),
                          isActive: data.isActive === 'on'
                        })
                      })
                      fetchProjects()
                    }
                    setIsEditModalOpen(false)
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Başlık</label>
                        <input name="title" defaultValue={editType === 'service' ? selectedService?.title : selectedProject?.title} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{editType === 'service' ? 'İkon' : 'Kategori'}</label>
                        <input name={editType === 'service' ? 'icon' : 'category'} defaultValue={editType === 'service' ? selectedService?.icon : selectedProject?.category} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Açıklama</label>
                      <textarea name="description" defaultValue={editType === 'service' ? selectedService?.description : selectedProject?.description} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none resize-none" />
                    </div>

                    {editType === 'service' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fiyat</label>
                          <input name="price" type="number" step="0.01" defaultValue={selectedService?.price} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Birim</label>
                          <input name="priceUnit" defaultValue={selectedService?.priceUnit || 'USDT'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Renk (Tailwind)</label>
                          <input name="color" defaultValue={selectedService?.color || 'from-blue-500 to-indigo-600'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Teknolojiler (Virgülle ayırın)</label>
                            <input name="tech" defaultValue={selectedProject?.tech} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resim URL</label>
                            <input name="image" defaultValue={selectedProject?.image} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Link</label>
                            <input name="link" defaultValue={selectedProject?.link || '#'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GitHub</label>
                            <input name="github" defaultValue={selectedProject?.github || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sıralama</label>
                        <input name="order" type="number" defaultValue={editType === 'service' ? selectedService?.order : selectedProject?.order || 0} className="w-16 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none" />
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer pt-6">
                        <input name="isActive" type="checkbox" defaultChecked={editType === 'service' ? selectedService?.isActive : selectedProject?.isActive ?? true} className="w-5 h-5 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-indigo-500/50" />
                        <span className="text-sm font-bold text-white">Aktif</span>
                      </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20">
                        {selectedService || selectedProject ? 'Güncelle' : 'Oluştur'}
                      </button>
                      <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all">
                        Vazgeç
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
