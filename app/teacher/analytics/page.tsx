"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Download, TrendingUp, Users, Target, Trophy, Search, Medal, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()

  // Class performance comparison
  const classPerformance = [
    { className: "Grade 10A", students: 32, avgScore: 83.2, passRate: 87, testsCompleted: 156 },
    { className: "Grade 10B", students: 28, avgScore: 85.8, passRate: 89, testsCompleted: 142 },
    { className: "Grade 10C", students: 30, avgScore: 79.4, passRate: 82, testsCompleted: 138 },
  ]

  useEffect(() => {
    // Get current user info
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

// this data here has to be generated 

  // Comprehensive analytics data for all tests
  const overallStats = {
    totalTests: 12,
    totalStudents: 156,
    totalSubmissions: 324,
    averageScore: 78.5,
    passRate: 85.2,
    totalTimeSpent: 2840, // in minutes
  }

  // All student results across all tests
  const allStudentResults = [
    {
      id: "1",
      studentName: "Alice Johnson",
      className: "Grade 10A",
      testsTaken: 5,
      averageScore: 92.4,
      bestScore: 98,
      totalTimeSpent: 180,
      lastTestDate: "2024-01-15",
      scores: [85, 90, 95, 98, 94],
    },
    {
      id: "2",
      studentName: "Bob Smith",
      className: "Grade 10A",
      testsTaken: 4,
      averageScore: 84.5,
      bestScore: 90,
      totalTimeSpent: 165,
      lastTestDate: "2024-01-14",
      scores: [80, 85, 90, 83],
    },
    {
      id: "3",
      studentName: "Carol Davis",
      className: "Grade 10B",
      testsTaken: 6,
      averageScore: 88.2,
      bestScore: 95,
      totalTimeSpent: 220,
      lastTestDate: "2024-01-16",
      scores: [82, 88, 90, 95, 85, 89],
    },
    {
      id: "4",
      studentName: "David Wilson",
      className: "Grade 10A",
      testsTaken: 5,
      averageScore: 86.8,
      bestScore: 92,
      totalTimeSpent: 195,
      lastTestDate: "2024-01-15",
      scores: [84, 88, 92, 85, 85],
    },
    {
      id: "5",
      studentName: "Emma Brown",
      className: "Grade 10B",
      testsTaken: 4,
      averageScore: 90.5,
      bestScore: 96,
      totalTimeSpent: 155,
      lastTestDate: "2024-01-13",
      scores: [88, 90, 96, 88],
    },
    {
      id: "6",
      studentName: "Frank Miller",
      className: "Grade 10A",
      testsTaken: 3,
      averageScore: 76.3,
      bestScore: 82,
      totalTimeSpent: 140,
      lastTestDate: "2024-01-12",
      scores: [70, 82, 77],
    },
    {
      id: "7",
      studentName: "Grace Lee",
      className: "Grade 10B",
      testsTaken: 5,
      averageScore: 94.2,
      bestScore: 100,
      totalTimeSpent: 175,
      lastTestDate: "2024-01-16",
      scores: [92, 94, 100, 95, 90],
    },
    {
      id: "8",
      studentName: "Henry Chen",
      className: "Grade 10A",
      testsTaken: 4,
      averageScore: 81.5,
      bestScore: 88,
      totalTimeSpent: 160,
      lastTestDate: "2024-01-14",
      scores: [78, 82, 88, 78],
    },
  ]

  // Filter students based on search
  const filteredStudents = allStudentResults.filter((student) =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get top performers
  const topPerformers = [...allStudentResults].sort((a, b) => b.averageScore - a.averageScore).slice(0, 5)

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-200"
    if (score >= 80) return "text-blue-600 bg-blue-50 border-blue-200"
    if (score >= 70) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    if (score >= 60) return "text-orange-600 bg-orange-50 border-orange-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const exportAllData = () => {
    try {
      const csvContent = [
        [
          "Student Name",
          "Class",
          "Tests Taken",
          "Average Score (%)",
          "Best Score (%)",
          "Total Time (min)",
          "Last Test Date",
        ],
        ...filteredStudents.map((student) => [
          student.studentName,
          student.className,
          student.testsTaken.toString(),
          student.averageScore.toFixed(1),
          student.bestScore.toString(),
          student.totalTimeSpent.toString(),
          student.lastTestDate,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "comprehensive-analytics.csv"
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Analytics data has been exported to CSV file.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export data. Please try again.",
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-sm md:text-base text-gray-600">
              Comprehensive insights into student performance and test analytics
            </p>
          </div>
          <Button onClick={exportAllData} size="sm">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export All Data</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Tests</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{overallStats.totalTests}</div>
              <p className="text-xs text-muted-foreground">Created</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{overallStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Registered</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Submissions</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{overallStats.totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{overallStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Overall</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Pass Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{overallStats.passRate}%</div>
              <p className="text-xs text-muted-foreground">≥60% score</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{Math.round(overallStats.totalTimeSpent / 60)}h</div>
              <p className="text-xs text-muted-foreground">Spent testing</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Top Performing Students</span>
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Performance insights and student analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topPerformers.map((student, index) => (
                <div
                  key={student.id}
                  className="text-center p-4 border rounded-lg bg-gradient-to-b from-white to-gray-50"
                >
                  <div className="flex items-center justify-center mb-2">
                    {index === 0 && <Medal className="w-6 md:w-8 h-6 md:h-8 text-yellow-500" />}
                    {index === 1 && <Medal className="w-6 md:w-8 h-6 md:h-8 text-gray-400" />}
                    {index === 2 && <Medal className="w-6 md:w-8 h-6 md:h-8 text-amber-600" />}
                    {index > 2 && <Star className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />}
                  </div>
                  <h3 className="font-semibold text-sm md:text-lg">{student.studentName}</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-2">{student.className}</p>
                  <div
                    className={`text-lg md:text-2xl font-bold px-2 md:px-3 py-1 rounded-lg ${getScoreColor(student.averageScore)}`}
                  >
                    {student.averageScore.toFixed(1)}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{student.testsTaken} tests taken</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card className="mb-6 md:mb-8">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Class Performance Comparison</CardTitle>
            <CardDescription className="text-sm md:text-base">Performance metrics by class</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {classPerformance.map((classData, index) => (
                <div key={index} className="p-4 border rounded-lg bg-white">
                  <h3 className="font-semibold text-base md:text-lg mb-3">{classData.className}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{classData.students}</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Avg Score:</span>
                      <span className="font-medium">{classData.avgScore}%</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Pass Rate:</span>
                      <span className="font-medium">{classData.passRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-600">Tests Completed:</span>
                      <span className="font-medium">{classData.testsCompleted}</span>
                    </div>
                    <Progress value={classData.avgScore} className="h-2 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Students Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">All Students Performance</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Comprehensive view of all student performance data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-md text-sm md:text-base"
                />
              </div>
            </div>
            <div className="space-y-4">
              {filteredStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg bg-white space-y-3 lg:space-y-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full text-blue-600 font-semibold text-sm md:text-base">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{student.studentName}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs md:text-sm text-gray-600">
                        <span>{student.className}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{student.testsTaken} tests taken</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Last: {student.lastTestDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
                    <div className="text-center">
                      <div
                        className={`text-lg md:text-xl font-bold px-2 md:px-3 py-1 rounded-lg ${getScoreColor(student.averageScore)}`}
                      >
                        {student.averageScore.toFixed(1)}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Average</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-green-600 px-2 md:px-3 py-1 bg-green-50 rounded-lg border border-green-200">
                        {student.bestScore}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Best</p>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-xl font-bold text-blue-600 px-2 md:px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
                        {student.totalTimeSpent}m
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Total Time</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
