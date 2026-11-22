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
      <InfiniteSlider
        gap={64}
        duration={30}
        durationOnHover={60}
        className="mt-10 border-y border-foreground/10 py-8 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] md:mt-14 md:py-10"
      >
        {brands.map((b) => (
          <img
            key={b.src}
            src={b.src}
            alt={b.alt}
            loading="lazy"
            decoding="async"
            className="h-10 w-auto opacity-70 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0 md:h-14"
          />
        ))}
      </InfiniteSlider>
    </section>
  )
}
