import { JSDOM } from 'jsdom';
const dom = new JSDOM('', { url: 'http://localhost' });
Object.defineProperty(globalThis, 'localStorage', { value: dom.window.localStorage, configurable: true });
// @vitest-environment jsdom
import {beforeEach,describe,it,expect} from 'vitest';
import {loadState,saveState,setCompleted,progressKey,percentFor,toggleBookmark} from './state';

beforeEach(()=>localStorage.clear());
describe('local learning progress',()=>{
  it('persists completion and computes completion percentages, not skill scores',()=>{
    let s=loadState();
    s=setCompleted(s,'asyncio');
    saveState(s);
    const restored=loadState();
    expect(restored.completed).toContain(progressKey('asyncio'));
    expect(percentFor(restored,['asyncio','threads'])).toBe(50);
  });
  it('stores quiz, flashcard, confidence and bookmark state without a server',()=>{
    const s=loadState();
    const next={...s,quiz:{'asyncio':{correct:4,total:5}},flashcards:{'queue':'review' as const},confidence:{'queue':2},bookmarks:['queue']};
    saveState(next);
    expect(loadState()).toMatchObject(next);
    expect(toggleBookmark(next,'queue').bookmarks).toEqual([]);
  });
  it('safely resets malformed or unsupported stored data',()=>{
    localStorage.setItem('project-learnings.progress.v1','{broken');
    expect(loadState().completed).toEqual([]);
  });
});
