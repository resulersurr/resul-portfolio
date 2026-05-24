'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isDemo?: boolean
}

const QUICK_QUESTIONS = [
  'SaaS MVP maliyeti ve süresi nedir?',
  'Ne tür AI ve otomasyon çözümleri sunuyorsunuz?',
  'Next.js ve Vercel altyapısının avantajı ne?',
  'Nasıl ücretsiz proje analizi alabilirim?',
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)

  // Initialize messages from sessionStorage or default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = sessionStorage.getItem('ersurer_chat_messages')
      const savedInteracted = sessionStorage.getItem('ersurer_chat_interacted')
      
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      } else {
        setMessages([
          {
            role: 'assistant',
            content: 'Merhaba! Ben Resul Ersürer\'in yapay zeka asistanıyım. Next.js, Vercel, SaaS MVP geliştirme ve AI otomasyon hizmetleri hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim? 👋',
          },
        ])
      }

      if (savedInteracted) {
        setHasInteracted(true)
      } else {
        // Show onboarding tooltip after 3 seconds if not interacted
        const timer = setTimeout(() => {
          setShowTooltip(true)
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Save messages to sessionStorage on change
  const saveMessages = (updatedMessages: Message[]) => {
    setMessages(updatedMessages)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ersurer_chat_messages', JSON.stringify(updatedMessages))
    }
  }

  // Handle outside click to close chatbot (only on desktop layout)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        window.innerWidth >= 640 && // only close on desktop sizes
        chatWindowRef.current &&
        !chatWindowRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  const handleOpenChat = () => {
    setIsOpen(true)
    setShowTooltip(false)
    if (!hasInteracted) {
      setHasInteracted(true)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ersurer_chat_interacted', 'true')
      }
    }
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    saveMessages(updatedMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) {
        throw new Error('Yanıt alınamadı')
      }

      const data = await response.json()
      saveMessages([...updatedMessages, { role: 'assistant', content: data.content, isDemo: data.isDemo }])
    } catch (error) {
      console.error('Chat error:', error)
      saveMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: 'Üzgünüm, şu anda bağlantı kuramıyorum. Lütfen daha sonra tekrar deneyin veya doğrudan resul.ersurer@icloud.com üzerinden iletişime geçin.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickQuestionClick = (question: string) => {
    handleSendMessage(question)
  }

  const handleScrollToContact = () => {
    setIsOpen(false)
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClearChat = () => {
    if (confirm('Sohbet geçmişini sıfırlamak istiyor musunuz?')) {
      const initial: Message[] = [
        {
          role: 'assistant',
          content: 'Merhaba! Ben Resul Ersürer\'in yapay zeka asistanıyım. Next.js, Vercel, SaaS MVP geliştirme ve AI otomasyon hizmetleri hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olabilirim? 👋',
        },
      ]
      saveMessages(initial)
    }
  }

  // Detect if the assistant has suggested contact or analysis to highlight the CTA button
  const hasContactSuggestion = messages.some(
    (msg) =>
      msg.role === 'assistant' &&
      (msg.content.includes('form') ||
        msg.content.includes('analiz') ||
        msg.content.includes('iletişim'))
  )

  return (
    <>
      {/* Floating Action Button & Onboarding Tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleOpenChat}
              className="mb-3 mr-1 bg-[#1D1D1F] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 cursor-pointer pointer-events-auto max-w-[280px] sm:max-w-xs hover:bg-black transition-all duration-300 relative group"
            >
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 animate-pulse" />
              <div className="text-xs sm:text-sm font-medium leading-snug">
                Projeniz için yardıma mı ihtiyacınız var? 👋
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(false)
                }}
                className="absolute -top-1.5 -right-1.5 bg-gray-800 text-gray-400 hover:text-white rounded-full p-0.5 border border-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Button */}
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleOpenChat}
            className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0071E3] text-white flex items-center justify-center shadow-2xl hover:bg-[#0077ED] transition-colors relative"
            aria-label="Yapay Zeka Asistanı"
          >
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#F5F5F7] animate-pulse" />
          </motion.button>
        )}
      </div>

      {/* Chat Window overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed bottom-0 right-0 w-full h-[100vh] sm:bottom-24 sm:right-6 sm:w-[390px] sm:h-[580px] sm:max-h-[calc(100vh-120px)] sm:rounded-3xl z-50 flex flex-col overflow-hidden bg-white/95 backdrop-blur-xl border border-black/10 sm:border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#1D1D1F] text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-white/10">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h5 className="font-bold text-sm leading-none flex items-center gap-1.5">
                    Resul&apos;ün Asistanı
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                  </h5>
                  <span className="text-[10px] text-gray-400 font-medium">Yapay Zeka Asistanı</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  title="Sohbeti temizle"
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sticky Form Banner CTA */}
            {hasContactSuggestion && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50 border-b border-indigo-100 px-4 py-2.5 flex items-center justify-between text-xs shrink-0 text-indigo-950"
              >
                <div className="font-medium">Proje Analiz Formunu doldurmak ister misiniz?</div>
                <button
                  onClick={handleScrollToContact}
                  className="bg-[#0071E3] hover:bg-[#0077ED] text-white font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1 text-[11px]"
                >
                  Forma Git <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            )}

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-[#F5F5F7]/30">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[82%] text-sm shadow-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#0071E3] text-white rounded-tr-sm font-medium'
                        : 'bg-white text-[#1D1D1F] border border-black/[0.04] rounded-tl-sm'
                    }`}
                  >
                    {msg.content}
                    
                    {/* Demo mode badge for developer visibility */}
                    {msg.isDemo && (
                      <div className="text-[9px] text-gray-400 mt-1.5 font-bold uppercase tracking-widest text-right">
                        Demo Modu
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-black/[0.04] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick reply suggestion chips */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 bg-white flex flex-wrap gap-2 border-t border-black/[0.03] shrink-0">
                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleQuickQuestionClick(question)}
                    className="text-[11px] sm:text-xs text-gray-500 bg-[#F5F5F7] hover:bg-gray-200 border border-black/[0.03] rounded-full px-3 py-1.5 text-left transition-colors font-medium cursor-pointer"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputValue)
              }}
              className="p-3 bg-white border-t border-black/[0.06] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Resul ile çalışma hakkında sorun..."
                disabled={isLoading}
                className="flex-grow bg-[#F5F5F7] border-0 rounded-full px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#0071E3] text-[#1D1D1F] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-[#0071E3] text-white rounded-full hover:bg-[#0077ED] transition-all disabled:opacity-50 disabled:hover:bg-[#0071E3] cursor-pointer shrink-0"
                aria-label="Gönder"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="bg-white text-center pb-2 text-[9px] text-gray-400 select-none shrink-0 font-medium tracking-wide">
              Ücretsiz Proje Analizi İçin <button type="button" onClick={handleScrollToContact} className="text-[#0071E3] font-bold hover:underline">Formu Doldurun</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
