import { useEffect, useRef, type CSSProperties } from 'react'

import { CONTACT_EMAIL, CURRENCY, individual, packages, terms, type Service } from '@/content/services'
import { observeReveal } from '@/lib/reveal'

const stagger = (i: number) => ({ '--i': i }) as CSSProperties
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 })

function Price({ amount, from, per, large }: { amount: number; from?: boolean; per?: string; large?: boolean }) {
  return (
    <span className="whitespace-nowrap tabular-nums">
      {from ? <span className="mr-1.5 text-sm font-normal text-muted-foreground md:text-base">From</span> : null}
      <span className={large ? 'font-display text-5xl font-semibold tracking-[-0.03em] md:text-6xl' : 'font-display text-xl font-semibold md:text-2xl'}>
        {money.format(amount)}
      </span>
      {per ? <span className="ml-1 text-sm text-muted-foreground md:text-base">/ {per}</span> : null}
    </span>
  )
}

function PriceList({ title, items, offset }: { title: string; items: Service[]; offset: number }) {
  return (
    <section aria-labelledby={`${title}-title`} className="px-6 md:px-14">
      <h2
        id={`${title}-title`}
        data-reveal
        className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl"
      >
        {title}
      </h2>
      <ul className="mt-8 border-t border-foreground/20 md:mt-10">
        {items.map((s, i) => (
          <li
            key={s.name}
            data-reveal
            style={stagger(offset + i)}
            className="grid gap-x-8 gap-y-1 border-b border-foreground/10 py-5 md:grid-cols-[1fr_1.2fr_auto] md:items-baseline md:py-6"
          >
            <h3 className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{s.name}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{s.detail}</p>
            <p className="mt-2 md:mt-0 md:text-right">
              <Price amount={s.price} from={s.from} per={s.per} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Services and prices. Used on the home page (as a section) and on /services/ (as the page). */
export function Services({ asPage = false }: { asPage?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const Heading = asPage ? 'h1' : 'h2'

  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])

  return (
    <div ref={ref} id={asPage ? undefined : 'services'} role={asPage ? undefined : 'region'} aria-labelledby={asPage ? undefined : 'services-title'}>
        <section className="px-6 pt-10 md:px-14 md:pt-16">
          <Heading
            id="services-title"
            data-reveal
            className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl"
          >
            Services and prices
          </Heading>
          <p data-reveal style={stagger(1)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Fixed prices for defined work, so you know the number before we start. Every project is designed and built
            by the same people, from first sketch to launch.
          </p>
        </section>

        {/* packages */}
        <section aria-labelledby="packages-title" className="px-6 pt-20 md:px-14 md:pt-28">
          <h2 id="packages-title" data-reveal className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Packages
          </h2>
          <div className="mt-8 grid border-t border-foreground/20 md:mt-10 md:grid-cols-3">
            {packages.map((p, i) => (
              <article
                key={p.name}
                data-reveal
                style={stagger(i)}
                className="flex flex-col border-b border-foreground/10 py-8 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">{p.summary}</p>
                <p className="mt-8">
                  <Price amount={p.from} from large />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{p.timeline}</p>
                <ul className="mt-8 space-y-2.5 border-t border-foreground/10 pt-6 text-sm leading-relaxed md:text-[0.95rem]">
                  {p.includes.map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr]">
                      <span aria-hidden="true" className="text-brand-text">
                        –
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-20 md:mt-28">
          <PriceList title="Individual services" items={individual} offset={0} />
        </div>

        {/* how pricing works */}
        <section aria-labelledby="terms-title" className="px-6 pt-20 pb-20 md:px-14 md:pt-28 md:pb-28">
          <h2 id="terms-title" data-reveal className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            How it works
          </h2>
          <div className="mt-8 grid gap-10 border-t border-foreground/20 pt-8 md:mt-10 md:grid-cols-3 md:gap-14 md:pt-10">
            {terms.map((t, i) => (
              <div key={t.title} data-reveal style={stagger(i)}>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] md:text-2xl">{t.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">{t.detail}</p>
              </div>
            ))}
          </div>

          {CONTACT_EMAIL ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              data-reveal
              className="group mt-16 flex items-baseline justify-between border-y border-foreground/20 py-6 md:mt-24 md:py-8"
            >
              <span className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Start a project</span>
              <span
                aria-hidden="true"
                className="font-display text-3xl transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 md:text-5xl"
              >
                →
              </span>
            </a>
          ) : null}
        </section>
    </div>
  )
}
