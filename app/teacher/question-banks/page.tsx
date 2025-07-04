"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Plus, Search, FileText, Edit, Trash2, BookOpen } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function QuestionBanksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const [questionBanks, setQuestionBanks] = useState([
    {
      id: "1",
      title: "Mathematics - Algebra",
      subject: "Mathematics",
      questions: 45,
      difficulty: "Mixed",
      createdAt: "2024-01-15",
      lastUsed: "2024-01-20",
    },
    {
      id: "2",
      title: "Physics - Motion & Forces",
      subject: "Physics",
      questions: 32,
      difficulty: "Intermediate",
      createdAt: "2024-01-10",
      lastUsed: "2024-01-18",
    },
    {
      id: "3",
      title: "English Literature",
      subject: "English",
      questions: 28,
      difficulty: "Advanced",
      createdAt: "2024-01-08",
      lastUsed: "2024-01-16",
    },
  ])

  // delete function using state
  const deleteQuestionBankById = (id: string) => {
    if (confirm("Are you sure you want to delete this question bank?")) {
      setQuestionBanks((prev) => prev.filter((qb) => qb.id !== id))
      toast({
        title: "Deleted",
        description: "Question bank deleted successfully",
      })
    }
  }

  const filteredBanks = questionBanks.filter((bank) =>
    bank.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 pb-20 lg:pb-6">
        {/* header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Question Banks</h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your collection of questions for easy test creation
            </p>
          </div>
          <Link href="/teacher/create-test">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Question Bank
            </Button>
          </Link>
        </div>

        {/* search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search question banks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.map((bank) => (
            <Card key={bank.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{bank.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{bank.subject}</Badge>
                </div>
                <CardDescription>
                  {bank.questions} questions • {bank.difficulty} difficulty
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span>{bank.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last used:</span>
                    <span>{bank.lastUsed}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/teacher/test/${bank.id}/edit`}>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteQuestionBankById(bank.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* no results */}
        {filteredBanks.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No question banks found</h3>
              <p className="text-gray-600 mb-4">Create your first question bank to get started.</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Question Bank
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
