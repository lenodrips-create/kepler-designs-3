/* Services and prices. Every number on the services page comes from here.
   Amounts are whole US dollars; change CURRENCY to switch the formatting. */

export const CURRENCY = 'USD'

/** Leave empty to hide the "Start a project" link until you add an address. */
export const CONTACT_EMAIL = ''

export type Package = {
  name: string
  from: number
  timeline: string
  summary: string
  includes: string[]
}

export const packages: Package[] = [
  {
    name: 'Landing page',
    from: 900,
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
    from: 2500,
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
    from: 6000,
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
]

export type Service = { name: string; detail: string; price: number; from?: boolean; per?: string }

export const individual: Service[] = [
  { name: 'Brand identity', detail: 'Logo, type, colour and a usage guide', price: 1200, from: true },
  { name: 'Design system', detail: 'Tokens and components, in Figma and in code', price: 1800, from: true },
  { name: 'Prototype', detail: 'A working prototype in code to test an idea with real users', price: 1000, from: true },
  { name: 'Motion design', detail: 'Interaction and scroll motion for an existing site', price: 600, from: true },
  { name: 'Performance and accessibility audit', detail: 'A written report with fixes, ranked by impact', price: 450 },
]

export const terms: { title: string; detail: string }[] = [
  { title: 'Fixed quotes', detail: 'You get a fixed price after a free 30-minute call. It only changes if the scope does.' },
  { title: 'Simple payment', detail: 'Half to start, half at launch. Larger projects are split into milestones.' },
  { title: 'Yours to keep', detail: 'Prices are in US dollars, before tax. You own everything we make for you.' },
]
