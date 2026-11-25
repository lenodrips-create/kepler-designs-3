import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const KEY = 'kepler-cookie-notice'

function dismissed(): boolean {
  try {
    return !!window.localStorage.getItem(KEY)
  } catch {
    return false
  }
}

/* An honest cookie notice. The site sets no cookies and runs no tracking,
   so there is nothing to accept or refuse: it just says what the site does
   and links to the privacy policy. It waits for the loading screen to
   finish, and once closed it stays closed. */
export function CookieNotice({ privacyHref = 'privacy/' }: { privacyHref?: string }) {
  const [state, setState] = useState<'hidden' | 'shown' | 'leaving'>('hidden')

  useEffect(() => {
    if (dismissed()) return
    // wait until the first-visit loading screen has gone
    const loading = () => !!document.querySelector('[role="status"][aria-label^="Loading"]')
    let t = 0
    const check = () => {
      if (loading()) t = window.setTimeout(check, 250)
      else t = window.setTimeout(() => setState('shown'), 700)
    }
    check()
    return () => window.clearTimeout(t)
  }, [])

  const close = () => {
    try {
      window.localStorage.setItem(KEY, '1')
    } catch {
      /* it will show again next time; that's fine */
    }
    setState('leaving')
    window.setTimeout(() => setState('hidden'), 400)
  }

  if (state === 'hidden') return null

  return (
    <aside
      aria-label="Cookie notice"
      className={cn(
        'fixed inset-x-4 bottom-4 z-[90] max-w-sm rounded-2xl border border-border/60 bg-background/90 p-5 shadow-lg backdrop-blur-lg transition-[opacity,transform] duration-400 ease-[cubic-bezier(.16,1,.3,1)] sm:right-auto sm:left-6 sm:bottom-6',
        state === 'shown' ? 'translate-y-0 opacity-100 starting:translate-y-4 starting:opacity-0' : 'translate-y-4 opacity-0',
      )}
    >
      <p className="font-display text-lg font-semibold tracking-[-0.02em]">No cookies here</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        We don’t use cookies, analytics or tracking. Your browser keeps one small setting so the intro only plays once.
      </p>
      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={close}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          OK
        </button>
        <a href={privacyHref} className="text-sm font-medium underline-offset-4 hover:underline">
          Privacy policy
        </a>
      </div>
    </aside>
  )
}
