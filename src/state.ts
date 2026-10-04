export type LearningState = {
  version: 1;
  completed: string[];
  bookmarks: string[];
  quiz: Record<string, {correct:number; total:number}>;
  flashcards: Record<string,'know'|'review'>;
  confidence: Record<string,number>;
};

const KEY = 'project-learnings.progress.v1';
const empty = (): LearningState => ({version:1,completed:[],bookmarks:[],quiz:{},flashcards:{},confidence:{}});
export function loadState(): LearningState {
  if (typeof window === 'undefined') return empty();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw?.version !== 1) return empty();
    return { ...empty(), ...raw } as LearningState;
  } catch { return empty(); }
}
export function saveState(state: LearningState) {
  if (typeof window !== 'undefined') localStorage.setItem(KEY, JSON.stringify(state));
}
export const progressKey = (id:string) => `all-media-downloader:${id}`;
export const setCompleted = (state:LearningState,id:string) => ({...state,completed:state.completed.includes(progressKey(id))?state.completed:state.completed.concat(progressKey(id))});
export const toggleBookmark = (state:LearningState,id:string) => ({...state,bookmarks:state.bookmarks.includes(id)?state.bookmarks.filter(x=>x!==id):state.bookmarks.concat(id)});
export function percentFor(state:LearningState, ids:string[]) { return ids.length ? Math.round(ids.filter(id=>state.completed.includes(progressKey(id))).length/ids.length*100) : 0; }
