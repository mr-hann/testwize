"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BookOpen, Edit, Plus, Trash2, ArrowLeft, Save, Eye, Clock, Users, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "@/components/dashboard-layout"
import Image from "next/image"

interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswer: string | number
  points: number
  imageUrl?: string
}

interface TestData {
  id: string
  title: string
  description: string
  subject: string
  duration: number
  instructions: string
  questions: Question[]
  status: "draft" | "published"
}

export default function EditTestPage({ params }: { params: { id: string } }) {
  const [testData, setTestData] = useState<TestData | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 1,
    imageUrl: "",
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (!authStatus) {
      router.push("/auth/login")
      return
    }
    setIsAuthenticated(true)

    // Load test data (mock data for demo)
    const mockTestData: TestData = {
      id: params.id,
      title: "Mathematics Quiz - Algebra",
      description: "Basic algebra concepts and problem solving",
      subject: "mathematics",
      duration: 30,
      instructions: "Answer all questions to the best of your ability. You have 30 minutes to complete this test.",
      status: "draft",
      questions: [
        {
          id: "1",
          type: "multiple-choice",
          question: "What is the value of x in the equation 2x + 5 = 15?",
          options: ["3", "5", "7", "10"],
          correctAnswer: 1,
          points: 2,
        },
        {
          id: "2",
          type: "true-false",
          question: "The equation y = mx + b represents a linear function.",
          correctAnswer: true,
          points: 1,
        },
      ],
    }

    setTestData(mockTestData)
    setIsLoading(false)
  }, [router, params.id])

  const addQuestion = () => {
    if (!currentQuestion.question?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      })
      return
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: currentQuestion.type as Question["type"],
      question: currentQuestion.question,
      options: currentQuestion.type === "multiple-choice" ? currentQuestion.options : undefined,
      correctAnswer: currentQuestion.correctAnswer || 0,
      points: currentQuestion.points || 1,
      imageUrl: currentQuestion.imageUrl,
    }

    setTestData((prev) =>
      prev
        ? {
            ...prev,
            questions: [...prev.questions, newQuestion],
          }
        : null,
    )

    // Reset current question
    setCurrentQuestion({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 1,
      imageUrl: "",
    })

    toast({
      title: "Success",
      description: "Question added successfully",
    })
  }

  const removeQuestion = (questionId: string) => {
    setTestData((prev) =>
      prev
        ? {
            ...prev,
            questions: prev.questions.filter((q) => q.id !== questionId),
          }
        : null,
    )
  }

  const deleteQuestionOption = (index: number) => {
    const newOptions = [...(currentQuestion.options || [])]
    if (newOptions.length > 3) {
      newOptions.splice(index, 1)
      updateCurrentQuestion("options", newOptions)
      if (currentQuestion.correctAnswer === index) {
        updateCurrentQuestion("correctAnswer", undefined)
      }
    } else {
      toast({
        title: "Error",
        description: "Minimum 3 options required",
        variant: "destructive",
      })
    }
  }

  const saveTest = (status: "draft" | "published") => {
    if (!testData?.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a test title",
        variant: "destructive",
      })
      return
    }

    if (testData.questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to backend
    toast({
      title: "Success",
      description: `Test ${status === "draft" ? "saved as draft" : "published"} successfully`,
    })

    // Update local state
    setTestData((prev) => (prev ? { ...prev, status } : null))
  }

  const updateCurrentQuestion = (field: string, value: any) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateQuestionOption = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])]
    newOptions[index] = value
    updateCurrentQuestion("options", newOptions)
  }

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    )
  }

  if (!testData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertDescription>Test not found. Please check the URL and try again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center h-auto sm:h-16 py-4 gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-3">
               
              </div>
              <div className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-gray-600" />
                <h1 className="text-lg md:text-sm font-semibold text-gray-900">Edit Test</h1>
              </div>
              <Badge
                className={
                  testData.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }
              >
                {testData.status}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Button variant="outline" onClick={() => saveTest("draft")} className="w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => saveTest("published")} className="w-full sm:w-auto">
                <Eye className="w-4 h-4 mr-2" />
                {testData.status === "published" ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Test Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Settings className="w-5 h-5 mr-2" />
                  Test Settings
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Configure your test details and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm md:text-base">
                    Test Title
                  </Label>
                  <Input
                    id="title"
                    value={testData.title}
                    onChange={(e) => setTestData((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                    placeholder="Enter test title"
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm md:text-base">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={testData.description}
                    onChange={(e) => setTestData((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                    placeholder="Brief description of the test"
                    rows={3}
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-sm md:text-base">
                    Subject
                  </Label>
                  <Select
                    value={testData.subject}
                    onValueChange={(value) => setTestData((prev) => (prev ? { ...prev, subject: value } : null))}
                  >
                    <SelectTrigger className="text-sm md:text-base">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-sm md:text-base">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={testData.duration}
                    onChange={(e) =>
                      setTestData((prev) =>
                        prev ? { ...prev, duration: Number.parseInt(e.target.value) || 30 } : null,
                      )
                    }
                    min="5"
                    max="180"
                    className="text-sm md:text-base"
                  />
                </div>

                <div>
                  <Label htmlFor="instructions" className="text-sm md:text-base">
                    Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    value={testData.instructions}
                    onChange={(e) => setTestData((prev) => (prev ? { ...prev, instructions: e.target.value } : null))}
                    placeholder="Instructions for students taking the test"
                    rows={4}
                    className="text-sm md:text-base"
                  />
                </div>

                {/* Test Summary */}
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Test Summary</h3>
                  <div className="space-y-2 text-xs md:text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Questions
                      </span>
                      <Badge variant="secondary">{testData.questions.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        Duration
                      </span>
                      <Badge variant="secondary">{testData.duration} min</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        Total Points
                      </span>
                      <Badge variant="secondary">{testData.questions.reduce((sum, q) => sum + q.points, 0)}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Question Form */}
               <Card>
                <CardHeader>
                  <CardTitle>Add Question</CardTitle>
                  <CardDescription>Create questions for your test</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Question Type</Label>
                      <Select
                        value={currentQuestion.type}
                        onValueChange={(value) => updateCurrentQuestion("type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          <SelectItem value="true-false">True/False</SelectItem>
                          <SelectItem value="short-answer">Short Answer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Points</Label>
                      <Input
                        type="number"
                        value={currentQuestion.points}
                        onChange={(e) => updateCurrentQuestion("points", Number.parseInt(e.target.value) || 1)}
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Question</Label>
                    <Textarea
                      value={currentQuestion.question}
                      onChange={(e) => updateCurrentQuestion("question", e.target.value)}
                      placeholder="Enter your question here"
                      rows={3}
                    />
                  </div>

                  {/* Image upload */}
                  <div>
                    <Label>Attach Image (optional)</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            updateCurrentQuestion("imageUrl", reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                  </div>

                  {/* Multiple Choice Options */}
                  {currentQuestion.type === "multiple-choice" && (
                    <div>
                      <Label>Answer Options</Label>
                      <div className="space-y-2">
                        {currentQuestion.options?.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="correct-answer"
                              checked={currentQuestion.correctAnswer === index}
                              onChange={() => updateCurrentQuestion("correctAnswer", index)}
                              className="text-blue-600"
                            />
                            <Input
                              value={option}
                              onChange={(e) => updateQuestionOption(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteQuestionOption(index)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateCurrentQuestion("options", [
                              ...(currentQuestion.options || []),
                              "",
                            ])
                          }}
                          className="mt-2"
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add Option
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* True/False Options */}
                  {currentQuestion.type === "true-false" && (
                    <div>
                      <Label>Correct Answer</Label>
                      <Select
                        value={currentQuestion.correctAnswer?.toString()}
                        onValueChange={(value) => updateCurrentQuestion("correctAnswer", value === "true")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Short Answer */}
                  {currentQuestion.type === "short-answer" && (
                    <div>
                      <Label>Sample Answer (for reference)</Label>
                      <Input
                        value={currentQuestion.correctAnswer?.toString() || ""}
                        onChange={(e) => updateCurrentQuestion("correctAnswer", e.target.value)}
                        placeholder="Enter a sample correct answer"
                      />
                    </div>
                  )}

                  <Button onClick={addQuestion} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>

            {/* Existing Questions List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Questions ({testData.questions.length})</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Review and manage your test questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testData.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center space-x-2 mb-2">
                            <Badge variant="outline">Q{index + 1}</Badge>
                            <Badge variant="secondary">{question.type}</Badge>
                            <Badge variant="outline">{question.points} pts</Badge>
                          </div>
                          <p className="text-sm md:text-base text-gray-900 font-medium">{question.question}</p>
                          {question.imageUrl && (
                                <img
                                  src={question.imageUrl}
                                  alt="Question Image"
                                  className="max-w-xs mt-2 rounded"
                                />
                              )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {question.type === "multiple-choice" && question.options && (
                        <div className="space-y-1">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`text-xs md:text-sm p-2 rounded ${
                                question.correctAnswer === optionIndex
                                  ? "bg-green-50 text-green-800 border border-green-200"
                                  : "bg-gray-50 text-gray-700"
                              }`}
                            >
                              {String.fromCharCode(65 + optionIndex)}. {option}
                              {question.correctAnswer === optionIndex && <span className="ml-2 text-green-600">✓</span>}
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "true-false" && (
                        <div className="text-xs md:text-sm">
                          <span className="text-gray-600">Correct Answer: </span>
                          <span className={`font-medium ${question.correctAnswer ? "text-green-600" : "text-red-600"}`}>
                            {question.correctAnswer ? "True" : "False"}
                          </span>
                        </div>
                      )}

                      {question.type === "short-answer" && (
                        <div className="text-xs md:text-sm">
                          <span className="text-gray-600">Sample Answer: </span>
                          <span className="font-medium text-gray-900">{question.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
  )
}
