// Prints /cv to an A4 PDF, from the static export in out/.
//   npm run build && npm run cv:pdf
// Writes public/Dzmitry-Kandratsenka-CV.pdf (committed, so Vercel serves it
// without a browser in the build) and a copy into out/ for local preview.
// Uses the installed Google Chrome when present, else Playwright's Chromium.
import { createServer } from 'node:http';
import { readFile, copyFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const ROOT = new URL('../', import.meta.url).pathname;
const OUT = join(ROOT, 'out');
const FILE = 'Dzmitry-Kandratsenka-CV.pdf';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };

try {
  await stat(join(OUT, 'cv', 'index.html'));
} catch {
  console.error('out/cv/index.html is missing. Run `npm run build` first.');
  process.exit(1);
}

// Unverified claims still in the content file: warn loudly, they are hidden in print.
const content = await readFile(join(ROOT, 'src/content/profile.ts'), 'utf8');
const pending = content.split('\n').filter((l) => l.includes('[VERIFY]') && !l.trim().startsWith('*'));
if (pending.length) {
  console.warn(`\n! ${pending.length} [VERIFY] claim(s) in src/content/profile.ts. Confirm or rewrite them before you publish:`);
  for (const l of pending) console.warn('  ' + l.trim().slice(0, 140));
  console.warn('');
}

const server = createServer(async (req, res) => {
  try {
    let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (p.endsWith('/')) p += 'index.html';
    const body = await readFile(join(OUT, p));
    res.writeHead(200, { 'content-type': TYPES[extname(p)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const { port } = server.address();

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome' });
} catch {
  browser = await chromium.launch();
}
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/cv/`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const target = join(ROOT, 'public', FILE);
await page.pdf({ path: target, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
server.close();
await copyFile(target, join(OUT, FILE));
console.log(`Wrote public/${FILE}`);
