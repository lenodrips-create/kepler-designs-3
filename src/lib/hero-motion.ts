import { onScroll } from '@/lib/smooth-scroll'

/* Hero scroll effect: the hero sinks at 15% of scroll speed while the photo
   drifts and a black shade fades in, so the letters recede as the page slides
   over them. Only transform and opacity change, so it stays on the GPU. */
export function createHeroMotion(els: {
  hero: HTMLElement
  image: HTMLElement
  shade: HTMLElement
}): () => void {
  const { hero, image, shade } = els
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let height = hero.offsetHeight
  let lastP = -1

  const render = (scrollY: number) => {
    const p = Math.min(1, Math.max(0, scrollY / height))
    if (p === lastP) return
    lastP = p
    shade.style.opacity = (p * 0.8).toFixed(4)
    if (reduce) return
    hero.style.transform = `translate3d(0, ${(p * height * 0.15).toFixed(2)}px, 0)`
    image.style.transform = `translate3d(0, ${(-7 + p * 8).toFixed(3)}%, 0)`
  }

  const onResize = () => {
    height = hero.offsetHeight
    lastP = -1
    render(window.scrollY)
  }

  const off = onScroll(render)
  window.addEventListener('resize', onResize)
  return () => {
    off()
    window.removeEventListener('resize', onResize)
  }
}

/* Fit the wordmark edge to edge using the glyphs' real ink bounds, so the
   descenders of "p" and "g" sit right on the bottom margin. */
export function fitWordmark(els: {
  svg: SVGSVGElement
  text: SVGTextElement
  word: string
  tracking: number // letter-spacing in em
}): () => void {
  const { svg, text, word, tracking } = els
  const SIZE = 1000
  let cancelled = false

  const fit = () => {
    if (cancelled) return
    const family = getComputedStyle(text).fontFamily
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return
    ctx.font = `400 ${SIZE}px ${family}`
    const m = ctx.measureText(word)
    const ls = tracking * SIZE
    const left = m.actualBoundingBoxLeft
    const width = left + m.actualBoundingBoxRight + ls * (word.length - 1)
    const asc = m.actualBoundingBoxAscent
    const desc = m.actualBoundingBoxDescent

    text.setAttribute('font-size', String(SIZE))
    text.setAttribute('x', left.toFixed(2))
    text.setAttribute('y', asc.toFixed(2))
    text.setAttribute('letter-spacing', ls.toFixed(2))
    svg.setAttribute('viewBox', `0 0 ${width.toFixed(2)} ${(asc + desc).toFixed(2)}`)
    svg.dataset.ready = 'true'
  }

  const family = getComputedStyle(text).fontFamily
  Promise.race([
    document.fonts.load(`400 ${SIZE}px ${family}`).then(() => document.fonts.ready),
    new Promise((r) => setTimeout(r, 2500)),
  ])
    .catch(() => {})
    .then(fit)
  document.fonts.addEventListener('loadingdone', fit)

  return () => {
    cancelled = true
    document.fonts.removeEventListener('loadingdone', fit)
  }
}
