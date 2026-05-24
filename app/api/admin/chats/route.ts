import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const chats = await prisma.aIChatSession.findMany({
      orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({ chats })
  } catch (error) {
    console.error('Sohbetler getirilirken hata:', error)
    return NextResponse.json(
      { error: 'Sohbetler getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
