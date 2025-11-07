'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Dobij sve studente
export async function getStudents() {
  return await prisma.student.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

// Dobij studenta po ID
export async function getStudent(id: string) {
  return await prisma.student.findUnique({
    where: { id: parseInt(id) }
  })
}

// Kreiraj studenta
export async function createStudent(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  await prisma.student.create({
    data: { name, email }
  })

  revalidatePath('/students')
  redirect('/students')
}

// Ažuriraj studenta
export async function updateStudent(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  await prisma.student.update({
    where: { id: parseInt(id) },
    data: { name, email }
  })

  revalidatePath('/students')
  redirect('/students')
}

// Obriši studenta
export async function deleteStudent(formData: FormData) {
  const id = formData.get('id') as string

  await prisma.student.delete({
    where: { id: parseInt(id) }
  })

  revalidatePath('/students')
}

// ====== FUNKCIJE ZA TESTIRANJE (bez redirect) ======

// Kreiraj studenta (za testiranje)
export async function createStudentTest(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    const student = await prisma.student.create({
      data: { name, email }
    })

    revalidatePath('/students')
    return { success: true, student, message: 'Student uspešno kreiran!' }
  } catch (error) {
    console.error('Create student error:', error)
    return { success: false, error: 'Greška pri kreiranju studenta' }
  }
}

// Ažuriraj studenta (za testiranje)
export async function updateStudentTest(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { name, email }
    })

    revalidatePath('/students')
    return { success: true, student, message: 'Student uspešno ažuriran!' }
  } catch (error) {
    console.error('Update student error:', error)
    return { success: false, error: 'Greška pri ažuriranju studenta' }
  }
}

// Obriši studenta (za testiranje)
export async function deleteStudentTest(formData: FormData) {
  try {
    const id = formData.get('id') as string

    await prisma.student.delete({
      where: { id: parseInt(id) }
    })

    revalidatePath('/students')
    return { success: true, message: 'Student uspešno obrisan!' }
  } catch (error) {
    console.error('Delete student error:', error)
    return { success: false, error: 'Greška pri brisanju studenta' }
  }
}