'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MessageSquare, Send, Calendar, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Backend Projesi',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic local validation check
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Mesaj gönderilemedi')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: 'Backend Projesi', message: '' })
      
      // Reset success state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      console.error('Gönderim hatası:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">İletişim</h2>
            <h3 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-tight">
              Birlikte <span className="gradient-text">Geliştirelim</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
              Yeni bir proje fikriniz mi var veya mevcut sisteminizi ölçeklendirmek mi istiyorsunuz? Hemen iletişime geçin, teknik stratejinizi birlikte kurgulayalım.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'resul.ersurer@icloud.com', href: 'mailto:resul.ersurer@icloud.com' },
                { icon: MessageSquare, label: 'WhatsApp', value: '+90 538 778 17 98', href: 'https://wa.me/905387781798' },
                { icon: Calendar, label: 'Toplantı Planla', value: 'Calendly Üzerinden', href: '#' },
              ].map((item, i) => (
                <motion.a 
                  key={i} 
                  href={item.href}
                  whileHover={{ x: 10, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                  className="flex items-center gap-6 p-4 rounded-2xl glass border border-white/5 transition-all duration-300 group w-fit pr-10"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-indigo-500/5">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{item.label}</div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-1 pr-1 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-[3rem]"
          >
            <div className="p-10 rounded-[2.9rem] bg-slate-950/90 backdrop-blur-3xl relative overflow-hidden">
              {/* Form Title */}
              <h4 className="text-2xl font-bold text-white mb-8">Hızlı Mesaj Gönder</h4>
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Ad Soyad</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Resul Ersürer"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 hover:bg-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">E-Posta</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="resul@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 hover:bg-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Konu</label>
                  <div className="relative">
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all duration-300 appearance-none hover:bg-white/10"
                    >
                      <option className="bg-slate-900">Backend Projesi</option>
                      <option className="bg-slate-900">API Entegrasyonu</option>
                      <option className="bg-slate-900">Otomasyon Sistemleri</option>
                      <option className="bg-slate-900">Diğer</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <Send className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mesajınız</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Projenizden bahsedin..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 resize-none hover:bg-white/10"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: (status === 'loading' || status === 'success') ? 1 : 1.02 }}
                  whileTap={{ scale: (status === 'loading' || status === 'success') ? 1 : 0.98 }}
                  className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-500 ${
                    status === 'success' 
                      ? 'bg-emerald-500 shadow-emerald-500/20' 
                      : status === 'error'
                      ? 'bg-red-500 shadow-red-500/20'
                      : 'gradient-bg shadow-indigo-500/20'
                  } disabled:cursor-not-allowed`}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      İşleniyor...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 animate-bounce" />
                      Başarıyla Gönderildi!
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle className="w-5 h-5 animate-pulse" />
                      Tekrar Deneyin
                    </>
                  ) : (
                    <>
                      Mesajı Gönder
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </>
                  )}
                </motion.button>
                
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-sm text-center font-bold"
                    >
                      Gönderim başarısız. Lütfen bilgilerinizi kontrol edin.
                    </motion.p>
                  )}
                  {status === 'success' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-400 text-sm text-center font-bold"
                    >
                      Mesajınız admin paneline başarıyla kaydedildi!
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>

              {/* Decorative dots */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
