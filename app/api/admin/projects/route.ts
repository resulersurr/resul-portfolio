import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'
import { parseProjectRequest } from '@/lib/project-images'

// GET /api/admin/projects - Get all projects (admin only)
export async function GET(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await parseProjectRequest(request, true)
    const { title, category, description, tech, image, link, github, order } = body

    if (!title || !category || !description || !image) {
      return NextResponse.json(
        { error: 'Title, category, description and image are required' },
        { status: 400 }
      )
    }

    const project = await prisma.project.create({
      data: {
        title,
        category,
        description,
        tech: String(tech || ''),
        image,
        link: String(link || '#'),
        github: String(github || ''),
        order: Number(order) || 0,
      },
    })

    return NextResponse.json({ success: true, project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)

    if (error instanceof Error && (
      error.message === 'Image is required' ||
      error.message === 'Only JPG, PNG, WEBP and GIF images are allowed' ||
      error.message === 'Image must be smaller than 5MB'
    )) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
