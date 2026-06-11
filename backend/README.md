# CompKraftUI

AI-powered React component generator. Describe any UI component in plain English and get production-ready React and Tailwind CSS code instantly, with a live preview.

## Features

- Natural language to React component generation
- Live preview with iframe rendering
- Responsive preview toggle (desktop, tablet, mobile)
- Monaco code editor with syntax highlighting
- One-click copy and download as .tsx
- Prompt enhancement with AI
- Component history sidebar
- Streaming generation in real time

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Monaco Editor, Lucide React

**Backend:** Node.js, Express.js, Groq SDK, Server-Sent Events for streaming

**AI:** Groq API with llama-3.3-70b-versatile

## Getting Started

### Prerequisites

- Node.js 18+
- Groq API key (free at console.groq.com)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your GROQ_API_KEY to .env
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Deployment

- Frontend: Deploy to Vercel, connect GitHub repo
- Backend: Deploy to Render, add GROQ_API_KEY as environment variable
- Set VITE_API_URL in Vercel environment variables to your Render backend URL
