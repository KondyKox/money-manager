<div align="center">

# 💸 Wydatkonator

**Track your shifts, expenses, incomes and savings in one place.**
A personal finance and work-hours app for web and Android, with a Polish UI.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?logo=capacitor&logoColor=white)

</div>

---

## ✨ Features

- **⏱️ Shift tracker**: clock in, clock out, and see how much each shift earned based on your hourly rate.
- **🧾 Expenses & incomes**: add entries with categories, open any entry for details, sorted by date.
- **🐷 Savings**: deposit or withdraw, and watch the balance grow on a line chart.
- **📊 Charts**: category breakdown and savings history, built with Recharts.
- **👥 Multiple profiles per account** (up to 6), each with its own hourly rate and data.
- **🔐 Auth**: register, log in, forgot/reset password, protected routes.
- **⚙️ Settings**: change account data, pick a theme color, export all your data as JSON, or delete your account.
- **📱 Android app** powered by Capacitor, from the same codebase as the web app.

## 🧰 Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, React Router, React Compiler |
| Styling | Tailwind CSS v4, lucide-react icons |
| Charts | Recharts |
| Backend | Supabase (PostgreSQL, Auth, Row Level Security) |
| Mobile | Capacitor (Android) |
| Hosting | Vercel (+ Vercel Analytics) |

## 🚀 Getting started

### Prerequisites

- A recent Node.js LTS and npm
- A free [Supabase](https://supabase.com) project

### 1. Clone and install

```bash
git clone https://github.com/KondyKox/money-manager.git
cd money-manager
npm install
```

### 2. Set up Supabase

Create a project, then run the SQL files from [`supabase/schemas`](supabase/schemas) in the Supabase SQL editor. **Order matters**, because every other table references `profiles`:

1. `profiles.sql`
2. `expenses.sql`
3. `incomes.sql`
4. `savings.sql`
5. `shifts.sql`
6. `account.sql` (the `delete_my_account` function used by the Settings page)

Every table has Row Level Security enabled, so users can only touch their own data.

### 3. Add environment variables

Create a `.env` file in the project root (it's already git-ignored):

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Both values are in your Supabase dashboard under **Project Settings → API**.

### 4. Run it

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## 📜 Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run types` | Regenerate Supabase types into `src/types/supabase.ts` (edit the project ID in `package.json` to your own first) |
| `npm run cap:build` | Build the web app and sync it into the Android project |
| `npm run cap:dev` | Sync Android with live reload pointed at the dev server |

## 📱 Android

The app ships to Android through [Capacitor](https://capacitorjs.com) (app ID `com.kondy.wydatkonator`).

```bash
npm run cap:build      # build web + sync to android/
npx cap open android   # open the project in Android Studio
```

For live reload on an emulator, start `npm run dev` in one terminal and run `npm run cap:dev` in another. The emulator reaches your machine through `10.0.2.2:5173`.

## 🗂️ Project structure

```text
src/
├── components/   # layout (AppShell, Navbar), modals, shared UI
├── constants/    # categories, palette, storage keys, limits
├── context/      # Auth, Profile, Theme and Toast providers
├── hooks/        # useAuth, useProfile, useTheme, useToast
├── lib/          # Supabase client
├── pages/        # Home, auth pages, dashboard, profiles, settings
├── routes/       # ProtectedRoute, DashboardRoute
├── services/     # Supabase calls, split into auth/ and profiles/
├── types/        # TypeScript types (incl. generated Supabase types)
└── utils/        # formatting, chart data builders, helpers
supabase/schemas/ # SQL: tables, indexes, RLS policies, RPC
android/          # Capacitor Android project
```

## 👤 Author

Built by [Kondy](https://github.com/KondyKox) as a learning project.
