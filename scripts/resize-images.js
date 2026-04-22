/**
 * scripts/resize-images.js
 *
 * Resizes source images from screens/ into public/images/ at 2× the max
 * display size. Keeps original format (PNG stays PNG, JPG stays JPG).
 * Run automatically as part of the build via package.json.
 *
 * Max display sizes:
 *   - Project card images: max ~640px wide (mobile full-width) → 1280px at 2×
 *   - Blog inline images:  max ~750px wide                     → 1500px at 2×
 *   - Blog featured:       max ~750px wide                     → 1500px at 2×
 *   - Profile:             max ~200px wide                     → 400px at 2×
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const jobs = [
  // Project screenshots: source in screens/, output in public/images/projects/
  { src: 'screens/devereauxarch.png',   dest: 'public/images/projects/devereaux.png',                    maxWidth: 1280 },
  { src: 'screens/nrvpc.png',           dest: 'public/images/projects/nrvpc.png',                        maxWidth: 1280 },
  { src: 'screens/piilink.png',         dest: 'public/images/projects/pii-link.png',                     maxWidth: 1280 },
  { src: 'screens/keytegroup.png',      dest: 'public/images/projects/keyte-group.png',                  maxWidth: 1280 },
  // Blog images
  { src: 'screens/jeffslink.png',       dest: 'public/images/blog/jeffslink.png',                        maxWidth: 1500 },
]

async function resizeImage({ src, dest, maxWidth }) {
  const srcPath = path.join(root, src)
  const destPath = path.join(root, dest)

  if (!fs.existsSync(srcPath)) {
    console.warn(`  SKIP  ${src} (not found)`)
    return
  }

  const meta = await sharp(srcPath).metadata()
  const beforeKB = Math.round(fs.statSync(srcPath).size / 1024)

  if (meta.width <= maxWidth) {
    // Already at or below target — just copy if dest doesn't exist or is older
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true })
      fs.copyFileSync(srcPath, destPath)
      console.log(`  COPY  ${src} → ${dest} (${meta.width}px, already within ${maxWidth}px)`)
    } else {
      console.log(`  OK    ${dest} (${meta.width}px ≤ ${maxWidth}px, unchanged)`)
    }
    return
  }

  fs.mkdirSync(path.dirname(destPath), { recursive: true })

  const isPng = srcPath.toLowerCase().endsWith('.png')
  const pipeline = sharp(srcPath).resize({ width: maxWidth, withoutEnlargement: true })
  if (isPng) pipeline.png({ compressionLevel: 9, effort: 10 })

  await pipeline.toFile(destPath)

  const afterKB = Math.round(fs.statSync(destPath).size / 1024)

  // If resizing made the file larger, just copy the original
  if (afterKB > beforeKB) {
    fs.copyFileSync(srcPath, destPath)
    const copyKB = Math.round(fs.statSync(destPath).size / 1024)
    console.log(`  COPY  ${src} → ${dest}  (resize inflated ${afterKB}KB > ${beforeKB}KB, kept original ${copyKB}KB)`)
    return
  }

  console.log(`  RESIZE ${src} → ${dest}  ${meta.width}px→${maxWidth}px  ${beforeKB}KB→${afterKB}KB  (saved ${beforeKB - afterKB}KB)`)
}

console.log('Resizing images...')
Promise.all(jobs.map(resizeImage))
  .then(() => console.log('Done.'))
  .catch((err) => { console.error(err); process.exit(1) })
