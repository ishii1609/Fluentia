# Fluentia

**Practice spoken English with an AI partner and get a report on how you did.**

Fluentia lets you have a real voice conversation with an AI tutor. You speak, it listens and replies out loud, and when you end the session you get a breakdown of your fluency, filler words, grammar and vocabulary.

**Live demo:** [fluentiaa-rho.vercel.app](https://fluentiaa-rho.vercel.app)
(The backend runs on Render's free tier, so the first request after a period of inactivity can take up to a minute to wake up.)


---

## Features

- **Voice conversation with an AI tutor** – speak into your mic, the AI replies in text and speech
- **Post-session report** – fluency score (0-100), total words, filler word count, grammar feedback and vocabulary suggestions
- **Report history** – browse all past sessions and open any report
- **Word of the Day** – a new word with its definition on your dashboard every day
- **Secure authentication** – JWT stored in an httpOnly cookie, auto-login on revisit, protected and public routes
- **Dark, focused UI** built with Tailwind CSS

## How it works

```
You speak → Web Speech API (speech-to-text) → Express API → Gemini → AI reply
                                                                   ↓
              Report page ← Gemini analysis ← saved in MongoDB ← text-to-speech plays the reply
```

1. The browser converts your speech to text using the Web Speech API.
2. The text is sent to the backend with the conversation ID, and Gemini replies using the full conversation history for context.
3. Every message is saved to MongoDB.
4. When you end the session, the transcript is sent to Gemini for analysis, and the structured result is saved as a report.

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS v4, Axios |
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT in httpOnly cookies, bcrypt |
| AI | Google Gemini API |
| Speech | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| Word of the Day | Datamuse API |
| Hosting | Vercel (frontend), Render (backend) |

## Project structure

```
Fluentia/
├── backend/
│   └── src/
│       ├── controller/     # auth, conversation, report, word
│       ├── middleware/     # JWT auth middleware
│       ├── models/         # User, Conversation, Report
│       ├── routes/
│       └── utils/          # Gemini service + conversation analysis
└── frontend/
    └── src/
        ├── components/     # ProtectedRoute, PublicRoute
        ├── context/        # AuthContext
        ├── hooks/          # speech recognition + synthesis hook
        └── pages/          # Landing, Login, Signup, Dashboard,
                            # AIConversation, Reports, ReportsList
```

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/check` | Verify the session cookie and return the current user |
| POST | `/api/convo` | Send a message and get the AI reply |
| GET | `/api/convo/:id` | Fetch a full conversation transcript |
| POST | `/api/report/generate/:conversationId` | Analyse a conversation and create a report |
| GET | `/api/report/:conversationId` | Fetch the report for a conversation |
| GET | `/api/report/user/all` | List all reports for the logged-in user |
| GET | `/api/word/today` | Word of the Day |

All routes except register, login and the word endpoint require a valid auth cookie.

## Running locally

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local or Atlas)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com)
- Google Chrome (the Web Speech API's recognition works best there)

### 1. Clone

```bash
git clone https://github.com/<your-username>/fluentia.git
cd fluentia
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

Open `http://localhost:5173`.

## Deployment notes

- **Cross-domain cookies:** the frontend (Vercel) and backend (Render) are on different domains, so in production the auth cookie uses `secure: true` and `sameSite: "none"`, and CORS allows credentials from the exact frontend origin (no trailing slash).
- **SPA routing on Vercel:** a `vercel.json` rewrite sends all paths to `index.html` so direct visits to routes like `/signup` work.
- **Environment variables** are set in each platform's dashboard, not committed to the repo.

## Challenges I worked through

- Fixing duplicate or partial speech results so each utterance triggers exactly one API call
- Handling Gemini rate limits and 503s with retry logic
- Making cookie auth work across two different domains
- Keeping login state across refreshes with a `checkAuth` flow plus protected and public routes

## Roadmap

- [ ] Mispronounced-word detection using speech recognition confidence scores (the field exists in the report model but is not populated yet)
- [ ] Practice with other real learners (WebRTC + Socket.io)
- [ ] Progress charts across sessions
- [ ] Streaming AI responses for lower latency

## Author

Built by Isha Vohra.