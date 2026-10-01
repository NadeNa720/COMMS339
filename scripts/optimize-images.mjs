/**
 * Generates responsive WebP variants for every JPEG in /public/images and
 * writes src/data/image-manifest.json so <SmartImage /> can emit a srcset.
 *
 *   npm run images
 *
 * For `photo.jpg` (W×H) this produces:
 *   photo-480.webp, photo-768.webp (only widths smaller than the source)
 *   photo.webp      (native width)
 * The original JPEG is kept as the `src` fallback.
 */
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public', 'images');
const manifestPath = path.join(root, 'src', 'data', 'image-manifest.json');

const WIDTHS = [480, 768];
const QUALITY = 74;

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
const manifest = {};

for (const file of files) {
  const base = file.replace(/\.(jpe?g|png)$/i, '');
  const input = path.join(dir, file);
  const meta = await sharp(input).metadata();
  const widths = [...WIDTHS.filter((w) => w < meta.width), meta.width];

  const variants = [];
  for (const w of widths) {
    const name = w === meta.width ? `${base}.webp` : `${base}-${w}.webp`;
    await sharp(input).resize({ width: w }).webp({ quality: QUALITY }).toFile(path.join(dir, name));
    variants.push({ file: name, width: w });
  }

  manifest[file] = { width: meta.width, height: meta.height, variants };
  console.log(`${file}: ${widths.join(', ')}w`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`manifest → ${path.relative(root, manifestPath)}`);
