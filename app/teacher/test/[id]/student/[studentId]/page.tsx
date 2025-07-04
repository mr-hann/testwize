"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: string[]
  correctAnswer: string
  studentAnswer?: string
  isCorrect?: boolean
  timeSpent?: number
}

interface StudentResult {
  studentId: string
  studentName: string
  email: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  submittedAt: string
  answers: Question[]
}

interface Test {
  id: string
  title: string
  subject: string
  duration: number
  totalQuestions: number
}

export default function StudentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string
  const studentId = params.studentId as string

  const [test, setTest] = useState<Test | null>(null)
  const [studentResult, setStudentResult] = useState<StudentResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching test and student result data
    const fetchData = async () => {
      setLoading(true)

      // Mock test data
      const mockTest: Test = {
        id: testId,
        title: "Mathematics Quiz - Algebra Basics",
        subject: "Mathematics",
        duration: 60,
        totalQuestions: 10,
      }

      // Mock student result data
      const mockStudentResult: StudentResult = {
        studentId: studentId,
        studentName: "John Doe",
        email: "john.doe@student.edu",
        score: 75,
        totalQuestions: 10,
        correctAnswers: 7,
        timeSpent: 45,
        submittedAt: "2024-01-15T10:30:00Z",
        answers: [
          {
            id: "1",
            question: "What is 2x + 3 = 11? Solve for x.",
            type: "multiple-choice",
            options: ["x = 2", "x = 4", "x = 6", "x = 8"],
            correctAnswer: "x = 4",
            studentAnswer: "x = 4",
            isCorrect: true,
            timeSpent: 3,
          },
          {
            id: "2",
            question: "Is the equation 3x - 6 = 0 equivalent to x = 2?",
            type: "true-false",
            correctAnswer: "True",
            studentAnswer: "True",
            isCorrect: true,
            timeSpent: 2,
          },
          {
            id: "3",
            question: "Simplify: 4x + 2x - 3x",
            type: "short-answer",
            correctAnswer: "3x",
            studentAnswer: "3x",
            isCorrect: true,
            timeSpent: 4,
          },
          {
            id: "4",
            question: "What is the slope of the line y = 2x + 5?",
            type: "multiple-choice",
            options: ["1", "2", "5", "-5"],
            correctAnswer: "2",
            studentAnswer: "5",
            isCorrect: false,
            timeSpent: 6,
          },
          {
            id: "5",
            question: "Solve: 5x - 10 = 15",
            type: "short-answer",
            correctAnswer: "x = 5",
            studentAnswer: "x = 4",
            isCorrect: false,
            timeSpent: 8,
          },
        ],
      }

      setTest(mockTest)
      setStudentResult(mockStudentResult)
      setLoading(false)
    }

    fetchData()
  }, [testId, studentId])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!test || !studentResult) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Student result not found</h2>
            <p className="text-gray-600 mt-2">The requested student result could not be found.</p>
            <Button onClick={() => router.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getAnswerIcon = (isCorrect: boolean | undefined) => {
    if (isCorrect === true) return <CheckCircle className="h-5 w-5 text-green-500" />
    if (isCorrect === false) return <XCircle className="h-5 w-5 text-red-500" />
    return <AlertCircle className="h-5 w-5 text-yellow-500" />
  }

  const getAnswerBadge = (isCorrect: boolean | undefined) => {
    if (isCorrect === true)
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Correct
        </Badge>
      )
    if (isCorrect === false) return <Badge variant="destructive">Incorrect</Badge>
    return <Badge variant="secondary">Not Answered</Badge>
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{studentResult.studentName}</h1>
              <p className="text-gray-600">{test.title}</p>
            </div>
          </div>
        </div>

        {/* Student Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{studentResult.score}%</div>
              <Progress value={studentResult.score} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Correct Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {studentResult.correctAnswers}/{studentResult.totalQuestions}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round((studentResult.correctAnswers / studentResult.totalQuestions) * 100)}% accuracy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Time Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{formatTime(studentResult.timeSpent)}</div>
              <p className="text-sm text-gray-500 mt-1">of {formatTime(test.duration)} allowed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{new Date(studentResult.submittedAt).toLocaleDateString()}</div>
              <p className="text-sm text-gray-500 mt-1">{new Date(studentResult.submittedAt).toLocaleTimeString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Answer Review */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
            <CardDescription>Detailed breakdown of {studentResult.studentName}'s responses</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Questions</TabsTrigger>
                <TabsTrigger value="correct">Correct</TabsTrigger>
                <TabsTrigger value="incorrect">Incorrect</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {studentResult.answers.map((answer, index) => (
                  <Card key={answer.id} className="border-l-4 border-l-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                          {getAnswerIcon(answer.isCorrect)}
                          {getAnswerBadge(answer.isCorrect)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {answer.timeSpent}m
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">{answer.question}</h4>

                          {answer.type === "multiple-choice" && answer.options && (
                            <div className="space-y-2">
                              {answer.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={`p-2 rounded border ${
                                    option === answer.correctAnswer
                                      ? "bg-green-50 border-green-200"
                                      : option === answer.studentAnswer && answer.studentAnswer !== answer.correctAnswer
                                        ? "bg-red-50 border-red-200"
                                        : "bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm">{option}</span>
                                    {option === answer.correctAnswer && (
                                      <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                                        Correct
                                      </Badge>
                                    )}
                                    {option === answer.studentAnswer &&
                                      answer.studentAnswer !== answer.correctAnswer && (
                                        <Badge variant="destructive" className="text-xs">
                                          Selected
                                        </Badge>
                                      )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {(answer.type === "true-false" || answer.type === "short-answer") && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                <span className="text-sm font-medium">Correct Answer:</span>
                                <span className="text-sm text-green-700">{answer.correctAnswer}</span>
                              </div>
                              <div
                                className={`flex items-center justify-between p-3 rounded border ${
                                  answer.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                                }`}
                              >
                                <span className="text-sm font-medium">Student Answer:</span>
                                <span className={`text-sm ${answer.isCorrect ? "text-green-700" : "text-red-700"}`}>
                                  {answer.studentAnswer || "Not answered"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="correct" className="space-y-4 mt-6">
                {studentResult.answers
                  .filter((answer) => answer.isCorrect === true)
                  .map((answer, index) => (
                    <Card key={answer.id} className="border-l-4 border-l-green-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-500">
                              Q{studentResult.answers.findIndex((a) => a.id === answer.id) + 1}
                            </span>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <Badge variant="default" className="bg-green-100 text-green-800">
                              Correct
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {answer.timeSpent}m
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900">{answer.question}</h4>
                        <p className="text-sm text-green-700 mt-2">Answer: {answer.studentAnswer}</p>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="incorrect" className="space-y-4 mt-6">
                {studentResult.answers
                  .filter((answer) => answer.isCorrect === false)
                  .map((answer, index) => (
                    <Card key={answer.id} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-500">
                              Q{studentResult.answers.findIndex((a) => a.id === answer.id) + 1}
                            </span>
                            <XCircle className="h-5 w-5 text-red-500" />
                            <Badge variant="destructive">Incorrect</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {answer.timeSpent}m
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">{answer.question}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                            <span className="text-sm font-medium">Correct:</span>
                            <span className="text-sm text-green-700">{answer.correctAnswer}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded">
                            <span className="text-sm font-medium">Student:</span>
                            <span className="text-sm text-red-700">{answer.studentAnswer || "Not answered"}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4 mt-6">
                {studentResult.answers.filter((answer) => !answer.studentAnswer).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">All questions were answered by the student.</p>
                  </div>
                ) : (
                  studentResult.answers
                    .filter((answer) => !answer.studentAnswer)
                    .map((answer, index) => (
                      <Card key={answer.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-medium text-gray-500">
                                Q{studentResult.answers.findIndex((a) => a.id === answer.id) + 1}
                              </span>
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                              <Badge variant="secondary">Not Answered</Badge>
                            </div>
                          </div>
                          <h4 className="font-medium text-gray-900">{answer.question}</h4>
                          <p className="text-sm text-yellow-700 mt-2">Correct answer: {answer.correctAnswer}</p>
                        </CardContent>
                      </Card>
                    ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
