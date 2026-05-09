import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

// GET /api/admin/services - Get all services (admin only)
export async function GET(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

// POST /api/admin/services - Create new service
export async function POST(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { title, description, price, priceUnit, icon, color, order } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price: price || 0,
        priceUnit: priceUnit || 'USDT',
        icon: icon || 'Code2',
        color: color || 'from-blue-500 to-indigo-600',
        order: order || 0,
      },
    })

    return NextResponse.json({ success: true, service }, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
