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
      {/* full-bleed white band, edge to edge, as in the component demo */}
      <InfiniteSlider gap={24} reverse className="mt-10 h-full w-full bg-white md:mt-14">
        {brands.map((b) => (
          <img key={b.src} src={b.src} alt={b.alt} className="h-20 w-auto md:h-[120px]" />
        ))}
      </InfiniteSlider>
    </section>
  )
}
