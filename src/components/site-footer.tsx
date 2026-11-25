import logo from '@/assets/logo.svg'
import { CONTACT_EMAIL } from '@/content/services'
import { cn } from '@/lib/utils'

/* Links written relative to the home page; `base` is '' on the home page and
   '../' on the other pages. Edit the columns freely. */
const columns = [
  {
    title: 'Services',
    links: [
      ['Landing pages', 'services/#packages-title'],
      ['Websites', 'services/#packages-title'],
      ['Web apps', 'services/#packages-title'],
      ['Tech support', 'work/'],
    ],
  },
  {
    title: 'Studio',
    links: [
      ['Recent work', 'work/'],
      ['Pricing', 'services/#packages-title'],
      ['How it works', 'services/#terms-title'],
      ['About', '#about'],
      ['Clients', '#clients'],
    ],
  },
  {
    title: 'Locations',
    links: [
      ['Greencastle, PA', null],
      ['Chambersburg, PA', null],
      ['Waynesboro, PA', null],
      ['Mercersburg, PA', null],
      ['Hagerstown, MD', null],
    ],
  },
] as const

export function SiteFooter({ base = '' }: { base?: string }) {
  const to = (href: string) => (href.startsWith('#') ? (base ? base + href : href) : base + href)
  const consult = CONTACT_EMAIL ? `mailto:${CONTACT_EMAIL}?subject=Free%20consult` : to('services/#terms-title')

  return (
    <footer className="relative z-10 bg-foreground px-6 pt-16 pb-8 text-background md:px-14 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 border-b border-background/15 pb-12 sm:flex-row sm:items-center sm:justify-between md:pb-16">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">Ready to get started?</h2>
          <a
            href={consult}
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background md:text-base"
          >
            Book a free consult
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-8 md:py-16">
          <a href={base || '#top'} aria-label="kepler designs, home" className="w-fit md:col-span-5">
            <img src={logo} alt="" width={1137} height={831} className="h-20 w-auto md:h-28" />
          </a>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-2 md:last:col-span-3">
              <h3 className="text-xs font-medium tracking-[0.2em] text-background/55 uppercase">{col.title}</h3>
              <ul className="mt-5 space-y-3 text-sm md:text-base">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    {href ? (
                      <a href={to(href)} className="text-background/85 transition-colors hover:text-background">
                        {label}
                      </a>
                    ) : (
                      <span className="text-background/85">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={cn('flex flex-col gap-3 border-t border-background/15 pt-6 text-sm text-background/60 sm:flex-row sm:items-baseline sm:justify-between')}>
          <p className="tabular-nums">© 2026 kepler designs. All rights reserved.</p>
          <p className="flex gap-5">
            <a href={to('privacy/')} className="transition-colors hover:text-background">
              Privacy
            </a>
            <a href={to('terms/')} className="transition-colors hover:text-background">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
