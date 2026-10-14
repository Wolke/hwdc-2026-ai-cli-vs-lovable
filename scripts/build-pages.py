#!/usr/bin/env python3
"""Build the public static workshop site using the checked-in teaching materials."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import argparse
import html
import json
import re
import shutil
import zipfile

REPO = Path(__file__).resolve().parent.parent
SITE_URL = 'https://wolke.github.io/hwdc-2026-ai-cli-vs-lovable/'
IGNORED = {'.git', 'node_modules', 'dist', 'coverage', '__pycache__', '.vite', '.DS_Store', 'Thumbs.db'}
PROJECTS = ['starter', 'reference-v1', 'reference-v2']

def files_under(directory):
    for p in sorted(directory.rglob('*')):
        if any(part in IGNORED or part.startswith('.env') for part in p.relative_to(directory).parts):
            continue
        if p.suffix in {'.tsbuildinfo', '.log'}:
            continue
        if p.is_symlink():
            raise ValueError(f'Symlink is not a publishable file: {p}')
        if p.is_file():
            yield p

def copy_file(source, destination):
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)

class LocalLinks(HTMLParser):
    def __init__(self):
        super().__init__(); self.urls = []
    def handle_starttag(self, tag, attrs):
        if tag in ['a', 'img', 'script', 'link']:
            self.urls.extend(v for k,v in attrs if k in ['href','src'] and v)

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True, type=Path)
    args=parser.parse_args(); site=args.output.resolve()
    if site == REPO or REPO in site.parents:
        raise ValueError('Output must be a separate staging directory or publishing checkout.')
    site.mkdir(parents=True, exist_ok=True)
    # Only replace known generated assets. Never touch the publishing checkout's Git data.
    for name in ['HWDC-workshop','downloads']:
        target=site/name
        if target.exists():shutil.rmtree(target)
    for old in site.glob('HWDC-2026-workshop-v*.pptx'):old.unlink()
    kit=REPO/'HWDC-workshop'
    for directory in ['materials','slides','offline','screenshots','evidence']:
        for source in files_under(kit/directory):
            copy_file(source,site/source.relative_to(REPO))
    copy_file(kit/'README.md',site/'HWDC-workshop/README.md')
    decks=list(REPO.glob('HWDC-2026-workshop-v*.pptx'))
    if not decks:raise ValueError('No workshop PPTX found')
    deck=max(decks,key=lambda p:int(re.search(r'-v(\d+)\.pptx$',p.name).group(1)))
    copy_file(deck,site/deck.name)
    downloads=site/'downloads';downloads.mkdir(exist_ok=True)
    for project in PROJECTS:
        with zipfile.ZipFile(downloads/f'{project}.zip','w',zipfile.ZIP_DEFLATED) as z:
            for source in files_under(kit/project):z.write(source,source.relative_to(kit))
        landing=site/'HWDC-workshop'/project;landing.mkdir(parents=True,exist_ok=True)
        readme=(kit/project/'README.md').read_text()
        copy_file(kit/project/'README.md',landing/'README.md')
        (landing/'index.html').write_text(f'''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{project} 專案下載</title><style>body{{max-width:900px;margin:40px auto;padding:24px;font:18px/1.8 system-ui,sans-serif;color:#17283e}}a{{color:#155ebd}}pre{{white-space:pre-wrap;overflow-wrap:anywhere;font:16px/1.8 ui-monospace,monospace}}</style></head><body><a href="../../index.html">教材首頁</a><h1>{project} 專案下載</h1><p><a href="../../downloads/{project}.zip" download>下載專案 ZIP</a></p><pre>{html.escape(readme)}</pre></body></html>''')
    portal=(REPO/'開始這裡.html').read_text()
    portal=portal.replace('href="HWDC-workshop/starter/README.md"','href="downloads/starter.zip" download')
    portal=portal.replace('<strong>通用 AI 起始專案</strong><span>空白專案、真實資料與啟動步驟</span>','<strong>下載起始專案 ZIP</strong><span>解壓後執行 npm ci、npm run dev</span>')
    portal=portal.replace('<div class="links">','<div class="links"><a href="downloads/hwdc-workshop-materials.zip" download><strong>下載完整教材 ZIP</strong><span>簡報、讲義、資料與三份專案，可離線使用</span></a>'.replace('讲義','講義'),1)
    portal=portal.replace('固定版面，可離線播放','44 頁固定版面，線上直接播放')
    portal=portal.replace('單檔 HTML，無網路也可操作','直接開啟示範，也可隨教材下載離線使用')
    for filename in ['index.html','開始這裡.html']:(site/filename).write_text(portal)
    (site/'.nojekyll').write_text('')
    # Normalize JSON references to the direct public attachment.
    github_attachment='https://github.com/Wolke/hwdc-2026-ai-cli-vs-lovable/blob/main/HWDC-workshop/materials/hwdc-agenda-2026.json'
    public_attachment=SITE_URL+'HWDC-workshop/materials/hwdc-agenda-2026.json'
    for page in site.rglob('*.html'):
        text=page.read_text().replace(github_attachment,public_attachment)
        page.write_text(text)
    readme=f'''# HWDC 2026 工作坊網站\n\n[開啟教材網站]({SITE_URL})\n\n網站包含 44 頁簡報預覽、可下載 PPTX、學員講義、提示詞、70 筆公開議程、議程收藏器示範，以及起始專案與完整教材 ZIP。\n\n網站檔案由教材來源的 `scripts/build-pages.py` 產生。由同一個 repo 的 GitHub Actions 建置並發布，`main` 每次 push 後更新網站。\n\n- [完整教材](downloads/hwdc-workshop-materials.zip)\n- [起始專案](downloads/starter.zip)\n- [可編輯簡報]({deck.name})\n- [官方議程](https://hwdc.ithome.com.tw/2026/lab/4996)\n\n講師：林建宏 Wolke Lin。議程為公開教學快照，以官方最新公告為準。\n'''
    (site/'README.md').write_text(readme)
    # The download preserves the original local package structure, including source projects.
    with zipfile.ZipFile(downloads/'hwdc-workshop-materials.zip','w',zipfile.ZIP_DEFLATED) as z:
        for source in files_under(kit):z.write(source,source.relative_to(REPO))
        for source in [REPO/'README.md',REPO/'開始這裡.html',deck]:z.write(source,source.name)
    checked=0
    for page in site.rglob('*.html'):
        parser=LocalLinks();parser.feed(page.read_text())
        for link in parser.urls:
            parsed=urlsplit(link)
            if parsed.scheme or parsed.netloc or not parsed.path:continue
            if parsed.path.startswith('/'):raise ValueError(f'Root-relative link breaks project Pages URL: {page}: {link}')
            target=(page.parent/unquote(parsed.path)).resolve()
            if not target.is_relative_to(site) or not target.exists():raise ValueError(f'Broken local link: {page}: {link}')
            checked+=1
    for n in range(1,45):assert (site/f'HWDC-workshop/slides/{n:02}.png').is_file()
    for archive in downloads.glob('*.zip'):
        with zipfile.ZipFile(archive) as z:assert z.testzip() is None
    print(json.dumps({'site':str(site),'url':SITE_URL,'html_local_links_checked':checked,'slides':44,'deck':deck.name,'files':len(list(files_under(site)))},ensure_ascii=False,indent=2))

if __name__=='__main__':main()
