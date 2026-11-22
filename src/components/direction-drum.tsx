import { useEffect, useRef, useState } from 'react'

import { Card } from '@/components/ui/card'
import { directions } from '@/content/directions'
import { cn } from '@/lib/utils'

/* Scroll budget, in viewport heights. */
const STEP_VH = 24 // scroll per entry
const DEAL_VH = 60 // extra scroll at the end for the dealt cards
const ANGLE = 15 // degrees between rows on the drum
const FADE_ANGLE = 75 // rows fade to nothing at this angle
const SMOOTHING = 11 // higher = drum follows scroll more tightly
const BASE_WIDTH = 1.12 // horizontal stretch of the centre row
const EXTRA_WIDTH = 0.3 // extra stretch for rows far from the centre
const DEALT = 3

const pad = (n: number) => String(n).padStart(2, '0')
const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

function dealThree(): number[] {
  const pool = directions.map((_, i) => i)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, DEALT).sort((a, b) => a - b)
}

export function DirectionDrum() {
  const count = directions.length
  const trackRef = useRef<HTMLDivElement>(null)
  const drumRef = useRef<HTMLOListElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLLIElement | null)[]>([])
  const activeRef = useRef(0)
  const dealtRef = useRef(false)

  const [active, setActive] = useState(0)
  const [dealt, setDealt] = useState(false)
  const [picks, setPicks] = useState(dealThree)

  useEffect(() => {
    const track = trackRef.current
    const drum = drumRef.current
    const header = headerRef.current
    if (!track || !drum || !header) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stepShare = ((count - 1) * STEP_VH) / ((count - 1) * STEP_VH + DEAL_VH)

    // Geometry, measured on resize only, so the per-frame work never forces layout.
    let radius = 0
    let trackTop = 0
    let dist = 1

    // Drum position in rows: `target` follows the scroll, `pos` eases toward it.
    let target = 0
    let pos = -1
    let frame = 0
    let last = 0

    const measure = () => {
      const first = rowRefs.current[0]
      const fontSize = first ? parseFloat(getComputedStyle(first).fontSize) : 80
      radius = (fontSize * 1.02) / Math.sin((ANGLE * Math.PI) / 180)
      drum.style.transform = `translateZ(${(-radius).toFixed(1)}px)`
      trackTop = track.getBoundingClientRect().top + window.scrollY
      dist = Math.max(1, track.offsetHeight - window.innerHeight)
    }

    const readScroll = () => {
      const s = Math.min(dist, Math.max(0, window.scrollY - trackTop))
      const drumDist = dist * stepShare
      target = Math.min(count - 1, (s / drumDist) * (count - 1))

      const nowDealt = s > drumDist + (dist - drumDist) * 0.2
      if (nowDealt !== dealtRef.current) {
        if (nowDealt) setPicks(dealThree())
        dealtRef.current = nowDealt
        setDealt(nowDealt)
      }
    }

    const render = () => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        const d = i - pos
        const ad = Math.abs(d)
        const a = d * ANGLE
        const opacity = Math.max(0, 1 - Math.abs(a) / FADE_ANGLE)
        // Off-centre rows stretch wider, lean into a slant and get heavier.
        const k = reduce ? 0 : Math.min(1, ad / 3)
        // The accent colour blends in as a row reaches the centre slot.
        const c = clamp01(1 - ad * 1.25)

        row.style.opacity = opacity.toFixed(3)
        row.style.visibility = opacity <= 0 ? 'hidden' : 'visible'
        row.style.transform =
          `translate3d(-50%, -50%, 0) rotateX(${(-a).toFixed(3)}deg) translateZ(${radius.toFixed(1)}px) ` +
          `scaleX(${(BASE_WIDTH + EXTRA_WIDTH * k).toFixed(4)}) skewX(${(-11 * k).toFixed(3)}deg)`
        row.style.fontVariationSettings = `"wght" ${(560 + 160 * k).toFixed(0)}`
        row.style.color = `color-mix(in oklch, var(--brand) ${(c * 100).toFixed(1)}%, var(--drum-idle))`
      })

      // The heading drifts up and away as the drum starts to turn.
      const h = clamp01(pos / 0.9)
      header.style.opacity = (1 - h).toFixed(3)
      header.style.transform = `translate3d(0, ${(-h * 48).toFixed(2)}px, 0)`
      header.style.visibility = h >= 1 ? 'hidden' : 'visible'

      const current = Math.round(pos)
      if (current !== activeRef.current) {
        activeRef.current = current
        setActive(current)
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.064, (now - last) / 1000)
      last = now
      pos += (target - pos) * (1 - Math.exp(-SMOOTHING * dt))
      if (Math.abs(target - pos) < 0.0004) pos = target
      render()
      frame = pos === target ? 0 : requestAnimationFrame(tick)
    }

    const kick = () => {
      if (frame) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      readScroll()
      kick()
    }

    const onResize = () => {
      measure()
      readScroll()
      render()
      kick()
    }

    measure()
    readScroll()
    pos = target
    render()

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    document.fonts.addEventListener('loadingdone', onResize)
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      document.fonts.removeEventListener('loadingdone', onResize)
      cancelAnimationFrame(frame)
    }
  }, [count])

  return (
    <section aria-labelledby="directions-title" className="relative">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${100 + (count - 1) * STEP_VH + DEAL_VH}vh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden [--row:clamp(2.5rem,8.6vw,7.5rem)]">
          {/* heading, sitting where the upper rows will later turn in */}
          <header
            ref={headerRef}
            className="absolute inset-x-0 top-[max(2.5rem,7vh)] z-10 mx-auto max-w-xl px-6 text-center will-change-[transform,opacity]"
          >
            <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide text-brand">
              <span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-brand" />
              The studio
            </p>
            <h2
              id="directions-title"
              className="text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-[2.75rem]"
            >
              <span className="block">Fifteen directions.</span>
              <span className="block">Three dealt per visit.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Everything we make sits somewhere on this wheel. Keep scrolling to spin it.
            </p>
          </header>

          {/* glow + rules frame the centre slot */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 h-[48%] w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--glow)_34%,transparent),color-mix(in_oklch,var(--glow)_14%,transparent)_50%,transparent)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-6 top-[calc(50%-var(--row)*0.68)] h-px bg-border md:inset-x-14"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-6 top-[calc(50%+var(--row)*0.68)] h-px bg-border md:inset-x-14"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-2 size-0 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-brand md:left-8"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-2 size-0 -translate-y-1/2 border-y-[6px] border-r-[8px] border-y-transparent border-r-brand md:right-8"
          />

          {/* the drum */}
          <div className="absolute inset-0 perspective-[1000px]">
            <ol ref={drumRef} className="absolute top-1/2 left-1/2 transform-3d">
              {directions.map((d, i) => (
                <li
                  key={d.title}
                  ref={(el) => {
                    rowRefs.current[i] = el
                  }}
                  className="absolute top-0 left-0 px-[0.15em] text-[length:var(--row)] leading-none font-semibold tracking-[-0.03em] whitespace-nowrap text-drum-idle backface-hidden will-change-[transform,opacity]"
                >
                  {d.title}
                </li>
              ))}
            </ol>
          </div>

          {/* the deal */}
          <div className="absolute inset-x-0 top-[calc(50%+var(--row)*0.68+1.5rem)] flex flex-col items-center px-4">
            <ul className="flex flex-wrap justify-center gap-2 md:gap-2.5">
              {picks.map((p, n) => (
                <li
                  key={`${p}-${n}`}
                  style={{ transitionDelay: dealt ? `${n * 90}ms` : '0ms' }}
                  className={cn(
                    'transition-[opacity,transform] duration-900 ease-[cubic-bezier(.16,1,.3,1)] motion-reduce:transition-none',
                    dealt
                      ? 'translate-y-0 rotate-0 opacity-100'
                      : cn(
                          'translate-y-6 opacity-0',
                          n === 0 && '-rotate-[5deg]',
                          n === 1 && 'rotate-2',
                          n === 2 && 'rotate-[6deg]',
                        ),
                  )}
                >
                  <Card className="flex-row items-baseline gap-2 rounded-xl px-3 py-2 shadow-[0_10px_30px_-12px_rgb(75_50_32/0.22)] md:gap-3 md:px-5 md:py-3">
                    <span className="text-xs font-semibold text-brand tabular-nums">{pad(p + 1)}</span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold tracking-[-0.01em] md:text-base">
                        {directions[p].title}
                      </span>
                      <span className="hidden text-sm text-muted-foreground md:block">
                        {directions[p].subtitle}
                      </span>
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
            <p
              className={cn(
                'mt-5 text-xl font-semibold tracking-[-0.03em] transition-[opacity,transform] delay-300 duration-900 ease-[cubic-bezier(.16,1,.3,1)] md:text-3xl',
                dealt ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              )}
            >
              Three, dealt at random.
            </p>
          </div>

          {/* counter + subtitle */}
          <div className="absolute inset-x-6 bottom-8 flex items-baseline justify-between gap-6 text-sm md:inset-x-14 md:bottom-12 md:text-base">
            <p className="shrink-0 tabular-nums text-muted-foreground">
              <span className="font-semibold text-brand">{pad(active + 1)}</span> of {pad(count)}
            </p>
            <p
              key={active}
              className="truncate animate-in fade-in slide-in-from-bottom-1 duration-500"
            >
              {directions[active].subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
