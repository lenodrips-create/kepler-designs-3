import { useEffect } from 'react'

import { Practice } from '@/components/practice'
import { Services } from '@/components/services'
import { startSmoothScroll } from '@/lib/smooth-scroll'

export default function ServicesPage() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <div className="min-h-svh bg-background">
      <header className="flex items-baseline justify-between px-6 py-5 md:px-14 md:py-7">
        <a href="../" className="font-display text-xl font-semibold tracking-[-0.03em] md:text-2xl">
          kepler designs
        </a>
        <a href="../" className="group text-sm text-muted-foreground transition-colors hover:text-foreground md:text-base">
          <span aria-hidden="true" className="mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
          Home
        </a>
      </header>

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
