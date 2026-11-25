import breckeStricker from '@/assets/brecke-stricker.jpg'
import forgivenLogo from '@/assets/forgiven-logo.svg?raw'

/* "Brands that trust us". Each brand shows a mark (an SVG logo drawn in the
   page's ink, or a photo shown in a circle) and its name. The strip repeats
   them across the whole screen and loops forever. */
export type Brand = { name: string; logo?: string; photo?: string }

export const brands: Brand[] = [
  { name: 'Forgiven', logo: forgivenLogo },
  { name: 'Brecke Stricker Portfolio', photo: breckeStricker },
]
