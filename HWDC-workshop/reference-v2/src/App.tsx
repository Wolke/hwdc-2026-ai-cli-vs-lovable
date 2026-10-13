import { useEffect, useMemo, useState } from 'react';
import sessionData from './sessions.json';
import { STORAGE_KEY, filterSessions, parseFavorites, timeLabel, type Session , getConflicts } from './logic';

const sessions: Session[] = sessionData;
const tracks=[...new Set(sessions.map(s=>s.track))];
function readFavorites() { if(typeof window==='undefined') return []; try { return parseFavorites(window.localStorage.getItem(STORAGE_KEY),sessions); } catch { return []; } }

export default function App() {
 const [query,setQuery]=useState('');
 const [track,setTrack]=useState('');
 const [onlySaved,setOnlySaved]=useState(false);
 const [favoriteIds,setFavoriteIds]=useState<string[]>(readFavorites);
 const [storageWarning,setStorageWarning]=useState('');
 useEffect(()=>{ try { window.localStorage.setItem(STORAGE_KEY,JSON.stringify(favoriteIds));setStorageWarning(''); } catch { setStorageWarning('瀏覽器目前無法儲存收藏。這次操作仍有效，重新整理後可能不會保留。'); } },[favoriteIds]);
 const visible=useMemo(()=>filterSessions(onlySaved?sessions.filter(s=>favoriteIds.includes(s.id)):sessions,query,track),[query,track,onlySaved,favoriteIds]);
 const conflicts=useMemo(()=>getConflicts(sessions,favoriteIds),[favoriteIds]);
 function toggle(id:string) { setFavoriteIds(ids=>ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]); }
 function resetFilters() {setQuery('');setTrack('');}
 return <>
  <header className="masthead"><div className="wrap brand"><span className="wordmark">HWDC LAB</span><span>2026.10.14</span></div></header>
  <main className="wrap">
   <section className="intro"><p className="eyebrow">研討會議程收藏器</p><h1>安排你的學習日程</h1><p className="lede">從 12 場範例議程中，收藏你想參加的主題。</p><p className="disclosure">第二版 參考解答 · 議程與講者皆為合成教學資料，非 HWDC 真實議程</p></section>
   <div className="viewbar" aria-label="檢視選擇"><div className="tabs"><button className={!onlySaved?'active':''} aria-pressed={!onlySaved} onClick={()=>setOnlySaved(false)}>所有議程</button><button className={onlySaved?'active':''} aria-pressed={onlySaved} onClick={()=>setOnlySaved(true)}>我的議程 <span className="count">{favoriteIds.length}</span></button></div><p className="saved-note" aria-live="polite">已收藏 {favoriteIds.length} 場</p></div>
   {storageWarning&&<p className="warning" role="alert">{storageWarning}</p>}
   {conflicts.length>0&&<section className="conflicts" aria-label="衝堂提醒" role="status"><h2>有 {conflicts.length} 組收藏議程衝堂</h2><p>下列提醒涵蓋全部收藏，不受目前篩選條件影響。你可以自行保留或取消。</p><ul>{conflicts.map(([a,b])=><li key={`${a.id}-${b.id}`}><strong>{a.title}</strong>（{timeLabel(a.startsAt)}–{timeLabel(a.endsAt)}）<span> 與 </span><strong>{b.title}</strong>（{timeLabel(b.startsAt)}–{timeLabel(b.endsAt)}）</li>)}</ul></section>}
   <section className="filters" aria-label="議程搜尋與篩選"><label className="search-label">搜尋議程或講者<input type="search" placeholder="例如：AI、林以安" value={query} onChange={e=>setQuery(e.target.value)} /></label><label>主題<select value={track} onChange={e=>setTrack(e.target.value)}><option value="">全部主題</option>{tracks.map(t=><option key={t}>{t}</option>)}</select></label><button className="reset" onClick={resetFilters}>清除篩選</button></section>
   <div className="result-heading"><h2>{onlySaved?'我的議程':'全部議程'}</h2><span role="status">顯示 {visible.length} 場</span></div>
   <section className="session-grid" aria-label="議程清單">{visible.map(s=>{const saved=favoriteIds.includes(s.id);return <article className="session" key={s.id} data-session-id={s.id}><div className="session-meta"><span>{s.track}</span><span>{s.id} · {s.room}</span></div><p className="time">{timeLabel(s.startsAt)}–{timeLabel(s.endsAt)}</p><h3>{s.title}</h3><p className="speaker">講者　{s.speaker}</p><button className={'save '+(saved?'is-saved':'')} aria-pressed={saved} aria-label={`${saved?'取消收藏':'收藏'} ${s.id} ${s.title}`} onClick={()=>toggle(s.id)}>{saved?'✓ 已收藏':'＋ 收藏議程'}</button></article>})}</section>
   {visible.length===0&&<section className="empty"><h3>{onlySaved&&favoriteIds.length===0?'還沒有收藏議程':'找不到符合條件的議程'}</h3><p>{onlySaved&&favoriteIds.length===0?'回到所有議程，加入你想參加的場次。':'試著清除搜尋文字或切換主題。'}</p><button onClick={()=>{resetFilters();if(onlySaved&&favoriteIds.length===0)setOnlySaved(false);}}>查看所有議程</button></section>}
   <footer>收藏儲存在這個瀏覽器。時間皆為台北時間（UTC+8）。<br/>此版本由 Codex 製作作為教學參考，非工具效能實測結果。</footer>
  </main>
 </>;
}
