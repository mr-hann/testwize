"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Trophy,
  Users,
  Clock,
  TrendingUp,
  Download,
  ArrowLeft,
  Eye,
  BarChart3,
  Award,
  Target,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import DashboardLayout from "@/components/dashboard-layout"
interface Student {
  id: string
  name: string
  email: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  completedAt: string
  status: "completed" | "in-progress" | "not-started"
}

interface TestResult {
  id: string
  title: string
  subject: string
  totalQuestions: number
  totalPoints: number
  duration: number
  createdAt: string
  students: Student[]
}

export default function TestResultsPage({ params }: { params: { id: string } }) {
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (!authStatus) {
      router.push("/auth/login")
      return
    }
    setIsAuthenticated(true)

    // Mock test results data
    const mockTestResult: TestResult = {
      id: params.id,
      title: "Mathematics Quiz - Algebra",
      subject: "Mathematics",
      totalQuestions: 15,
      totalPoints: 20,
      duration: 30,
      createdAt: "2024-01-15",
      students: [
        {
          id: "1",
          name: "Alice Johnson",
          email: "alice@school.edu",
          score: 85,
          totalQuestions: 15,
          correctAnswers: 13,
          timeSpent: 25,
          completedAt: "2024-01-16T10:30:00Z",
          status: "completed",
        },
        {
          id: "2",
          name: "Bob Smith",
          email: "bob@school.edu",
          score: 92,
          totalQuestions: 15,
          correctAnswers: 14,
          timeSpent: 28,
          completedAt: "2024-01-16T11:15:00Z",
          status: "completed",
        },
        {
          id: "3",
          name: "Carol Davis",
          email: "carol@school.edu",
          score: 78,
          totalQuestions: 15,
          correctAnswers: 12,
          timeSpent: 30,
          completedAt: "2024-01-16T09:45:00Z",
          status: "completed",
        },
        {
          id: "4",
          name: "David Wilson",
          email: "david@school.edu",
          score: 88,
          totalQuestions: 15,
          correctAnswers: 13,
          timeSpent: 22,
          completedAt: "2024-01-16T14:20:00Z",
          status: "completed",
        },
        {
          id: "5",
          name: "Eva Brown",
          email: "eva@school.edu",
          score: 0,
          totalQuestions: 15,
          correctAnswers: 0,
          timeSpent: 0,
          completedAt: "",
          status: "not-started",
        },
      ],
    }

    setTestResult(mockTestResult)
    setIsLoading(false)
  }, [router, params.id])

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!testResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Test results not found.</p>
        </div>
      </div>
    )
  }

  const completedStudents = testResult.students.filter((s) => s.status === "completed")
  const averageScore =
    completedStudents.length > 0
      ? Math.round(completedStudents.reduce((sum, s) => sum + s.score, 0) / completedStudents.length)
      : 0
  const averageTime =
    completedStudents.length > 0
      ? Math.round(completedStudents.reduce((sum, s) => sum + s.timeSpent, 0) / completedStudents.length)
      : 0

  // Chart data
  const scoreDistribution = [
    { range: "90-100%", count: completedStudents.filter((s) => s.score >= 90).length },
    { range: "80-89%", count: completedStudents.filter((s) => s.score >= 80 && s.score < 90).length },
    { range: "70-79%", count: completedStudents.filter((s) => s.score >= 70 && s.score < 80).length },
    { range: "60-69%", count: completedStudents.filter((s) => s.score >= 60 && s.score < 70).length },
    { range: "Below 60%", count: completedStudents.filter((s) => s.score < 60).length },
  ]

  const statusData = [
    { name: "Completed", value: testResult.students.filter((s) => s.status === "completed").length, color: "#10B981" },
    {
      name: "In Progress",
      value: testResult.students.filter((s) => s.status === "in-progress").length,
      color: "#F59E0B",
    },
    {
      name: "Not Started",
      value: testResult.students.filter((s) => s.status === "not-started").length,
      color: "#EF4444",
    },
  ]

  return (
      <DashboardLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link
                href="/teacher/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Trophy className="w-5 h-5 text-yellow-600" />
              <h1 className="text-base md:text-xl font-semibold text-gray-900">
                Test Results
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Link href={`/teacher/test/${testResult.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Test
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* Test Info */}
          <section className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              {testResult.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {testResult.totalQuestions} questions
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {testResult.duration} min
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {testResult.students.length} students
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                {testResult.totalPoints} pts
              </span>
            </div>
          </section>

          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm">Completion Rate</CardTitle>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {Math.round(
                    (completedStudents.length / testResult.students.length) * 100
                  )}
                  %
                </p>
                <p className="text-xs text-gray-500">
                  {completedStudents.length} of {testResult.students.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm">Average Score</CardTitle>
                <Award className="w-4 h-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{averageScore}%</p>
                <p className="text-xs text-gray-500">
                  based on {completedStudents.length} completions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm">Average Time</CardTitle>
                <Clock className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{averageTime} min</p>
                <p className="text-xs text-gray-500">of {testResult.duration} allowed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex justify-between items-center pb-2">
                <CardTitle className="text-sm">Highest Score</CardTitle>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {completedStudents.length > 0
                    ? Math.max(...completedStudents.map((s) => s.score))
                    : 0}
                  %
                </p>
                <p className="text-xs text-gray-500">best performance</p>
              </CardContent>
            </Card>
          </section>

          {/* Detailed Results */}
          <section>
            <Tabs defaultValue="students" className="space-y-4">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Results</CardTitle>
                    <CardDescription>Individual performance details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {testResult.students.map((student: any) => (
                      <div
                        key={student.id}
                        className="border rounded p-4 flex flex-col md:flex-row justify-between gap-4"
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-medium">{student.name}</h3>
                            <Badge
                              className={
                                student.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : student.status === "in-progress"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {student.status === "completed"
                                ? "Completed"
                                : student.status === "in-progress"
                                ? "In Progress"
                                : "Not Started"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{student.email}</p>
                          {student.status === "completed" && (
                            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Award className="w-4 h-4" />
                                {student.score}% ({student.correctAnswers}/
                                {student.totalQuestions})
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {student.timeSpent} min
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(student.completedAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {student.status === "completed" && (
                            <div className="mt-2">
                              <Progress value={student.score} />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {student.status === "completed" && (
                            <Link
                              href={`/teacher/test/${testResult.id}/student/${student.id}`}
                            >
                              <Button variant="ghost" size="icon">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          )}
                          {student.score >= 90 && (
                            <Award className="w-5 h-5 text-yellow-500" />
                          )}
                          {student.score >= 80 && student.score < 90 && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {student.score < 60 && student.status === "completed" && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Score Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={scoreDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="range" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Completion Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={statusData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {statusData.map((entry: any, index: number) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </DashboardLayout>
  )
}
