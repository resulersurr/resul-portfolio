import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Mesajlar getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Mesajlar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
