# Piraveen Portfolio (Vite + React + TS + Tailwind)

Portfolio with two interactive architecture walkthroughs.

- `/` home: hero demo ("the latch"), work, experience, research, skills, credentials, contact
- `/work/intentlatch` WhatsApp order agent: chat and system trace, confirmation gate, 3 scenarios
- `/work/car-rental` booking race (exclusion constraint + car-row lock) and fleet query assistant (AST-validated read-only SQL)

Design notes: IBM Plex Mono and Sans, light page with a dark console where the system speaks, and four semantic
colors (proposed, committed, sourced, rejected) that mean the same thing everywhere.

## Run locally
```bash
npm install
npm run dev
npm run build   # tsc -b && vite build
```

## Customize
- `src/lib/data.ts`: profile, projects (`featured`, `caseStudyUrl`, `demo`, `github`), skills, experience
- `src/lib/walkthroughs/`: walkthrough copy and scenarios (typed, no component changes needed)
- `public/profile.jpg`, `public/resume.pdf`

Walkthrough data (menu items, prices, order numbers, cars, rows) is sample data.

## Deploy
`vercel.json` rewrites all paths to `index.html` so deep links such as `/work/car-rental` work.
