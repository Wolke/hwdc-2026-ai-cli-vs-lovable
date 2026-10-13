import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sortedSessions,filterSessions,parseFavorites,timeLabel } from '../src/logic.ts';
const s=JSON.parse(readFileSync(new URL('../src/sessions.json',import.meta.url),'utf8'));
test('12 synthetic sessions sorted deterministically',()=>assert.deepEqual(sortedSessions(s).map(x=>x.id),['S01','S04','S02','S03','S05','S06','S07','S08','S09','S10','S11','S12']));
test('search speaker, whitespace, empty and AND filters',()=>{assert.equal(filterSessions(s,' 林以安 ','').length,1);assert.equal(filterSessions(s,'AI','Web 技術').length,0);assert.deepEqual(filterSessions(s,' ai ','AI 開發').map(x=>x.id),['S01','S06']);assert.equal(filterSessions(s,'不存在的議程','').length,0)});
test('storage handles duplicates, unknown IDs, malformed JSON and wrong types',()=>{assert.deepEqual(parseFavorites('["S01","S01",7,"NO"]',s),['S01']);for(const raw of ['{', '{}','null','12',null])assert.deepEqual(parseFavorites(raw,s),[])});
test('time labels are pinned to Taipei',()=>assert.equal(timeLabel('2026-10-14T09:00:00+08:00'),'09:00'));
