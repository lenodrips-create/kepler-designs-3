import { useEffect } from 'react'

import { Practice } from '@/components/practice'
import { Services } from '@/components/services'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

export default function ServicesPage() {
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => glideToHash(), [])

  return (
    <div className="min-h-svh bg-background">
      <SiteNav page="services" />
      <div id="top" className="h-20 md:h-24" aria-hidden="true" />

      <main>
        {/* the same two sections that used to sit on the home page */}
        <Practice asPage />
        <Services />
      </main>

      <SiteFooter base="../" />
    </div>
  )
}
