# Project Learnings

**Learn software engineering through systems you actually built.**

## Live

[Open Project Learnings](https://project-learnings.netlify.app)

Project Learnings is a personal interactive engineering knowledge base built from real repositories. It connects **code → production behavior → computer-science concepts → system design → interview reasoning**. It is designed to grow across projects rather than become a one-project tutorial.

The learner already programs and knows some OS, networking and DBMS fundamentals. Lessons skip syntax basics and connect familiar ideas—threads to OS scheduling, HTTP to network failure, SQLite locks to DBMS concurrency, cgroups to process resource control—to actual code and operations.

## Explore

- **By project:** trace a request through a real system, inspect clickable architecture components, incidents and design decisions.
- **By concept:** reuse shared lessons such as queues, threads, HTTP, caching, page faults and idempotency, with examples from multiple projects.
- **By interview topic:** practice progressive questions, mock interviews, self-rated confidence and flashcards.
- **By simulation:** change assumptions in queue, upload admission, memory, percentile, Little’s Law and capacity exercises. Simulated outputs are labeled [E], never presented as production results.

The first case study is **All Media Downloader**: Backend · Concurrency · Linux · DevOps · System design. The application baseline is tag `v1.0.0` / `830f351113669d6637e76de2fe3cd701f7078e7d`. Commit `374acfd` is a documentation-only freeze describing that baseline; it is not an application architecture change.

## Local setup

Requirements: Node.js 20+ and npm. The app is local-first and needs no backend or account.

```bash
npm install
npm run dev
```

Build and test:

```bash
npm test
npm run build
npm run preview
```

Learning progress, quiz results, flashcard status, bookmarks and interview confidence stay in browser `localStorage`. Progress percentages mean lessons completed, not an objective skill score. No learning data is sent to a server.

## Architecture

```text
src/
  App.tsx                         UI shell, navigation and learning modes
  concepts/                       Reusable concept lessons and knowledge map
  projects/<project-slug>/         Project facts, architecture, incidents, measurements
  projects/index.ts                Project catalog and future-project slots
  interview/                       Shared progressive interview bank
  simulations/                     Small pure calculators + interactive UI
  state.ts                         Versioned localStorage progress model
  components/                      Reusable UI pieces (extend as needed)
CONTENT_MAP.md                     Evidence and code-reference register
```

Each concept lesson follows the same teaching sequence: intuition; technical meaning; familiar CS connection; verified project code location and short snippet; why it was needed; what fails without it; alternatives; evidence for the choice; interview explanation; harder follow-up. Shared concepts remain project-neutral; projects add examples and citations rather than copy the lesson.

Project statements use **[M]** measured, **[C]** code-derived, **[E]** estimate/example, and **[R]** recommendation. If the source has no evidence, say “Not measured.” Historical metrics carry their time window and caveats.

## Add another project

Give an agent the short instruction: **“Add learnings from `../my-new-project`.”** The root [AGENTS.md](AGENTS.md) contains the reusable workflow. In summary: inspect the source code/tests/docs and source commit first; build an evidence map; add a `projects/<slug>/` module; link or extend reusable `concepts/`; add only justified incidents, interview questions and simulations; update [CONTENT_MAP.md](CONTENT_MAP.md) and the project catalog; run tests/build/link checks; preserve other projects and local progress. Never modify the source project while preparing lessons.

## Evidence limits for the first case study

The source repository contains a summarized historical 24-hour comparison, not its raw dataset. It reports lower average swap activity and pressure in the trial, but CPU steal also changed and multiple settings were bundled. User-job samples were too small to prove a latency improvement. Actual jobs/day, peak concurrency, average media size and per-job bandwidth are **Not measured** in the checked-in source material. The learning exercises use clearly labeled examples instead of inventing those values.
