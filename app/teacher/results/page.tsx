"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, Download, Trophy, Users, Clock } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const testResults = [
    {
      id: "1",
      title: "Mathematics Quiz - Algebra",
      subject: "Mathematics",
      totalStudents: 32,
      completed: 28,
      averageScore: 83.2,
      createdAt: "2024-01-15",
      status: "completed",
    },
    {
      id: "2",
      title: "Physics - Motion & Forces",
      subject: "Physics",
      totalStudents: 25,
      completed: 25,
      averageScore: 78.5,
      createdAt: "2024-01-10",
      status: "completed",
    },
    {
      id: "3",
      title: "English Literature Quiz",
      subject: "English",
      totalStudents: 30,
      completed: 15,
      averageScore: 85.0,
      createdAt: "2024-01-20",
      status: "active",
    },
  ]

  const filteredResults = testResults.filter((result) => result.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 pb-20 lg:pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Test Results</h1>
            <p className="text-sm md:text-base text-gray-600">View and analyze results from all your tests</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search test results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredResults.map((result) => (
            <Card key={result.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{result.title}</h3>
                      <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                      <Badge variant="outline">{result.subject}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {result.completed}/{result.totalStudents} completed
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Avg: {result.averageScore}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Created: {result.createdAt}</span>
                      </div>
                      <div className="text-gray-600">
                        Completion: {Math.round((result.completed / result.totalStudents) * 100)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/teacher/test/${result.id}/results`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResults.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No test results found</h3>
              <p className="text-gray-600">Results will appear here once students complete your tests.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
