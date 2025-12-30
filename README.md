# NoteHub

**Project:** A modern note management application built with **Next.js 15**, **React 19**, and **TypeScript**.

## 🚀 Live Demo
https://09-auth-liart-omega.vercel.app

## 📂 Repository
https://github.com/Oleksandr-Sulyma/09-auth

## ✨ Features
- User authentication (sign up, sign in, sign out)
- User profile management (name, avatar)
- Full CRUD for notes with real-time UI updates
- Note filtering by categories (tags)
- Debounced search for improved performance
- Draft system with auto-save using Zustand
- Fully responsive design (mobile, tablet, desktop)
- Server-Side Rendering with Next.js App Router

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Data Fetching & Caching:** TanStack Query
- **State Management:** Zustand
- **Styling:** CSS Modules
- **HTTP Client:** Axios (API proxy via Next.js rewrites)
- **Notifications:** React Hot Toast
- **Deployment:** Vercel

## 🏗 Architecture Highlights
- API proxying via `rewrites` in `next.config.ts` to handle CORS
- Server state synchronization using `queryClient.invalidateQueries`
- Protected routes implemented with Next.js Middleware
- Draft persistence in `localStorage` to prevent data loss

## 👤 Author
Oleksandr Sulyma  
GitHub: https://github.com/Oleksandr-Sulyma
