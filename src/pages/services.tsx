import { useEffect } from 'react'

import { Practice } from '@/components/practice'
import { Services } from '@/components/services'
import { SiteNav } from '@/components/site-nav'
import { startSmoothScroll } from '@/lib/smooth-scroll'

export default function ServicesPage() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <div className="min-h-svh bg-background">
      <SiteNav page="services" />
      <div id="top" className="h-20 md:h-24" aria-hidden="true" />

      <main>
        {/* the same two sections that used to sit on the home page */}
        <Practice asPage />
        <Services />
      </main>

      <footer className="flex items-baseline justify-between border-t border-foreground/10 px-6 py-6 text-sm text-muted-foreground md:px-14">
        <p className="tabular-nums">© 2026 kepler designs</p>
        <span className="flex gap-4">
          <a href="../privacy/" className="transition-colors hover:text-foreground">
            Privacy
          </a>
          <a href="../terms/" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="../" className="transition-colors hover:text-foreground">
            Home
          </a>
        </span>
      </footer>
    </div>
  )
}
