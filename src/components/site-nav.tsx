import { useEffect, useState } from 'react'

import { onScroll, scrollToId, scrollToTop } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'

const links = [
  { id: 'practice', label: 'Practice', hideOnPhone: true },
  { id: 'clients', label: 'Clients' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
]

/* Fixed to the top. Over the hero photo it is bare white text; once the
   page has scrolled past the photo it becomes a cream bar with a soft blur,
   so it stays readable over any section. */
export function SiteNav() {
  const [solid, setSolid] = useState(false)

  useEffect(
    () =>
      onScroll((y) => {
        // the hero is one screen tall; switch just before it's gone
        setSolid(y > window.innerHeight - 72)
      }),
    [],
  )

  return (
    <nav
      aria-label="Main"
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex items-baseline justify-between px-6 py-4 transition-[background-color,color,border-color,backdrop-filter] duration-300 md:px-14 md:py-5',
        solid
          ? 'border-b border-foreground/10 bg-background/85 text-foreground backdrop-blur-md'
          : 'border-b border-transparent text-white',
      )}
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          scrollToTop()
        }}
        className="font-display text-lg font-semibold tracking-[-0.03em] md:text-xl"
      >
        kepler designs
      </a>
      <ul className="flex gap-5 text-sm md:gap-8 md:text-base">
        {links.map((l) => (
          <li key={l.id} className={l.hideOnPhone ? 'hidden sm:block' : undefined}>
            <a
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(l.id, 64)
              }}
              className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
