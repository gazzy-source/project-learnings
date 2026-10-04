import {describe,it,expect} from 'vitest';
import {concepts,lessonSections} from './concepts';
import {course} from './projects/all-media-downloader';
import {nodes} from './projects/all-media-downloader';
import {incidents} from './projects/all-media-downloader/incidents';
import {questions} from './interview/questions';

describe('learning content contracts',()=>{
  it('covers every requested roadmap level and links lessons that exist',()=>{
    expect(course.map(x=>x.level)).toEqual(Array.from({length:24},(_,i)=>i));
    const ids=new Set(concepts.map(x=>x.id));
    for(const level of course) for(const id of level.conceptIds) expect(ids.has(id)).toBe(true);
  });
  it('provides all ten teaching layers for every shared concept',()=>{
    expect(concepts.length).toBeGreaterThanOrEqual(23);
    for(const lesson of concepts) for(const [,key] of lessonSections) expect(lesson[key].trim()).not.toBe('');
  });
  it('makes every architecture node open a real lesson',()=>{
    const ids=new Set(concepts.map(x=>x.id));
    expect(nodes.length).toBeGreaterThan(15);
    for(const node of nodes) expect(ids.has(node.lesson)).toBe(true);
  });
  it('contains at least 100 progressively graded interview questions with complete rubrics',()=>{
    expect(questions.length).toBeGreaterThanOrEqual(100);
    for(const q of questions) for(const key of ['question','hint','concise','deep','project','followup','weak','strong'] as const) expect(q[key].trim()).not.toBe('');
    expect(new Set(questions.map(q=>q.level))).toEqual(new Set(['A','B','C','D','E']));
  });
  it('provides evidence-led incidents with hidden-answer structure',()=>{
    expect(incidents.length).toBeGreaterThanOrEqual(8);
    for(const i of incidents) expect(i.evidence.length).toBeGreaterThan(0);
  });
});
