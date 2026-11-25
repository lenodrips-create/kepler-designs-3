import { useEffect } from 'react'

import { Practice } from '@/components/practice'
import { ContactButton } from '@/components/contact-button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

export default function PracticePage() {
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => glideToHash(), [])

  return (
    <div className="min-h-svh bg-background">
      <SiteNav page="practice" />
      <ContactButton />
      <div id="top" className="h-20 md:h-24" aria-hidden="true" />

      <main>
        <Practice asPage />
      </main>

      <SiteFooter base="../" />
    </div>
  )
}
