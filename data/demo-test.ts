// data/demo-tests.ts

export interface Test {
  id: string
  title: string
  description: string
  questions: number
  timeLimit: number
  status: "active" | "inactive" | "draft"
  responses: number
  createdAt: string
  shareLink: string
}

export const demoTests: Test[] = [
  {
    id: "1",
    title: "Mathematics Quiz - Algebra",
    description: "Basic algebra concepts for Grade 10",
    questions: 20,
    timeLimit: 45,
    status: "active",
    responses: 24,
    createdAt: "2024-01-15",
    shareLink: `${window.location.origin}/test/math-algebra-001`,
  },
  {
    id: "2",
    title: "Science Test - Physics",
    description: "Motion and forces chapter test",
    questions: 15,
    timeLimit: 30,
    status: "inactive",
    responses: 0,
    createdAt: "2024-01-10",
    shareLink: `${window.location.origin}/test/physics-motion-002`,
  },
  {
    id: "3",
    title: "English Literature Quiz",
    description: "Shakespeare's Romeo and Juliet",
    questions: 25,
    timeLimit: 60,
    status: "draft",
    responses: 0,
    createdAt: "2024-01-12",
    shareLink: `${window.location.origin}/test/english-lit-003`,
  },
]
