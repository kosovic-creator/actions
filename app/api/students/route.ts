import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { request } from 'https';

// GET /api/students - dobij sve studente
export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
  try {
    const students = await prisma.student.findMany({
      where: {
        name: { contains: searchParams.get('search') || '', mode: 'insensitive' }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(students)
  } catch (error) {
    console.error('Fetch students error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

// POST /api/students - kreiraj novog studenta
export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const student = await prisma.student.create({
      data: { name, email }
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    console.error('Create student error:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}