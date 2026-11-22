/* The accent is one CSS custom property. Setting it re-themes every
   element that reads it (drum, counters, labels) with no re-render. */

export const DEFAULT_ACCENT = '#8e6944'

export function setAccent(hex: string): void {
  if (hex.toLowerCase() === DEFAULT_ACCENT) document.documentElement.style.removeProperty('--brand')
  else document.documentElement.style.setProperty('--brand', hex)
}
