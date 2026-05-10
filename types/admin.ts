export interface Message {
  id: string
  name: string
  email: string | null
  subject: string | null
  phone: string | null
  message: string
  budget: string | null
  timeline: string | null
  projectType: string | null
  createdAt: string
  read: boolean
}

export interface Payment {
  id: string
  serviceName: string
  txid: string
  walletAddress: string
  status: 'pending' | 'verified' | 'rejected'
  createdAt: string
  verifiedAt: string | null
  notes: string | null
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  priceUnit: string
  icon: string
  color: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string
  image: string
  link: string | null
  github: string | null
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}
