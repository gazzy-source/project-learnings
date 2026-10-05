import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, localStorage: dom.window.localStorage, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });
// @vitest-environment jsdom
import {afterEach,beforeEach,describe,it,expect} from 'vitest';
import {act} from 'react';
import {createRoot, type Root} from 'react-dom/client';
import App from './App';

let root:Root;let container:HTMLDivElement;
beforeEach(()=>{localStorage.clear();document.documentElement.removeAttribute('data-theme');container=document.createElement('div');document.body.append(container);root=createRoot(container);act(()=>root.render(<App/>));});
afterEach(()=>{act(()=>root.unmount());container.remove();});
describe('learning site navigation and study state',()=>{
  it('navigates into the concept library and records a lesson as read',()=>{
    const nav=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Knowledge map')) as HTMLButtonElement;
    act(()=>nav.click());
    const browse=container.querySelector('.concept-index-toggle') as HTMLButtonElement;
    expect(browse.getAttribute('aria-expanded')).toBe('false');
    act(()=>browse.click());
    expect(browse.getAttribute('aria-expanded')).toBe('true');
    expect(container.textContent).toContain('SHARED CONCEPT LIBRARY');
    const done=[...container.querySelectorAll('button')].find(x=>x.textContent?.includes('Mark as read')) as HTMLButtonElement;
    act(()=>done.click());
    expect(localStorage.getItem('project-learnings.progress.v1')).toContain('all-media-downloader:processes');
  });
  it('switches to interview training and exposes the 100-question bank',()=>{
    const nav=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Interview gym')) as HTMLButtonElement;
    act(()=>nav.click());
    expect(container.textContent).toContain('100 QUESTIONS');
    expect(container.textContent).toContain('Question bank');
  });
  it('guides the Final Boss through one decision at a time',()=>{
    const nav=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Final boss')) as HTMLButtonElement;
    act(()=>nav.click());
    expect(container.textContent).toContain('DECISION 1 OF 13');
    const next=[...container.querySelectorAll('button')].find(x=>x.textContent?.includes('Next decision')) as HTMLButtonElement;
    expect(next.disabled).toBe(true);
    act(()=>{(container.querySelector('.decision-row button') as HTMLButtonElement).click()});
    act(()=>next.click());
    expect(container.textContent).toContain('DECISION 2 OF 13');
    expect(container.querySelectorAll('.decision-row')).toHaveLength(1);
  });
  it('keeps incident evidence and hints hidden until the learner opens them',()=>{
    const nav=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Incident lab')) as HTMLButtonElement;
    act(()=>nav.click());
    expect(container.textContent).toContain('INVESTIGATION PRACTICE');
    expect([...container.querySelectorAll('.incident-columns details')].every(x=>!x.hasAttribute('open'))).toBe(true);
  });
  it('persists the explicit theme choice without changing existing progress',()=>{
    const prior=JSON.stringify({version:1,completed:['all-media-downloader:threads'],bookmarks:['queue'],quiz:{},flashcards:{},confidence:{}});
    localStorage.setItem('project-learnings.progress.v1',prior);
    const toggle=container.querySelector('button.theme-toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-label')).toBe('Switch to dark mode');
    act(()=>toggle.click());
    expect(localStorage.getItem('pl-theme')).toBe('dark');
    expect(localStorage.getItem('project-learnings.progress.v1')).toBe(prior);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(toggle.getAttribute('aria-label')).toBe('Switch to light mode');
  });
  it('collapses and remembers the desktop navigation preference',()=>{
    const toggle=container.querySelector('.sidebar-toggle') as HTMLButtonElement;
    expect(toggle.getAttribute('aria-label')).toBe('Collapse navigation');
    act(()=>toggle.click());
    expect(container.querySelector('.app-shell')?.classList.contains('sidebar-collapsed')).toBe(true);
    expect(localStorage.getItem('pl-sidebar-collapsed.v1')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Expand navigation');
  });
  it('opens a temporary mobile drawer and closes it after navigation',()=>{
    const menu=container.querySelector('.mobile-menu-toggle') as HTMLButtonElement;
    act(()=>menu.click());
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    expect(container.querySelector('.sidebar')?.classList.contains('mobile-open')).toBe(true);
    const destination=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Interview gym')) as HTMLButtonElement;
    act(()=>destination.click());
    expect(menu.getAttribute('aria-expanded')).toBe('false');
    expect(container.querySelector('.sidebar')?.classList.contains('mobile-open')).toBe(false);
    expect(container.textContent).toContain('100 QUESTIONS');
  });

});
