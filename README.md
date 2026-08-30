# CPS LMS - Frontend

> 🌐 **Live Website**: [https://cps-lms-gules.vercel.app/](https://cps-lms-gules.vercel.app/)  
> 📚 **API Documentation (Swagger)**: [https://cps-lms.up.railway.app/documentation](https://cps-lms.up.railway.app/documentation)  
> ⚙️ **Backend Production API**: [https://cps-lms.up.railway.app/api](https://cps-lms.up.railway.app/api)

This is the official frontend application for the CPS Learning Management System (LMS), built with modern web technologies to deliver a fast, responsive, and dynamic e-learning experience.

## Tech Stack

- Framework: Next.js (App Router)
- UI Library: React
- Language: TypeScript
- Styling: Tailwind CSS (Electric Blue #0075FD Theme)
- State Management & Data Fetching: Redux Toolkit (RTK) & RTK Query
- Form Handling & Validation: React Hook Form + Zod
- UI Components: shadcn/ui (Radix UI)
- Icons: Lucide React

## Key Features

- Unified Electric Blue Branding: Modern, cohesive design system across all pages and role-based portals.
- Dynamic API Integration: Powered by RTK Query connected to Strapi v5 API endpoints.
- Role-Based Dashboards: Dedicated interfaces for Students, Instructors, Content Managers, and Administrators.
- Secure Authentication Flow: Token-based login with persistent user sessions and seamless logout navigation returning directly to the Home page.
- Image Asset Safety: Built-in URL validation and fallback mechanisms for remote media assets.
- Responsive & Accessible: Fully optimized for desktop, tablet, and mobile displays.

## Project Structure

The project follows a modular, feature-based architecture within the Next.js `src` directory:

```text
src/
├── app/                  # Next.js App Router pages and layouts
│   ├── (auth)/           # Authentication pages (Login, Register, Password Recovery)
│   ├── (public)/         # Public pages (Home, Courses, Blog, About, Contact)
│   ├── checkout/         # Course enrollment and checkout flow
│   └── dashboard/        # Role-based portals
│       ├── admin/        # Platform administration (Users, Courses, Statistics)
│       ├── content-manager/ # Content management (Blogs, Courses, Quizzes)
│       ├── instructor/   # Course management, lesson builder, student analytics
│       └── student/      # Enrolled courses, learning progress, quiz results
├── components/           # Reusable UI components
│   ├── common/           # Shared components (Header, Footer, ProfilePage, StatusBadge)
│   ├── course/           # Course cards, lesson players, curriculum lists
│   ├── dashboard/        # Dashboard layout components (Sidebar, Header, StatCards)
│   ├── home/             # Landing page sections (Hero, FeaturedCourses, InstructorShowcase)
│   └── ui/               # Base atomic components (Button, Input, DropdownMenu, Avatar)
├── redux/                # Global state and API services
│   ├── api/
│   │   ├── baseApi/      # Base RTK Query setup and headers configuration
│   │   └── featuresApi/  # Endpoint modules (auth, course, lesson, quiz, blog)
│   └── hooks.ts          # Typed Redux hooks (useAppDispatch, useAppSelector)
├── lib/                  # Helper utilities (tailwind merger, date formatting, image validator)
├── types/                # Global TypeScript interface definitions
└── data/                 # Static fallback mock datasets
```

## API Integration & State Management

This project uses RTK Query to manage client-side state and async backend communication:

- baseApi.ts: Configures the base URL (`process.env.NEXT_PUBLIC_API_URL`) and authorization headers.
- featuresApi/: Endpoints are grouped by domain (auth, course, lesson, quiz, blog).
- Hooks: Automatic data caching, revalidation, and loading state updates via hooks like `useGetCoursesQuery()` and `useLoginMutation()`.

## Authentication & Role-Based Portals

The application implements JWT authentication backed by Strapi. Upon successful login, the application grants access to corresponding portals based on user role:

1. Student: Enrolled courses, video lessons, quiz attempts, and learning progress.
2. Instructor: Course creation, lesson outline management, quiz creation, and student performance tracking.
3. Content Manager: Content quality review, blog publishing, course updates.
4. Admin: Platform overview, user management, systemic statistics, and system settings.

When a user logs out from either the sidebar or header menu, all auth tokens and API cache states are cleared, and the application immediately navigates back to the Home page (`/`).

## Getting Started

### Prerequisites

- Node.js (v18.17 or newer)
- npm, yarn, pnpm, or bun

### 1. Installation

```bash
git clone <repository-url>
cd cps-lms-frontend
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://cps-lms.up.railway.app/api
```

### 3. Development Server

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

To build and verify the application for production:

```bash
npm run build
npm run start
```

## Styling & Theme Guidelines

- The application uses Tailwind CSS with an official Electric Blue (`#0075FD`) primary brand theme.
- Dark mode styling is integrated across key sections using standard `dark:` variant classes.
- Standardized UI utility functions reside in `src/lib/utils.ts`.
