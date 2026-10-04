# Project Learnings: agent guide

## Mission

This repository is a long-term, interactive engineering learning platform. It turns real projects into connected learning in software development, backend engineering, system design, DevOps/SRE, Linux/OS, networking, databases, distributed systems, debugging and interviews. The intended outcome is to connect code to production behavior, computer-science ideas and defensible engineering decisions.

## Learner profile and teaching approach

The learner programs comfortably and has academic foundations in OS, computer networks and DBMS, but wants to connect those ideas to real production systems. Do not spend much space on basic syntax. Explain advanced engineering terms before relying on them.

Teach each project lesson in this order: **1. Intuition 2. Technical meaning 3. Connect to familiar CS 4. Where in the project (file, symbol, short verified excerpt) 5. Why needed 6. What happens without it 7. Alternatives 8. Why chosen, with evidence 9. Concise interview explanation 10. Harder follow-up.** Use compact sections, diagrams and interactive exercises to build understanding rather than memorization. Ask “why does this exist?” before teaching terminology.

Connect OS scheduling, processes, memory and page faults; CN sockets, TCP, HTTP and DNS; and DBMS transactions, locks and durability to project behavior. Distinguish similar ideas explicitly, such as single-flight from transaction isolation, async concurrency from parallel execution, and cache state from durable job state.

## Add a project

When the user asks to add a repository (for example, “Add learning material from `../my-new-project`”):

1. Inspect that repository's current code, tests, agent instructions, docs, history, deployment and operations before trusting its README.
2. Record its exact source commit and distinguish code facts from documentation-only commits.
3. Identify concepts genuinely present in code, incidents or measured evidence; do not force unrelated topics into the case study.
4. Extract architecture, concurrency, networking, persistence, deployment, failure behavior, performance, observability, scaling limits and decisions.
5. Create a project module under `projects/<slug>/` with metadata, architecture/components, verified code references, incidents, concept links, interviews, measurements and scaling exercises.
6. Reuse shared concept pages in `concepts/`. Add a new project example to an existing concept instead of duplicating its whole lesson. Add a shared concept only when useful across projects or for a necessary alternative.
7. Add project-specific incident labs and interview questions. Include supported evidence, the actual diagnosis/fix, tests and verification; reveal answers only after the learner makes a choice where the UX calls for it.
8. Update the global concept map and project catalog, preserving all existing project modules and local progress data.
9. Build and check local links, navigation, keyboard/accessibility behavior and localStorage migration/safety. Do not connect a backend unless the user explicitly asks and a concrete need requires one.
10. Summarize source commits, files added, evidence limits and validation. Never change a source project's application or production configuration as part of learning-content work.

## Reusable content model

Projects own project-specific facts and examples; concepts own reusable explanations with per-project examples. Keep facts, measured data and recommendations separate. A concept's sources should link to project code locations rather than copy large source files. Future projects must appear naturally beside existing projects in the catalog, architecture explorer, concept map and interview filters.

## Accuracy and evidence

Current source code is authoritative. Read historical reports only as context; label them historical and explain when their statements differ from current implementation. Do not invent scale, outages, incidents, benchmarks, traffic, architecture, measurements or causality. Use:

- **[M]** measured, with source and time window;
- **[C]** code-derived, with file/symbol;
- **[E]** estimate/example, with assumptions;
- **[R]** recommendation, with a trigger.

If evidence is unavailable, say **“Not measured.”** Do not turn illustrative simulator values into production results or assert exactly-once behavior without proof.

## System-design and interview philosophy

Teach from requirements → workload → constraints → bottleneck → design → trade-off → measurement → evolution. Do not begin with fashionable products. For every technology, ask what problem it solves, whether this project has that problem, its operational cost, and what measured trigger would justify it. Make non-distribution a deliberate valid design choice.

Interview material should help the learner state what, why, alternatives, evidence, trade-offs, failure modes and scaling trigger in their own words. Include weak and strong answer examples; avoid buzzword lists and exaggerated impact.

## Progress and safety

Use browser localStorage for module completion, quiz accuracy, flashcard status, bookmarks and self-rated interview confidence. Progress percentages mean content completed, not objective skill. Preserve existing progress when changing content schemas; version and migrate keys safely. Never transmit learning or personal data.

The learning platform is separate from source projects. Do not edit, commit, deploy, or reconfigure a connected production project. Do not overwrite existing learning modules or progress. Keep dependencies small and keep this site runnable locally without a backend.
