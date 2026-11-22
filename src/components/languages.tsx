import { useEffect, useRef, useState, type CSSProperties } from 'react'

import { languages, model } from '@/content/languages'
import { observeReveal } from '@/lib/reveal'
import { createSketchfabFollow, sketchfabEmbedUrl } from '@/lib/sketchfab-follow'
import { cn } from '@/lib/utils'

const pad = (n: number) => String(n).padStart(2, '0')
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

/* Languages we work in, with the HTML, CSS and JavaScript model turning to
   follow the mouse (see src/lib/sketchfab-follow.ts). */
export function Languages() {
  const ref = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  // If the Viewer API can't load, show the plain embed you can drag instead.
  const [fallback, setFallback] = useState(false)

  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])
  useEffect(() => {
    if (!frameRef.current) return
    return createSketchfabFollow(frameRef.current, model.uid, () => setFallback(true))
  }, [])

  return (
    <section
      ref={ref}
      id="languages"
      aria-labelledby="languages-title"
      className="px-6 pt-8 pb-20 md:px-14 md:pt-12 md:pb-28"
    >
      <h2
        id="languages-title"
        data-reveal
        className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl"
      >
        Languages we work in
      </h2>

      <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:items-center md:gap-14">
        <ol className="border-t border-foreground/20 md:col-span-5">
          {languages.map((l, i) => (
            <li
              key={l.name}
              data-reveal
              style={stagger(i + 1)}
              className="group grid grid-cols-[2.5rem_1fr] border-b border-foreground/10 py-5 md:py-6"
            >
              <span className="pt-1.5 text-xs font-medium text-brand-text tabular-nums">{pad(i + 1)}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5 md:text-3xl">
                  {l.name}
                </h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">{l.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <figure data-reveal style={stagger(2)} className="order-first md:order-none md:col-span-7">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.04] md:aspect-[4/3]">
            <iframe
              ref={frameRef}
              key={fallback ? 'embed' : 'api'}
              title={`${model.title}: a 3D model of the HTML, CSS and JavaScript logos`}
              src={fallback ? sketchfabEmbedUrl(model.uid) : undefined}
              allow="autoplay; fullscreen; xr-spatial-tracking"
              tabIndex={fallback ? 0 : -1}
              className={cn('absolute inset-0 h-full w-full border-0', !fallback && 'pointer-events-none')}
            />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">
            <a href={model.url} target="_blank" rel="noopener nofollow" className="font-medium underline-offset-2 hover:underline">
              {model.title}
            </a>{' '}
            by{' '}
            <a href={model.authorUrl} target="_blank" rel="noopener nofollow" className="font-medium underline-offset-2 hover:underline">
              {model.author}
            </a>{' '}
            on{' '}
            <a href="https://sketchfab.com" target="_blank" rel="noopener nofollow" className="font-medium underline-offset-2 hover:underline">
              Sketchfab
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
