import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Message } from '@/types/admin'

export function useAdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchMessages = useCallback(async () => {
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
  }, [router])

  const toggleRead = async (id: string, read: boolean) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !read }),
      })
      if (!response.ok) throw new Error('Mesaj güncellenemedi')
      setMessages(prev =>
        prev.map((m) => (m.id === id ? { ...m, read: !read } : m))
      )
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Silinemedi')
      setMessages(prev => prev.filter((m) => m.id !== id))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  return {
    messages,
    setMessages,
    loading,
    error,
    fetchMessages,
    toggleRead,
    deleteMessage
  }
}
