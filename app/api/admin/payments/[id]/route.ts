import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { status, notes } = body

    const updateData: any = {}
    if (status) {
      updateData.status = status
      if (status === 'verified') {
        updateData.verifiedAt = new Date()
      }
    }
    if (notes !== undefined) updateData.notes = notes

    const payment = await prisma.paymentNotification.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ success: true, payment })
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json(
      { error: 'Failed to update payment' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    await prisma.paymentNotification.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting payment:', error)
    return NextResponse.json(
      { error: 'Failed to delete payment' },
      { status: 500 }
    )
  }
}
