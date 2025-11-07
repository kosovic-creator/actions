import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/students/[id] - dobij studenta po ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both Promise and direct params (Next.js 15+ compatibility)
    const resolvedParams = await Promise.resolve(params)
    const studentId = parseInt(resolvedParams.id)

    // Proveri da li je ID valjan broj
    if (isNaN(studentId)) {
      return NextResponse.json(
        { error: 'Invalid student ID', received: resolvedParams.id },
        { status: 400 }
      )
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error('Fetch student error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch student', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT /api/students/[id] - ažuriraj studenta
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both Promise and direct params (Next.js 15+ compatibility)
    const resolvedParams = await Promise.resolve(params)
    const studentId = parseInt(resolvedParams.id)

    // Proveri da li je ID valjan broj
    if (isNaN(studentId)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      )
    }

    const { name, email } = await request.json()

    // Validacija podataka
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Prvo proveri da li student postoji
    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId }
    })

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Ažuriraj studenta
    const student = await prisma.student.update({
      where: { id: studentId },
      data: { name, email }
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error('Update student error:', error)

    // Specifična Prisma greška za nepostojeći zapis
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update student', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE /api/students/[id] - obriši studenta
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both Promise and direct params (Next.js 15+ compatibility)
    const resolvedParams = await Promise.resolve(params)
    const studentId = parseInt(resolvedParams.id)

    // Proveri da li je ID valjan broj
    if (isNaN(studentId)) {
      return NextResponse.json(
        { error: 'Invalid student ID' },
        { status: 400 }
      )
    }

    // Prvo proveri da li student postoji
    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId }
    })

    if (!existingStudent) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Obriši studenta
    await prisma.student.delete({
      where: { id: studentId }
    })

    return NextResponse.json({
      message: 'Student deleted successfully',
      deletedStudent: existingStudent
    })
  } catch (error) {
    console.error('Delete student error:', error)

    // Specifična Prisma greška za nepostojeći zapis
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete student', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}