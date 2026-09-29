# MaitriFlow

Industrial approvals are a complex and time-consuming process that requires multiple submissions, causing delays and increased compliance costs. Our checklist-driven approach, powered by AI, helps you simplify the approval process with document validation, parallel processing, SLA tracking, inspection coordination, and scheme matching.

## Frontend prototype

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Runs entirely on mock
data (`lib/mock-data.ts`) so the UI can be reviewed and demoed before the
FastAPI backend is wired up.

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — it redirects to `/login`. Log in as either
role (no real auth yet) to see the corresponding dashboard:

- **Entrepreneur** → `/dashboard`
- **Officer** → `/officer`

## Pages

| Route | Purpose |
|---|---|
| `/login` | Login/register, role selector |
| `/dashboard` | Entrepreneur home: stats, tracking, compliance, schemes, charts |
| `/checklist` | Smart checklist generator (sector/location/size/stage → approvals) |
| `/documents` | Drag-drop upload with simulated OCR/NLP validation |
| `/applications` | Filterable list of all applications |
| `/applications/[id]` | Timeline, documents, query thread |
| `/compliance` | Compliance calendar + scheduled inspections |
| `/schemes` | Scheme matching with confidence scores |
| `/assistant` | RAG-style chat with mock citations |
| `/officer` | Officer queue, cluster inspection planner, dept. metrics |
| `/admin` | Schemes/users/knowledge base/audit log management |

## Connecting to the real backend

Every page that reads mock data does so from a single import:

```ts
import { applications, complianceItems, schemes, ... } from "@/lib/mock-data";
```

To wire up FastAPI, replace these with data-fetching hooks (e.g. SWR or
React Query) hitting the endpoints documented in the backend build prompt —
the shapes in `lib/types.ts` already match the planned API responses
(`GET /applications`, `GET /schemes/eligibility`, `GET /compliance`, etc.),
so this should mostly be a search-and-replace of the data source, not a
redesign of the components.

## Design tokens

Defined in `tailwind.config.ts`: `ink`, `indigo`, `saffron`, `teal`, `alert`,
`cloud`, `line`. Headings use Manrope, body/UI text uses IBM Plex Sans
(loaded via `next/font/google` in `app/layout.tsx`).
