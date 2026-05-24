import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChatSession } from '@/types/admin'

export function useAdminChats() {
  const [chats, setChats] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchChats = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/chats')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Sohbetler getirilemedi')
      const data = await response.json()
      setChats(data.chats)
    } catch (err) {
      console.error('fetchChats error:', err)
      setError('Sohbetler yüklenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }, [router])

  const deleteChat = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/chats/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Silinemedi')
      setChats((prev) => prev.filter((c) => c.id !== id))
      return true
    } catch (err) {
      console.error('deleteChat error:', err)
      return false
    }
  }

  return {
    chats,
    setChats,
    loading,
    error,
    fetchChats,
    deleteChat,
  }
}
