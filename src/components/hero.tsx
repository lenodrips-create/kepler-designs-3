import { useEffect, useRef } from 'react'

import heroImage from '@/assets/hero.jpg'

const WORD = 'kepler designs'
const SIZE = 1000 // measuring font size (px)
const TRACKING = -0.045 // letter-spacing in em, tight like the reference wordmark

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  /* Scroll: the hero sinks at 15% of scroll speed while the photo drifts and
     a black shade fades in, so the letters recede as the page slides over. */
  useEffect(() => {
    const hero = heroRef.current
    const img = imgRef.current
    const shade = shadeRef.current
    if (!hero || !img || !shade) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    const update = () => {
      frame = 0
      const h = hero.offsetHeight
      const p = Math.min(1, Math.max(0, window.scrollY / h))
      shade.style.opacity = (p * 0.8).toFixed(4)
      if (reduce) return
      hero.style.transform = `translate3d(0, ${(p * h * 0.15).toFixed(2)}px, 0)`
      img.style.transform = `translate3d(0, ${(-7 + p * 8).toFixed(3)}%, 0)`
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    update()
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      cancelAnimationFrame(frame)
    }
  }, [])

  /* Fit the wordmark edge to edge using the glyphs' real ink bounds, so the
     descenders of "p" and "g" sit right on the bottom margin. */
  useEffect(() => {
    const svg = svgRef.current
    const text = textRef.current
    if (!svg || !text) return
    let cancelled = false

    const fit = () => {
      if (cancelled) return
      const family = getComputedStyle(text).fontFamily
      const ctx = document.createElement('canvas').getContext('2d')
      if (!ctx) return
      ctx.font = `400 ${SIZE}px ${family}`
      const m = ctx.measureText(WORD)
      const ls = TRACKING * SIZE
      const left = m.actualBoundingBoxLeft
      const width = left + m.actualBoundingBoxRight + ls * (WORD.length - 1)
      const asc = m.actualBoundingBoxAscent
      const desc = m.actualBoundingBoxDescent

      text.setAttribute('x', left.toFixed(2))
      text.setAttribute('y', asc.toFixed(2))
      text.setAttribute('letter-spacing', ls.toFixed(2))
      svg.setAttribute('viewBox', `0 0 ${width.toFixed(2)} ${(asc + desc).toFixed(2)}`)
      svg.dataset.ready = 'true'
    }

    const family = getComputedStyle(text).fontFamily
    Promise.race([
      document.fonts.load(`400 ${SIZE}px ${family}`).then(() => document.fonts.ready),
      new Promise((r) => setTimeout(r, 2500)),
    ])
      .catch(() => {})
      .then(fit)
    document.fonts.addEventListener('loadingdone', fit)
    return () => {
      cancelled = true
      document.fonts.removeEventListener('loadingdone', fit)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative z-0 h-svh min-h-[36rem] overflow-hidden bg-black text-white will-change-transform"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={heroImage}
          alt=""
          width={2000}
          height={1333}
          fetchPriority="high"
          style={{ transform: 'translate3d(0, -7%, 0)' }}
          className="block h-[114%] w-full object-cover object-[60%_50%] will-change-transform"
        />
      </div>

      <svg
        ref={svgRef}
        role="img"
        aria-label={WORD}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        className="pointer-events-none absolute bottom-3 left-2.5 block h-auto w-[calc(100%-1.1875rem)] overflow-visible opacity-0 transition-opacity duration-900 ease-[cubic-bezier(.45,0,.55,1)] data-[ready=true]:opacity-100"
      >
        <text ref={textRef} fontSize={SIZE} className="fill-white font-sans font-normal">
          {WORD}
        </text>
      </svg>

      <div
        ref={shadeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black opacity-0"
      />
    </section>
  )
}
