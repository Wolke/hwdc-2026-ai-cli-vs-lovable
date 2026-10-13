export type Session = { id: string; title: string; speaker: string; track: string; room: string; startsAt: string; endsAt: string };
export const STORAGE_KEY = 'hwdc-lab-favorites-v1';
export function sortedSessions(sessions: Session[]) {
  return [...sessions].sort((a,b) => Date.parse(a.startsAt)-Date.parse(b.startsAt) || a.id.localeCompare(b.id));
}
export function filterSessions(sessions: Session[], query: string, track: string) {
  const q=query.trim().toLocaleLowerCase();
  return sortedSessions(sessions).filter(s => (!q || `${s.title} ${s.speaker}`.toLocaleLowerCase().includes(q)) && (!track || s.track===track));
}
export function parseFavorites(raw: string | null, sessions: Session[]): string[] {
  try { const value=JSON.parse(raw ?? '[]'); const valid=new Set(sessions.map(s=>s.id));
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id==='string' && valid.has(id)))] : [];
  } catch { return []; }
}
export function timeLabel(value: string) {
  return new Intl.DateTimeFormat('zh-TW',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Taipei'}).format(new Date(value));
}
