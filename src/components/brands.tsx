import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { brands } from '@/content/brands'

// One pass of the strip has to be wider than the widest screen, or the loop
// shows a gap after the last logo. Six logos aren't enough, so repeat them.
const REPEAT = 4

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
      {/* Edge to edge on the page background. The logos multiply into the
          cream, so the white boxes some logo files have disappear. The track
          gets the same background so the blend has something to mix with. */}
      <InfiniteSlider
        gap={8}
        reverse
        className="mt-10 h-full w-full bg-background md:mt-14 [&>div]:bg-background"
      >
        {strip.map((b, i) => (
          <img
            key={`${b.src}-${i}`}
            src={b.src}
            alt={i < brands.length ? b.alt : ''}
            aria-hidden={i < brands.length ? undefined : true}
            className="-my-8 h-32 w-auto mix-blend-multiply md:-my-12 md:h-48"
          />
        ))}
      </InfiniteSlider>
    </section>
  )
}
