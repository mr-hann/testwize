"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Users, BarChart3, Eye, Edit, Trash2, Copy, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "@/components/dashboard-layout"


export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const [testsState, setTestsState] = useState<Test[]>([])
  const [deletingTestId, setDeletingTestId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const currentUser = localStorage.getItem("currentUser")

    if (!isAuthenticated || !currentUser) {
      router.push("/auth/login")
      return
    }

    setUser(JSON.parse(currentUser))

    // fetch from json-server
    const fetchTests = async () => {
      setIsLoading(true)
      try {
       const [testsRes, resultsRes, dataRes] = await Promise.all([
        fetch("http://localhost:4000/tests"),
        fetch("http://localhost:4000/testResults"),
        fetch("http://localhost:4000/testData")
      ])
       if (!testsRes.ok || !resultsRes.ok || !dataRes.ok) throw new Error("Could not load tests")

      const [tests, results, data] = await Promise.all([
        testsRes.json(),
        resultsRes.json(),
        dataRes.json()
      ])
        
      // merge results into tests
    const merged = tests.map(test => {
  const result = results.find(r => r.testId === test.id)
  const dataItem = data.find(q => q.testId === test.id)
  return {
    ...test,
    shareLink: `${window.location.origin}/test/${test.id}`,
    totalStudents: result?.totalStudents || 0,
    averageScore: result?.averageScore || 0,
    completed: result?.completed || 0,
    questionBank: dataItem?.questions || []
  }
})

      setTestsState(merged)
      } catch (err) {
        console.error(err)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load tests from server.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTests()
  }, [router, toast])

  const copyShareLink = async (shareLink: string) => {
    try {
      await navigator.clipboard.writeText(shareLink)
      toast({
        title: "Success!",
        description: "Share link copied to clipboard",
      })
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy link to clipboard",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDeleteTest = async (testId: string, testTitle: string) => {
    if (confirm(`Are you sure you want to delete "${testTitle}"? This action cannot be undone.`)) {
      setDeletingTestId(testId)
      try {
       await Promise.all([
        fetch(`http://localhost:4000/tests/${testId}`, { method: "DELETE" }),
        fetch(`http://localhost:4000/testResults/${testId}`, { method: "DELETE" }),
        fetch(`http://localhost:4000/testData/${testId}`, { method: "DELETE" }),
      ])
     
        setTestsState((prev) =>prev.filter((test) => test.id !== testId))
        toast({
          title: "Test Deleted",
          description: `"${testTitle}" has been successfully deleted.`,
        })
      } catch {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete test. Please try again.",
        })
      } finally {
        setDeletingTestId(null)
      }
    }
  }
  // avarage score 
  const averageScore =
  testsState.length > 0
    ? (
        testsState.reduce((sum, test) => sum + (test.averageScore || 0), 0) /
        testsState.length
      ).toFixed(1)
    : 0
console.log(testsState)
    // calculate pass rate
const totalStudents = testsState.reduce((sum, test) => sum + (test.totalStudents || 0), 0);
const totalPassed = testsState.reduce(
  (sum, test) => sum + (test.completed || 0), // assuming "completed" = passed
  0
);

const passRate = totalStudents > 0 ? ((totalPassed / totalStudents) * 100).toFixed(1) : 0;


  if (!user || isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 pb-20 lg:pb-6">
        {/* Welcome */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.fullName}!</h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage your tests, view analytics, and track student performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{testsState.length}</div>
              <p className="text-xs text-muted-foreground">
                {testsState.filter((t) => t.status === "active").length} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {testsState.reduce((sum, test) => sum + (test.responses || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Pass Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{passRate}%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
          <Link href="/teacher/create-test" className="flex-1 sm:flex-none">
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create New Test
            </Button>
          </Link>
          <Link href="/teacher/analytics" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>

        {/* Tests list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Your Tests</CardTitle>
            <CardDescription>Manage and monitor your created tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testsState.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg space-y-3 lg:space-y-0"
                >
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <h3 className="font-semibold text-base md:text-lg">{test.title}</h3>
                      <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                     <span>{test.questionBank.length} questions</span>
                      <span>{test.timeLimit} minutes</span>
                      <span>{test.responses} responses</span>
                      <span>Created {test.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareLink(test.shareLink)}
                      className="text-xs"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                    <Link href={`/teacher/test/${test.id}/results`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        Results
                      </Button>
                    </Link>
                    <Link href={`/teacher/test/${test.id}/edit`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTest(test.id, test.title)}
                      disabled={deletingTestId === test.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                    >
                      {deletingTestId === test.id ? (
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3 mr-1" />
                      )}
                      Delete
                    </Button>
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
