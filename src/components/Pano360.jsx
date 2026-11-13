import { useEffect, useRef } from 'react'
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three'

const FOV = 68
const PITCH_MIN = -1.05
const PITCH_MAX = 0.4
const START = { yaw: 0.35, pitch: -0.3 }

/**
 * Pano360 — visor de foto 360° (equirretangular) de drone.
 * Arrastar gira a vista; sem interação, gira devagar sozinho.
 * No toque só gira na horizontal, para não travar a rolagem da página.
 *
 * ambient: modo de fundo (hero) — sem arraste; a vista deriva devagar e
 * acompanha o mouse de leve.
 */
function Pano360({ src, srcSmall, label, onReady, ambient = false }) {
  const hostRef = useRef(null)
  const readyRef = useRef(onReady)

  useEffect(() => {
    readyRef.current = onReady
  })

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer
    try {
      renderer = new WebGLRenderer({ antialias: true })
    } catch {
      return // sem WebGL: fica a imagem de capa
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 760px)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    host.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
    camera.rotation.order = 'YXZ'

    const geo = new SphereGeometry(50, 64, 40)
    geo.scale(-1, 1, 1) // vista por dentro, sem espelhar a imagem
    const mat = new MeshBasicMaterial()
    scene.add(new Mesh(geo, mat))

    const view = { ...START, vy: 0, vp: 0 }
    const look = { x: 0, y: 0, tx: 0, ty: 0 }
    let drift = 0
    let dragging = false
    let lastX = 0
    let lastY = 0
    let lastTouch = 0
    let visible = true
    let loaded = false
    let raf = 0
    let prev = performance.now()
    let texture

    const layout = () => {
      const w = host.clientWidth || 1
      const h = host.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // em telas estreitas abre mais o campo de visão vertical
      camera.fov = w / h < 1 ? 82 : FOV
      camera.updateProjectionMatrix()
    }

    const frame = (now) => {
      const dt = Math.min((now - prev) / 1000, 0.05)
      prev = now
      if (ambient) {
        if (!reduced) drift += dt * 0.012
        look.x += (look.tx - look.x) * 0.04
        look.y += (look.ty - look.y) * 0.04
        view.yaw = START.yaw + drift - look.x * 0.16
        view.pitch = -0.36 - look.y * 0.05
      } else if (!dragging) {
        view.yaw += view.vy
        view.pitch += view.vp
        view.vy *= 0.92
        view.vp *= 0.92
        // giro lento automático depois de alguns segundos parado
        if (!reduced && now - lastTouch > 3500) view.yaw += dt * 0.035
      }
      view.pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, view.pitch))
      camera.rotation.set(view.pitch, view.yaw, 0)
      renderer.render(scene, camera)
      if (visible) raf = requestAnimationFrame(frame)
    }
    const kick = () => {
      cancelAnimationFrame(raf)
      prev = performance.now()
      raf = requestAnimationFrame(frame)
    }

    new TextureLoader().load(small && srcSmall ? srcSmall : src, (tex) => {
      texture = tex
      tex.colorSpace = SRGBColorSpace
      tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
      mat.map = tex
      mat.needsUpdate = true
      loaded = true
      layout()
      kick()
      readyRef.current?.()
    })

    const el = renderer.domElement
    const radPerPx = () => ((camera.fov * Math.PI) / 180 / (host.clientHeight || 1)) * 1.1

    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      view.vy = 0
      view.vp = 0
      lastTouch = performance.now()
      el.setPointerCapture?.(e.pointerId)
      host.classList.add('is-dragging')
    }
    const onMove = (e) => {
      if (!dragging) return
      const k = radPerPx()
      const dx = (e.clientX - lastX) * k
      const dy = e.pointerType === 'touch' ? 0 : (e.clientY - lastY) * k
      lastX = e.clientX
      lastY = e.clientY
      view.yaw += dx
      view.pitch += dy
      view.vy = dx
      view.vp = dy
      lastTouch = performance.now()
    }
    const onUp = () => {
      dragging = false
      lastTouch = performance.now()
      host.classList.remove('is-dragging')
    }
    const onKey = (e) => {
      const step = 0.12
      if (e.key === 'ArrowLeft') view.vy = step / 4
      else if (e.key === 'ArrowRight') view.vy = -step / 4
      else if (e.key === 'ArrowUp') view.vp = step / 6
      else if (e.key === 'ArrowDown') view.vp = -step / 6
      else return
      e.preventDefault()
      lastTouch = performance.now()
    }

    const onLook = (e) => {
      if (e.pointerType === 'touch') return
      look.tx = (e.clientX / window.innerWidth) * 2 - 1
      look.ty = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (ambient) {
      window.addEventListener('pointermove', onLook, { passive: true })
    } else {
      el.addEventListener('pointerdown', onDown)
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerup', onUp)
      el.addEventListener('pointercancel', onUp)
      host.addEventListener('keydown', onKey)
    }

    const ro = new ResizeObserver(layout)
    ro.observe(host)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      if (visible && loaded) kick()
      else cancelAnimationFrame(raf)
    })
    io.observe(host)
    const onVisibility = () => {
      if (!document.hidden && visible && loaded) kick()
      else cancelAnimationFrame(raf)
    }
    document.addEventListener('visibilitychange', onVisibility)

    layout()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onLook)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
      host.removeEventListener('keydown', onKey)
      texture?.dispose()
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      el.remove()
    }
  }, [src, srcSmall, ambient])

  if (ambient) return <div className="terrain-3d-canvas" ref={hostRef} />

  return (
    <div
      className="pano-canvas"
      ref={hostRef}
      tabIndex={0}
      role="img"
      aria-label={label}
    />
  )
}

export default Pano360
