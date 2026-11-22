import { useEffect, useRef, useState } from 'react'

import { Card } from '@/components/ui/card'
import { directions } from '@/content/directions'
import { createDrum, dealRandom } from '@/lib/drum'
import { cn } from '@/lib/utils'

const STEP_VH = 24 // scroll per entry, in viewport heights
const DEAL_VH = 60 // extra scroll at the end for the dealt cards
const ANGLE = 18 // degrees between rows on the drum
const DEALT = 3

const pad = (n: number) => String(n).padStart(2, '0')

export function DirectionDrum() {
  const count = directions.length
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const drumRef = useRef<HTMLOListElement>(null)

  const [active, setActive] = useState(0)
  const [dealt, setDealt] = useState(false)
  const [picks, setPicks] = useState(() => dealRandom(count, DEALT))

  useEffect(() => {
    const track = trackRef.current
    const drum = drumRef.current
    if (!track || !drum) return

    return createDrum({
      track,
      drum,
      rows: [...drum.children] as HTMLElement[],
      header: headerRef.current,
      count,
      stepVh: STEP_VH,
      dealVh: DEAL_VH,
      angle: ANGLE,
      onActive: setActive,
      onDealt: (d) => {
        if (d) setPicks(dealRandom(count, DEALT))
        setDealt(d)
      },
    })
  }, [count])

  return (
    <section aria-labelledby="directions-title" className="relative">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${100 + (count - 1) * STEP_VH + DEAL_VH}vh` }}
      >
        <div className="drum-stage sticky top-0 h-svh overflow-hidden">
          {/* heading, sitting where the upper rows will later turn in */}
          <header
            ref={headerRef}
            className="absolute inset-x-0 top-[max(2.5rem,8vh)] z-10 mx-auto max-w-xl px-6 text-center will-change-[transform,opacity]"
          >
            <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-medium tracking-wide text-brand">
              <span aria-hidden="true" className="inline-block size-1.5 rotate-45 bg-brand" />
              The studio
            </p>
            <h2
              id="directions-title"
              className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance md:text-[2.75rem]"
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
            className="pointer-events-none absolute top-1/2 left-1/2 h-[50%] w-[92%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--glow)_40%,transparent),color-mix(in_srgb,var(--glow)_16%,transparent)_50%,transparent)]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(50%-var(--band))] h-px bg-foreground/10"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(50%+var(--band))] h-px bg-foreground/10"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-2 z-10 size-0 -translate-y-1/2 border-y-[6px] border-l-[8px] border-y-transparent border-l-brand md:left-8"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 right-2 z-10 size-0 -translate-y-1/2 border-y-[6px] border-r-[8px] border-y-transparent border-r-brand md:right-8"
          />

          {/* the drum */}
          <div className="drum-persp pointer-events-none">
            <ol ref={drumRef} className="drum">
              {directions.map((d) => (
                <li key={d.title} className="drum-row">
                  <span className="drum-ink">{d.title}</span>
                  <span aria-hidden="true" className="drum-lit">
                    {d.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* the deal */}
          <div className="absolute inset-x-0 top-[calc(50%+var(--band)+1.5rem)] flex flex-col items-center px-4">
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
                'font-display mt-5 text-xl font-semibold tracking-[-0.03em] transition-[opacity,transform] delay-300 duration-900 ease-[cubic-bezier(.16,1,.3,1)] md:text-3xl',
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
            <p key={active} className="truncate animate-in fade-in slide-in-from-bottom-1 duration-500">
              {directions[active].subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
