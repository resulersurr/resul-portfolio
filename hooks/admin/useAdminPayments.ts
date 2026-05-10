import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Payment } from '@/types/admin'

export function useAdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchPayments = useCallback(async () => {
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
    } catch (err) {
      console.error('Ödemeler yüklenirken hata:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  const updatePaymentStatus = async (id: string, status: 'verified' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/payments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error('Güncellenemedi')
      
      setPayments(prev => prev.map(p => 
        p.id === id ? { ...p, status, verifiedAt: status === 'verified' ? new Date().toISOString() : null } : p
      ))
      return true
    } catch (err) {
      console.error('Ödeme durumu güncellenirken hata:', err)
      return false
    }
  }

  const deletePayment = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/payments/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Silinemedi')
      setPayments(prev => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  return {
    payments,
    setPayments,
    loading,
    fetchPayments,
    updatePaymentStatus,
    deletePayment
  }
}
