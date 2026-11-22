import { useEffect, useRef, type CSSProperties } from 'react'

import { design, engineering, type Capability } from '@/content/practice'
import { observeReveal } from '@/lib/reveal'

const pad = (n: number) => String(n).padStart(2, '0')
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

function Column({ label, items, offset }: { label: string; items: Capability[]; offset: number }) {
  return (
    <div>
      <div
        data-reveal
        style={stagger(offset)}
        className="flex items-baseline justify-between border-b border-foreground/20 pb-3"
      >
        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{label}</h3>
        <span className="text-sm text-muted-foreground tabular-nums">{pad(items.length)}</span>
      </div>
      <ol>
        {items.map((c, i) => (
          <li
            key={c.title}
            data-reveal
            style={stagger(offset + i + 1)}
            className="group grid grid-cols-[2.5rem_1fr] border-b border-foreground/10 py-5 md:py-6"
          >
            <span className="pt-1.5 text-xs font-medium text-brand-text tabular-nums">{pad(i + 1)}</span>
            <div>
              <p className="font-display text-xl font-semibold tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1 md:text-2xl">
                {c.title}
              </p>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                {c.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Practice() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  return (
    <section id="practice" ref={ref} aria-labelledby="practice-title" className="px-6 pt-20 pb-20 md:px-14 md:pt-28 md:pb-28">
      <h2
        id="practice-title"
        data-reveal
        className="max-w-3xl font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-6xl"
      >
        Designed and engineered in the same room.
      </h2>

      <div className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2">
        <Column label="Design" items={design} offset={0} />
        <Column label="Engineering" items={engineering} offset={2} />
      </div>
    </section>
  )
}
