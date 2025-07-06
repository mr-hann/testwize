"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createUser } from "@/api/api"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

     try {
      // create user data
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        schoolName: formData.schoolName,
        role: "teacher",
        plan: "free",
        testsCreated: 0,
        createdAt: new Date().toISOString(),
      }

      // save to JSON server
      await createUser(userData)

      // local storage
      localStorage.setItem("currentUser", JSON.stringify(userData))
      localStorage.setItem("isAuthenticated", "true")

      setSuccess(true)

      // Redirect to dashboard after success message
      setTimeout(() => {
        router.push("/teacher/dashboard")
      }, 2000)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    // Simulate Google signup
    setIsLoading(true)
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        fullName: "Google User",
        email: "user@gmail.com",
        schoolName: "",
        role: "teacher",
        plan: "free",
        testsCreated: 0,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("currentUser", JSON.stringify(userData))
      localStorage.setItem("isAuthenticated", "true")
      router.push("/teacher/dashboard")
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl md:text-2xl text-green-600">Welcome to TestWise!</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Your free trial has started. Create your first test with up to 10 questions!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/images/testwise-logo.png" alt="TestWise Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-xl md:text-2xl font-bold text-gray-900">TestWise</span>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl md:text-2xl">Start Your Free Trial</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Create your first test with up to 10 questions - completely free!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Signup Button */}
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 bg-transparent"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm md:text-base">{isLoading ? "Creating account..." : "Sign up with Google"}</span>
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm md:text-base">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-sm md:text-base">
                  School Name (Optional)
                </Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  placeholder="Enter your school name"
                  value={formData.schoolName}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm md:text-base">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm md:text-base">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="text-sm md:text-base"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              <div className="p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2 text-sm md:text-base">🎉 Your Free Trial Includes:</h4>
                <ul className="text-xs md:text-sm text-green-700 space-y-1">
                  <li>✅ Create 1 test with up to 10 questions</li>
                  <li>✅ Share test link with students</li>
                  <li>✅ View basic results and analytics</li>
                  <li>✅ Mobile-friendly student interface</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                <span className="text-sm md:text-base">{isLoading ? "Creating Account..." : "Start Free Trial"}</span>
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
