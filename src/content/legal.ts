/* Privacy policy and terms. Written to match what the site actually does
   (checked Nov 2026): no cookies, no analytics, no ads, no forms; one item
   in browser storage; hosted on GitHub Pages; four gallery photos load from
   cdn.21st.dev. If any of that changes, update these words too.
   This is a plain-language starting point, not legal advice. */

export const UPDATED = 'November 25, 2026'
export const BUSINESS = 'kepler designs'
export const LOCATION = 'Greencastle, Pennsylvania, USA'

export type LegalSection = { heading: string; body: string[] }

export const privacy: LegalSection[] = [
  {
    heading: 'The short version',
    body: [
      'This website does not use cookies, analytics, advertising or tracking of any kind, and it has no forms. We do not collect or sell personal information through it.',
    ],
  },
  {
    heading: 'Who we are',
    body: [`${BUSINESS} is a design and engineering studio based in ${LOCATION}. In this policy, “we” and “us” mean ${BUSINESS}.`],
  },
  {
    heading: 'Cookies',
    body: ['We do not set any cookies, first-party or third-party.'],
  },
  {
    heading: 'What your browser stores',
    body: [
      'We keep two small settings in your browser’s local storage. They never leave your device and we cannot see them:',
      '“kepler-visited” remembers that you have seen the loading screen, so it only plays on your first visit.',
      '“kepler-cookie-notice” remembers that you closed the cookie notice, so it does not keep coming back.',
      'You can clear them at any time by clearing your browser’s site data for this website.',
    ],
  },
  {
    heading: 'Hosting',
    body: [
      'The site is hosted on GitHub Pages. Like any web server, GitHub may record technical information when you visit, such as your IP address, browser type and the pages requested, for security and to keep the service running. GitHub handles that information under the GitHub Privacy Statement, not under our control.',
    ],
  },
  {
    heading: 'Content from other services',
    body: [
      'Some gallery images are loaded from cdn.21st.dev. When your browser requests them, that service receives your IP address and basic browser information, as any web server would. Everything else, including the fonts, 3D models and videos, is served from our own site.',
    ],
  },
  {
    heading: 'If you contact us',
    body: [
      'If you email us, we use your name, address and message only to reply and to work with you. We keep it only as long as needed for that, and for any records the law requires.',
    ],
  },
  {
    heading: 'Children',
    body: ['This site is not aimed at children under 13, and we do not knowingly collect information from them.'],
  },
  {
    heading: 'Your rights',
    body: [
      'Depending on where you live, you may have the right to ask what personal information we hold about you, to correct it, or to delete it. Because the site itself collects none, this mainly applies to emails you have sent us. Get in touch and we will help.',
    ],
  },
  {
    heading: 'Changes',
    body: ['If this policy changes, we will update it here and change the date at the top.'],
  },
]

export const terms: LegalSection[] = [
  {
    heading: 'Using this site',
    body: [
      `These terms cover your use of the ${BUSINESS} website. By using it, you agree to them. If you do not agree, please do not use the site.`,
    ],
  },
  {
    heading: 'Our work and content',
    body: [
      `The design, code, text, video and images on this site belong to ${BUSINESS} or are used with permission. You are welcome to view and share links to the site, but please do not copy, republish or sell its content without our written permission.`,
      'Client names and logos shown on this site belong to their owners and appear to show work we have done with them.',
    ],
  },
  {
    heading: 'Prices and services',
    body: [
      'Prices on this site are starting prices in US dollars, before tax. They are a guide, not an offer. Every project is confirmed with a written quote, and the work itself is governed by the agreement we sign with you, which takes priority over anything on this site.',
    ],
  },
  {
    heading: 'Links to other sites',
    body: ['Where we link to other websites, we are not responsible for their content or how they handle your information.'],
  },
  {
    heading: 'No guarantees',
    body: [
      'We work to keep this site accurate and available, but it is provided “as is”. We do not guarantee that it will always be available, error-free or up to date.',
    ],
  },
  {
    heading: 'Limiting our liability',
    body: [
      'To the extent the law allows, we are not liable for any loss or damage that comes from using this site or relying on its content. Nothing in these terms limits liability that cannot be limited by law.',
    ],
  },
  {
    heading: 'Governing law',
    body: ['These terms are governed by the laws of the Commonwealth of Pennsylvania, USA.'],
  },
  {
    heading: 'Changes',
    body: ['We may update these terms from time to time. The date at the top shows when they last changed.'],
  },
]
