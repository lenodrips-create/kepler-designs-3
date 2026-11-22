import reelPoster from '@/assets/reel-poster.jpg'
import reelVideo from '@/assets/reel.mp4'
import reelWebm from '@/assets/reel.webm'
import aerialPoster from '@/assets/aerial-poster.jpg'
import aerialVideo from '@/assets/aerial.mp4'
import aerialWebm from '@/assets/aerial.webm'
import trafficPoster from '@/assets/traffic-poster.jpg'
import trafficVideo from '@/assets/traffic.mp4'
import trafficWebm from '@/assets/traffic.webm'

/* Tiles for the zoom parallax (max 7). The first one ends up filling the
   screen, so it holds the film: the gallery zooms straight into it. Swap the
   others for your own: drop files in src/assets and import them. */
export const parallaxImages = [
  {
    src: reelPoster,
    video: reelVideo,
    videoWebm: reelWebm,
    alt: 'Night drive, lit through the car windows',
  },
  {
    src: aerialPoster,
    video: aerialVideo,
    videoWebm: aerialWebm,
    alt: 'A city at night, seen from above',
  },
  {
    src: trafficPoster,
    video: trafficVideo,
    videoWebm: trafficWebm,
    alt: 'Rain and traffic on a city road at night',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/e0/e09b97c0849e748eb1d19a8d23e341835806a6a384540bfd4f7ce88f97b97b51.jpg',
    alt: 'Mountain landscape',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/28/28ab2843d2f3bb3b8439f0c198d9846be80044955263bff6ac49d89691dad55d.jpg',
    alt: 'Minimalist design elements',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/96/96e261f67a4f180e273ca711f7b86abe72dd0fdc84dd75d9322b2d79baac46f0.jpg',
    alt: 'Ocean waves and beach',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/85/8590b403bb542a124c7de796e9ecf5da86509818f2969e4d94af8c440953a852.jpg',
    alt: 'Forest trees and sunlight',
  },
]
