// Prebuild guard: judul artikel sudah jadi H1 di hero, jadi H1 di body markdown
// diturunkan menjadi H2 agar tidak ada dua H1 dalam satu halaman (SEO).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/blog';
let changed = 0;

for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const path = join(dir, file);
  const raw = readFileSync(path, 'utf8');
  const parts = raw.split('---');
  if (parts.length < 3) continue;

  const body = parts.slice(2).join('---');
  const fixed = body.replace(/^#(?!#)\s+/gm, '## ');
  if (fixed === body) continue;

  const count = (body.match(/^#(?!#)\s+/gm) || []).length;
  writeFileSync(path, parts.slice(0, 2).join('---') + '---' + fixed, 'utf8');
  console.log(`normalize-h1: ${file} (${count} H1 -> H2)`);
  changed++;
}

if (changed) console.log(`normalize-h1: ${changed} file diperbaiki`);
