import { useEffect, useRef } from 'react'

import heroImage from '@/assets/hero.jpg'
import { createHeroMotion, fitWordmark } from '@/lib/hero-motion'

const WORD = 'kepler designs'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const image = imgRef.current
    const shade = shadeRef.current
    const svg = svgRef.current
    const text = textRef.current
    if (!hero || !image || !shade || !svg || !text) return

    const stopMotion = createHeroMotion({ hero, image, shade })
    const stopFit = fitWordmark({ svg, text, word: WORD, tracking: -0.045 })
    return () => {
      stopMotion()
      stopFit()
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

      {/* location, then the wordmark, sitting on the bottom edge */}
      <div className="pointer-events-none absolute right-[0.5625rem] bottom-3 left-2.5 flex flex-col">
        <p className="mb-1 pl-[0.2em] font-display text-xl font-medium tracking-[-0.01em] text-white [text-shadow:0_1px_16px_rgb(0_0_0/0.4)] md:mb-2 md:text-3xl">
          Greencastle, PA
        </p>
        <svg
          ref={svgRef}
          role="img"
          aria-label={WORD}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
          className="block h-auto w-full overflow-visible opacity-0 transition-opacity duration-900 ease-[cubic-bezier(.45,0,.55,1)] data-[ready=true]:opacity-100"
        >
          <text ref={textRef} className="fill-white font-sans font-normal">
            {WORD}
          </text>
        </svg>
      </div>

      <div
        ref={shadeRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black opacity-0 will-change-[opacity]"
      />
    </section>
  )
}
