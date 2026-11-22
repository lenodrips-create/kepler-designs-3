/* Words part around the cursor.

   On the line under the pointer, words to its left ease left and words to
   its right ease right. The push grows with distance from the cursor and
   then holds, so the space between any two words can only widen, never
   squeeze, and the widest gap opens right where you point. Lines above and
   below take a fading share of it, so the paragraph around stays calm.
   Only transforms change, so no line ever reflows. Mouse and pen only; off
   for reduced motion. */

const PUSH = 18 // px: how far each side of the line moves at most
const SPREAD = 70 // px: how quickly the gap grows away from the cursor
const LINES = 0.85 // how far, in line heights, the effect reaches up and down

export function createWordSpread(root: HTMLElement): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const words = [...root.querySelectorAll<HTMLElement>('[data-word]')]
  let centers: { x: number; y: number; h: number }[] = []
  let frame = 0
  let px = 0
  let py = 0

  const measure = () => {
    // measure with transforms cleared so positions are the resting layout
    const r = root.getBoundingClientRect()
    centers = words.map((w) => {
      const prev = w.style.transform
      w.style.transform = ''
      const b = w.getBoundingClientRect()
      w.style.transform = prev
      return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2, h: b.height }
    })
  }

  const render = () => {
    frame = 0
    words.forEach((w, i) => {
      const c = centers[i]
      const line = c.h * LINES
      const rows = Math.exp(-((c.y - py) ** 2) / (2 * line * line))
      const x = PUSH * Math.tanh((c.x - px) / SPREAD) * rows
      w.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`
    })
  }

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    const r = root.getBoundingClientRect()
    px = e.clientX - r.left
    py = e.clientY - r.top
    if (!frame) frame = requestAnimationFrame(render)
  }

  const onEnter = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    measure()
    onMove(e)
  }

  const onLeave = () => {
    cancelAnimationFrame(frame)
    frame = 0
    words.forEach((w) => (w.style.transform = ''))
  }

  root.addEventListener('pointerenter', onEnter)
  root.addEventListener('pointermove', onMove)
  root.addEventListener('pointerleave', onLeave)
  window.addEventListener('resize', onLeave)
  return () => {
    root.removeEventListener('pointerenter', onEnter)
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('resize', onLeave)
    cancelAnimationFrame(frame)
  }
}
