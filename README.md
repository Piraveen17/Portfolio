# Piraveen Portfolio

Personal portfolio built with Vite, React, TypeScript and Tailwind CSS.

## Pages

- `/`: single-page portfolio (About, Skills, Projects, Research, Experience, Achievements, Contact)
- `/case-studies/ai-workflow`: interactive walkthrough of the WhatsApp order agent and the car rental analytics assistant. Add `?scenario=whatsapp` or `?scenario=car-rental` to open a specific run.

## Design

- Typefaces: IBM Plex Sans for text, IBM Plex Mono for dates, stacks, statuses and code
- Color tokens in `tailwind.config.js`: `signal` (model proposes), `hold` (person approves), `verified` (code executes)
- Hero pipeline strip showing one request moving through the agent
- Respects `prefers-reduced-motion`

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Customize

- `src/lib/data.ts`: profile, links, projects, skills, experience, education
- `src/lib/caseStudies.ts`: walkthrough steps for the case study page
- `public/profile.jpg`: profile photo
- `public/Piraveen-CV.pdf`: CV linked from the download buttons
