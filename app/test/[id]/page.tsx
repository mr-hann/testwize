"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, ArrowLeft, ArrowRight, FileText } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

interface StudentInfo {
  name: string
  className: string
}

export default function StudentTestPage() {
  const params = useParams()
  const router = useRouter()
  const [step, setStep] = useState<"info" | "test" | "complete">("info")
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({ name: "", className: "" })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Demo test data
  const testData = {
    title: "Mathematics Quiz - Algebra",
    description: "Basic algebra concepts for Grade 10",
    instructions:
      "Read each question carefully and select the best answer. You can navigate between questions using the Next and Previous buttons.",
    timeLimit: 30,
    questions: [
      {
        id: "q1",
        question: "What is the value of x in the equation 2x + 5 = 15?",
        options: ["5", "10", "7.5", "2.5"],
        correctAnswer: 0,
      },
      {
        id: "q2",
        question: "Simplify: 3(x + 4) - 2x",
        options: ["x + 12", "x + 4", "5x + 12", "x - 12"],
        correctAnswer: 0,
      },
      {
        id: "q3",
        question: "If y = 2x - 3, what is the value of y when x = 4?",
        options: ["5", "11", "8", "2"],
        correctAnswer: 0,
      },
      {
        id: "q4",
        question: "What is the slope of the line passing through points (2, 3) and (4, 7)?",
        options: ["2", "1", "4", "0.5"],
        correctAnswer: 0,
      },
      {
        id: "q5",
        question: "Solve for x: x² - 5x + 6 = 0",
        options: ["x = 2 or x = 3", "x = 1 or x = 6", "x = -2 or x = -3", "x = 0 or x = 5"],
        correctAnswer: 0,
      },
    ] as Question[],
  }

  // Timer effect
  useEffect(() => {
    if (step === "test" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitTest()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleStartTest = () => {
    if (!studentInfo.name.trim() || !studentInfo.className.trim()) {
      alert("Please fill in your name and class")
      return
    }
    setStep("test")
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [testData.questions[currentQuestionIndex].id]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitTest = async () => {
    setIsSubmitting(true)

    try {
      // Simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Calculate score
      let correctAnswers = 0
      testData.questions.forEach((question) => {
        if (answers[question.id] === question.correctAnswer) {
          correctAnswers++
        }
      })

      const score = Math.round((correctAnswers / testData.questions.length) * 100)

      // Store results for display
      localStorage.setItem(
        "testResults",
        JSON.stringify({
          studentName: studentInfo.name,
          className: studentInfo.className,
          score,
          correctAnswers,
          totalQuestions: testData.questions.length,
          submittedAt: new Date().toISOString(),
        }),
      )

      setStep("complete")
    } catch (error) {
      alert("Failed to submit test. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentQuestion = testData.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / testData.questions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  if (step === "info") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">{testData.title}</CardTitle>
            <CardDescription>{testData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Time Limit: {testData.timeLimit} minutes | Questions: {testData.questions.length}
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Your Name *</Label>
                <Input
                  id="studentName"
                  placeholder="Enter your full name"
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="className">Class *</Label>
                <Input
                  id="className"
                  placeholder="Enter your class (e.g., Grade 10A)"
                  value={studentInfo.className}
                  onChange={(e) => setStudentInfo((prev) => ({ ...prev, className: e.target.value }))}
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
              <p className="text-sm text-blue-800">{testData.instructions}</p>
            </div>

            <Button onClick={handleStartTest} className="w-full">
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "test") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-lg font-semibold">{testData.title}</h1>
                <Badge variant="secondary">
                  Question {currentQuestionIndex + 1} of {testData.questions.length}
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span className={timeLeft < 300 ? "text-red-600 font-semibold" : ""}>{formatTime(timeLeft)}</span>
                </div>
                <Badge variant="outline">
                  {answeredQuestions}/{testData.questions.length} answered
                </Badge>
              </div>
            </div>
            <div className="mt-2">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </header>

        <div className="p-4 max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">{currentQuestion.question}</p>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        answers[currentQuestion.id] === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQuestion.id] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                          }`}
                        >
                          {answers[currentQuestion.id] === index && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-medium text-gray-700">{String.fromCharCode(65 + index)}.</span>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {currentQuestionIndex === testData.questions.length - 1 ? (
                <Button onClick={handleSubmitTest} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                  {isSubmitting ? "Submitting..." : "Submit Test"}
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {testData.questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={currentQuestionIndex === index ? "default" : "outline"}
                    size="sm"
                    className={`w-10 h-10 ${
                      answers[testData.questions[index].id] !== undefined
                        ? "bg-green-100 border-green-300 text-green-800"
                        : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "complete") {
    const results = JSON.parse(localStorage.getItem("testResults") || "{}")

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Test Completed!</CardTitle>
            <CardDescription>Thank you for taking the test, {results.studentName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{results.score}%</div>
              <p className="text-gray-600">
                {results.correctAnswers} out of {results.totalQuestions} questions correct
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-medium">{results.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium">{results.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-medium">{new Date(results.submittedAt).toLocaleString()}</span>
              </div>
            </div>

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Your results have been automatically submitted to your teacher.</AlertDescription>
            </Alert>

            <Button onClick={() => window.close()} className="w-full">
              Close Window
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
