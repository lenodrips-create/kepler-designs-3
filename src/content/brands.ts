import breckeStricker from '@/assets/brecke-stricker.jpg'
import forgivenLogo from '@/assets/forgiven-logo.svg?raw'
import seraphLogo from '@/assets/seraph-logo.svg?raw'

/* "Brands that trust us". Each brand shows a mark (an SVG logo drawn in the
   page's ink, or a photo shown in a circle) and its name. The strip repeats
   them across the whole screen and loops forever. */
export type Brand = {
  name: string
  logo?: string
  photo?: string
  /** The logo already spells the name: show it alone, without the text beside it. */
  logoOnly?: boolean
  /** For the clients page: what we did, as short tags and a longer write-up. */
  services: string[]
  story: string[]
}

/* The write-ups below are a starting point: replace them with what was
   actually done for each client. */
export const brands: Brand[] = [
  {
    name: 'Forgiven',
    logo: forgivenLogo,
    services: ['Brand identity', 'Website design', 'Web development'],
    story: [
      'Forgiven came to us with a name and a message, but no real home online. People were finding them through word of mouth and social posts, then landing on pages that didn’t say clearly who they were or what they stood for. The goal was a presence that felt as considered as the message itself.',
      'We started with the mark. The cross is built from clean, angled strokes with a deliberate break through the middle, simple enough to read at the size of a phone icon and strong enough to hold a whole page. From there we chose a type and colour system that stays quiet, so the words do the work.',
      'Then we designed and built the website around it: a clear story up front, simple paths to learn more or get in touch, and pages that load quickly on any phone. Whenever the Forgiven team needs something changed, they call and we update it, so the site is ready to grow as they do.',
    ],
  },
  {
    name: 'Brecke Stricker Portfolio',
    photo: breckeStricker,
    services: ['Portfolio website', 'Photo layout', 'Hosting and launch'],
    story: [
      'Brecke Stricker needed a portfolio that put the work first. The old setup buried photographs inside a cluttered template, cropped them awkwardly and took too long to load, which is the last thing you want when the photos are the whole point.',
      'We designed a portfolio around the images: generous space, layouts that respect each photo’s shape instead of forcing everything into squares, and a calm, neutral frame that lets black-and-white and colour work sit side by side. Every image is sized and compressed for the screen it’s viewed on, so galleries open quickly even on mobile data.',
      'Adding new work is simple: drop in the photos, add a title, and the site lays them out. We handled the domain, hosting and launch, and made sure the portfolio reads well with a keyboard and a screen reader, so anyone can browse it.',
    ],
  },
  {
    name: 'Seraph',
    logo: seraphLogo,
    logoOnly: true,
    services: ['Wordmark', 'Website design', 'Front-end development'],
    story: [
      'Seraph wanted a look that felt bright and confident without shouting. We drew the wordmark with wide, evenly spaced capitals and paired it with a small radiating X, a mark that hints at light and works just as well alone as an app icon or favicon.',
      'The website follows the same idea: lots of space, a few strong headlines, and motion used only where it explains something. We built it in React and TypeScript so it stays fast and dependable as new pages are added, and tuned it to hold a smooth frame rate on everyday laptops and phones.',
      'Before launch we tested it across browsers and screen sizes, checked it against accessibility guidelines, and set up search basics so people looking for Seraph actually find it. The result is a site that matches the brand: clean, clear and quietly memorable.',
    ],
  },
]
