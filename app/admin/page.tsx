'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, CheckCircle, Trash2, CheckSquare, Square, Plus
} from 'lucide-react'

// Hooks
import { useAdminMessages } from '@/hooks/admin/useAdminMessages'
import { useAdminPayments } from '@/hooks/admin/useAdminPayments'
import { useAdminServices } from '@/hooks/admin/useAdminServices'
import { useAdminProjects } from '@/hooks/admin/useAdminProjects'

// Components
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import StatCards from '@/components/admin/StatCards'
import MessagesTab from '@/components/admin/MessagesTab'
import PaymentsTab from '@/components/admin/PaymentsTab'
import ServicesTab from '@/components/admin/ServicesTab'
import ProjectsTab from '@/components/admin/ProjectsTab'
import MessageDetailModal from '@/components/admin/MessageDetailModal'
import ServiceModal from '@/components/admin/ServiceModal'
import ProjectModal from '@/components/admin/ProjectModal'
import ConfirmModal from '@/components/admin/ConfirmModal'
import EmptyState from '@/components/admin/EmptyState'

// Types
import { Message, Payment, Service, Project } from '@/types/admin'

export default function AdminDashboard() {
  const router = useRouter()
  
  // State
  const [activeTab, setActiveTab] = useState<'messages' | 'payments' | 'services' | 'projects'>('messages')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  
  // Modals State
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editType, setEditType] = useState<'service' | 'project'>('service')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  // Confirm Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  // Data Hooks
  const { 
    messages, fetchMessages, toggleRead, deleteMessage, loading: messagesLoading 
  } = useAdminMessages()
  const { 
    payments, fetchPayments, updatePaymentStatus, deletePayment, loading: paymentsLoading 
  } = useAdminPayments()
  const { 
    services, fetchServices, deleteService, loading: servicesLoading 
  } = useAdminServices()
  const { 
    projects, fetchProjects, deleteProject, loading: projectsLoading 
  } = useAdminProjects()

  const loading = messagesLoading || paymentsLoading || servicesLoading || projectsLoading

  // Initial Fetch
  useEffect(() => {
    fetchMessages()
    fetchPayments()
    fetchServices()
    fetchProjects()
  }, [fetchMessages, fetchPayments, fetchServices, fetchProjects])

  // Computed Values
  const unreadCount = messages.filter(m => !m.read).length
  const pendingPayments = payments.filter(p => p.status === 'pending').length

  const filteredMessages = useMemo(() => {
    return messages
      .filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.subject && m.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime()
        const timeB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB
      })
  }, [messages, searchQuery, sortOrder])

  const filteredPayments = useMemo(() => {
    return payments
      .filter(p => 
        p.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.txid.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime()
        const timeB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB
      })
  }, [payments, searchQuery, sortOrder])

  // Handlers
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(id)) newSelected.delete(id)
    else newSelected.add(id)
    setSelectedItems(newSelected)
  }

  const selectAll = () => {
    const currentItems = activeTab === 'messages' ? filteredMessages : filteredPayments
    if (selectedItems.size === currentItems.length && currentItems.length > 0) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(currentItems.map(i => i.id)))
    }
  }

  const handleRefresh = () => {
    if (activeTab === 'messages') fetchMessages()
    else if (activeTab === 'payments') fetchPayments()
    else if (activeTab === 'services') fetchServices()
    else fetchProjects()
  }

  const openConfirmDelete = useCallback((id: string, type: 'message' | 'payment' | 'service' | 'project') => {
    setConfirmModal({
      isOpen: true,
      title: 'Emin misiniz?',
      message: 'Bu öğe kalıcı olarak silinecektir. Bu işlem geri alınamaz.',
      onConfirm: async () => {
        if (type === 'message') await deleteMessage(id)
        else if (type === 'payment') await deletePayment(id)
        else if (type === 'service') await deleteService(id)
        else await deleteProject(id)
      }
    })
  }, [deleteMessage, deletePayment, deleteService, deleteProject])

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) return
    setConfirmModal({
      isOpen: true,
      title: 'Toplu Silme',
      message: `${selectedItems.size} öğeyi silmek istediğinizden emin misiniz?`,
      onConfirm: async () => {
        const ids = Array.from(selectedItems)
        for (const id of ids) {
          if (activeTab === 'messages') await deleteMessage(id)
          else await deletePayment(id)
        }
        setSelectedItems(new Set())
      }
    })
  }

  const handleBulkRead = async () => {
    const ids = Array.from(selectedItems)
    for (const id of ids) {
      const msg = messages.find(m => m.id === id)
      if (msg && !msg.read) await toggleRead(id, false)
    }
    setSelectedItems(new Set())
  }

  const handleServiceSubmit = async (data: any) => {
    const url = selectedService ? `/api/admin/services/${selectedService.id}` : '/api/admin/services'
    const method = selectedService ? 'PATCH' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    fetchServices()
    setIsEditModalOpen(false)
  }

  const handleProjectSubmit = async (data: any) => {
    const url = selectedProject ? `/api/admin/projects/${selectedProject.id}` : '/api/admin/projects'
    const method = selectedProject ? 'PATCH' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    fetchProjects()
    setIsEditModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      <div className="flex h-screen overflow-hidden relative pt-14 lg:pt-0">
        
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 z-[60] flex items-center justify-between px-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-slate-400">
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span className="font-black text-white">Admin<span className="text-indigo-400">Hub</span></span>
          <div className="w-8" />
        </div>

        <AdminSidebar 
          activeTab={activeTab}
          setActiveTab={(tab) => { setActiveTab(tab); setSelectedItems(new Set()); }}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          unreadCount={unreadCount}
          pendingPayments={pendingPayments}
          handleLogout={handleLogout}
        />

        <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
          <AdminHeader 
            activeTab={activeTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
            onRefresh={handleRefresh}
          />

          <div className="flex-1 overflow-y-auto p-4 lg:p-10">
            <div className="max-w-5xl mx-auto">
              
              <StatCards 
                activeTab={activeTab}
                messages={messages}
                payments={payments}
                services={services}
                projects={projects}
                unreadCount={unreadCount}
                pendingPayments={pendingPayments}
              />

              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl lg:text-2xl font-black text-white">
                    {activeTab === 'messages' ? 'Mesajlar' : 
                     activeTab === 'payments' ? 'Ödemeler' :
                     activeTab === 'services' ? 'Hizmetler' : 'Projeler'}
                  </h2>
                  {(activeTab === 'services' || activeTab === 'projects') && (
                    <button
                      onClick={() => {
                        setEditType(activeTab === 'services' ? 'service' : 'project')
                        setSelectedService(null)
                        setSelectedProject(null)
                        setIsEditModalOpen(true)
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 text-sm font-bold transition-all ml-4"
                    >
                      <Plus className="w-4 h-4" />
                      Yeni Ekle
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                    className="bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-xs font-bold text-slate-400 outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="newest">En Yeni</option>
                    <option value="oldest">En Eski</option>
                  </select>
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedItems.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl mb-4"
                >
                  <span className="text-sm text-indigo-400 font-medium ml-2">
                    {selectedItems.size} öğe seçildi
                  </span>
                  <div className="flex-1" />
                  {activeTab === 'messages' && (
                    <button
                      onClick={handleBulkRead}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-sm transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Okundu
                    </button>
                  )}
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Sil
                  </button>
                  <button
                    onClick={() => setSelectedItems(new Set())}
                    className="p-2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Select All Toggle (for Messages & Payments) */}
              {(activeTab === 'messages' || activeTab === 'payments') && (
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/30 rounded-lg mb-4">
                  <button
                    onClick={selectAll}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all"
                  >
                    {selectedItems.size > 0 && selectedItems.size === (activeTab === 'messages' ? filteredMessages.length : filteredPayments.length) ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                    Tümünü Seç
                  </button>
                </div>
              )}

              {/* Content Tabs */}
              <AnimatePresence mode="wait">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'messages' && (
                      filteredMessages.length > 0 ? (
                        <MessagesTab 
                          messages={filteredMessages}
                          selectedItems={selectedItems}
                          toggleSelection={toggleSelection}
                          setSelectedMessage={setSelectedMessage}
                          toggleRead={toggleRead}
                          onDelete={(id) => openConfirmDelete(id, 'message')}
                        />
                      ) : <EmptyState activeTab="messages" />
                    )}

                    {activeTab === 'payments' && (
                      filteredPayments.length > 0 ? (
                        <PaymentsTab 
                          payments={filteredPayments}
                          selectedItems={selectedItems}
                          toggleSelection={toggleSelection}
                          setSelectedPayment={setSelectedPayment}
                          updatePaymentStatus={updatePaymentStatus}
                          onDelete={(id) => openConfirmDelete(id, 'payment')}
                        />
                      ) : <EmptyState activeTab="payments" />
                    )}

                    {activeTab === 'services' && (
                      services.length > 0 ? (
                        <ServicesTab 
                          services={services}
                          onEdit={(s) => { setSelectedService(s); setEditType('service'); setIsEditModalOpen(true); }}
                          onDelete={(id) => openConfirmDelete(id, 'service')}
                        />
                      ) : <EmptyState activeTab="services" />
                    )}

                    {activeTab === 'projects' && (
                      projects.length > 0 ? (
                        <ProjectsTab 
                          projects={projects}
                          onEdit={(p) => { setSelectedProject(p); setEditType('project'); setIsEditModalOpen(true); }}
                          onDelete={(id) => openConfirmDelete(id, 'project')}
                        />
                      ) : <EmptyState activeTab="projects" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedMessage && (
          <MessageDetailModal 
            message={selectedMessage}
            onClose={() => setSelectedMessage(null)}
            onToggleRead={toggleRead}
            onDelete={(id) => { setSelectedMessage(null); openConfirmDelete(id, 'message'); }}
          />
        )}
      </AnimatePresence>

      <ServiceModal 
        isOpen={isEditModalOpen && editType === 'service'}
        onClose={() => setIsEditModalOpen(false)}
        service={selectedService}
        onSubmit={handleServiceSubmit}
      />

      <ProjectModal 
        isOpen={isEditModalOpen && editType === 'project'}
        onClose={() => setIsEditModalOpen(false)}
        project={selectedProject}
        onSubmit={handleProjectSubmit}
      />

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
      />
    </div>
  )
}
