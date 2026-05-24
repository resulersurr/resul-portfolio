import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const { id } = params

    await prisma.aIChatSession.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sohbet silinirken hata:', error)
    return NextResponse.json(
      { error: 'Sohbet silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
