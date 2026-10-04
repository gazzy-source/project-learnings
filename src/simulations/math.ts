export const littleLaw = (arrivalsPerMinute:number, minutesInSystem:number) => arrivalsPerMinute * minutesInSystem;
export const mbps = (megabytes:number, seconds:number) => seconds > 0 ? megabytes * 8 / seconds : 0;
export const gigabytesPerDay = (jobs:number, averageMb:number) => jobs * averageMb / 1024;
export function percentile(values:number[], p:number) {
  if (!values.length) return 0;
  const sorted=[...values].sort((a,b)=>a-b);
  return sorted[Math.max(0,Math.ceil(p*sorted.length)-1)];
}
