'use client'

import { createStudentTest, updateStudentTest, deleteStudentTest, getStudents } from '@/lib/actions'
import { useState, useEffect, useCallback } from 'react'

interface Student {
  id: number
  name: string
  email: string
  createdAt: Date
}

export default function TestActionsPage() {
  const [results, setResults] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudentId, setSelectedStudentId] = useState<string>('')

  // Form states
  const [createForm, setCreateForm] = useState({ name: '', email: '' })
  const [updateForm, setUpdateForm] = useState({ name: '', email: '' })

  // Učitaj studente
  const loadStudents = useCallback(async () => {
    try {
      const studentList = await getStudents()
      setStudents(studentList)
      if (studentList.length > 0 && !selectedStudentId) {
        setSelectedStudentId(studentList[0].id.toString())
      }
    } catch (error) {
      console.error('Error loading students:', error)
    }
  }, [selectedStudentId])

  // Učitavanje studenata na početku
  useEffect(() => {
    const initLoad = async () => {
      try {
        const studentList = await getStudents()
        setStudents(studentList)
        if (studentList.length > 0 && !selectedStudentId) {
          setSelectedStudentId(studentList[0].id.toString())
        }
      } catch (error) {
        console.error('Error loading students:', error)
      }
    }
    initLoad()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const testCreateStudent = async () => {
    if (!createForm.name || !createForm.email) {
      setResults('Molimo unesite ime i email za kreiranje studenta')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', createForm.name)
      formData.append('email', createForm.email)

      const result = await createStudentTest(formData)
      setResults(JSON.stringify(result, null, 2))

      if (result.success) {
        await loadStudents() // Osvezi listu
        setCreateForm({ name: '', email: '' }) // Reset forme
      }
    } catch (error) {
      setResults(`Error: ${error}`)
    }
    setLoading(false)
  }

  const testUpdateStudent = async () => {
    if (!selectedStudentId) {
      setResults('Molimo izaberite studenta za ažuriranje')
      return
    }

    if (!updateForm.name || !updateForm.email) {
      setResults('Molimo unesite ime i email za ažuriranje studenta')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', selectedStudentId)
      formData.append('name', updateForm.name)
      formData.append('email', updateForm.email)

      const result = await updateStudentTest(formData)
      setResults(JSON.stringify(result, null, 2))

      if (result.success) {
        await loadStudents() // Osvezi listu
        setUpdateForm({ name: '', email: '' }) // Reset forme
      }
    } catch (error) {
      setResults(`Error: ${error}`)
    }
    setLoading(false)
  }

  const testDeleteStudent = async () => {
    if (!selectedStudentId) {
      setResults('Molimo izaberite studenta za brisanje')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', selectedStudentId)

      const result = await deleteStudentTest(formData)
      setResults(JSON.stringify(result, null, 2))

      if (result.success) {
        await loadStudents() // Osvezi listu
        setSelectedStudentId('') // Resetuj izbor
      }
    } catch (error) {
      setResults(`Error: ${error}`)
    }
    setLoading(false)
  }

  const testApiEndpoint = async (method: string, endpoint: string, body?: Record<string, unknown>) => {
    setLoading(true)
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (body) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(endpoint, options)
      const data = await response.json()
      setResults(`Response: ${JSON.stringify(data, null, 2)}`)

      // Osvezi listu ako je bila POST/PUT/DELETE operacija
      if (method !== 'GET') {
        await loadStudents()
      }
    } catch (error) {
      setResults(`Error: ${error}`)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test Server Actions & API</h1>

      {/* Student List */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Trenutni studenti:</h3>
          <button
            onClick={() => loadStudents()}
            disabled={loading}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {students.map(student => (
            <div key={student.id} className="bg-gray-100 px-3 py-1 rounded text-sm">
              {student.name} ({student.email})
            </div>
          ))}
          {students.length === 0 && (
            <div className="text-gray-500 italic">Nema studenata u bazi</div>
          )}
        </div>

        {students.length > 0 && (
          <div>
            <label className="block text-sm font-medium mb-2">
              Izaberite studenta za testiranje Update/Delete:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                const studentId = e.target.value;
                setSelectedStudentId(studentId);

                // Auto-fill update form sa podacima izabranog studenta
                if (studentId) {
                  const selectedStudent = students.find(s => s.id.toString() === studentId);
                  if (selectedStudent) {
                    setUpdateForm({
                      name: selectedStudent.name,
                      email: selectedStudent.email
                    });
                  }
                } else {
                  setUpdateForm({ name: '', email: '' });
                }
              }}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Izaberite studenta --</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} (ID: {student.id})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Input Forms */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Form */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Kreiranje novog studenta</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Ime:</label>
              <input
                type="text"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                placeholder="Unesite ime studenta"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                placeholder="Unesite email studenta"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Update Form */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-3">Ažuriranje studenta</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Novo ime:</label>
              <input
                type="text"
                value={updateForm.name}
                onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
                placeholder="Unesite novo ime"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                disabled={!selectedStudentId}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Novi email:</label>
              <input
                type="email"
                value={updateForm.email}
                onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
                placeholder="Unesite novi email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                disabled={!selectedStudentId}
              />
            </div>
            {!selectedStudentId && (
              <p className="text-sm text-gray-500 italic">
                Izaberite studenta za ažuriranje
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Server Actions Testing */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Server Actions</h2>
          <div className="space-y-4">
            <button
              onClick={testCreateStudent}
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Create Student
            </button>
            <button
              onClick={testUpdateStudent}
              disabled={loading || !selectedStudentId}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Update Student {selectedStudentId && `(ID: ${selectedStudentId})`}
            </button>
            <button
              onClick={testDeleteStudent}
              disabled={loading || !selectedStudentId}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Test Delete Student {selectedStudentId && `(ID: ${selectedStudentId})`}
            </button>
          </div>
        </div>

        {/* API Testing */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-4">
            <button
              onClick={() => testApiEndpoint('GET', '/api/students')}
              disabled={loading}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              GET All Students
            </button>
            <button
              onClick={() => testApiEndpoint('GET', `/api/students/${selectedStudentId || '1'}`)}
              disabled={loading}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              GET Student by ID {selectedStudentId && `(${selectedStudentId})`}
            </button>
            <button
              onClick={() => testApiEndpoint('POST', '/api/students', {
                name: `API Test Student ${Date.now()}`,
                email: `api-${Date.now()}@test.com`
              })}
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              POST Create Student
            </button>
            <button
              onClick={() => testApiEndpoint('PUT', `/api/students/${selectedStudentId || '1'}`, {
                name: `Updated API Student ${Date.now()}`,
                email: `updated.api-${Date.now()}@test.com`
              })}
              disabled={loading || !selectedStudentId}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              PUT Update Student {selectedStudentId && `(${selectedStudentId})`}
            </button>
            <button
              onClick={() => testApiEndpoint('DELETE', `/api/students/${selectedStudentId || '1'}`)}
              disabled={loading || !selectedStudentId}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50"
            >
              DELETE Student {selectedStudentId && `(${selectedStudentId})`}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Results:</h3>
          <pre className="whitespace-pre-wrap text-sm">{results}</pre>
        </div>
      )}
    </div>
  )
}