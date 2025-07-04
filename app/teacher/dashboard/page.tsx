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
import { demoTests,Test} from "@/data/demo-test"


export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const [testsState, setTestsState] = useState<Test[]>([])
  const [deletingTestId, setDeletingTestId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  


  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const currentUser = localStorage.getItem("currentUser")

    if (!isAuthenticated || !currentUser) {
      router.push("/auth/login")
      return
    }

    setUser(JSON.parse(currentUser))

setTestsState(
  demoTests.map((test) => ({
    ...test,
    shareLink: `${window.location.origin}${test.shareLink}`,
  }))
)


    setTestsState(demoTests)
  }, [router])

  const copyShareLink = async (shareLink: string) => {
    try {
      await navigator.clipboard.writeText(shareLink)
      toast({
        title: "Success!",
        description: "Share link copied to clipboard",
      })
    } catch (error) {
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
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setTestsState((prevTests) => prevTests.filter((test) => test.id !== testId))

        toast({
          title: "Test Deleted",
          description: `"${testTitle}" has been successfully deleted.`,
        })
      } catch (error) {
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

  if (!user) {
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
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.fullName}!</h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage your tests, view analytics, and track student performance.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">
                {testsState.reduce((sum, test) => sum + test.responses, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* the data here has to be generated*/}
              <div className="text-xl md:text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Pass Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 {/* the data here has to be generated*/}
              <div className="text-xl md:text-2xl font-bold">85%</div>
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

        {/* Tests List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Your Tests</CardTitle>
            <CardDescription className="text-sm md:text-base">Manage and monitor your created tests</CardDescription>
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
                    <p className="text-sm md:text-base text-gray-600 mb-2">{test.description}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                      <span>{test.questions} questions</span>
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
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        <Eye className="w-3 h-3 mr-1" />
                        Results
                      </Button>
                    </Link>
                    <Link href={`/teacher/test/${test.id}/edit`}>
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
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
