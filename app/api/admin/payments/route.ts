import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const payments = await prisma.paymentNotification.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { serviceName, txid } = body

    if (!serviceName || !txid) {
      return NextResponse.json(
        { error: 'Service name and TXID are required' },
        { status: 400 }
      )
    }

    const payment = await prisma.paymentNotification.create({
      data: {
        serviceName,
        txid,
      },
    })

    return NextResponse.json(
      { success: true, payment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating payment notification:', error)
    return NextResponse.json(
      { error: 'Failed to create payment notification' },
      { status: 500 }
    )
  }
}
