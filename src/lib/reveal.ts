/* Reveal-on-scroll for anything marked `data-reveal` inside `root`.
   Each element fades and rises once as it enters the viewport; the motion
   itself is a CSS transition (see index.css), so it runs on the GPU.
   Stagger with a `--i` custom property on the element. */
export function observeReveal(root: HTMLElement): () => void {
  const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => (el.dataset.reveal = 'in'))
    return () => {}
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.reveal = 'in'
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  targets.forEach((el) => observer.observe(el))
  return () => observer.disconnect()
}
