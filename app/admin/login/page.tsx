'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.error || 'Giriş yetkisi reddedildi')
      }
    } catch {
      setError('Sistem hatası. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/30"
          >
            <ShieldCheck className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Güvenli Erişim</h1>
          <p className="text-slate-400 font-medium">Yönetici panelini görüntülemek için şifrenizi girin</p>
        </div>

        <div className="p-1 pr-1 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-[2.5rem]">
          <div className="bg-slate-900/90 backdrop-blur-3xl rounded-[2.4rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                  <label htmlFor="password" className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Yönetici Şifresi
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-14 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all hover:bg-white/10 font-medium"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-bold"
                  >
                    <AlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full group relative overflow-hidden py-4 px-6 gradient-bg text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Doğrulanıyor...
                    </>
                  ) : (
                    <>
                      Giriş Yap
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>

            <div className="mt-10 text-center">
              <button 
                onClick={() => router.push('/')}
                className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-widest"
              >
                Siteye Geri Dön
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-slate-600 font-medium">
          © {new Date().getFullYear()} Ersürer Product Studio Admin
        </p>
      </motion.div>
    </div>
  )
}
