'use client'

import { useEffect, useState } from 'react'
import { Send, MessageSquare, Mail } from 'lucide-react'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('contact')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Mesajınız için teşekkürler! En kısa sürede size geri döneceğim.')
    setFormData({ name: '', message: '' })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">İletişime Geçin</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Bir sonraki projenize başlamaya hazır mısınız? Fikirlerinizi hayata geçirmeme nasıl yardımcı olabileceğimizi tartışalım.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300"
                  placeholder="Ahmet Yılmaz"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Projenizden bahsedin..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 gradient-bg text-white font-medium rounded-lg hover-lift transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Mesaj Gönder
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Bağlantı Kuralım</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                Aklınızda bir proje varsa veya sadece olasılıkları tartışmak istiyorsanız, yardımcı olmak için buradayım. Aşağıdaki kanallardan herhangi birinden ulaşın ve birlikte harika bir şeyler yaratalım.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="mailto:resul@example.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">E-posta</div>
                  <div className="text-gray-400">resul@example.com</div>
                </div>
              </a>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">WhatsApp</div>
                  <div className="text-gray-400">+90 532 123 45 67</div>
                </div>
              </a>
            </div>

            {/* Response Time */}
            <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800/30">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-sm font-medium text-purple-300">Hızlı Yanıt</span>
              </div>
              <p className="text-sm text-gray-400">
                Genellikle mesajlara 24 saat içinde yanıt veriyorum. Acil projeler için lütfen mesajınızda belirtin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
