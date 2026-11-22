export type Direction = {
  title: string
  subtitle: string
}

/* The ten entries on the drum. Edit freely: the drum, counter and dealt
   cards all read from this list, and any length works. */
export const directions: Direction[] = [
  { title: 'Brand identity', subtitle: 'Marks, type and colour' },
  { title: 'Web design', subtitle: 'Sites with a point of view' },
  { title: 'Art direction', subtitle: 'One look, held everywhere' },
  { title: 'Packaging', subtitle: 'The box is the first hello' },
  { title: 'Editorial', subtitle: 'Set like a magazine' },
  { title: 'Motion', subtitle: 'Things that move with purpose' },
  { title: 'Product design', subtitle: 'Interfaces that get out of the way' },
  { title: 'Campaigns', subtitle: 'One idea, many places' },
  { title: 'Photography', subtitle: 'Light, object, crop' },
  { title: 'Strategy', subtitle: 'Why before how' },
]
