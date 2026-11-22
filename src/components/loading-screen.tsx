import { useEffect, useState } from 'react'

import LoadingSpinner from '@/components/ui/snow-ball-loading-spinner'
import { setScrollLocked } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'

const SEEN_KEY = 'kepler-visited'
const SHOW_MS = 3000 // how long the loading screen stays up
const FADE_MS = 600 // then it fades out

function firstVisit(): boolean {
  try {
    return !window.localStorage.getItem(SEEN_KEY)
  } catch {
    return false // storage blocked: don't make every visit wait
  }
}

/* The snow ball spinner over the whole page, on a visitor's first visit
   only, for three seconds. Scrolling is held until it's gone. */
export function LoadingScreen() {
  const [phase, setPhase] = useState<'show' | 'leaving' | 'gone'>(() => (firstVisit() ? 'show' : 'gone'))

  useEffect(() => {
    if (phase !== 'show') return
    setScrollLocked(true)
    try {
      window.localStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* fine: it just shows again next time */
    }
    const t = window.setTimeout(() => setPhase('leaving'), SHOW_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'leaving') return
    setScrollLocked(false)
    const t = window.setTimeout(() => setPhase('gone'), FADE_MS)
    return () => window.clearTimeout(t)
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div
      role="status"
      aria-label="Loading kepler designs"
      className={cn(
        'fixed inset-0 z-[100] grid place-items-center bg-[hsl(223_90%_95%)] transition-opacity ease-[cubic-bezier(.4,0,.2,1)]',
        phase === 'leaving' ? 'opacity-0' : 'opacity-100',
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <LoadingSpinner />
    </div>
  )
}
