import Lenis from 'lenis'

/* One scroll source for the whole page.

   Lenis eases wheel and trackpad scrolling and emits the eased position from
   inside its own animation frame. Every effect subscribes here, so the hero
   and the drum update in the same frame the page moves: no extra smoothing
   layers, no one-frame lag between them. Touch keeps native momentum, and
   reduced-motion users get plain scrolling (still delivered once per frame). */

type Listener = (scrollY: number) => void

const listeners = new Set<Listener>()
let lenis: Lenis | null = null
let nativeFrame = 0

function emit(y: number) {
  for (const listener of listeners) listener(y)
}

function onNativeScroll() {
  if (nativeFrame) return
  nativeFrame = requestAnimationFrame(() => {
    nativeFrame = 0
    emit(window.scrollY)
  })
}

export function currentScroll(): number {
  return lenis ? lenis.scroll : window.scrollY
}

/** Glide back to the top of the page (instant for reduced motion). */
export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0, { duration: 2.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else window.scrollTo({ top: 0, behavior: 'auto' })
}

/** Glide to an element (by id), leaving `offset` px above it. */
export function scrollToId(id: string, offset = 0): void {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -offset, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else el.scrollIntoView()
}

/** Subscribe to the page scroll. Called once right away, then every frame the page moves. */
export function onScroll(listener: Listener): () => void {
  listeners.add(listener)
  listener(currentScroll())
  return () => {
    listeners.delete(listener)
  }
}

/** Start smooth scrolling. Returns a function that stops it. */
export function startSmoothScroll(): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce) {
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onNativeScroll)
      cancelAnimationFrame(nativeFrame)
      nativeFrame = 0
    }
  }

  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.09, // lower = longer glide, higher = more immediate
    wheelMultiplier: 0.85,
    touchMultiplier: 1,
  })
  const off = lenis.on('scroll', (l) => emit(l.scroll))

  return () => {
    off()
    lenis?.destroy()
    lenis = null
  }
}
