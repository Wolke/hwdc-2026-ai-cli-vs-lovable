// Codex 製作的課後練習參考，輸入為HWDC 2026 官方公開議程快照。
export function escapeText(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

export function foldLine(line) {
  const encoder = new TextEncoder();
  const lines = [];
  let current = '', bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 75) {
      lines.push(current);
      current = ' ';
      bytes = 1;
    }
    current += character;
    bytes += size;
  }
  lines.push(current);
  return lines.join('\r\n');
}

function utc(value) {
  return new Date(value).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function createCalendar(sessions, favoriteIds, now = new Date()) {
  const ids = new Set(favoriteIds);
  const selected = sessions.filter(session => ids.has(session.id));
  if (!selected.length) return null;
  selected.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt) || a.id.localeCompare(b.id));
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wolke Lin//HWDC teaching example//ZH', 'CALSCALE:GREGORIAN'];
  for (const session of selected) {
    lines.push('BEGIN:VEVENT', `UID:hwdc-${session.id}-2026@local.invalid`, `DTSTAMP:${utc(now)}`, `DTSTART:${utc(session.startsAt)}`, `DTEND:${utc(session.endsAt)}`, `SUMMARY:${escapeText(session.title)}`, `LOCATION:${escapeText(session.room)}`, `DESCRIPTION:${escapeText('HWDC 2026 公開議程快照，資訊以官網為準。講者：' + session.speaker + '；來源：' + session.sourceUrl)}`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

export function downloadCalendar(calendar) {
  if (!calendar) return false;
  const url = URL.createObjectURL(new Blob([calendar], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-hwdc-demo-schedule.ics';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}
