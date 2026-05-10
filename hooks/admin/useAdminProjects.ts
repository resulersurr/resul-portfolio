import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Project } from '@/types/admin'

export function useAdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchProjects = useCallback(async () => {
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
    } catch (err) {
      console.error('Projeler yüklenirken hata:', err)
    } finally {
      setLoading(false)
    }
  }, [router])

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Silinemedi')
      setProjects(prev => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  return {
    projects,
    setProjects,
    loading,
    fetchProjects,
    deleteProject
  }
}
