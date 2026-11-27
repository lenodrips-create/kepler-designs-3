import { useEffect, useRef } from 'react'

import { ContactButton } from '@/components/contact-button'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { faqs } from '@/content/faq'
import { observeReveal } from '@/lib/reveal'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

/* FAQ: one question per row; tap a question to open its answer. Uses the
   built-in details element, so it works with a keyboard and screen readers. */
export default function FaqPage() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => glideToHash(), [])
  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  return (
    <div ref={ref} className="min-h-svh bg-background">
      <SiteNav page="faq" />
      <ContactButton />
      <div id="top" className="h-20 md:h-24" aria-hidden="true" />

      <main className="px-6 pt-10 pb-20 md:px-14 md:pt-16 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-4">
            <h1
              data-reveal
              className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:sticky md:top-28 md:text-7xl"
            >
              Questions, answered
            </h1>
          </div>

          <div className="border-t border-foreground/20 md:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} data-reveal className="group border-b border-foreground/10">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 md:py-7 [&::-webkit-details-marker]:hidden">
                  <h2 className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{f.q}</h2>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-2xl leading-none text-brand-text transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-base leading-relaxed text-foreground/80 md:text-lg">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter base="../" />
    </div>
  )
}
