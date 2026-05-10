'use client'

import { Search, RefreshCw } from 'lucide-react'

interface AdminHeaderProps {
  activeTab: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  loading: boolean
  onRefresh: () => void
}

export default function AdminHeader({
  activeTab,
  searchQuery,
  setSearchQuery,
  loading,
  onRefresh
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-10 py-4 lg:py-6">
      <div className="flex items-center justify-between gap-4 lg:gap-8 max-w-5xl mx-auto">
        <div className="flex-1 max-w-md relative group">
          <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
          <input 
            type="text" 
            placeholder={activeTab === 'messages' ? "Mesajlarda ara..." : "Ödemelerde ara..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-xl lg:rounded-2xl pl-10 lg:pl-12 pr-4 py-2.5 lg:py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 lg:p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className="hidden lg:block w-10 h-10 rounded-full border-2 border-indigo-500/20 p-0.5">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-indigo-400">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
