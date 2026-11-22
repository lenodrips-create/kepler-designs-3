/* Turn a Sketchfab model to face the mouse.

   Uses Sketchfab's official Viewer API. Once the model is ready we read its
   starting camera, then orbit the camera around the model as the pointer
   moves anywhere on the page, so the model appears to turn toward the
   cursor. Each move is sent with a short ease, and Sketchfab blends between
   them, so the motion stays smooth. Phones (no hover) get a slow sway
   instead. Nothing loads until the model is near the screen, and nothing is
   sent while it is off screen. If the API can't load, `onFallback` runs so
   the page can show the plain embed instead. */

const API_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js'

const TURN = 35 // degrees left/right at the screen edges
const TILT = 16 // degrees up/down at the top/bottom
const EASE = 0.55 // seconds Sketchfab takes to blend to each new view
const SEND_EVERY = 60 // ms between camera updates

type Vec3 = [number, number, number]
type Camera = { position: Vec3; target: Vec3 }

interface ViewerApi {
  start(): void
  addEventListener(event: 'viewerready', cb: () => void): void
  getCameraLookAt(cb: (err: unknown, camera: Camera) => void): void
  setCameraLookAt(position: Vec3, target: Vec3, duration?: number): void
}

declare global {
  interface Window {
    Sketchfab?: new (iframe: HTMLIFrameElement) => {
      init(uid: string, options: Record<string, unknown>): void
    }
  }
}

let apiScript: Promise<void> | null = null
function loadApi(): Promise<void> {
  if (window.Sketchfab) return Promise.resolve()
  apiScript ??= new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = API_URL
    s.async = true
    s.onload = () => (window.Sketchfab ? resolve() : reject(new Error('Sketchfab API missing')))
    s.onerror = () => reject(new Error('Sketchfab API failed to load'))
    document.head.appendChild(s)
  })
  return apiScript
}

export function createSketchfabFollow(
  iframe: HTMLIFrameElement,
  uid: string,
  onFallback: () => void,
): () => void {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const touch = window.matchMedia('(hover: none)').matches

  let api: ViewerApi | null = null
  let base: { target: Vec3; r: number; az: number; el: number; side: number } | null = null
  let visible = false
  let started = false
  let stopped = false
  let failTimer = 0
  let swayTimer = 0
  let lastSend = 0
  let pending = 0
  let nx = 0
  let ny = 0

  const aim = (x: number, y: number) => {
    if (!api || !base || !visible || stopped) return
    const { target: t, r, az, el, side } = base
    const a = az - side * x * ((TURN * Math.PI) / 180)
    const e = Math.max(-1.2, Math.min(1.2, el + y * ((TILT * Math.PI) / 180)))
    const p: Vec3 = [
      t[0] + r * Math.cos(e) * Math.cos(a),
      t[1] + r * Math.cos(e) * Math.sin(a),
      t[2] + r * Math.sin(e),
    ]
    api.setCameraLookAt(p, t, EASE)
  }

  const send = () => {
    pending = 0
    lastSend = performance.now()
    aim(nx, ny)
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    nx = (e.clientX / window.innerWidth) * 2 - 1
    ny = (e.clientY / window.innerHeight) * 2 - 1
    if (pending) return
    const wait = Math.max(0, SEND_EVERY - (performance.now() - lastSend))
    pending = window.setTimeout(send, wait)
  }

  const ready = (viewer: ViewerApi) => {
    api = viewer
    viewer.getCameraLookAt((err, cam) => {
      if (err || !cam) return
      const [px, py, pz] = cam.position
      const t = cam.target
      const v: Vec3 = [px - t[0], py - t[1], pz - t[2]]
      const r = Math.hypot(...v) || 1
      const az = Math.atan2(v[1], v[0])
      const el = Math.asin(v[2] / r)
      // Which way "screen right" runs, so the model turns toward the cursor
      // whatever way the model was saved. Camera right = forward x up (z-up).
      const f: Vec3 = [-v[0], -v[1], -v[2]]
      const right: Vec3 = [f[1], -f[0], 0]
      const dPos: Vec3 = [-Math.sin(az), Math.cos(az), 0]
      const side = Math.sign(dPos[0] * right[0] + dPos[1] * right[1]) || 1
      base = { target: t, r, az, el, side }

      if (reduce) return
      if (touch) {
        const t0 = performance.now()
        swayTimer = window.setInterval(() => {
          const s = (performance.now() - t0) / 1000
          aim(Math.sin(s * 0.5) * 0.6, Math.sin(s * 0.33) * 0.25)
        }, 120)
      } else {
        window.addEventListener('pointermove', onPointer, { passive: true })
      }
    })
  }

  const start = () => {
    if (started) return
    started = true
    failTimer = window.setTimeout(() => !api && !stopped && onFallback(), 12000)
    loadApi()
      .then(() => {
        if (stopped || !window.Sketchfab) return
        new window.Sketchfab(iframe).init(uid, {
          success: (viewer: ViewerApi) => {
            viewer.start()
            viewer.addEventListener('viewerready', () => {
              window.clearTimeout(failTimer)
              ready(viewer)
            })
          },
          error: () => !stopped && onFallback(),
          autostart: 1,
          preload: 1,
          camera: 0, // skip the intro fly-in
          scrollwheel: 0, // never steal the page scroll
          dnt: 1, // don't track visitors
          transparent: 1,
          ui_hint: 0,
          ui_controls: 0,
          ui_infos: 0,
          ui_stop: 0,
          ui_inspector: 0,
          ui_settings: 0,
          ui_help: 0,
          ui_vr: 0,
          ui_ar: 0,
          ui_fullscreen: 0,
          ui_annotations: 0,
          ui_watermark: 0,
        })
      })
      .catch(() => !stopped && onFallback())
  }

  // Load when close to the screen; only steer while it's on screen.
  const near = new IntersectionObserver(([e]) => e.isIntersecting && start(), { rootMargin: '600px 0px' })
  const onScreen = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  near.observe(iframe)
  onScreen.observe(iframe)

  return () => {
    stopped = true
    near.disconnect()
    onScreen.disconnect()
    window.removeEventListener('pointermove', onPointer)
    window.clearTimeout(pending)
    window.clearTimeout(failTimer)
    window.clearInterval(swayTimer)
  }
}

export function sketchfabEmbedUrl(uid: string): string {
  return `https://sketchfab.com/models/${uid}/embed?autostart=1&ui_hint=0&dnt=1&scrollwheel=0`
}
