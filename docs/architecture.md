# Scaliify — Technical Architecture

## 1. Architecture Overview

Scaliify will use a modern full-stack Next.js architecture.

Frontend and application logic will be built using Next.js and TypeScript.

Content will be managed through Sanity CMS.

Application data will be stored in PostgreSQL.

Drizzle ORM will provide the database layer.

The application will be deployed on Vercel.

---

# 2. Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- GSAP where advanced animation is required
- Lucide React

## Backend

- Next.js Server Actions
- Next.js Route Handlers
- TypeScript
- Zod

## Database

- PostgreSQL
- Drizzle ORM

## CMS

- Sanity

## Email

- Resend

## Monitoring

- Sentry

## Analytics

- Google Analytics
- Microsoft Clarity

## Deployment

- Vercel

---

# 3. High-Level Architecture

User
│
▼
Next.js Application
│
├── Server Components
├── Client Components
├── Server Actions
├── Route Handlers
│
├───────────────┐
│               │
▼               ▼
Sanity       PostgreSQL
CMS          Database
│               │
├── Blog        ├── Leads
├── Cases       ├── Tool Finder
├── Resources   ├── HR Tools
├── Companies   └── Submissions
└── Content
│
▼
Resend
│
▼
Email Notifications

External Services:

- Google Analytics
- Microsoft Clarity
- Sentry
