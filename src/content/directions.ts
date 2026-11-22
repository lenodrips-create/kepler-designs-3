export type Direction = {
  title: string
  subtitle: string
}

/* The entries on the drum. Edit freely: the drum, counter and dealt cards
   all read from this list, and any length works. Keep titles short enough
   to fit a phone screen (about 15 characters). */
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
  { title: 'Type design', subtitle: 'Letters drawn for one name' },
  { title: 'Illustration', subtitle: 'Drawn by hand, on purpose' },
  { title: 'Naming', subtitle: 'Words worth keeping' },
  { title: 'Spatial design', subtitle: 'Rooms that tell the story' },
  { title: 'Social content', subtitle: 'Small screens, big ideas' },
]
