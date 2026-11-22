import { onScroll } from '@/lib/smooth-scroll'

/* A slow drift for a cropped image: as its frame crosses the screen the
   image moves a little slower than the page. Transform only. */
export function createImageDrift(frame: HTMLElement, image: HTMLElement, range = 10): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  let top = 0
  let height = 1
  const measure = () => {
    const r = frame.getBoundingClientRect()
    top = r.top + window.scrollY
    height = r.height
  }
  const render = (y: number) => {
    const p = Math.min(1, Math.max(0, (y + window.innerHeight - top) / (window.innerHeight + height)))
    image.style.transform = `translate3d(0, ${(-range + p * range).toFixed(3)}%, 0)`
  }
  measure()
  const off = onScroll(render)
  const onResize = () => {
    measure()
    render(window.scrollY)
  }
  window.addEventListener('resize', onResize)
  return () => {
    off()
    window.removeEventListener('resize', onResize)
  }
}
