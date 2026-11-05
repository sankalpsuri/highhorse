import { existsSync, readdirSync, mkdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import sharp from 'sharp'
import { getLogoScaleOverride } from './client-logo-size-overrides'

const IMAGE_EXTS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp'])
const RASTER_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp'])
const TRIM_THRESHOLD = 20
const TRIM_PADDING = 4

const BENCHMARK_PATTERN = /fech/i
const DESKTOP_H = 64
const MIN_H_RATIO = 0.4
const MAX_H_RATIO = 1.2
const MAX_W_RATIO = 3.0

export interface ClientLogo {
  name: string
  src: string
  width: number
  height: number
  displayWidth: number
  displayHeight: number
}

interface TrimmedLogo {
  filename: string
  name: string
  src: string
  width: number
  height: number
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  const srcDir = join(process.cwd(), 'public', 'assets', 'client-logos')
  if (!existsSync(srcDir)) return []

  const trimDir = join(process.cwd(), 'public', 'assets', 'client-logos-trimmed')
  if (!existsSync(trimDir)) mkdirSync(trimDir, { recursive: true })

  const files = readdirSync(srcDir)
    .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort()

  const trimmed: TrimmedLogo[] = []

  for (const f of files) {
    const ext = extname(f).toLowerCase()
    const name = f.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')

    if (!RASTER_EXTS.has(ext)) {
      trimmed.push({ filename: f, name, src: `/assets/client-logos/${f}`, width: 180, height: 56 })
      continue
    }

    const srcPath = join(srcDir, f)
    const outFilename = f.replace(/\.[^.]+$/, '.png')
    const outPath = join(trimDir, outFilename)

    const srcMtime = statSync(srcPath).mtimeMs
    if (existsSync(outPath) && statSync(outPath).mtimeMs >= srcMtime) {
      const meta = await sharp(outPath).metadata()
      trimmed.push({
        filename: f,
        name,
        src: `/assets/client-logos-trimmed/${outFilename}`,
        width: meta.width!,
        height: meta.height!,
      })
      continue
    }

    try {
      const trimBuf = await sharp(srcPath)
        .trim({ threshold: TRIM_THRESHOLD })
        .toBuffer({ resolveWithObject: true })

      const info = await sharp(trimBuf.data)
        .ensureAlpha()
        .extend({
          top: TRIM_PADDING,
          bottom: TRIM_PADDING,
          left: TRIM_PADDING,
          right: TRIM_PADDING,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(outPath)

      trimmed.push({
        filename: f,
        name,
        src: `/assets/client-logos-trimmed/${outFilename}`,
        width: info.width,
        height: info.height,
      })
    } catch {
      trimmed.push({ filename: f, name, src: `/assets/client-logos/${f}`, width: 180, height: 56 })
    }
  }

  const bench = trimmed.find((t) => BENCHMARK_PATTERN.test(t.filename))
  const benchRatio = bench ? bench.width / bench.height : 1
  const benchH = DESKTOP_H
  const benchW = benchH * benchRatio
  const targetArea = benchW * benchH

  const minH = MIN_H_RATIO * DESKTOP_H
  const maxH = MAX_H_RATIO * DESKTOP_H
  const maxW = MAX_W_RATIO * DESKTOP_H

  return trimmed.map((t) => {
    const ratio = t.width / t.height

    let dh = Math.sqrt(targetArea / ratio)
    let dw = dh * ratio

    if (dh > maxH) { dh = maxH; dw = dh * ratio }
    if (dh < minH) { dh = minH; dw = dh * ratio }
    if (dw > maxW) { dw = maxW; dh = dw / ratio }

    const scale = getLogoScaleOverride(t.filename)
    dw *= scale
    dh *= scale

    return {
      name: t.name,
      src: t.src,
      width: t.width,
      height: t.height,
      displayWidth: Math.round(dw * 10) / 10,
      displayHeight: Math.round(dh * 10) / 10,
    }
  })
}
