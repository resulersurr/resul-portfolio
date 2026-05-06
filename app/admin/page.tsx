'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, LogOut, Mail, CheckCircle, Circle, RefreshCw } from 'lucide-react'

interface Message {
  id: string
  name: string
  phone: string | null
  message: string
  createdAt: string
  read: boolean
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchMessages = async () => {
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
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">İletişim Mesajları</h1>
                <p className="text-sm text-gray-400">
                  {unreadCount > 0 ? `${unreadCount} okunmamış mesaj` : 'Tüm mesajlar okundu'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={fetchMessages}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Yenile"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <button
              onClick={fetchMessages}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Tekrar Dene
            </button>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-2xl border border-gray-700">
            <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Henüz mesaj yok</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-gray-800 rounded-xl border p-6 transition-all ${
                  message.read ? 'border-gray-700 opacity-75' : 'border-purple-600/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{message.name}</h3>
                      {message.phone && (
                        <span className="text-sm text-purple-400">{message.phone}</span>
                      )}
                      <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
                      {!message.read && (
                        <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
                          Yeni
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleRead(message.id, message.read)}
                      className={`p-2 rounded-lg transition-colors ${
                        message.read
                          ? 'text-green-500 hover:bg-green-500/10'
                          : 'text-gray-400 hover:bg-gray-700'
                      }`}
                      title={message.read ? 'Okunmadı olarak işaretle' : 'Okundu olarak işaretle'}
                    >
                      {message.read ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
