import { existsSync, readdirSync } from 'fs'
import { join, extname } from 'path'

const IMAGE_EXTS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp'])

export function getClientLogos(): { name: string; src: string }[] {
  const dir = join(process.cwd(), 'public', 'assets', 'client-logos')
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort()
    .map((f) => ({
      name: f.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      src: `/assets/client-logos/${f}`,
    }))
}
