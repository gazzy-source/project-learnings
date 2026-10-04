import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, localStorage: dom.window.localStorage, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });
// @vitest-environment jsdom
import {afterEach,beforeEach,describe,it,expect} from 'vitest';
import {act} from 'react';
import {createRoot, type Root} from 'react-dom/client';
import App from './App';

let root:Root;let container:HTMLDivElement;
beforeEach(()=>{localStorage.clear();container=document.createElement('div');document.body.append(container);root=createRoot(container);act(()=>root.render(<App/>));});
afterEach(()=>{act(()=>root.unmount());container.remove();});
describe('learning site navigation',()=>{
  it('navigates into the concept library and records lesson progress',()=>{
    const nav=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Knowledge map')) as HTMLButtonElement;
    act(()=>nav.click());
    expect(container.textContent).toContain('SHARED CONCEPT LIBRARY');
    const done=[...container.querySelectorAll('button')].find(x=>x.textContent?.includes('Mark complete')) as HTMLButtonElement;
    act(()=>done.click());
    expect(localStorage.getItem('project-learnings.progress.v1')).toContain('all-media-downloader:processes');
  });
  it('switches to interview training and exposes the 100-question bank',()=>{
    const nav=[...container.querySelectorAll('aside nav button')].find(x=>x.textContent?.includes('Interview gym')) as HTMLButtonElement;
    act(()=>nav.click());
    expect(container.textContent).toContain('100 QUESTIONS');
    expect(container.textContent).toContain('Question bank');
  });

});
