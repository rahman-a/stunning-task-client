# Website Section Generator

A modern Next.js application that generates website sections based on user-submitted ideas. Built with TypeScript, React Hook Form, Zod validation, and TanStack React Query.

## 🚀 Features

- **Form Validation** - Type-safe form handling with React Hook Form and Zod
- **API Integration** - Mock API endpoints with Axios and TanStack React Query
- **Modern UI** - Beautiful interface using shadcn/ui components
- **Error Handling** - Comprehensive error states and retry mechanisms
- **Loading States** - Smooth loading animations and user feedback
- **Type Safety** - Full TypeScript support throughout the application
- **Responsive Design** - Works seamlessly on all device sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form + Zod
- **API Client**: Axios
- **State Management**: TanStack React Query
- **Validation**: Zod schemas

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── website-idea/     # POST endpoint for idea submission
│   │   └── website-sections/ # GET endpoint for sections
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── website-idea-form.tsx # Main form component
│   └── website-sections-preview.tsx # Sections preview
├── lib/
│   ├── providers.tsx         # React Query provider
│   └── utils.ts             # Utility functions
├── service/
│   ├── api/
│   │   ├── axios.ts         # Axios instance configuration
│   │   └── website.ts       # API service functions
│   ├── hooks/
│   │   ├── useSubmitIdea.ts # Form submission hook
│   │   └── useSections.ts   # Sections fetching hook
│   └── index.ts             # Service exports
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 How It Works

### 1. Form Submission

- User enters a website idea in the textarea
- Form validates input using Zod schema
- Data is submitted via POST to `/api/website-idea`
- Uses `useSubmitIdea` hook with TanStack React Query

### 2. Sections Generation

- After successful submission, sections are fetched
- GET request to `/api/website-sections?idea={idea}`
- Uses `useSections` hook for data fetching and caching
- Sections are displayed in a clean, organized layout

### 3. Error Handling

- Comprehensive error states for both form and API
- Retry mechanisms for failed requests
- User-friendly error messages
- Loading states with spinners

## 🔧 API Endpoints

### POST `/api/website-idea`

Submits a website idea for processing.

**Request Body:**

```json
{
  "idea": "Landing page for bakery"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Website idea submitted successfully",
  "data": {
    "id": "1703123456789",
    "idea": "Landing page for bakery",
    "submittedAt": "2023-12-21T10:30:45.123Z"
  }
}
```

### GET `/api/website-sections?idea={idea}`

Fetches generated website sections.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Hero",
      "content": "Welcome to Landing page for bakery!..."
    }
  ],
  "metadata": {
    "idea": "Landing page for bakery",
    "generatedAt": "2023-12-21T10:30:46.456Z",
    "sectionCount": 4
  }
}
```

## 🎨 UI Components

The application uses shadcn/ui components for a consistent and beautiful interface:

- **Form Components**: Input, Textarea, Label, Form
- **Layout Components**: Card, CardHeader, CardContent
- **Feedback Components**: Alert, Button
- **Loading States**: Spinner animations

## 🔒 Type Safety

All API calls and form data are fully typed with TypeScript:

```typescript
interface Section {
  _id: string
  title: string
  content: string
}

interface WebsiteIdeaFormData {
  idea: string
}
```
