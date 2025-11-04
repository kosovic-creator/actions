import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Student Management System
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Simple CRUD application built with Next.js 15, Prisma, and PostgreSQL
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
            <Link
              href="/students"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-colors text-center"
            >
              View All Students
            </Link>
            <Link
              href="/students/add"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-colors text-center"
            >
              Add New Student
            </Link>
          </div>

          <div className="mt-16 text-sm text-gray-500">
            <h2 className="text-lg font-semibold mb-4">Features:</h2>
            <ul className="space-y-2">
              <li>✅ Create new students</li>
              <li>✅ View all students in a table</li>
              <li>✅ Edit existing students</li>
              <li>✅ Delete students</li>
              <li>✅ Simple and clean design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}