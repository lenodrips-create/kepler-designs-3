export type Capability = { title: string; detail: string }

/* What the studio does, as deliverables rather than adjectives.
   Edit freely; both columns can be any length. */
export const design: Capability[] = [
  { title: 'Interface design', detail: 'Layouts, flows and states for every screen size, not just the happy path.' },
  { title: 'Design systems', detail: 'Tokens, components and usage rules, kept in step between Figma and code.' },
  { title: 'Prototyping in code', detail: 'Real browsers, real content, real latency, before anything is signed off.' },
  { title: 'Motion', detail: 'Transitions that explain what changed. Each one holds 60fps or it doesn’t ship.' },
  { title: 'Type and art direction', detail: 'Type, image and colour chosen for this brand, not borrowed from the last one.' },
]

export const engineering: Capability[] = [
  { title: 'Front-end development', detail: 'React and TypeScript, typed from the API response to the button label.' },
  { title: 'Performance', detail: 'Budgets for page weight and Core Web Vitals, checked on every pull request.' },
  { title: 'Accessibility', detail: 'WCAG 2.2 AA as the floor: keyboard, screen readers, contrast, reduced motion.' },
  { title: 'Content and CMS', detail: 'Headless setups your team can edit on a Friday afternoon without calling us.' },
  { title: 'Delivery', detail: 'Preview links for every change, CI, analytics and error tracking from day one.' },
]
