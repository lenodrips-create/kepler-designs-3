import logo from '@/assets/logo.svg'
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/content/services'
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
      ['Practice', 'practice/'],
      ['Pricing', 'services/#packages-title'],
      ['How it works', 'services/#terms-title'],
      ['About', '#about'],
      ['Clients', 'clients/'],
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

  return (
    <footer className="relative z-10 bg-foreground px-6 pt-6 pb-8 text-background md:px-14 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 py-12 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-5">
            <a href={base || '#top'} aria-label="kepler designs, home" className="block w-fit">
              <img src={logo} alt="" width={1137} height={831} className="h-20 w-auto md:h-28" />
            </a>
            <a href={CONTACT_PHONE_HREF} className="mt-8 inline-block font-display text-2xl font-semibold tracking-[-0.02em] tabular-nums hover:underline md:text-3xl">
              {CONTACT_PHONE}
            </a>
          </div>
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
