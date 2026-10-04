import type { ArchitectureNode, Lesson } from '../../types';
import { concepts } from '../../concepts';

export const project = {
  id: 'all-media-downloader',
  name: 'All Media Downloader',
  tagline: 'A single-node Telegram media backend, bounded for a small production VM.',
  badges: ['Backend','Concurrency','Linux','DevOps','System design'],
  source: 'gazzy-source/all-media-downloader',
  appBaseline: 'v1.0.0 · 830f351113669d6637e76de2fe3cd701f7078e7d',
  docsFreeze: '374acfd3fc890106a81999aa069a5ba163369a61',
  scopeNote: 'The documentation freeze describes the v1.0.0 application; it did not change application architecture.',
  oneLiner: 'Users submit a link, choose a format, and receive media in Telegram. Async handlers coordinate bounded thread pools, yt-dlp, temporary files and streamed uploads.',
  conceptLinks: concepts.map(c=>c.id),
  incidentIds: ['upload-memory','metadata-duplicate','upload-gate','swap-pressure','kuma-pressure','cpu-steal','youtube-wall','fallback-order'],
  interviewTopics: ['asyncio','threads','process-pool','gil','queue','backpressure','semaphore','fairness','rate limit','single-flight','streaming','page faults','swap PSI','CPU steal','cgroups','SQLite WAL','idempotency','cancellation','health','percentiles','Little’s Law','capacity planning','system design','distributed systems','technology judgment'],
  constraints: [
    ['[C] Topology','One bot process on one Oracle VM; local state and one in-memory work queue.'],
    ['[C] Host snapshot','About 952 MiB RAM, two shared vCPUs, and about 2 GiB swap were observed 2026-10-03 UTC. Recheck before treating as current.'],
    ['[C] Application limits','Production download concurrency 3; code default 5. Final file-size cap 49 MB.'],
    ['[C] Operations','systemd/cgroups manage the bot; Kuma and bgutil are Docker side services; optional WARP is host-managed.'],
    ['[M] Evidence limits','Historical before/after metrics are correlational; CPU steal changed. User-job sample was too small to prove latency improvement.'],
  ],
  metrics: [
    {name:'CPU busy mean', baseline:'5.53%', trial:'4.14%', evidence:'[M] historical 24-hour comparison'},
    {name:'CPU steal mean', baseline:'2.63%', trial:'1.98%', evidence:'[M] changed too; confounder'},
    {name:'Available memory mean', baseline:'346 MB', trial:'449 MB', evidence:'[M] host-level comparison'},
    {name:'Swap-in mean', baseline:'22.82 pages/s', trial:'10.46 pages/s', evidence:'[M] residual bursts remained'},
    {name:'Warm-up p50 / p95', baseline:'4.8 / 34.0 s', trial:'3.9 / 7.1 s', evidence:'[M] YouTube warm-up timings, not user-job latency'},
  ],
};

export const requestFlow = [
  'Telegram User','Telegram Bot API','PTB / asyncio handlers','Validation + rate limiting','Metadata analysis','Metadata single-flight','Fair DownloadQueue','ThreadPoolExecutor','yt-dlp','Deno / FFmpeg','Temporary disk','UploadGate','Streaming Telegram upload','Telegram delivery','User'
];

export const nodes: ArchitectureNode[] = [
  {id:'user',label:'Telegram user',subtitle:'Link and format choice',lesson:'tcp-http',kind:'actor'},
  {id:'telegram-api',label:'Telegram Bot API',subtitle:'Remote client/server boundary',lesson:'tcp-http',kind:'network'},
  {id:'handlers',label:'PTB + asyncio handlers',subtitle:'One event loop coordinates I/O',lesson:'asyncio',kind:'runtime'},
  {id:'validation',label:'Validation + rate limits',subtitle:'Input safety and per-user quota',lesson:'rate-limiting',kind:'guard'},
  {id:'metadata',label:'Metadata + single-flight',subtitle:'Cache finished data; coalesce active work',lesson:'singleflight-cache',kind:'coordination'},
  {id:'queue',label:'Fair DownloadQueue',subtitle:'Global slots + per-user fairness',lesson:'queue',kind:'queue'},
  {id:'executor',label:'ThreadPoolExecutor',subtitle:'Blocking downloader work off loop',lesson:'threads',kind:'runtime'},
  {id:'ytdlp',label:'yt-dlp',subtitle:'External media extraction/download engine',lesson:'tcp-http',kind:'dependency'},
  {id:'deno',label:'Deno + bgutil',subtitle:'YouTube token/signature support',lesson:'containers',kind:'dependency'},
  {id:'ffmpeg',label:'FFmpeg',subtitle:'Media merge / transcode subprocess',lesson:'processes',kind:'dependency'},
  {id:'disk',label:'Temporary disk',subtitle:'Per-job staging and cleanup',lesson:'capacity',kind:'storage'},
  {id:'uploadgate',label:'UploadGate',subtitle:'FIFO upload slots + byte budget',lesson:'backpressure',kind:'queue'},
  {id:'stream',label:'Streamed upload',subtitle:'Open file handle → bounded chunks',lesson:'streaming',kind:'network'},
  {id:'delivery',label:'Telegram delivery',subtitle:'Retries can have ambiguous outcomes',lesson:'durability-idempotency',kind:'network'},
  {id:'sqlite',label:'SQLite history',subtitle:'Local durable history in WAL',lesson:'sqlite-wal',kind:'storage'},
  {id:'json',label:'JSON / local state',subtitle:'Preferences, file_id cache, tokens, markers',lesson:'durability-idempotency',kind:'storage'},
  {id:'warp',label:'WARP (optional)',subtitle:'Selected outbound proxy path',lesson:'tcp-http',kind:'dependency'},
  {id:'systemd',label:'systemd',subtitle:'Process lifecycle and sandbox policy',lesson:'cgroups-systemd',kind:'ops'},
  {id:'cgroups',label:'cgroups',subtitle:'CPU / memory / task controls',lesson:'cgroups-systemd',kind:'ops'},
  {id:'health',label:'Health endpoint',subtitle:'Heartbeat + dependency + disk checks',lesson:'observability',kind:'ops'},
  {id:'kuma',label:'Kuma',subtitle:'External monitor of health signal',lesson:'observability',kind:'ops'},
];

export const course: {level:number;title:string;description:string;conceptIds:string[]}[] = [
  {level:0,title:'Connect existing CS knowledge',description:'Make OS, networking and DBMS concepts feel like production engineering.',conceptIds:['processes','tcp-http','sqlite-wal','cgroups-systemd','memory-virtual']},
  {level:1,title:'Follow one request',description:'Trace a user request from chat to temporary storage and back.',conceptIds:['tcp-http','asyncio','rate-limiting','singleflight-cache','queue','streaming']},
  {level:2,title:'Concurrency',description:'Async, threads, GIL, executors, processes and child processes.',conceptIds:['asyncio','threads','processes','process-pool']},
  {level:3,title:'Work scheduling',description:'Workers, producer/consumer, fairness, backpressure and resource tokens.',conceptIds:['queue','backpressure','semaphore','rate-limiting']},
  {level:4,title:'Single-flight and cache',description:'Understand completed-result reuse versus active-work coalescing.',conceptIds:['singleflight-cache']},
  {level:5,title:'Streaming and memory',description:'Connect file handles, chunks, RSS and page cache.',conceptIds:['streaming','memory-virtual']},
  {level:6,title:'Linux memory',description:'Model anonymous pages, cache, reclaim and faults.',conceptIds:['memory-virtual']},
  {level:7,title:'Swap, zswap and PSI',description:'Distinguish swap occupancy from active pressure.',conceptIds:['swap-psi']},
  {level:8,title:'CPU and virtualization',description:'Read CPU states and understand hypervisor steal.',conceptIds:['cpu-steal','bottlenecks']},
  {level:9,title:'cgroups and systemd',description:'Process supervision and resource boundaries.',conceptIds:['cgroups-systemd']},
  {level:10,title:'Containers',description:'Understand what containers isolate and what stays shared.',conceptIds:['containers']},
  {level:11,title:'Databases and state',description:'Use DBMS concepts to reason about SQLite, WAL and job state.',conceptIds:['sqlite-wal','durability-idempotency']},
  {level:12,title:'Failure handling',description:'Retries, ambiguity, idempotency and exactly-once claims.',conceptIds:['tcp-http','durability-idempotency','cancellation-retry']},
  {level:13,title:'Cancellation',description:'Compare cooperative cancellation with process termination.',conceptIds:['cancellation-retry','processes']},
  {level:14,title:'Observability and SRE',description:'Liveness, dependency health, logs, metrics and unknown failures.',conceptIds:['observability','experiments-percentiles']},
  {level:15,title:'Production experiments',description:'Build a hypothesis, control variables and avoid false causal claims.',conceptIds:['experiments-percentiles']},
  {level:16,title:'Percentiles',description:'See why tail latency differs from an average.',conceptIds:['experiments-percentiles']},
  {level:17,title:'Little’s Law',description:'Relate arrival rate, time in system and average in-flight work.',conceptIds:['little-law']},
  {level:18,title:'Capacity planning',description:'Estimate bandwidth, queue, concurrency and temporary disk.',conceptIds:['capacity','little-law']},
  {level:19,title:'Find the bottleneck',description:'Reason across CPU, RAM, disk, network and external APIs.',conceptIds:['bottlenecks','cpu-steal']},
  {level:20,title:'System design from first principles',description:'Start with requirements and workload, not a technology list.',conceptIds:['system-design','portfolio-story']},
  {level:21,title:'Scale the project',description:'Choose the smallest justified evolution at each traffic multiple.',conceptIds:['scale-triggers','technology-judgment']},
  {level:22,title:'Distributed systems',description:'See the coordination costs created by multiple workers.',conceptIds:['distributed-systems','durability-idempotency']},
  {level:23,title:'Why not Redis/Celery/Kubernetes?',description:'Practice technology judgment and measurable triggers.',conceptIds:['technology-judgment','scale-triggers']},
];

export const components = [
  {name:'Async application and PTB handlers',path:'bot/main.py · bot/handlers/',resource:'event-loop time, sockets',guard:'timeouts, async coordination',failure:'a blocking call stalls all event-loop work'},
  {name:'DownloadQueue',path:'bot/services/dl_queue.py · DownloadQueue',resource:'worker slots, disk, upstream bandwidth',guard:'3 configured production slots; 2 active jobs/user',failure:'volatile queue is lost on process restart'},
  {name:'DownloadManager',path:'bot/services/downloader.py · DownloadManager',resource:'threads, network, child-process CPU',guard:'executor and manager semaphore',failure:'a timed-out caller may leave a thread running'},
  {name:'UploadGate',path:'bot/services/upload_gate.py · UploadGate',resource:'upload slots, byte budget, sockets',guard:'FIFO slot + in-flight byte reservation',failure:'upload delay can hold output files and user requests'},
  {name:'History',path:'bot/services/history.py · _connect / _migrate_json',resource:'disk writes and locks',guard:'SQLite transactions, WAL, local lock',failure:'disk-full or SQLite contention interrupts history writes'},
  {name:'Health service',path:'scripts/bot_health_server.py · check',resource:'subprocess, heartbeat read, dependency probes',guard:'short check cache and request timeout',failure:'green health is not proof of end-to-end upload success'},
];

export const scaling = [
 {multiplier:1,title:'Current',breaks:'Unknown production jobs/day and peak concurrency: Not measured in the repository. Current known design is one host process with bounded workers.',metric:'queue wait, worker occupancy, Memory/CPU cgroup events, PSI, disk free, external API error rate',change:'Keep the single-node design. Improve stage-level evidence only where an operational question is unanswered.'},
 {multiplier:10,title:'10× thought experiment',breaks:'The first constraint depends on job size, burstiness, download/upload duration and third-party quotas. No traffic forecast is measured.',metric:'arrival vs completion rate, queue depth/wait, upload wait, temp disk peak, memory PSI',change:'First consider VM sizing or careful bounded concurrency only if the specific resource is saturated.'},
 {multiplier:100,title:'100× thought experiment',breaks:'Single-host CPU/RAM/disk or Telegram/source limits may bind; which one is unknown until workload is measured.',metric:'per-stage throughput and latency, cgroup pressure, per-platform rate limits, failure/retry rate',change:'If one adequate VM is insufficient, design durable jobs, idempotency, shared storage/state and worker ownership before adding nodes.'},
 {multiplier:1000,title:'1,000× thought experiment',breaks:'Multiple replicas create shared rate limits, duplicate execution, durable queue, storage and availability requirements.',metric:'SLO attainment, queue lag, per-region/network throughput, duplicate/lost jobs, recovery time',change:'Managed queue/database/object storage and multiple workers could become justified; orchestration choice follows operations needs.'},
 {multiplier:10000,title:'10,000× thought experiment',breaks:'At this point product policy, upstream fairness, Telegram constraints and cost may dominate before compute.',metric:'end-to-end SLO, cost/job, upstream quotas, regional saturation and failure blast radius',change:'Partition workloads and failure domains only after explicit service objectives and demand forecasts exist.'},
];

export const _lessonTypeCheck: Lesson | undefined = concepts[0];
