# AI Quiz Generator — EZHog

A full-stack Next.js web application that uses Google Gemini AI (`gemini-3.6-flash`) to generate factual, customized multiple-choice quiz questions from any topic or content excerpt in seconds.

Designed with modern aesthetics matching the EZHog reference platform, featuring dynamic responsive layouts, independent scrollable quiz results, and toggleable answer explanations.

---

## 🚀 Features

- **AI-Powered Quiz Generation**: Uses Google's `gemini-3.6-flash` model via server-side REST API with structured JSON output enforcement.
- **Customization Controls**: Select topic/content, difficulty level (`Easy`, `Medium`, `Hard`), and question count (`5` or `10`).
- **Dynamic Two-Column Layout**:
  - **Initial State**: Clean, centered generator card.
  - **Active State**: 2-column side-by-side grid with stationary form and scrollable results panel.
- **Structured MCQ Display**: Each question contains exactly 4 distinct option choices (`A`, `B`, `C`, `D`).
- **Toggleable Answer Indicators**: Toggle switch to reveal/hide identified correct answers with emerald highlights and badges.
- **Interactive Explanations**: Collapsible `^ Show Explanation` button on each question card providing concise factual justifications.
- **Server-Side Security**: API keys are strictly loaded on the server (`process.env.GEMINI_API_KEY`) and never exposed to the client.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties (`@property` border animations)
- **Icons**: Lucide React
- **Typography**: Google Fonts (Lexend & Plus Jakarta Sans)
- **AI Engine**: Google Gemini API (`gemini-3.6-flash` via REST `generateContent`)

---

## 📁 Project Structure

```text
my-app/
├── app/
│   ├── api/
│   │   └── quiz/
│   │       └── generate/
│   │           └── route.ts         # POST /api/quiz/generate API handler
│   ├── globals.css                  # Global styles & custom animations
│   ├── layout.tsx                   # Root HTML layout & font declarations
│   └── page.tsx                     # Main application landing page
├── components/
│   ├── HeroQuizForm.tsx             # Two-column & centered hero generator card
│   ├── QuestionListDisplay.tsx      # Scrollable quiz panel & explanation toggle
│   ├── Navbar.tsx                   # Header with hedgehog SVG logo
│   ├── StatCounters.tsx             # Platform stats banner
│   ├── QuizTypesGrid.tsx            # AI question types grid
│   ├── HowItWorks.tsx               # 3-step feature workflow
│   ├── InputTypesSection.tsx        # Multi-input feature showcase
│   ├── Testimonials.tsx             # User review cards
│   ├── FAQSection.tsx               # Accordion FAQ section
│   ├── CtaBanner.tsx                # Call-to-action banner
│   ├── RelatedQuizzes.tsx           # Quick topic recommendations
│   └── Footer.tsx                   # Platform footer links
├── lib/
│   ├── gemini.ts                    # Server-side Gemini API client
│   └── quiz-service.ts              # Request validation & AI response post-sanitization
├── types/
│   └── quiz.ts                      # Shared TypeScript interface definitions
├── .env.local                       # Environment variables (GEMINI_API_KEY)
└── README.md                        # Documentation
```

---

## 💻 Local Setup & Installation

### 1. Prerequisites
- Node.js 18.x or higher
- npm (or yarn / pnpm)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the project root directory:

```env
GEMINI_API_KEY=your_actual_google_gemini_api_key_here
```

> ⚠️ **Security Warning**: Never commit your `.env.local` file or expose your `GEMINI_API_KEY` to git repositories. `.env.local` is already listed in `.gitignore`.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Endpoint & Specification

### `POST /api/quiz/generate`

Generates multiple-choice quiz questions based on the provided topic, difficulty, and question count.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body Schema
```json
{
  "topic": "JavaScript",
  "difficulty": "Easy",
  "numQuestions": 5
}
```

| Parameter | Type | Validation Rules |
|---|---|---|
| `topic` | `string` | Required. Must be between 2 and 100 characters. |
| `difficulty` | `string` | Required. Must be exactly `"Easy"`, `"Medium"`, or `"Hard"`. |
| `numQuestions` | `number` | Required. Must be exactly `5` or `10`. |

#### Example Success Response (`200 OK`)
```json
{
  "success": true,
  "topic": "JavaScript",
  "difficulty": "Easy",
  "numQuestions": 5,
  "questions": [
    {
      "id": 1,
      "question": "Which keyword is used to declare a block-scoped variable in JavaScript?",
      "options": [
        "var",
        "let",
        "set",
        "define"
      ],
      "correctAnswer": "let",
      "explanation": "The 'let' keyword declares a block-scoped local variable in JavaScript."
    }
  ]
}
```

#### Example Error Response (`400 Bad Request`)
```json
{
  "success": false,
  "error": "Topic must be a string between 2 and 100 characters in length."
}
```

---

## 🏗 Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server locally:
```bash
npm run start
```

---

## 🌐 Deployment Notes (Vercel)

1. Push your repository to GitHub / GitLab (ensuring `.env.local` is ignored).
2. Import the repository into **Vercel**.
3. In Vercel Project Settings -> **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `[Your Gemini API Key]`
4. Deploy. Next.js App Router will automatically route `POST /api/quiz/generate` securely through Vercel Serverless Functions.
