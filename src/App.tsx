import Lenis from 'lenis'
import { useEffect } from 'react'

import { DirectionDrum } from '@/components/direction-drum'
import { Hero } from '@/components/hero'

export default function App() {
  /* Smooth, inertial scrolling for wheel and trackpad. Lenis moves the real
     window scroll, so the hero and drum keep reading window.scrollY. Touch
     keeps native scrolling, and reduced-motion users get plain scrolling. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.9 })
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Hero />
      {/* z-10 + white so the page slides over the sinking hero */}
      <main className="relative z-10 bg-background pt-6 md:pt-10">
        <DirectionDrum />
      </main>
    </>
  )
}
