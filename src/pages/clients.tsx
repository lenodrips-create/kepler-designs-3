import { useEffect, useRef } from 'react'

import { ContactButton } from '@/components/contact-button'
import { SiteFooter } from '@/components/site-footer'
import { SiteNav } from '@/components/site-nav'
import { brands, type Brand } from '@/content/brands'
import { observeReveal } from '@/lib/reveal'
import { glideToHash, startSmoothScroll } from '@/lib/smooth-scroll'

function Mark({ b }: { b: Brand }) {
  if (b.photo)
    return <img src={b.photo} alt="" width={320} height={320} className="size-40 rounded-full object-cover md:size-56" />
  return (
    <span
      aria-hidden="true"
      className={
        b.logoOnly
          ? 'block w-full max-w-sm [&>svg]:h-auto [&>svg]:w-full'
          : 'block h-40 w-auto md:h-56 [&>svg]:h-full [&>svg]:w-auto'
      }
      dangerouslySetInnerHTML={{ __html: b.logo ?? '' }}
    />
  )
}

/* Clients: each brand's mark on the left, what we did for them on the right. */
export default function ClientsPage() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => startSmoothScroll(), [])
  useEffect(() => glideToHash(), [])
  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  return (
    <div ref={ref} className="min-h-svh bg-background">
      <SiteNav page="clients" />
      <ContactButton />
      <div id="top" className="h-20 md:h-24" aria-hidden="true" />

      <main className="px-6 pt-10 pb-20 md:px-14 md:pt-16 md:pb-28">
        <h1
          data-reveal
          className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl"
        >
          Clients
        </h1>
        <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The brands that trust us, and what we made for each of them.
        </p>

        <div className="mt-14 md:mt-20">
          {brands.map((b) => (
            <article
              key={b.name}
              data-reveal
              aria-labelledby={`client-${b.name}`}
              className="grid gap-10 border-t border-foreground/20 py-12 text-foreground md:grid-cols-12 md:gap-14 md:py-20"
            >
              <div className="flex items-start md:col-span-5">
                <Mark b={b} />
              </div>
              <div className="md:col-span-7">
                <h2
                  id={`client-${b.name}`}
                  className="font-display text-3xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl"
                >
                  {b.name}
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {b.services.map((s) => (
                    <li key={s} className="rounded-full border border-foreground/15 px-3 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 space-y-5">
                  {b.story.map((para) => (
                    <p key={para.slice(0, 24)} className="max-w-2xl text-base leading-relaxed text-foreground/80 md:text-lg">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter base="../" />
    </div>
  )
}
