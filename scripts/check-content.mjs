import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const docs=['README.md','AGENTS.md','CONTENT_MAP.md'];
let failures=[];
for(const file of docs){
  const source=fs.readFileSync(path.join(root,file),'utf8');
  for(const match of source.matchAll(/\]\(([^)]+)\)/g)){
    const href=match[1].trim().split(/\s+/)[0].replace(/^<|>$/g,'');
    if(/^(https?:|mailto:|#)/i.test(href)) continue;
    const target=decodeURIComponent(href.split('#')[0]);
    if(target&&!fs.existsSync(path.resolve(root,path.dirname(file),target))) failures.push(`${file}: ${href}`);
  }
}
if(failures.length){console.error('Broken local Markdown links:\n'+failures.join('\n'));process.exit(1)}
console.log(`Checked local Markdown links in ${docs.length} files.`);
