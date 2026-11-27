import { Phone } from 'lucide-react'

import { CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/content/services'

/* Contact: calls the studio. Top right on wide screens (1280px+); on narrower ones the
   menu bar fills the top, so it sits bottom right as a round button. */
export function ContactButton() {
  return (
    <a
      href={CONTACT_PHONE_HREF}
      aria-label={`Contact: call ${CONTACT_PHONE}`}
      className="group fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border border-border/40 bg-foreground p-3.5 text-background shadow-lg transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground xl:top-5 xl:right-6 xl:bottom-auto xl:px-5 xl:py-3"
    >
      <Phone aria-hidden="true" className="size-5 xl:size-4" />
      <span className="hidden text-sm font-medium xl:inline">Contact</span>
      <span className="hidden max-w-0 overflow-hidden text-sm whitespace-nowrap text-background/70 tabular-nums transition-[max-width] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:max-w-40 group-focus-visible:max-w-40 xl:inline">
        {CONTACT_PHONE}
      </span>
    </a>
  )
}
