import { useEffect, useMemo, useState } from 'react';
import sessionData from './sessions.json';
import { STORAGE_KEY, filterSessions, parseFavorites, timeLabel, dateLabel, type Session  } from './logic';

const sessions: Session[] = sessionData;
const tracks=[...new Set(sessions.flatMap(s=>s.tags.length?s.tags:['未標示主題']))];
function readFavorites() { if(typeof window==='undefined') return []; try { return parseFavorites(window.localStorage.getItem(STORAGE_KEY),sessions); } catch { return []; } }

export default function App() {
 const [query,setQuery]=useState('');
 const [track,setTrack]=useState('');
 const [date,setDate]=useState('');
 const [onlySaved,setOnlySaved]=useState(false);
 const [favoriteIds,setFavoriteIds]=useState<string[]>(readFavorites);
 const [storageWarning,setStorageWarning]=useState('');
 useEffect(()=>{ try { window.localStorage.setItem(STORAGE_KEY,JSON.stringify(favoriteIds));setStorageWarning(''); } catch { setStorageWarning('瀏覽器目前無法儲存收藏。這次操作仍有效，重新整理後可能不會保留。'); } },[favoriteIds]);
 const visible=useMemo(()=>filterSessions(onlySaved?sessions.filter(s=>favoriteIds.includes(s.id)):sessions,query,track,date),[query,track,date,onlySaved,favoriteIds]);

 function toggle(id:string) { setFavoriteIds(ids=>ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]); }
 function resetFilters() {setQuery('');setTrack('');setDate('');}
 return <>
  <header className="masthead"><div className="wrap brand"><span className="wordmark">HWDC LAB</span><span>2026.10.14–15</span></div></header>
  <main className="wrap">
   <section className="intro"><p className="eyebrow">研討會議程收藏器</p><h1>安排你的學習日程</h1><p className="lede">從兩天 70 場 HWDC 議程中，收藏你想參加的分享。</p><p className="disclosure">第一版 參考解答 · 官方公開議程快照 2026-10-13 · 非官方網站，異動以官網為準</p></section>
   <div className="viewbar" aria-label="檢視選擇"><div className="tabs"><button className={!onlySaved?'active':''} aria-pressed={!onlySaved} onClick={()=>setOnlySaved(false)}>所有議程</button><button className={onlySaved?'active':''} aria-pressed={onlySaved} onClick={()=>setOnlySaved(true)}>我的議程 <span className="count">{favoriteIds.length}</span></button></div><p className="saved-note" aria-live="polite">已收藏 {favoriteIds.length} 場</p></div>
   {storageWarning&&<p className="warning" role="alert">{storageWarning}</p>}

   <section className="filters" aria-label="議程搜尋與篩選"><label className="search-label">搜尋議程或講者<input type="search" placeholder="例如：AI、林建宏" value={query} onChange={e=>setQuery(e.target.value)} /></label><label>日期<select value={date} onChange={e=>setDate(e.target.value)}><option value="">全部日期</option><option value="2026-10-14">10/14（三）</option><option value="2026-10-15">10/15（四）</option></select></label><label>主題<select value={track} onChange={e=>setTrack(e.target.value)}><option value="">全部主題</option>{tracks.map(t=><option key={t}>{t}</option>)}</select></label><button className="reset" onClick={resetFilters}>清除篩選</button></section>
   <div className="result-heading"><h2>{onlySaved?'我的議程':'全部議程'}</h2><span role="status">顯示 {visible.length} 場</span></div>
   <section className="session-grid" aria-label="議程清單">{visible.map(s=>{const saved=favoriteIds.includes(s.id);return <article className="session" key={s.id} data-session-id={s.id}><div className="session-meta"><span>{s.tags.join(' · ') || '未標示主題'}</span><span>{s.id} · {s.room}</span></div><p className="time">{dateLabel(s.startsAt)}　{timeLabel(s.startsAt)}–{timeLabel(s.endsAt)}</p><h3>{s.title}</h3><p className="speaker">講者　{s.speaker || '官方未列講者'}</p><p><a href={s.sourceUrl} target="_blank" rel="noreferrer">查看官方議程</a></p><button className={'save '+(saved?'is-saved':'')} aria-pressed={saved} aria-label={`${saved?'取消收藏':'收藏'} ${s.id} ${s.title}`} onClick={()=>toggle(s.id)}>{saved?'✓ 已收藏':'＋ 收藏議程'}</button></article>})}</section>
   {visible.length===0&&<section className="empty"><h3>{onlySaved&&favoriteIds.length===0?'還沒有收藏議程':'找不到符合條件的議程'}</h3><p>{onlySaved&&favoriteIds.length===0?'回到所有議程，加入你想參加的場次。':'試著清除搜尋文字或切換主題。'}</p><button onClick={()=>{resetFilters();if(onlySaved&&favoriteIds.length===0)setOnlySaved(false);}}>查看所有議程</button></section>}
   <footer>收藏儲存在這個瀏覽器。時間皆為台北時間（UTC+8）。<a href="https://hwdc.ithome.com.tw/2026/agenda" target="_blank" rel="noreferrer">資料來源：HWDC 官網</a>。<br/>此版本由 Codex 製作作為教學參考，非工具效能實測結果。</footer>
  </main>
 </>;
}
