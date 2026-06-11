# CraftUI — AI Component Studio

🔗 Live demo: https://craftui-liard.vercel.app

CraftUI / ComponentCraft is an AI-powered interface generation platform that turns natural language prompts into production-style React and Tailwind CSS components.

It combines prompt enhancement, real-time streamed code generation, responsive preview modes, and a polished developer workflow so builders can move from idea to usable UI faster.

## Features

- Natural language to React component generation
- React functional component output styled with Tailwind CSS
- AI prompt enhancement for turning rough ideas into clearer UI briefs
- Real-time streamed generation from the backend
- Live iframe preview for generated components
- Desktop, tablet, and mobile preview modes
- Monaco-powered code viewer
- One-click copy and `.tsx` download
- In-memory generation history for quick revisiting during a session
- Responsive product UI across mobile, tablet, and desktop

## Tech Stack

**Frontend Experience**

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Monaco Editor
- Lucide React
- Three.js

**Backend API**

- Node.js
- Express
- CommonJS
- CORS
- dotenv
- Groq SDK
- Streaming response flow for generated code

**AI Layer**

- Groq API
- Model used in the backend: `llama-3.3-70b-versatile`

## Project Structure

```text
componentcraft/
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── README.md
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── pages/
│       │   └── Home.tsx
│       ├── components/
│       │   ├── AboutSection.tsx
│       │   ├── Header.tsx
│       │   ├── HeroBackground.tsx
│       │   ├── HeroSection.tsx
│       │   ├── HistorySidebar.tsx
│       │   ├── PreviewPanel.tsx
│       │   └── PromptInput.tsx
│       ├── hooks/
│       │   └── useGenerator.ts
│       ├── lib/
│       │   └── templates.ts
│       └── types/
│           └── index.ts
├── package.json
└── README.md
```

## Frontend Overview

The frontend is a Vite + React single-page application designed around a fast component-generation workflow.

- `frontend/src/main.tsx` mounts the React app and displays the initial loading experience.
- `frontend/src/App.tsx` renders the main `Home` page.
- `frontend/src/pages/Home.tsx` composes the product experience and connects prompt enhancement to the backend.
- `frontend/src/hooks/useGenerator.ts` manages prompt state, streamed code, errors, stop behavior, and local generation history.
- `frontend/src/components/PromptInput.tsx` provides the core prompt workflow: templates, enhancement, generation, and stop controls.
- `frontend/src/components/PreviewPanel.tsx` powers the live preview, device modes, code viewer, copy action, and `.tsx` download.
- `frontend/src/components/HistorySidebar.tsx` gives users quick access to recent generations during the current session.
- `frontend/src/components/HeroBackground.tsx` adds the animated Three.js product backdrop.

The frontend calls the backend using:

```ts
import.meta.env.VITE_API_URL || "http://localhost:3001";
```

The current frontend is intentionally focused as a single-page product experience, so no router is required yet.

## Backend Overview

The backend is an Express API located in `backend/server.js`. It acts as the secure AI gateway between the browser and Groq.

It provides:

- A generation endpoint that streams React + Tailwind component code
- A prompt enhancement endpoint that rewrites rough ideas into clearer component prompts
- A health check endpoint

The backend owns the Groq API key through environment variables, keeping the secret out of browser code.

The current architecture is a lightweight MVP architecture:

- No database
- No authentication
- No user accounts
- No persistent server-side history

Generated history is kept in frontend memory for the active session and clears on refresh.

## AI Integration With Groq

CraftUI uses Groq to power two AI workflows: prompt enhancement and streamed component generation. The backend creates the Groq client in `backend/server.js`:

```js
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
```

The backend uses `llama-3.3-70b-versatile` for:

- `POST /api/generate`: generates React + Tailwind component code from a user prompt
- `POST /api/enhance`: improves a rough prompt before generation

The generation endpoint streams chunks back to the frontend as `data:` messages. The frontend reads those chunks with `response.body.getReader()` and updates the code and preview workflow as the response arrives.

## Prerequisites

Before running the project locally, install:

- Node.js 18 or newer
- npm
- A Groq API key from the Groq console

## Local Setup

Clone the repository, then install dependencies separately for the backend and frontend.

```bash
git clone https://github.com/mohansilambarasu/craftui.git
cd componentcraft
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

### Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
```

## Environment Variables

### Backend

Create `backend/.env` from `backend/.env.example`.

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=3001
```

| Variable       | Required | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `GROQ_API_KEY` | Yes      | API key used by the backend to call Groq |
| `PORT`         | No       | Backend port. Defaults to `3001`         |

### Frontend

The frontend can optionally use:

```env
VITE_API_URL=http://localhost:3001
```

If `VITE_API_URL` is not set, the app defaults to `http://localhost:3001`.

## Run The Backend

From the `backend` folder:

```bash
node server.js
```

Expected output:

```text
ComponentCraft backend running on port 3001
```

Health check:

```bash
curl http://localhost:3001/health
```

## Run The Frontend

From the `frontend` folder:

```bash
npm run dev
```

Open the Vite URL in your browser:

```text
http://localhost:5173
```

## API Endpoints

### `GET /health`

Checks whether the backend is running.

Example response:

```json
{
  "status": "ok",
  "message": "ComponentCraft API is running"
}
```

### `POST /api/enhance`

Improves a rough user prompt.

Request body:

```json
{
  "prompt": "pricing card"
}
```

Example response:

```json
{
  "enhanced": "A modern pricing card with three plan tiers, feature lists, and a highlighted recommended plan."
}
```

### `POST /api/generate`

Generates a React component using Groq and streams the result back to the frontend.

Request body:

```json
{
  "prompt": "a modern pricing card with three tiers"
}
```

The response is streamed as text-event chunks like:

```text
data: {"text":"function Component() {"}

data: {"done":true}
```

## Git Workflow

This project uses a simple branch flow:

```text
feature branch -> develop -> main
```

Recommended workflow:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

After finishing work:

```bash
git add .
git commit -m "feat: describe your change"
git push -u origin feature/your-feature-name
```

Then:

1. Open a pull request from `feature/your-feature-name` into `develop`.
2. Test and review the feature on `develop`.
3. Open a pull request from `develop` into `main` when ready to release.

## Future Improvements

- Persist generation history with `localStorage` or a database-backed project system
- Add authentication for saved workspaces and user-specific history
- Add rate limiting, request validation, and stronger backend error handling
- Improve streaming parser resilience for partial response chunks
- Add automated test coverage for frontend interactions and backend endpoints
- Add deployment configuration for Vercel, Render, or another hosting setup
- Add a prompt gallery with examples of high-quality component prompts
- Expand export options beyond a single `.tsx` file
- Add shareable generated component links

## Author

Built by Mohan Silambarasu Elangkumaran.

- GitHub: https://github.com/mohansilambarasu
- LinkedIn: https://linkedin.com/in/mohan-silambarasu-elangkumaran
- Portfolio: https://mohansilambarasu.github.io/my-portfolio

## Notes

CraftUI currently uses a lightweight MVP architecture focused on the core AI generation loop: prompt, enhance, stream, preview, copy, and download. Database persistence, authentication, and multi-user workspaces are natural next steps rather than requirements for the current version.
