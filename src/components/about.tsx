/* A short about, right under the hero. Hovering the paragraph eases its
   words apart (word-spacing), and back together when the pointer leaves. */
export function About() {
  return (
    <section
      aria-labelledby="about-title"
      className="grid gap-3 px-6 pt-14 pb-6 md:grid-cols-12 md:gap-8 md:px-14 md:pt-20 md:pb-10"
    >
      <h2 id="about-title" className="font-display text-lg font-semibold tracking-[-0.02em] md:col-span-3 md:text-xl">
        About
      </h2>
      <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 transition-[word-spacing] duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:[word-spacing:0.35em] motion-reduce:transition-none md:col-span-8 md:col-start-5 md:text-xl">
        kepler designs is a small studio that designs websites and web apps and builds them too. One team takes
        the work from the first sketch to the live site, so what you approve is what ships.
      </p>
    </section>
  )
}
