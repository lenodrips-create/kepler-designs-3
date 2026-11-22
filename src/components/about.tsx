import { useEffect, useRef } from 'react'

import { createWordSpread } from '@/lib/word-spread'

const paragraphs = [
  'kepler designs is a small studio that designs websites and web apps, and then builds them too. One team takes the work from the first sketch to the live site, so what you approve is what ships.',
  'We work with founders, small companies and teams who have outgrown their template. Some need a single page that says clearly what they do. Others need a whole product, designed screen by screen and engineered to hold up.',
  'Everything is made for the people who will use it: quick on a slow connection, readable on a small screen, usable with a keyboard. The process stays plain too, with a fixed price agreed before we start and one point of contact the whole way through.',
]

/* About, right under the hero. Words part around the cursor as it moves
   over the text (see src/lib/word-spread.ts). */
export function About() {
  const textRef = useRef<HTMLDivElement>(null)
  useEffect(() => (textRef.current ? createWordSpread(textRef.current) : undefined), [])

  return (
    <section
      aria-labelledby="about-title"
      className="grid gap-4 px-6 pt-16 pb-8 md:grid-cols-12 md:gap-8 md:px-14 md:pt-24 md:pb-12"
    >
      <h2 id="about-title" className="font-display text-2xl font-semibold tracking-[-0.02em] md:col-span-3 md:text-3xl">
        About
      </h2>
      <div ref={textRef} className="space-y-6 md:col-span-9 md:space-y-8">
        {paragraphs.map((text) => (
          <p
            key={text.slice(0, 20)}
            className="font-display text-2xl leading-[1.3] font-medium tracking-[-0.02em] text-foreground/85 md:text-[2.15rem]"
          >
            {text.split(' ').map((word, i) => (
              <span key={i}>
                <span
                  data-word
                  className="inline-block transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
                >
                  {word}
                </span>{' '}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  )
}
