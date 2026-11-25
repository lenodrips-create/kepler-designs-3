import { useEffect } from 'react'

import { CONTACT_EMAIL } from '@/content/services'
import { BUSINESS, LOCATION, UPDATED, privacy, terms, type LegalSection } from '@/content/legal'
import { SiteFooter } from '@/components/site-footer'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

const pages = {
  privacy: { title: 'Privacy policy', sections: privacy, other: { href: '../terms/', label: 'Terms and conditions' } },
  terms: { title: 'Terms and conditions', sections: terms, other: { href: '../privacy/', label: 'Privacy policy' } },
} as const

export type LegalPageKey = keyof typeof pages

function Section({ s }: { s: LegalSection }) {
  return (
    <section className="grid gap-3 border-t border-foreground/10 py-8 md:grid-cols-12 md:gap-8 md:py-10">
      <h2 className="font-display text-xl font-semibold tracking-[-0.02em] md:col-span-4 md:text-2xl">{s.heading}</h2>
      <div className="space-y-3 md:col-span-8">
        {s.body.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-2xl text-base leading-relaxed text-foreground/80">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

/* Privacy policy and terms, one layout. The words live in src/content/legal.ts. */
export default function LegalPage({ page }: { page: LegalPageKey }) {
  const { title, sections, other } = pages[page]
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => glideToHash(), [])
  useEffect(() => {
    document.title = `${title} · ${BUSINESS}`
  }, [title])

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

      <main className="px-6 pt-10 pb-20 md:px-14 md:pt-16 md:pb-28">
        <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl">
          {title}
        </h1>
        <p className="mt-5 text-sm text-muted-foreground md:text-base">Last updated {UPDATED}</p>

        <div className="mt-12 md:mt-16">
          {sections.map((s) => (
            <Section key={s.heading} s={s} />
          ))}
          <Section
            s={{
              heading: 'Contact',
              body: [
                CONTACT_EMAIL
                  ? `Questions? Email ${CONTACT_EMAIL} and we’ll get back to you.`
                  : `Questions? Get in touch with ${BUSINESS} in ${LOCATION}.`,
              ],
            }}
          />
        </div>

        <a href={other.href} className="group mt-6 inline-flex items-baseline gap-2 text-base font-medium underline-offset-4 hover:underline">
          {other.label}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </main>

      <SiteFooter base="../" />
    </div>
  )
}
