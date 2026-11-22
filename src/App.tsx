import { useEffect } from 'react'

import { DirectionDrum } from '@/components/direction-drum'
import { Hero } from '@/components/hero'
import { startSmoothScroll } from '@/lib/smooth-scroll'

export default function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <Hero />
      {/* z-10 + solid background so the page slides over the sinking hero */}
      <main className="relative z-10 bg-background pt-6 md:pt-10">
        <DirectionDrum />
      </main>
    </>
  )
}
