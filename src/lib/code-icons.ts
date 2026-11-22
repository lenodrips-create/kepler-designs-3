import {
  ACESFilmicToneMapping,
  Box3,
  DirectionalLight,
  Euler,
  Group,
  HemisphereLight,
  Mesh,
  type MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  PMREMGenerator,
  Quaternion,
  Raycaster,
  Scene,
  ShadowMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'

/* The five 3D coding icons, from "3D Coding Icons.html", rebuilt for the page.

   Same studio as the original: soft room lighting, a shadow on an invisible
   floor, and each icon bobbing and swaying on its own. On top of that, the
   icon closest to the mouse turns to look at it. Every change is eased with
   a time-based damping (so it's equally smooth at 60Hz or 120Hz), and the
   hand-off between icons is a cross-fade, so nothing ever snaps. The loop
   only runs while the stage is on screen. */

const SPACING = 2.9 // between icons in a row, as in the original
const LOOK_DEPTH = 4 // the cursor is treated as a point this far in front of the icons
const MAX_YAW = 1.05 // radians: how far an icon turns sideways
const MAX_PITCH = 0.6 // radians: how far it tilts up or down
const FOLLOW = 9 // how quickly the active icon tracks the cursor
const HANDOFF = 5 // how quickly icons fade in and out of following
const POINTER = 14 // smoothing on the cursor itself

const damp = (rate: number, dt: number) => 1 - Math.exp(-rate * dt)

export type IconSource = {
  key: string
  url: string
  /** Tip the icon toward the camera (radians), e.g. so a cylinder shows its top. */
  tilt?: number
}

export async function createCodeIcons(stage: HTMLElement, sources: IconSource[]): Promise<() => void> {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  const canvas = renderer.domElement
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'
  canvas.setAttribute('aria-hidden', 'true')
  stage.appendChild(canvas)

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04)
  scene.environment = envTarget.texture

  const camera = new PerspectiveCamera(35, 1, 0.1, 100)

  const key = new DirectionalLight(0xffffff, 1.6)
  key.position.set(4, 8, 6)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024) // soft shadows, so 1024 looks the same as 2048 at half the cost
  Object.assign(key.shadow.camera, { left: -9, right: 9, top: 6, bottom: -6 })
  scene.add(key, new HemisphereLight(0xffffff, 0x334455, 0.5))

  const floor = new Mesh(new PlaneGeometry(40, 40), new ShadowMaterial({ opacity: 0.16 }))
  floor.rotation.x = -Math.PI / 2
  floor.position.y = -2.4
  floor.receiveShadow = true
  scene.add(floor)

  // --- load the icons ---------------------------------------------------
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
  type Item = {
    pivot: Group
    phase: number
    tilt: number
    follow: number // 0..1: how much this icon is looking at the cursor
    home: Vector3
    halfSize: Vector3
  }
  const items: Item[] = await Promise.all(
    sources.map(async (src, i) => {
      const gltf = await loader.loadAsync(src.url)
      const model = gltf.scene
      model.traverse((n) => {
        if ((n as Mesh).isMesh) {
          const m = n as Mesh
          m.castShadow = true
          ;(m.material as MeshStandardMaterial).envMapIntensity = 0.9
        }
      })
      const pivot = new Group()
      pivot.add(model)
      scene.add(pivot)
      const size = new Box3().setFromObject(model).getSize(new Vector3())
      return { pivot, phase: i * 1.3, tilt: src.tilt ?? 0, follow: 0, home: new Vector3(), halfSize: size.multiplyScalar(0.5) }
    }),
  )

  // --- layout and framing -------------------------------------------------
  let narrow = false
  let width = 1
  let height = 1

  const layout = () => {
    const n = items.length
    items.forEach((it, i) => {
      if (narrow) {
        // 3 on top, the rest centred underneath (as in the original)
        const top = i < 3
        const row = top ? i : i - 3
        const rowCount = top ? Math.min(3, n) : n - 3
        it.home.set((row - (rowCount - 1) / 2) * 2.7, top ? 1.4 : -1.4, 0)
      } else {
        it.home.set((i - (n - 1) / 2) * SPACING, 0, 0)
      }
      it.pivot.scale.setScalar(narrow ? 0.85 : 1)
    })
    // fit everything (plus a margin) inside the view
    const half = new Vector2()
    for (const it of items) {
      const s = narrow ? 0.85 : 1
      half.x = Math.max(half.x, Math.abs(it.home.x) + it.halfSize.x * s)
      half.y = Math.max(half.y, Math.abs(it.home.y) + it.halfSize.y * s)
    }
    const tan = Math.tan((camera.fov * Math.PI) / 360)
    const dist = Math.max(half.x / (tan * camera.aspect), half.y / tan) * 1.18 + 1
    camera.position.set(0, 0.6, dist)
    camera.lookAt(0, 0, 0)
  }

  const resize = () => {
    width = Math.max(1, stage.clientWidth)
    height = Math.max(1, stage.clientHeight)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    narrow = camera.aspect < 1.2
    camera.updateProjectionMatrix()
    layout()
  }
  resize()

  // --- the cursor -----------------------------------------------------------
  const pointerTarget = new Vector2()
  const pointer = new Vector2()
  let hasPointer = false
  let pointerSettled = false

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return
    const r = canvas.getBoundingClientRect()
    pointerTarget.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    if (!pointerSettled) {
      pointer.copy(pointerTarget)
      pointerSettled = true
    }
    hasPointer = true
  }
  const onPointerLeave = () => {
    hasPointer = false
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)

  // scratch objects, reused every frame
  const ray = new Raycaster()
  const lookPlane = new Plane(new Vector3(0, 0, 1), -LOOK_DEPTH)
  const lookAt = new Vector3()
  const projected = new Vector3()
  const idleQ = new Quaternion()
  const lookQ = new Quaternion()
  const goalQ = new Quaternion()
  const euler = new Euler(0, 0, 0, 'YXZ')
  const pos = new Vector3()

  // --- frame loop -----------------------------------------------------------
  let last = performance.now()
  let elapsed = 0
  let lastActive = -2

  const frame = () => {
    const now = performance.now()
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    elapsed += dt

    pointer.lerp(pointerTarget, damp(POINTER, dt))

    // which icon is closest to the cursor, measured on screen
    let active = -1
    if (hasPointer) {
      let best = Infinity
      items.forEach((it, i) => {
        projected.copy(it.home).project(camera)
        const dx = (projected.x - pointer.x) * width
        const dy = (projected.y - pointer.y) * height
        const d = dx * dx + dy * dy
        if (d < best) {
          best = d
          active = i
        }
      })
      // where the cursor sits in the scene, a little in front of the icons
      ray.setFromCamera(pointer, camera)
      ray.ray.intersectPlane(lookPlane, lookAt)
    }

    if (active !== lastActive) {
      lastActive = active
      stage.dataset.active = String(active) // which icon is looking (-1: none)
    }

    items.forEach((it, i) => {
      const t = elapsed
      // idle float and sway, as in the original
      pos.copy(it.home)
      if (!reduce) pos.y += Math.sin(t * 1.2 + it.phase) * 0.18
      euler.set(it.tilt + (reduce ? 0 : Math.sin(t * 0.8 + it.phase) * 0.06), reduce ? 0.3 : Math.sin(t * 0.6 + it.phase) * 0.5, 0)
      idleQ.setFromEuler(euler)

      it.follow += ((i === active ? 1 : 0) - it.follow) * damp(HANDOFF, dt)

      if (it.follow > 0.001) {
        const dx = lookAt.x - pos.x
        const dy = lookAt.y - pos.y
        const dz = Math.max(0.5, lookAt.z - pos.z)
        euler.set(
          it.tilt + Math.max(-MAX_PITCH, Math.min(MAX_PITCH, -Math.atan2(dy, Math.hypot(dx, dz)))),
          Math.max(-MAX_YAW, Math.min(MAX_YAW, Math.atan2(dx, dz))),
          0,
        )
        lookQ.setFromEuler(euler)
        goalQ.copy(idleQ).slerp(lookQ, it.follow)
      } else {
        goalQ.copy(idleQ)
      }

      it.pivot.quaternion.slerp(goalQ, damp(FOLLOW, dt))
      // the icon that's looking lifts and grows a touch
      pos.y += it.follow * 0.12
      it.pivot.position.copy(pos)
      it.pivot.scale.setScalar((narrow ? 0.85 : 1) * (1 + it.follow * 0.06))
    })

    renderer.render(scene, camera)
  }

  // Run only while the stage is on screen.
  let running = false
  const setRunning = (on: boolean) => {
    if (on === running) return
    running = on
    last = performance.now()
    renderer.setAnimationLoop(on ? frame : null)
  }
  const visibility = new IntersectionObserver(([e]) => setRunning(e.isIntersecting))
  visibility.observe(stage)

  const sizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) renderer.render(scene, camera)
  })
  sizeObserver.observe(stage)
  frame() // first paint straight away

  return () => {
    setRunning(false)
    visibility.disconnect()
    sizeObserver.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    scene.traverse((o) => {
      const m = o as Mesh
      if (m.isMesh) {
        m.geometry.dispose()
        const mats = Array.isArray(m.material) ? m.material : [m.material]
        mats.forEach((mat) => mat.dispose())
      }
    })
    envTarget.dispose()
    pmrem.dispose()
    renderer.dispose()
    canvas.remove()
  }
}
