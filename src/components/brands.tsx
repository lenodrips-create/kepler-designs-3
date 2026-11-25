import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { brands } from '@/content/brands'

// One pass of the strip has to be wider than the widest screen, or the loop
// shows a gap. With a single brand, repeat it enough to cover a 2560px screen.
const REPEAT = 8

export function Brands() {
  const strip = Array.from({ length: REPEAT }, () => brands).flat()

  return (
    <section id="clients" aria-labelledby="brands-title" className="py-16 md:py-24">
      <h2
        id="brands-title"
        className="px-6 font-display text-3xl font-semibold tracking-[-0.03em] md:px-14 md:text-5xl"
      >
        Brands that trust us
      </h2>
      {/* edge to edge, looping forever; the marks are drawn in the page's ink */}
      <InfiniteSlider gap={72} duration={40} reverse className="mt-10 w-full py-4 md:mt-14 md:py-6">
        {strip.map((b, i) => (
          <div
            key={`${b.name}-${i}`}
            aria-hidden={i < brands.length ? undefined : true}
            className="flex shrink-0 items-center gap-4 text-foreground md:gap-5"
          >
            <span
              aria-hidden="true"
              className="block h-14 w-auto md:h-20 [&>svg]:h-full [&>svg]:w-auto"
              dangerouslySetInnerHTML={{ __html: b.logo }}
            />
            <span className="font-display text-4xl font-semibold tracking-[-0.03em] whitespace-nowrap md:text-6xl">
              {b.name}
            </span>
          </div>
        ))}
      </InfiniteSlider>
    </section>
  )
}
