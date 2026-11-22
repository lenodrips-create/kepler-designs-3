import { useEffect } from 'react'

import { DirectionDrum } from '@/components/direction-drum'
import { Hero } from '@/components/hero'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { parallaxImages } from '@/content/parallax-images'
import { startSmoothScroll } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'

export default function App() {
  // One Lenis instance for the whole page (the zoom parallax reads it too).
  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <Hero />
      {/* z-10 + solid background so the page slides over the sinking hero */}
      <main className="relative z-10 bg-background pt-6 md:pt-10">
        <DirectionDrum />

        <section aria-label="Gallery" className="w-full">
          <div className="relative flex h-[50vh] items-center justify-center">
            {/* Radial spotlight */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
                'blur-[30px]',
              )}
            />
          </div>
          <ZoomParallax images={parallaxImages} />
          <div className="h-[50vh]" />
        </section>
      </main>
    </>
  )
}
