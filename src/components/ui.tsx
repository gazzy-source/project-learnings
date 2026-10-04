import type { ReactNode } from 'react';
export function Icon({children}:{children:ReactNode}){return <span className="icon" aria-hidden="true">{children}</span>}
export function Badge({children}:{children:ReactNode}){return <span className="badge">{children}</span>}
export function SectionTitle({eyebrow,title,description}:{eyebrow?:string;title:string;description?:string}){return <div className="section-title">{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description&&<p>{description}</p>}</div>}
