'use client'

import { deleteStudent } from '@/lib/actions'

export default function DeleteButton({ id }: { id: number }) {
  return (
    <form action={deleteStudent} className="inline">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </form>
  )
}