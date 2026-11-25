import { Briefcase, Clapperboard, Home, Layers, Tag } from 'lucide-react'

import logo from '@/assets/logo.svg'
import { MenuBar, type MenuItem } from '@/components/ui/glow-menu'
import { scrollToId, scrollToTop } from '@/lib/smooth-scroll'

const items: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: 'Home',
    href: '#top',
    gradient: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)',
    iconColor: 'group-hover:text-blue-500',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    label: 'Practice',
    href: 'services/#practice', // on the services page now
    gradient: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)',
    iconColor: 'group-hover:text-orange-500',
  },
  {
    icon: <Tag className="h-5 w-5" />,
    label: 'Services',
    href: 'services/',
    gradient: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)',
    iconColor: 'group-hover:text-red-500',
  },
  {
    icon: <Briefcase className="h-5 w-5" />,
    label: 'Clients',
    href: 'clients/',
    gradient: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)',
    iconColor: 'group-hover:text-green-500',
  },
  {
    icon: <Clapperboard className="h-5 w-5" />,
    label: 'Work',
    href: 'work/', // its own page, not the videos
    gradient: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)',
    iconColor: 'group-hover:text-purple-500',
  },
]

export type NavPage = 'home' | 'services' | 'work' | 'clients' | 'other'

/* Turn a link written for the home page into the right one for `page`.
   On the page it points to, it becomes an in-page jump. */
function resolve(href: string, page: NavPage): string {
  if (page === 'home') return href
  if (href === '#top') return '../'
  if (href.startsWith('#')) return '../' + href // e.g. ../#clients
  const [path, hash] = href.split('#') // e.g. services/ , practice
  if (path === `${page}/`) return hash ? `#${hash}` : '#top'
  return '../' + href
}

/* The glow menu, floating at the top centre of the screen, on every page. */
export function SiteNav({ page = 'home' }: { page?: NavPage }) {
  const links = items.map((it) => ({ ...it, href: resolve(it.href, page) }))
  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5">
      <MenuBar
        items={links}
        className="pointer-events-auto"
        leading={
          <a
            href={page === 'home' ? '#top' : '../'}
            aria-label={page === 'home' ? 'kepler designs, back to top' : 'kepler designs, home'}
            onClick={(e) => {
              if (page !== 'home') return
              e.preventDefault()
              scrollToTop()
            }}
            className="mr-1 flex shrink-0 items-center rounded-xl px-2 py-1.5 transition-transform duration-300 hover:scale-105 sm:mr-2"
          >
            <img src={logo} alt="" width={1137} height={831} className="h-6 w-auto sm:h-7" />
          </a>
        }
        onSelect={(href) => {
          if (href === '#top') scrollToTop()
          else if (href.startsWith('#')) scrollToId(href.slice(1), 88)
          else window.location.href = href
        }}
      />
    </div>
  )
}
