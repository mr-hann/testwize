"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Plus, Trash2, ArrowLeft, Save, Eye, Clock, Users, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import DashboardLayout from "@/components/dashboard-layout"



interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "short-answer"
  question: string
  options?: string[]
  correctAnswer: string | number | boolean
  points: number
  imageUrl?: string
}

interface TestData {
  title: string
  description: string
  subject: string
  duration: number
  instructions: string
  questions: Question[]
}

export default function CreateTestPage() {
  const [testData, setTestData] = useState<TestData>({
    title: "",
    description: "",
    subject: "",
    duration: 30,
    instructions: "",
    questions: [],
  })
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 1,
    imageUrl: "",
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  
const [messages, setMessages] = useState<{role: "user" | "assistant", content: string}[]>([])
const [input, setInput] = useState("")

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (!authStatus) {
      router.push("/auth/login")
      return
    }
    setIsAuthenticated(true)
  }, [router])

  const addQuestion = () => {
    if (!currentQuestion.question?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      })
      return
    }

    if (currentQuestion.type === "multiple-choice") {
      if (
        !currentQuestion.options ||
        currentQuestion.options.length < 3 ||
        currentQuestion.correctAnswer === undefined
      ) {
        toast({
          title: "Error",
          description: "Multiple choice questions must have at least 3 options and a correct answer selected",
          variant: "destructive",
        })
        return
      }
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

    setTestData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
//data collected in this file
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
    setTestData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }))
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
    if (!testData.title.trim()) {
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

    toast({
      title: "Success",
      description: `Test ${status === "draft" ? "saved as draft" : "published"} successfully`,
    })

    setTimeout(() => {
      router.push("/teacher/dashboard")
    }, 1000)
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const handleSendMessage = async () => {
  if (!input.trim()) return
  const newMessages = [...messages, { role: "user", content: input }]
  setMessages(newMessages)
  setInput("")

  // simulate AI response
  setTimeout(() => {
    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content: `This is a sample AI-generated question suggestion based on: "${input}"`
      }
    ])
  }, 1000)

  // you could later hook this to an actual GPT endpoint
}

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  // you could integrate pdf/image/word parsing here
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      content: `Uploaded file: ${file.name}`
    },
    {
      role: "assistant",
      content: "AI will analyze the uploaded file and suggest questions soon."
    }
  ])
}

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header with sticky */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link href="/teacher/dashboard" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <p className="text-sm font-semibold text-gray-900">Create New Test</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={() => saveTest("draft")}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={() => saveTest("published")}>
                  <Eye className="w-4 h-4 mr-2" />
                  Publish Test
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Test Settings */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Test Settings
                  </CardTitle>
                  <CardDescription>Configure your test details and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Test Title</Label>
                    <Input
                      id="title"
                      value={testData.title}
                      onChange={(e) => setTestData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter test title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={testData.description}
                      onChange={(e) => setTestData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the test"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={testData.subject}
                      onValueChange={(value) => setTestData((prev) => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={testData.duration}
                      onChange={(e) =>
                        setTestData((prev) => ({ ...prev, duration: Number.parseInt(e.target.value) || 30 }))
                      }
                      min="5"
                      max="180"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Instructions</Label>
                    <Textarea
                      id="instructions"
                      value={testData.instructions}
                      onChange={(e) => setTestData((prev) => ({ ...prev, instructions: e.target.value }))}
                      placeholder="Instructions for students taking the test"
                      rows={4}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium text-gray-900 mb-3">Test Summary</h3>
                    <div className="space-y-2 text-sm">
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
              {/* Question block goes here */}
            
              {/* AI Assistant Chat Panel */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      AI Question Assistant
                    </CardTitle>
                    <CardDescription>Chat with AI to help you build questions</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[auto] space-y-2">
                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto border rounded p-2 space-y-2 bg-gray-50">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded text-sm ${
                            msg.role === "user" ? "bg-blue-100 text-blue-900" : "bg-green-100 text-green-900"
                          }`}
                        >
                          {msg.content}
                        </div>
                      ))}
                    </div>

                    {/* Chat input + file upload */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                      }}
                      className="flex space-x-2"
                    >
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AI to generate a question..."
                        className="flex-1"
                      />
                      <Button type="submit">
                        Send
                      </Button>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Plus className="w-5 h-5 text-gray-600" />
                      </label>
                    </form>
                  </CardContent>
                </Card>
              </div>


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

              {/* Questions List */}
              {testData.questions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Questions ({testData.questions.length})</CardTitle>
                    <CardDescription>Review and manage your test questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testData.questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">Q{index + 1}</Badge>
                                <Badge variant="secondary">{question.type}</Badge>
                                <Badge variant="outline">{question.points} pts</Badge>
                              </div>
                              <p className="text-gray-900 font-medium">{question.question}</p>
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
                                  className={`text-sm p-2 rounded ${
                                    question.correctAnswer === optionIndex
                                      ? "bg-green-50 text-green-800 border border-green-200"
                                      : "bg-gray-50 text-gray-700"
                                  }`}
                                >
                                  {String.fromCharCode(65 + optionIndex)}. {option}
                                  {question.correctAnswer === optionIndex && (
                                    <span className="ml-2 text-green-600">✓</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type === "true-false" && (
                            <div className="text-sm">
                              <span className="text-gray-600">Correct Answer: </span>
                              <span
                                className={`font-medium ${question.correctAnswer ? "text-green-600" : "text-red-600"}`}
                              >
                                {question.correctAnswer ? "True" : "False"}
                              </span>
                            </div>
                          )}

                          {question.type === "short-answer" && (
                            <div className="text-sm">
                              <span className="text-gray-600">Sample Answer: </span>
                              <span className="font-medium text-gray-900">{question.correctAnswer}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Empty State */}
              {testData.questions.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
                    <p className="text-gray-600 mb-4">Start building your test by adding questions above.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
