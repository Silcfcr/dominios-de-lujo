import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, '..', 'public', 'images');

function formatBytes(bytes) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)}MB`;
  return `${Math.round(bytes / 1_000)}KB`;
}

async function main() {
  const files = await readdir(INPUT_DIR);
  const targets = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`\nConverting ${targets.length} images to WebP (quality 82)…\n`);
  console.log('File'.padEnd(32), 'Before'.padStart(8), 'After'.padStart(8), 'Saved'.padStart(7));
  console.log('─'.repeat(60));

  for (const file of targets) {
    const inPath  = join(INPUT_DIR, file);
    const outPath = join(INPUT_DIR, basename(file, extname(file)) + '.webp');
    const before  = (await stat(inPath)).size;

    await sharp(inPath).webp({ quality: 82 }).toFile(outPath);

    const after = (await stat(outPath)).size;
    const saved = Math.round((1 - after / before) * 100);

    console.log(
      file.padEnd(32),
      formatBytes(before).padStart(8),
      formatBytes(after).padStart(8),
      `${saved}%`.padStart(7),
    );
  }

  console.log('\nDone. Originals preserved — delete them after verifying the site.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
