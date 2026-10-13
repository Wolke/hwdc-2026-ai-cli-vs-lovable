export type Session = { id: string; title: string; speaker: string; track: string; room: string; startsAt: string; endsAt: string; tags: string[]; sourceUrl: string };
export const STORAGE_KEY = 'hwdc-lab-favorites-v1';
export function sortedSessions(sessions: Session[]) {
  return [...sessions].sort((a,b) => Date.parse(a.startsAt)-Date.parse(b.startsAt) || a.id.localeCompare(b.id));
}
export function filterSessions(sessions: Session[], query: string, track: string, date = '') {
  const q=query.trim().toLocaleLowerCase();
  return sortedSessions(sessions).filter(s => (!q || `${s.title} ${s.speaker}`.toLocaleLowerCase().includes(q)) && (!track || s.tags.includes(track) || (track==='未標示主題' && s.tags.length===0)) && (!date || s.startsAt.slice(0,10)===date));
}
export function parseFavorites(raw: string | null, sessions: Session[]): string[] {
  try { const value=JSON.parse(raw ?? '[]'); const valid=new Set(sessions.map(s=>s.id));
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id==='string' && valid.has(id)))] : [];
  } catch { return []; }
}
export function timeLabel(value: string) {
  return new Intl.DateTimeFormat('zh-TW',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Taipei'}).format(new Date(value));
}

export function overlaps(a: Session,b: Session): boolean {
  return Date.parse(a.startsAt)<Date.parse(b.endsAt) && Date.parse(b.startsAt)<Date.parse(a.endsAt);
}
export function getConflicts(sessions: Session[], favoriteIds: string[]): [Session,Session][] {
  const ids=new Set(favoriteIds); const selected=sortedSessions(sessions.filter(s=>ids.has(s.id)));
  const pairs: [Session,Session][]=[];
  selected.forEach((a,i)=>selected.slice(i+1).forEach(b=>{if(overlaps(a,b)) pairs.push([a,b]);}));
  return pairs;
}

export function dateLabel(value: string) { return new Intl.DateTimeFormat('zh-TW',{month:'2-digit',day:'2-digit',timeZone:'Asia/Taipei'}).format(new Date(value)); }
