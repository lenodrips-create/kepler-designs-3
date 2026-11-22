/* Live readings about this page, taken from the visitor's own browser. */

export type PageReadings = {
  firstPaintMs: number | null // first contentful paint
  transferredBytes: number // everything downloaded so far this visit
  javascriptBytes: number // compressed size of the scripts
  elements: number // DOM nodes
  viewport: string
  pixelRatio: number
  reducedMotion: boolean
}

export function readPage(): PageReadings {
  const paint = performance.getEntriesByName('first-contentful-paint')[0]
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

  let transferred = nav?.transferSize ?? 0
  let javascript = 0
  for (const r of resources) {
    transferred += r.transferSize
    if (r.initiatorType === 'script' || r.name.endsWith('.js')) javascript += r.encodedBodySize
  }

  return {
    firstPaintMs: paint ? Math.round(paint.startTime) : null,
    transferredBytes: transferred,
    javascriptBytes: javascript,
    elements: document.getElementsByTagName('*').length,
    viewport: `${window.innerWidth}×${window.innerHeight}`,
    pixelRatio: Math.round(window.devicePixelRatio * 100) / 100,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }
}

/** Measures frames per second while running; reports about four times a second. */
export function startFpsMeter(report: (fps: number) => void): () => void {
  let frame = 0
  let since = performance.now()
  let frames = 0

  const tick = (now: number) => {
    frames++
    if (now - since >= 250) {
      report(Math.min(240, Math.round((frames * 1000) / (now - since))))
      frames = 0
      since = now
    }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}

export function formatBytes(bytes: number): { value: string; unit: string } {
  if (bytes >= 1024 * 1024) return { value: (bytes / 1024 / 1024).toFixed(1), unit: 'MB' }
  return { value: String(Math.round(bytes / 1024)), unit: 'KB' }
}
