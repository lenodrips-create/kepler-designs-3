import { onScroll } from '@/lib/smooth-scroll'

/* Scroll-turned word drum.

   Every row is placed on the drum once (rotateX by its index, pushed out to
   the radius). While scrolling, the drum itself turns as one piece: a single
   transform per frame. The browser projects the rows in 3D on the GPU, which
   is what makes rows above and below the centre lean, foreshorten and widen.
   Rows fade with their angle (opacity only), and the centre row cross-fades
   to bronze when it arrives. Nothing is re-laid-out or repainted while it
   turns, and rows that can't be seen aren't drawn at all. */

export type DrumOptions = {
  track: HTMLElement // tall scroll track; its height sets the scroll budget
  drum: HTMLElement // the element that turns
  rows: HTMLElement[] // its rows, in order
  header?: HTMLElement | null // fades away as the drum starts turning
  count: number
  stepVh: number // scroll per row, in viewport heights
  dealVh: number // extra scroll at the end
  angle: number // degrees between rows
  onActive: (index: number) => void
  onDealt: (dealt: boolean) => void
}

const REACH = 5 // rows further than this from the centre are never visible
const FADE_START = 22 // degrees off-centre where rows start to fade
const FADE_END = 92 // degrees off-centre where rows are gone

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

export function createDrum(o: DrumOptions): () => void {
  const stepShare = ((o.count - 1) * o.stepVh) / ((o.count - 1) * o.stepVh + o.dealVh)
  const rad = (o.angle * Math.PI) / 180

  let radius = 0
  let trackTop = 0
  let dist = 1
  let drumDist = 1
  let lastPos = Number.NaN
  let lastHeader = -1
  let active = -1
  let dealt = false
  const lastOpacity = o.rows.map(() => -1)

  const measure = () => {
    const fontSize = o.rows[0] ? parseFloat(getComputedStyle(o.rows[0]).fontSize) : 100
    // Adjacent rows sit one line (1.1em) apart on the drum's face.
    radius = (fontSize * 1.1) / (2 * Math.sin(rad / 2))
    o.rows.forEach((row, i) => {
      row.style.transform = `translateX(-50%) rotateX(${(-i * o.angle).toFixed(3)}deg) translateZ(${radius.toFixed(2)}px)`
    })
    trackTop = o.track.getBoundingClientRect().top + window.scrollY
    dist = Math.max(1, o.track.offsetHeight - window.innerHeight)
    drumDist = dist * stepShare
    lastPos = Number.NaN
  }

  const setActive = (center: number) => {
    active = center
    o.rows.forEach((row, i) => {
      row.dataset.active = String(i === center)
      // Rows out of reach are never on screen: skip drawing them.
      if (Math.abs(i - center) > REACH) {
        row.style.visibility = 'hidden'
        lastOpacity[i] = -1
      } else {
        row.style.visibility = 'visible'
      }
    })
    o.onActive(center)
  }

  const render = (scrollY: number) => {
    const s = clamp(scrollY - trackTop, 0, dist)
    const pos = Math.min(o.count - 1, (s / drumDist) * (o.count - 1))

    if (pos !== lastPos) {
      lastPos = pos
      o.drum.style.transform = `translate3d(0, 0, ${(-radius).toFixed(2)}px) rotateX(${(pos * o.angle).toFixed(4)}deg)`

      const current = Math.round(pos)
      if (current !== active) setActive(current)

      // Depth fade, only for rows that can be on screen.
      const lo = Math.max(0, current - REACH)
      const hi = Math.min(o.count - 1, current + REACH)
      for (let i = lo; i <= hi; i++) {
        const a = Math.abs(i - pos) * o.angle
        const t = clamp((a - FADE_START) / (FADE_END - FADE_START), 0, 1)
        const opacity = Math.round((1 - t * t * (3 - 2 * t)) * 1000) / 1000
        if (opacity !== lastOpacity[i]) {
          lastOpacity[i] = opacity
          o.rows[i].style.opacity = String(opacity)
        }
      }
    }

    if (o.header) {
      const h = clamp(pos / 0.9, 0, 1)
      if (h !== lastHeader) {
        lastHeader = h
        o.header.style.opacity = (1 - h).toFixed(3)
        o.header.style.transform = `translate3d(0, ${(-h * 48).toFixed(2)}px, 0)`
        o.header.style.visibility = h >= 1 ? 'hidden' : 'visible'
      }
    }

    const nowDealt = s > drumDist + (dist - drumDist) * 0.2
    if (nowDealt !== dealt) {
      dealt = nowDealt
      o.onDealt(nowDealt)
    }
  }

  const refresh = () => {
    measure()
    render(window.scrollY)
  }

  measure()
  const off = onScroll(render)
  const resizeObserver = new ResizeObserver(refresh)
  resizeObserver.observe(document.body)
  window.addEventListener('resize', refresh)
  document.fonts.addEventListener('loadingdone', refresh)

  return () => {
    off()
    resizeObserver.disconnect()
    window.removeEventListener('resize', refresh)
    document.fonts.removeEventListener('loadingdone', refresh)
  }
}

/** Pick `n` distinct indexes from `count`, in ascending order. */
export function dealRandom(count: number, n: number): number[] {
  const pool = Array.from({ length: count }, (_, i) => i)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, n).sort((a, b) => a - b)
}
