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


## Getting Started

1. **Install dependencies:**

```bash
npm install
npx json-server --watch db.json --port 4000
npm run dev
