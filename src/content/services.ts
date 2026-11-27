/* Services and prices. Every number on the services page comes from here.
   Amounts are whole US dollars; change CURRENCY to switch the formatting. */

export const CURRENCY = 'USD'

/** Leave empty to hide the "Start a project" link until you add an address. */
export const CONTACT_EMAIL = ''

/** Shown on the Contact button and in the footer. */
export const CONTACT_PHONE = '717 494 3284'
export const CONTACT_PHONE_HREF = 'tel:+17174943284'

export type Package = {
  name: string
  from: number
  /** Set for a recurring price, e.g. 'month'. Shown as "$100 / month". */
  per?: string
  timeline: string
  summary: string
  includes: string[]
}

export const packages: Package[] = [
  {
    name: 'Landing page',
    from: 250,
    timeline: '2–3 weeks',
    summary: 'One focused page that explains what you do and gets people to act.',
    includes: [
      'Design and build of a single responsive page',
      'Copy structure and visual direction',
      'Content you can edit without code',
      'Performance and accessibility pass',
      'Analytics, domain and launch',
    ],
  },
  {
    name: 'Website',
    from: 500,
    timeline: '5–8 weeks',
    summary: 'A multi-page site for a company that has outgrown its template.',
    includes: [
      'Up to 8 page templates',
      'A small design system: type, colour, components',
      'Headless CMS your team can edit',
      'Motion and interaction design',
      'SEO foundations and redirects',
      '30 days of fixes after launch',
    ],
  },
  {
    name: 'Web app',
    from: 1000,
    timeline: '8–14 weeks',
    summary: 'Product design and front-end engineering for a working application.',
    includes: [
      'User flows and a clickable prototype',
      'Interface design for every state',
      'React and TypeScript front-end',
      'Component library with documentation',
      'API integration, tests and CI',
      'Handover to your engineers',
    ],
  },
  {
    name: 'Domain and hosting',
    from: 100,
    per: 'month',
    timeline: 'Monthly, cancel anytime',
    summary: 'Your web address and a fast, secure home for your site, looked after for you.',
    includes: [
      'Domain name registration and renewal',
      'Fast, reliable hosting',
      'HTTPS security certificate',
      'DNS and email forwarding setup',
      'Uptime monitoring and backups',
      'Small updates and fixes each month',
    ],
  },
]

export const terms: { title: string; detail: string }[] = [
  { title: 'Fixed quotes', detail: 'You get a fixed price after a free 30-minute call. It only changes if the scope does.' },
  { title: 'Simple payment', detail: 'Half to start, half at launch. Larger projects are split into milestones.' },
  { title: 'Yours to keep', detail: 'Prices are in US dollars, before tax. You own everything we make for you.' },
]
