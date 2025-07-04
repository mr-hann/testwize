"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, FileText, UserIcon, LogOut, X, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface Teacher {
  fullName: string
  email: string
  schoolName?: string
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const currentTeacher = localStorage.getItem("currentTeacher")
    if (currentTeacher) {
      setTeacher(JSON.parse(currentTeacher))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("currentTeacher")
    router.push("/")
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/teacher/dashboard",
      icon: BookOpen,
      current: pathname === "/teacher/dashboard",
    },
    {
      name: "View Analytics",
      href: "/teacher/analytics",
      icon: BarChart3,
      current: pathname === "/teacher/analytics",
    },
    {
      name: "Question Banks",
      href: "/teacher/question-banks",
      icon: FileText,
      current: pathname === "/teacher/question-banks",
    },
    {
      name: "View Results",
      href: "/teacher/results",
      icon: Trophy,
      current: pathname === "/teacher/results",
    },
    {
      name: "Teacher Profile",
      href: "/teacher/profile",
      icon: UserIcon,
      current: pathname === "/teacher/profile",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 static">
      {/* Desktop Sidebar - Fixed and always visible */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:z-50">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200 shadow-sm">
          {/* Logo */}
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/testwise-logo.png"
                alt="TestWise Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">TestWise</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors`}
                >
                  <item.icon
                    className={`${
                      item.current ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                    } mr-3 h-5 w-5 flex-shrink-0`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="px-2 pb-4">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? "fixed inset-0 z-40" : ""}`}>
        {sidebarOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        )}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-white transition duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/testwise-logo.png"
                alt="TestWise Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">TestWise</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`${
                  item.current
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-sm font-medium border-l-4 transition-colors`}
              >
                <item.icon
                  className={`${
                    item.current ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
                  } mr-3 h-5 w-5 flex-shrink-0`}
                />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="px-2 pb-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile top navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/testwise-logo.png"
                alt="TestWise Logo"
                width={24}
                height={24}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-gray-900">TestWise</span>
            </div>
            <div className="w-8" /> {/* Spacer for centering */}
            <div className="px-2 pb-4">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 lg:hidden"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop top bar - fixed */}
        <div className="hidden lg:block fixed top-0 left-64 right-0 z-20 bg-white border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Back to Dashboard button */}
              <Link href="/teacher/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Dashboard</span>
                </Button>
              </Link>
              {/* Teacher info */}
              {teacher && (
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{teacher.fullName}</h1>
                  <p className="text-sm text-gray-600">{teacher.email}</p>
                  {teacher.schoolName && (
                    <p className="text-xs text-gray-500">{teacher.schoolName}</p>
                  )}
                </div>
              )}
            </div>
            <Badge variant="secondary">Teacher Dashboard</Badge>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 pb-16 lg:pb-0 pt-16 lg:pt-20">{children}</main>

        {/* Mobile bottom navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="grid grid-cols-5 gap-1 p-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.current ? "text-blue-600" : "text-gray-400"
                } flex flex-col items-center justify-center py-2 px-1 text-xs font-medium transition-colors`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name.split(" ")[0]}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
