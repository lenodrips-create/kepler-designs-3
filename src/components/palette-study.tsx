import { useEffect, useRef, useState, type CSSProperties } from 'react'

import heroImage from '@/assets/hero.jpg'
import { BACKGROUND, tones } from '@/content/palette'
import { contrastLevel, contrastRatio } from '@/lib/contrast'
import { observeReveal } from '@/lib/reveal'
import { DEFAULT_ACCENT, setAccent } from '@/lib/theme'
import { cn } from '@/lib/utils'

const stagger = (i: number) => ({ '--i': i }) as CSSProperties

/** Mix two hex colours in sRGB, `p` of the first. Matches CSS color-mix(in srgb). */
function mixHex(a: string, b: string, p: number): string {
  const A = parseInt(a.slice(1), 16)
  const B = parseInt(b.slice(1), 16)
  const c = (shift: number) => Math.round(p * ((A >> shift) & 255) + (1 - p) * ((B >> shift) & 255))
  return '#' + [16, 8, 0].map((s) => c(s).toString(16).padStart(2, '0')).join('')
}

export function PaletteStudy() {
  const ref = useRef<HTMLElement>(null)
  const [accent, setAccentState] = useState(DEFAULT_ACCENT)

  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])
  // Leave the page as we found it.
  useEffect(() => () => setAccent(DEFAULT_ACCENT), [])

  const choose = (hex: string) => {
    setAccent(hex)
    setAccentState(hex)
  }

  const current = tones.find((t) => t.hex === accent) ?? tones[1]
  const accentRatio = contrastRatio(accent, BACKGROUND)
  const smallText = mixHex(accent, '#4b3220', 0.85)
  const smallRatio = contrastRatio(smallText, BACKGROUND)

  return (
    <section ref={ref} aria-labelledby="palette-title" className="px-6 py-20 md:px-14 md:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-14">
        {/* the photograph, with where each tone was taken from */}
        <figure data-reveal className="md:col-span-6">
          <div className="relative">
            <img src={heroImage} alt="" loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
            {tones.map((t, i) => (
              <span
                key={t.name}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5"
                style={{ left: `${t.at[0]}%`, top: `${t.at[1]}%` }}
              >
                <span
                  aria-hidden="true"
                  className="block size-5 rounded-full shadow-[0_1px_6px_rgb(0_0_0/0.35)] ring-2 ring-white md:size-6"
                  style={{ background: t.hex }}
                />
                <span className="rounded-sm bg-black/55 px-1 text-[0.65rem] font-medium text-white tabular-nums">
                  {i + 1}
                </span>
              </span>
            ))}
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">
            The hero photograph. Each marker sits where its tone was sampled.
          </figcaption>
        </figure>

        <div className="md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
          <p data-reveal className="mb-4 flex items-center gap-1.5 text-xs font-medium tracking-wide text-brand-text">
            <span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-brand" />
            Colour
          </p>
          <h2
            id="palette-title"
            data-reveal
            style={stagger(1)}
            className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance md:text-5xl"
          >
            Every tone here came from one photograph.
          </h2>
          <p data-reveal style={stagger(2)} className="mt-5 text-base leading-relaxed text-muted-foreground">
            We sampled the hero image and kept four tones: the lit wall, its cast shadow, the deeper shadow and the
            figures themselves. Each one became a design token. Try another accent: the whole page re-themes from a
            single line of CSS.
          </p>

          <ul className="mt-8 border-t border-foreground/15">
            {tones.map((t, i) => {
              const ratio = contrastRatio(t.hex, BACKGROUND)
              const selected = t.hex === accent
              return (
                <li
                  key={t.name}
                  data-reveal
                  style={stagger(3 + i)}
                  className="grid grid-cols-[2.75rem_1fr_auto] items-center gap-x-4 border-b border-foreground/10 py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="size-11 rounded-md border border-foreground/10"
                    style={{ background: t.hex }}
                  />
                  <div className="min-w-0">
                    <p className="flex items-baseline gap-2 text-sm">
                      <span className="text-xs text-muted-foreground tabular-nums">{i + 1}</span>
                      <span className="font-medium">{t.name}</span>
                      <code className="font-mono text-xs text-muted-foreground">{t.hex}</code>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t.role} · <code className="font-mono whitespace-nowrap">{t.token}</code>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      <span className="tabular-nums">{ratio.toFixed(2)}:1</span> on cream ·{' '}
                      <span className="font-medium text-foreground">{contrastLevel(ratio)}</span>
                    </p>
                  </div>
                  {t.accent ? (
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => choose(t.hex)}
                      className={cn(
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200',
                        selected
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-foreground/20 hover:border-foreground/50',
                      )}
                    >
                      {selected ? 'Accent' : 'Use'}
                    </button>
                  ) : (
                    <span className="px-1 text-xs text-muted-foreground" title="Too light to read as text on cream">
                      Glow only
                    </span>
                  )}
                </li>
              )
            })}
          </ul>

          <pre
            data-reveal
            style={stagger(8)}
            className="mt-8 overflow-x-auto rounded-lg border border-foreground/10 bg-foreground/[0.035] p-4 font-mono text-[0.8rem] leading-relaxed"
          >
            <code>
              <span className="text-muted-foreground">:root</span> {'{'}
              {'\n'}
              {'  '}--brand: <span className="font-semibold text-brand-text">{accent}</span>;{'\n'}
              {'}'}
            </code>
          </pre>
          <p data-reveal style={stagger(9)} className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {current.name} scores <span className="tabular-nums">{accentRatio.toFixed(2)}:1</span> on this cream
            {accentRatio >= 4.5
              ? ', so it is safe at any size. '
              : ', fine for large type like the drum but under the 4.5:1 that small text needs. '}
            Small accent text always mixes in 15% bronze, which brings it to{' '}
            <span className="tabular-nums">{smallRatio.toFixed(2)}:1</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
