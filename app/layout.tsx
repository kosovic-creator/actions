import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Management System",
  description: "Complete CRUD application for managing students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
      >
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Student Management
              </Link>
              <div className="flex space-x-4">
                <Link
                  href="/students"
                  className="text-blue-600 hover:text-blue-800"
                >
                  All Students
                </Link>
                <Link
                  href="/test-actions"
                  className="text-green-600 hover:text-green-800"
                >
                  Test Actions
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
