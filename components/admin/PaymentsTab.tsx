'use client'

import { motion } from 'framer-motion'
import { Wallet, CheckCircle, AlertCircle, Trash2, CheckSquare, Square } from 'lucide-react'
import { Payment } from '@/types/admin'
import { formatShortDate } from '@/lib/utils'

interface PaymentsTabProps {
  payments: Payment[]
  selectedItems: Set<string>
  toggleSelection: (id: string) => void
  setSelectedPayment: (payment: Payment) => void
  updatePaymentStatus: (id: string, status: 'verified' | 'rejected') => void
  onDelete: (id: string) => void
}

export default function PaymentsTab({
  payments,
  selectedItems,
  toggleSelection,
  setSelectedPayment,
  updatePaymentStatus,
  onDelete
}: PaymentsTabProps) {
  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <motion.div
          layout
          key={payment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`group relative p-4 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 ${
            payment.status === 'verified'
              ? 'bg-slate-900/30 border-white/5'
              : payment.status === 'rejected'
              ? 'bg-red-900/10 border-red-500/20'
              : 'bg-slate-900/80 border-emerald-500/20 shadow-lg shadow-emerald-500/5'
          }`}
        >
          {/* Selection Checkbox */}
          <button
            onClick={() => toggleSelection(payment.id)}
            className="absolute top-3 left-3 lg:top-4 lg:left-4 z-10"
          >
            {selectedItems.has(payment.id) ? (
              <CheckSquare className="w-5 h-5 text-indigo-400" />
            ) : (
              <Square className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
            )}
          </button>

          <div 
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pl-8 lg:pl-10 cursor-pointer"
            onClick={() => setSelectedPayment(payment)}
          >
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  payment.status === 'verified' ? 'bg-emerald-500 text-white' :
                  payment.status === 'rejected' ? 'bg-red-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {payment.status === 'verified' ? 'Onaylandı' :
                   payment.status === 'rejected' ? 'Reddedildi' : 'Bekliyor'}
                </span>
                <span className="text-xs text-slate-500">{formatShortDate(payment.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">{payment.serviceName}</span>
              </div>

              <code className="block text-xs font-mono text-slate-400 truncate max-w-xs">
                {payment.txid}
              </code>
            </div>

            <div className="flex lg:flex-col gap-2 pl-8 lg:pl-0">
              {payment.status === 'pending' && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updatePaymentStatus(payment.id, 'verified')
                    }}
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all"
                  >
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      updatePaymentStatus(payment.id, 'rejected')
                    }}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(payment.id)
                }}
                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
