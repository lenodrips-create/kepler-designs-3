import { useEffect } from 'react'

import { About } from '@/components/about'
import { Brands } from '@/components/brands'
import { CookieNotice } from '@/components/cookie-notice'
import { DirectionDrum } from '@/components/direction-drum'
import { Hero } from '@/components/hero'
import { Languages } from '@/components/languages'
import { LoadingScreen } from '@/components/loading-screen'
import { SiteNav } from '@/components/site-nav'
import { ReelFinale } from '@/components/reel-finale'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { parallaxImages } from '@/content/parallax-images'
import { startSmoothScroll } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'

export default function App() {
  // One Lenis instance for the whole page (the zoom parallax reads it too).
  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <LoadingScreen />
      <CookieNotice />
      <SiteNav />
      <Hero />
      {/* z-10 + solid background so the page slides over the sinking hero */}
      <main className="relative z-10 bg-background pt-6 md:pt-10">
        <About />
        <DirectionDrum />

        {/* slides up over the end of the drum, like the page over the hero */}
        <div className="relative z-10 -mt-[35vh] bg-background">
          <Languages />
          <Brands />
        </div>

        <section id="work" aria-label="Gallery" className="relative w-full overflow-x-clip">
          <div className="relative flex h-0 items-center justify-center">
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
          {/* zooms into the film, holds it full-screen, and closes the page on it */}
          <ZoomParallax
            images={parallaxImages}
            hold={90}
            finale={(progress) => <ReelFinale progress={progress} />}
          />
        </section>
      </main>
    </>
  )
}
