import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { brands } from '@/content/brands'

export function Brands() {
  return (
    <section aria-labelledby="brands-title" className="py-16 md:py-24">
      <h2
        id="brands-title"
        className="px-6 font-display text-3xl font-semibold tracking-[-0.03em] md:px-14 md:text-5xl"
      >
        Brands that trust us
      </h2>
      {/* Edge to edge on the page background. The demo logo files carry a lot
          of empty space around each mark, so each image is drawn larger and
          its empty top and bottom are trimmed by the band: the logos fill it. */}
      <InfiniteSlider gap={8} reverse className="mt-10 h-full w-full bg-background md:mt-14">
        {brands.map((b) => (
          <img key={b.src} src={b.src} alt={b.alt} className="-my-8 h-32 w-auto md:-my-12 md:h-48" />
        ))}
      </InfiniteSlider>
    </section>
  )
}
