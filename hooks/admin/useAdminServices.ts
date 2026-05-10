import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Service } from '@/types/admin'

export function useAdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchServices = useCallback(async () => {
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
    } catch (err) {
      console.error('Hizmetler yüklenirken hata:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  const deleteService = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Silinemedi')
      setServices(prev => prev.filter((s) => s.id !== id))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  return {
    services,
    setServices,
    loading,
    fetchServices,
    deleteService
  }
}
