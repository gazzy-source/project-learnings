export type Evidence = 'M' | 'C' | 'E' | 'R';
export type Lesson = {
  id: string; title: string; level: number; group: string; summary: string;
  intuition: string; technical: string; cs: string; location: string;
  snippet: string; why: string; without: string; alternatives: string;
  choice: string; interview: string; followup: string; resource: string;
  protection: string; failure: string; scale: string;
};
export type ArchitectureNode = { id: string; label: string; subtitle: string; lesson: string; kind: string };
export type Incident = { id: string; title: string; symptom: string; evidence: string[]; hints: string[]; options: string[]; diagnosis: string; fix: string; test: string; verify: string; lesson: string; evidenceTag: string };
export type InterviewQuestion = { id: string; level: 'A'|'B'|'C'|'D'|'E'; topic: string; question: string; hint: string; concise: string; deep: string; project: string; followup: string; weak: string; strong: string };
