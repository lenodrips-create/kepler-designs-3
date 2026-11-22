import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import pkg from '../../package.json'
import { formatBytes, readPage, startFpsMeter, type PageReadings } from '@/lib/page-metrics'
import { observeReveal } from '@/lib/reveal'

const stagger = (i: number) => ({ '--i': i }) as CSSProperties
const deps: Record<string, string> = { ...pkg.dependencies, ...pkg.devDependencies }
const major = (name: string) => deps[name]?.replace(/^[^\d]*/, '').split('.')[0] ?? ''

const stack = [
  `React ${major('react')}`,
  `TypeScript ${major('typescript')}`,
  `Vite ${major('vite')}`,
  `Tailwind CSS ${major('tailwindcss')}`,
  `Lenis ${major('lenis')}`,
  `Framer Motion ${major('framer-motion')}`,
]

function Reading({ label, value, unit, note, i }: { label: string; value: ReactNode; unit?: string; note: string; i: number }) {
  return (
    <div data-reveal style={stagger(i)} className="border-r border-b border-foreground/10 p-5 md:p-7">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-4xl leading-none font-semibold tracking-[-0.03em] tabular-nums md:text-6xl">
        {value}
        {unit ? <span className="ml-1.5 text-base font-medium tracking-normal text-muted-foreground md:text-lg">{unit}</span> : null}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{note}</p>
    </div>
  )
}

export function Colophon() {
  const ref = useRef<HTMLElement>(null)
  const fpsRef = useRef<HTMLSpanElement>(null)
  const [r, setR] = useState<PageReadings | null>(null)

  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  // Measure only while the panel is on screen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let stopFps: (() => void) | null = null
    let poll = 0

    const start = () => {
      setR(readPage())
      poll = window.setInterval(() => setR(readPage()), 2000)
      stopFps = startFpsMeter((fps) => {
        if (fpsRef.current) fpsRef.current.textContent = String(fps)
      })
    }
    const stop = () => {
      window.clearInterval(poll)
      stopFps?.()
      stopFps = null
    }

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    observer.observe(el)
    return () => {
      observer.disconnect()
      stop()
    }
  }, [])

  const downloaded = r ? formatBytes(r.transferredBytes) : null
  const javascript = r ? formatBytes(r.javascriptBytes) : null

  return (
    <section ref={ref} aria-labelledby="colophon-title" className="px-6 py-20 md:px-14 md:py-28">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p data-reveal className="mb-4 flex items-center gap-1.5 text-xs font-medium tracking-wide text-brand-text">
            <span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-brand" />
            Colophon
          </p>
          <h2
            id="colophon-title"
            data-reveal
            style={stagger(1)}
            className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-6xl"
          >
            This page, measured.
          </h2>
        </div>
        <p
          data-reveal
          style={stagger(2)}
          className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9"
        >
          Readings from your browser, right now. Nothing on this panel is a screenshot, and every number will be
          different on your screen.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 border-t border-l border-foreground/10 md:mt-16 md:grid-cols-3">
        <Reading
          i={0}
          label="Frame rate"
          value={<span ref={fpsRef}>–</span>}
          unit="fps"
          note="Live, as you read this. Your screen’s refresh rate is the ceiling."
        />
        <Reading
          i={1}
          label="First paint"
          value={r?.firstPaintMs ?? '–'}
          unit={r?.firstPaintMs != null ? 'ms' : undefined}
          note="From the first request to the first thing drawn on this visit."
        />
        <Reading
          i={2}
          label="Downloaded"
          value={downloaded?.value ?? '–'}
          unit={downloaded?.unit}
          note={r && r.transferredBytes === 0 ? 'Everything came from your cache.' : 'Everything fetched so far this visit, film included once it plays.'}
        />
        <Reading
          i={3}
          label="JavaScript"
          value={javascript?.value ?? '–'}
          unit={javascript?.unit}
          note="All the code that runs this page, compressed as sent."
        />
        <Reading
          i={4}
          label="Elements"
          value={r?.elements ?? '–'}
          note="Nodes in the document, the whole page included."
        />
        <Reading
          i={5}
          label="Your screen"
          value={r?.viewport ?? '–'}
          note={r ? `At ${r.pixelRatio}× pixel density, with ${r.reducedMotion ? 'reduced' : 'full'} motion.` : ' '}
        />
      </div>

      <p data-reveal className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Built with {stack.join(', ')}. Set in Inter Tight and Google Sans Flex. Every push to the main branch is
        built by GitHub Actions and published to GitHub Pages.
      </p>
    </section>
  )
}
