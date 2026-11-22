import { DirectionDrum } from '@/components/direction-drum'
import { Hero } from '@/components/hero'

export default function App() {
  return (
    <>
      <Hero />
      {/* z-10 + white so the page slides over the sinking hero */}
      <main className="relative z-10 bg-background pt-20 pb-[20vh] md:pt-28">
        <DirectionDrum />
      </main>
    </>
  )
}
