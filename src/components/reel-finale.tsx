import { cubicBezier, motion, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { fitWordmark } from '@/lib/hero-motion'
import { scrollToTop } from '@/lib/smooth-scroll'

const WORD = 'kepler designs'
const easeOut = cubicBezier(0.16, 1, 0.3, 1)

/* Closes the page over the full-screen film: the bottom darkens, the
   wordmark rises out of the bottom edge exactly as it sits in the hero, and
   a quiet row with the year and a way back up fades in above it. `progress`
   runs 0 to 1 while the film holds full-screen. */
export function ReelFinale({ progress }: { progress: MotionValue<number> }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  const shade = useTransform(progress, [0, 0.6], [0, 1])
  const rise = useTransform(progress, [0.08, 0.85], ['110%', '0%'], { ease: easeOut })
  const meta = useTransform(progress, [0.55, 0.95], [0, 1])
  const metaY = useTransform(progress, [0.55, 0.95], [12, 0], { ease: easeOut })
  const clickable = useTransform(progress, (v) => (v > 0.6 ? 'auto' : 'none'))

  useEffect(() => {
    const svg = svgRef.current
    const text = textRef.current
    if (!svg || !text) return
    return fitWordmark({ svg, text, word: WORD, tracking: -0.045 })
  }, [])

  return (
    <footer className="pointer-events-none absolute inset-0 z-10 text-white">
      <motion.div
        aria-hidden="true"
        style={{ opacity: shade }}
        className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(to_top,rgb(17_12_5/0.88),rgb(17_12_5/0.45)_45%,transparent)]"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col pb-3">
        <motion.div
          style={{ opacity: meta, y: metaY, pointerEvents: clickable }}
          className="flex items-baseline justify-between px-4 pb-3 text-sm text-white/70 md:px-6 md:pb-4 md:text-base"
        >
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="tabular-nums">© 2026</span>
            <a href="privacy/" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="terms/" className="transition-colors hover:text-white">
              Terms
            </a>
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-sm text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to top
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-0.5"
            >
              ↑
            </span>
          </button>
        </motion.div>

        {/* the wordmark rises out of the bottom edge */}
        <div className="mx-2.5 overflow-hidden">
          <motion.div style={{ y: rise }}>
            <svg
              ref={svgRef}
              role="img"
              aria-label={WORD}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMax meet"
              className="block h-auto w-full overflow-visible opacity-0 data-[ready=true]:opacity-100"
            >
              <text ref={textRef} className="fill-white font-sans font-normal">
                {WORD}
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
