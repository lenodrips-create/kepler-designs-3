export type Tone = {
  name: string
  hex: string
  at: [number, number] // where it was sampled in the hero photo, % from left / top
  role: string // what the site uses it for
  token: string
  accent: boolean // offered as a swappable accent
}

/* The tones sampled from the hero photograph (src/assets/hero.jpg). The
   positions are where each one actually sits in the image. */
export const tones: Tone[] = [
  { name: 'Honey', hex: '#e5be80', at: [58, 52], role: 'The glow behind the drum', token: '--glow', accent: false },
  { name: 'Caramel', hex: '#8e6944', at: [26, 56], role: 'The accent', token: '--brand', accent: true },
  { name: 'Bronze', hex: '#4b3220', at: [10, 80], role: 'Deepens small accent text', token: '--brand-text', accent: true },
  { name: 'Shadow', hex: '#110c05', at: [38, 77], role: 'All body text', token: '--foreground', accent: true },
]

export const BACKGROUND = '#f7f3ec'
