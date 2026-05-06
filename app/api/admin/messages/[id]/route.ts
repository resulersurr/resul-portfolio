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

    await prisma.contactMessage.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mesaj silinirken hata:', error)
    return NextResponse.json(
      { error: 'Mesaj silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const { read } = body

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read },
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Mesaj güncellenirken hata:', error)
    return NextResponse.json(
      { error: 'Mesaj güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
