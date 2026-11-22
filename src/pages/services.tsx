import { useEffect, useRef, type CSSProperties } from 'react'

import servicesImage from '@/assets/services.jpg'
import { CONTACT_EMAIL, CURRENCY, individual, ongoing, packages, terms, type Service } from '@/content/services'
import { createImageDrift } from '@/lib/image-drift'
import { observeReveal } from '@/lib/reveal'
import { startSmoothScroll } from '@/lib/smooth-scroll'

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

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => startSmoothScroll(), [])
  useEffect(() => (ref.current ? observeReveal(ref.current) : undefined), [])
  useEffect(() => {
    if (!frameRef.current || !imgRef.current) return
    return createImageDrift(frameRef.current, imgRef.current)
  }, [])

  return (
    <div ref={ref} className="min-h-svh bg-background">
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
        <section className="px-6 pt-10 md:px-14 md:pt-16">
          <h1
            data-reveal
            className="font-display text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-balance md:text-8xl"
          >
            Services and prices
          </h1>
          <p data-reveal style={stagger(1)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Fixed prices for defined work, so you know the number before we start. Every project is designed and built
            by the same people, from first sketch to launch.
          </p>
        </section>

        <div
          ref={frameRef}
          data-reveal
          style={stagger(2)}
          className="relative mt-12 aspect-[4/3] overflow-hidden md:mt-16 md:aspect-[21/9]"
        >
          <img
            ref={imgRef}
            src={servicesImage}
            alt="Two people sketching a page layout on paper between laptops"
            width={2000}
            height={1335}
            className="absolute inset-x-0 top-0 h-[120%] w-full object-cover will-change-transform"
            style={{ transform: 'translate3d(0, -10%, 0)' }}
          />
        </div>

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
        <div className="mt-20 md:mt-28">
          <PriceList title="Ongoing" items={ongoing} offset={0} />
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
      </main>

      <footer className="flex items-baseline justify-between border-t border-foreground/10 px-6 py-6 text-sm text-muted-foreground md:px-14">
        <p className="tabular-nums">© 2026 kepler designs</p>
        <a href="../" className="transition-colors hover:text-foreground">
          Home
        </a>
      </footer>
    </div>
  )
}
