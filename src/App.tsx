import { useEffect } from 'react'

import { About } from '@/components/about'
import { Brands } from '@/components/brands'
import { CookieNotice } from '@/components/cookie-notice'
import { DirectionDrum } from '@/components/direction-drum'
import { Hero } from '@/components/hero'
import { Languages } from '@/components/languages'
import { LoadingScreen } from '@/components/loading-screen'
import { SiteFooter } from '@/components/site-footer'
import { ContactButton } from '@/components/contact-button'
import { SiteNav } from '@/components/site-nav'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

export default function App() {
  // One Lenis instance for the whole page.
  useEffect(() => startSmoothScroll(), [])

  useEffect(() => glideToHash(), [])

  return (
    <>
      <LoadingScreen />
      <CookieNotice />
      <SiteNav />
      <ContactButton />
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

      </main>
      <SiteFooter />
    </>
  )
}
