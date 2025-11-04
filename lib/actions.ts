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