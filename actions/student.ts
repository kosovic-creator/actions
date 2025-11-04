// app/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

async function refreshItems(): Promise<void> {
    'use server'
    revalidatePath('/student')
}

//READ
export async function getItems() {
  const students = await prisma.student.findMany()
  return NextResponse.json(students)

}

// CREATE
export async function createItem(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  await prisma.student.create({ data: { name, email } })
    await refreshItems()
}


// UPDATE
export async function updateItem(formData: FormData) {
  const id = parseInt(formData.get('id') as string, 10)
  const name = formData.get('name') as string
  await prisma.student.update({
    where: { id },
    data: { name },
  })
    await refreshItems()
}

// DELETE
export async function deleteItem(formData: FormData) {
  const id = parseInt(formData.get('id') as string, 10)
  await prisma.student.delete({ where: { id } })
    await refreshItems()
}
