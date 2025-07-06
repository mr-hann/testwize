# Teacher Test Dashboard

This is a teacher-focused test management platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows teachers to create, manage, and analyze online tests, track student performance, and get key insights on their tests.

## Features

✅ User authentication (teacher login)  
✅ Create and edit tests with multiple question types  
✅ Store tests, results, and question data via JSON server  
✅ Dashboard with stats (total tests, average score, pass rate)  
✅ Student test results overview  
✅ Shareable test links  
✅ Clean and responsive UI using Tailwind  
✅ Data persistence using JSON server for local development

## Tech Stack

- **Next.js 13+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Lucide-react icons**
- **JSON Server (mock API)**
- **LocalStorage** for session persistence

## Project Structure
## jason (mock)database

✅ tests

Metadata about each test

Includes title, description, status, timeLimit, createdAt, and number of responses.

✅ testResults

Tracks aggregated student results for a test

Includes testId to relate to tests

Stores totalStudents, completed (passed), and averageScore.

✅ testData

Stores the actual question bank per test

Contains an array of questions tied to the testId

Each question supports multiple-choice, true/false, or short-answer types.
the data is just for test no original information there

## Getting Started

1. **Install dependencies:**

```bash
npm install
npx json-server --watch db.json --port 4000
npm run dev
