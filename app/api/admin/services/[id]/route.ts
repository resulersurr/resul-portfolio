import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

// PATCH /api/admin/services/[id] - Update service
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { title, description, price, priceUnit, icon, color, isActive, order } = body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = price
    if (priceUnit !== undefined) updateData.priceUnit = priceUnit
    if (icon !== undefined) updateData.icon = icon
    if (color !== undefined) updateData.color = color
    if (isActive !== undefined) updateData.isActive = isActive
    if (order !== undefined) updateData.order = order

    const service = await prisma.service.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ success: true, service })
  } catch (error) {
    console.error('Error updating service:', error)
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/services/[id] - Delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    await prisma.service.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}
