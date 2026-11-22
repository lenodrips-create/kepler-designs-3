import { useEffect, useRef, type CSSProperties } from 'react'

import { languages } from '@/content/languages'
import { observeReveal } from '@/lib/reveal'

const pad = (n: number) => String(n).padStart(2, '0')
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

/* Languages we work in: the five 3D icons on a stage, with the one closest
   to the mouse turning to look at it (see src/lib/code-icons.ts). The 3D
   code is only downloaded when the section gets near the screen. */
export function Languages() {
  const ref = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let dispose: (() => void) | null = null
    let cancelled = false

    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        near.disconnect()
        import('@/lib/code-icons')
          .then(({ createCodeIcons }) =>
            createCodeIcons(
              stage,
              languages.map((l) => ({ key: l.key, url: l.model })),
            ),
          )
          .then((stop) => {
            if (cancelled) stop()
            else {
              dispose = stop
              stage.dataset.ready = 'true'
            }
          })
          .catch(() => {
            // No WebGL or the models failed: the list below still says it all.
            stage.dataset.failed = 'true'
          })
      },
      { rootMargin: '800px 0px' },
    )
    near.observe(stage)

    return () => {
      cancelled = true
      near.disconnect()
      dispose?.()
    }
  }, [])

  return (
    <section ref={ref} id="languages" aria-labelledby="languages-title" className="pt-8 pb-20 md:pt-12 md:pb-28">
      <h2
        id="languages-title"
        data-reveal
        className="px-6 font-display text-3xl font-semibold tracking-[-0.03em] md:px-14 md:text-5xl"
      >
        Languages we work in
      </h2>

      {/* the 3D stage, edge to edge; it fades in once the icons have loaded */}
      <div
        ref={stageRef}
        role="img"
        aria-label="3D icons for HTML, JavaScript, CSS, TypeScript and Swift"
        className="relative mt-4 h-[26rem] w-full opacity-0 transition-opacity duration-1000 data-[failed=true]:hidden data-[ready=true]:opacity-100 sm:h-[24rem] md:mt-2 md:h-[30rem]"
      />

      <ol className="mx-6 grid border-t border-foreground/20 md:mx-14 md:grid-cols-5 md:gap-x-6">
        {languages.map((l, i) => (
          <li
            key={l.key}
            data-reveal
            style={stagger(i + 1)}
            className="grid grid-cols-[2.5rem_1fr] border-b border-foreground/10 py-5 md:block md:border-b-0 md:py-6"
          >
            <span className="pt-1.5 text-xs font-medium text-brand-text tabular-nums md:block md:pt-0">{pad(i + 1)}</span>
            <div className="md:mt-3">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-[1.7rem]">{l.name}</h3>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{l.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
