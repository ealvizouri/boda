# AGENTS.md — boda

Wedding website for Mariano & Jackie (September 12, 2026). Single-page public site with an admin panel to view RSVPs.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + custom design tokens |
| Database ORM | Prisma 6 (PostgreSQL) |
| Auth | NextAuth v5 (`next-auth@5.0.0-beta.31`) — credentials only |
| UI components | Ant Design 6, Lucide React icons |
| Forms | react-hook-form |
| Hosting | Vercel (inferred from Prisma Neon adapter + build script) |

## Project structure

```
app/
  page.tsx          — public single-page site (force-dynamic)
  layout.tsx        — root layout
  globals.css       — global styles / Tailwind v4 config
  actions.ts        — server actions (RSVP submission)
  admin/
    page.tsx        — RSVP list, protected by NextAuth session
    login/          — credential login page
  api/auth/         — NextAuth route handler
components/
  Hero.tsx          — hero section
  Details.tsx       — wedding details section
  OurStory.tsx      — couple story section
  RsvpForm.tsx      — public RSVP form
  GuestList.tsx     — admin guest list component
lib/
  prisma.ts         — Prisma client singleton
prisma/
  schema.prisma     — single `Rsvp` model (PostgreSQL)
auth.ts             — NextAuth config (credentials provider)
```

## Data model

```prisma
model Rsvp {
  id          String   @id @default(cuid())
  name        String
  attending   Boolean
  guestCount  Int      @default(0)
  meal        String   @default("")
  message     String   @default("")
  submittedAt DateTime @default(now())
}
```

Table name: `rsvps`

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (Neon/Vercel Postgres) |
| `AUTH_SECRET` | NextAuth secret — generate with `openssl rand -base64 32` |
| `ADMIN_USERNAME` | Username for the admin panel |
| `ADMIN_PASSWORD` | Password for the admin panel |

## Common commands

```bash
npm run dev          # start dev server
npm run build        # prisma migrate deploy + prisma generate + next build
npm run db:migrate   # create and apply a new migration (dev)
npm run db:push      # push schema changes without a migration file
npm run db:generate  # regenerate Prisma client
```

## Auth

Admin is protected via NextAuth v5 credentials provider. There is no user table — credentials are validated against `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars. The sign-in page is `/admin/login`.

## Design tokens

The site uses custom Tailwind color tokens (e.g., `papaya-whip`, `deep-space-blue`, `brick-red`, `muted-olive`, `steel-blue`). These are defined in `app/globals.css`. Use them for any new UI work rather than generic Tailwind colors.

## Content language

UI copy is in Spanish (the wedding is for a Spanish-speaking audience). Keep all new user-facing text in Spanish.
