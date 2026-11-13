import { useEffect, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Raycaster,
  RingGeometry,
  MeshBasicMaterial,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  DoubleSide,
} from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'

/* ------------------------------------------------------------------
   Relevo procedural — planalto com vale encaixado, no espírito da Serra.
   A mesma função alimenta a malha, o perímetro e a leitura de cota.
   ------------------------------------------------------------------ */
const SIZE = 16
const RADIUS = SIZE / 2
const INTERVAL = 0.11 // equidistância das curvas (unidades do modelo)
const BASE_ALT = 705 // altitude aproximada de Veranópolis (m)
const M_PER_UNIT = 38

function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}
function vnoise(x, y) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
function fbm(x, y) {
  let amp = 0.5
  let sum = 0
  for (let i = 0; i < 5; i++) {
    sum += amp * vnoise(x, y)
    x = x * 2.03 + 11.3
    y = y * 2.03 + 5.7
    amp *= 0.5
  }
  return sum
}
// cada seed gera um relevo diferente (uma "folha" por página)
function makeHeight(seed) {
  const ox = 3.1 + seed * 17.3
  const oz = 7.7 + seed * 9.1
  const phase = 0.6 + seed * 1.7
  return (x, z) => {
    const hills = (fbm(x * 0.24 + ox, z * 0.24 + oz) - 0.48) * 3.4
    // vale sinuoso (rio) cortando o planalto
    const d = z - 3.4 - Math.sin(x * 0.45 + phase) * 1.3
    const valley = Math.exp(-(d * d) / 1.6) * 1.25
    return hills - valley
  }
}

// Perímetro do imóvel (coordenadas locais x,z)
const PARCEL = [
  [-1.7, -1.0],
  [0.1, -1.7],
  [1.8, -0.8],
  [2.0, 0.8],
  [0.4, 1.5],
  [-1.5, 0.9],
]
const PARCEL_CENTER = [0.18, -0.05]

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uLine;
  uniform vec3 uAccent;
  uniform float uInterval;
  uniform float uRadius;
  uniform float uReveal;
  uniform float uScan;
  uniform float uScanMax;
  uniform float uParcel;
  uniform vec2 uScanC;
  uniform vec2 uPoly[6];
  varying vec3 vPos;

  float contour(float h, float w) {
    float f = fract(h);
    float d = min(f, 1.0 - f) / max(fwidth(h), 1e-5);
    return 1.0 - smoothstep(w - 0.5, w + 0.5, d);
  }

  float insideParcel(vec2 p) {
    float inside = 0.0;
    for (int i = 0; i < 6; i++) {
      vec2 a = uPoly[i];
      vec2 b = uPoly[i == 5 ? 0 : i + 1];
      if (((a.y > p.y) != (b.y > p.y)) &&
          (p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)) {
        inside = 1.0 - inside;
      }
    }
    return inside;
  }

  void main() {
    float r = length(vPos.xz);
    float fade = 1.0 - smoothstep(uRadius * 0.42, uRadius * 0.98, r);
    float front = uReveal * uRadius * 1.15;
    fade *= smoothstep(0.0, 0.7, front - r);
    if (fade < 0.004) discard;

    float h = vPos.y / uInterval;
    float crowd = 1.0 - smoothstep(0.3, 0.7, fwidth(h));
    float minor = contour(h, 0.7) * crowd;
    float major = contour(h / 5.0, 1.0);

    float sd = length(vPos.xz - uScanC);
    float scan = exp(-pow((sd - uScan) / 0.32, 2.0)) * (1.0 - uScan / uScanMax);
    // frente de revelação brilha de leve, como uma varredura inicial
    float edge = exp(-pow((front - r - 0.35) / 0.3, 2.0)) * (1.0 - uReveal);

    float hn = clamp(vPos.y * 0.25 + 0.5, 0.0, 1.0);
    vec3 col = uInk * (0.7 + hn * 0.8);

    float inside = insideParcel(vPos.xz) * uParcel;
    col = mix(col, uAccent, inside * 0.13);

    col = mix(col, uLine, minor * (0.15 + scan * 0.55 + edge * 0.5 + inside * 0.12));
    col = mix(col, uAccent, major * 0.72);
    col += uAccent * (scan * 0.09 + edge * 0.12);

    gl_FragColor = vec4(col, fade * 0.94);
    #include <colorspace_fragment>
  }
`

/* Nuvem de pontos — o mesmo relevo visto como varredura de drone/LiDAR */
const pointsVertex = /* glsl */ `
  uniform float uSize;
  uniform float uRadius;
  uniform float uReveal;
  uniform float uSweep;
  attribute float aRand;
  varying float vAlpha;
  varying float vH;
  varying float vSweep;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float r = length(position.xz);
    float fade = 1.0 - smoothstep(uRadius * 0.42, uRadius * 0.98, r);
    fade *= smoothstep(0.0, 0.7, uReveal * uRadius * 1.15 - r);
    float sw = exp(-pow((position.x - uSweep) / 0.26, 2.0));
    vH = clamp(position.y * 0.25 + 0.5, 0.0, 1.0);
    vSweep = sw;
    vAlpha = fade * (0.2 + 0.5 * aRand * vH + sw * 0.9);
    gl_PointSize = uSize * (1.0 + sw * 1.3) * (0.6 + aRand * 0.8) / -mv.z;
  }
`
const pointsFragment = /* glsl */ `
  uniform vec3 uLine;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vH;
  varying float vSweep;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = 1.0 - smoothstep(0.32, 0.5, d);
    if (disc * vAlpha < 0.01) discard;
    vec3 col = mix(uAccent, uLine, vH * vH * 0.8);
    col = mix(col, uLine, vSweep * 0.7);
    gl_FragColor = vec4(col, disc * vAlpha);
    #include <colorspace_fragment>
  }
`

const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

function TerrainScene({ mode = 'contours', seed = 0, onReady, onElevation }) {
  const hostRef = useRef(null)
  const cbRef = useRef({ onReady, onElevation })

  useEffect(() => {
    cbRef.current = { onReady, onElevation }
  })

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return // sem WebGL: o hero segue com a foto de fundo
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 760px)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const css = getComputedStyle(host)
    const cssColor = (name, fallback) =>
      new Color(css.getPropertyValue(name).trim() || fallback)
    const ink = cssColor('--ink', '#141414')
    const paper = cssColor('--paper', '#f5f5f0')
    const accent = cssColor('--terracotta', '#5E9A6B')

    const heightAt = makeHeight(seed)
    const isPoints = mode === 'points'
    const disposables = []

    const scene = new Scene()
    const camera = new PerspectiveCamera(34, 1, 0.1, 60)
    const world = new Group()
    scene.add(world)

    const uniforms = {
      uSize: { value: 30 },
      uSweep: { value: -RADIUS * 2 },
      uInk: { value: ink },
      uLine: { value: paper },
      uAccent: { value: accent },
      uInterval: { value: INTERVAL },
      uRadius: { value: RADIUS },
      uReveal: { value: 0 },
      uScan: { value: 0 },
      uScanMax: { value: RADIUS },
      uParcel: { value: 0 },
      uScanC: { value: new Vector2(PARCEL_CENTER[0], PARCEL_CENTER[1]) },
      uPoly: { value: PARCEL.map(([x, z]) => new Vector2(x, z)) },
    }

    if (isPoints) {
      /* ---------- nuvem de pontos ---------- */
      const n = small ? 190 : 300
      const pts = new Float32Array(n * n * 3)
      const rnd = new Float32Array(n * n)
      const step = SIZE / n
      let k = 0
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const x = -RADIUS + (i + hash(i, j)) * step
          const z = -RADIUS + (j + hash(j + 31, i + 17)) * step
          if (Math.hypot(x, z) > RADIUS) continue
          pts.set([x, heightAt(x, z), z], k * 3)
          rnd[k] = hash(i * 1.7 + 3, j * 2.3 + 9)
          k++
        }
      }
      const geo = new BufferGeometry()
      geo.setAttribute('position', new BufferAttribute(pts.slice(0, k * 3), 3))
      geo.setAttribute('aRand', new BufferAttribute(rnd.slice(0, k), 1))
      const mat = new ShaderMaterial({
        uniforms,
        vertexShader: pointsVertex,
        fragmentShader: pointsFragment,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      })
      world.add(new Points(geo, mat))
      disposables.push(geo, mat)
    } else {
      /* ---------- malha do terreno ---------- */
      const seg = small ? 120 : 200
      const geo = new PlaneGeometry(SIZE, SIZE, seg, seg)
      geo.rotateX(-Math.PI / 2)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)))
      }
      const mat = new ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      })
      world.add(new Mesh(geo, mat))
      disposables.push(geo, mat)
    }

    /* ---------- perímetro do imóvel, assentado no relevo ---------- */
    const LIFT = 0.035
    const linePts = []
    const STEPS = 28
    for (let i = 0; i < PARCEL.length; i++) {
      const [ax, az] = PARCEL[i]
      const [bx, bz] = PARCEL[(i + 1) % PARCEL.length]
      for (let s = 0; s < STEPS; s++) {
        const t = s / STEPS
        const x = ax + (bx - ax) * t
        const z = az + (bz - az) * t
        linePts.push(x, heightAt(x, z) + LIFT, z)
      }
    }
    linePts.push(linePts[0], linePts[1], linePts[2])
    const lineGeo = new LineGeometry()
    lineGeo.setPositions(linePts)
    const totalSegments = linePts.length / 3 - 1
    const lineMat = new LineMaterial({
      color: accent,
      linewidth: small ? 2 : 2.4,
      transparent: true,
    })
    const boundary = new Line2(lineGeo, lineMat)
    lineGeo.instanceCount = 0
    if (!isPoints) world.add(boundary)

    /* ---------- marcos (vértices) ---------- */
    const STAKE = 0.42
    const markerPos = new Float32Array(PARCEL.length * 3)
    const stakePos = new Float32Array(PARCEL.length * 6)
    PARCEL.forEach(([x, z], i) => {
      const y = heightAt(x, z) + LIFT
      markerPos.set([x, y + STAKE, z], i * 3)
      stakePos.set([x, y, z, x, y + STAKE, z], i * 6)
    })
    const markerGeo = new BufferGeometry()
    markerGeo.setAttribute('position', new BufferAttribute(markerPos, 3))
    const markerMat = new PointsMaterial({
      color: paper,
      size: 6,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
    })
    const markers = new Points(markerGeo, markerMat)
    const stakeGeo = new BufferGeometry()
    stakeGeo.setAttribute('position', new BufferAttribute(stakePos, 3))
    const stakeMat = new LineBasicMaterial({ color: paper, transparent: true, opacity: 0 })
    const stakes = new LineSegments(stakeGeo, stakeMat)
    if (!isPoints) world.add(markers, stakes)

    /* ---------- ponto de leitura que segue o cursor ---------- */
    const probe = new Group()
    const ringGeo = new RingGeometry(0.13, 0.155, 40)
    ringGeo.rotateX(-Math.PI / 2)
    const ringMat = new MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.95,
      side: DoubleSide,
      depthTest: false,
    })
    const ring = new Mesh(ringGeo, ringMat)
    const plumbGeo = new BufferGeometry()
    plumbGeo.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([0, 0, 0, 0, 0.7, 0]), 3)
    )
    const plumbMat = new LineBasicMaterial({ color: accent, transparent: true, depthTest: false })
    const plumb = new LineSegments(plumbGeo, plumbMat)
    probe.add(ring, plumb)
    probe.visible = false
    world.add(probe)

    /* ---------- estado ---------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, ndc: new Vector2(), active: false }
    const raycaster = new Raycaster()
    const probeTarget = new Vector3()
    const o = new Vector3()
    const d = new Vector3()
    let probeHit = false
    let lastAlt = null
    let width = 1
    let height = 1
    let wide = true
    let visible = true
    let raf = 0
    let start = performance.now()
    let scrollP = 0
    let ready = false

    const layout = () => {
      width = host.clientWidth || 1
      height = host.clientHeight || 1
      wide = width / height > 1.15
      renderer.setSize(width, height, false)
      lineMat.resolution.set(width, height)
      uniforms.uSize.value = 26 * dpr * Math.max(0.75, Math.min(1.4, height / 800))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      // no desktop o relevo fica à direita, liberando o título à esquerda
      world.position.set(wide ? 3.3 : 0, wide ? -0.5 : 1.9, 0)
    }

    // interseção raio × relevo por marcha + bisseção (sem BVH, sem custo)
    const castProbe = () => {
      raycaster.setFromCamera(pointer.ndc, camera)
      world.updateMatrixWorld()
      const inv = world.matrixWorld.clone().invert()
      o.copy(raycaster.ray.origin).applyMatrix4(inv)
      d.copy(raycaster.ray.direction).transformDirection(inv)
      let prev = 0
      for (let t = 2; t < 32; t += 0.25) {
        const x = o.x + d.x * t
        const y = o.y + d.y * t
        const z = o.z + d.z * t
        if (y < heightAt(x, z)) {
          let a = prev
          let b = t
          for (let k = 0; k < 10; k++) {
            const m = (a + b) / 2
            if (o.y + d.y * m < heightAt(o.x + d.x * m, o.z + d.z * m)) b = m
            else a = m
          }
          const hx = o.x + d.x * b
          const hz = o.z + d.z * b
          if (Math.hypot(hx, hz) > RADIUS * 0.72) return false
          probeTarget.set(hx, heightAt(hx, hz) + 0.02, hz)
          return true
        }
        prev = t
      }
      return false
    }

    const frame = (now) => {
      const t = reduced ? 99 : (now - start) / 1000

      uniforms.uReveal.value = easeOut(t / 2.6)
      const parcelP = easeOut((t - 1.7) / 1.9)
      lineGeo.instanceCount = Math.round(totalSegments * parcelP)
      uniforms.uParcel.value = easeOut((t - 3.1) / 1.2)
      const stakeP = easeOut((t - 3.0) / 0.9)
      markerMat.opacity = stakeP
      stakeMat.opacity = stakeP * 0.55
      stakes.scale.y = 1
      const scanT = t - 4.2
      uniforms.uScan.value = scanT > 0 && !reduced ? ((scanT % 7) / 4.5) * RADIUS : RADIUS
      if (uniforms.uScan.value > RADIUS) uniforms.uScan.value = RADIUS
      // feixe de varredura da nuvem de pontos
      const sweepT = t - 2.4
      uniforms.uSweep.value =
        sweepT > 0 && !reduced ? -RADIUS + ((sweepT % 7.5) / 5) * SIZE : -RADIUS * 2

      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045

      world.rotation.y = (reduced ? 0.5 : 0.5 + t * 0.022) + pointer.x * 0.12
      const dist = wide ? 11.2 : 15.5
      camera.position.set(
        pointer.x * 0.5,
        5.4 + scrollP * 2.6 - pointer.y * 0.35,
        dist - scrollP * 1.4
      )
      camera.lookAt(0, 0.1 + scrollP * 0.6, 0)
      camera.updateMatrixWorld()

      if (pointer.active && !reduced && !isPoints) {
        probeHit = castProbe()
      } else {
        probeHit = false
      }
      if (probeHit) {
        if (!probe.visible) probe.position.copy(probeTarget)
        probe.visible = true
        probe.position.lerp(probeTarget, 0.22)
        probe.position.y = heightAt(probe.position.x, probe.position.z) + 0.02
        const pulse = 1 + Math.sin(now / 320) * 0.08
        ring.scale.set(pulse, 1, pulse)
        const alt = BASE_ALT + probe.position.y * M_PER_UNIT
        const rounded = Math.round(alt * 10) / 10
        if (rounded !== lastAlt) {
          lastAlt = rounded
          cbRef.current.onElevation?.(rounded)
        }
      } else if (probe.visible) {
        probe.visible = false
        lastAlt = null
        cbRef.current.onElevation?.(null)
      }

      renderer.render(scene, camera)
      if (!ready) {
        ready = true
        cbRef.current.onReady?.()
      }
      if (!reduced && visible) raf = requestAnimationFrame(frame)
    }

    const kick = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }

    /* ---------- eventos ---------- */
    const onPointer = (e) => {
      if (e.pointerType === 'touch') return
      const rect = host.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
      pointer.active = ny <= 1 && ny >= -1
      pointer.tx = Math.max(-1, Math.min(1, nx))
      pointer.ty = Math.max(-1, Math.min(1, ny))
      pointer.ndc.set(nx, -ny)
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onScroll = () => {
      const top = host.getBoundingClientRect().top
      scrollP = Math.max(0, Math.min(1, -top / (window.innerHeight || 1)))
    }
    const onVisibility = () => {
      if (!document.hidden && visible && !reduced) kick()
      else cancelAnimationFrame(raf)
    }

    const ro = new ResizeObserver(() => {
      layout()
      if (reduced) kick()
    })
    ro.observe(host)
    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      if (visible && !reduced && !document.hidden) kick()
      else if (!visible) cancelAnimationFrame(raf)
    })
    io.observe(host)

    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    layout()
    onScroll()
    start = performance.now()
    kick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      ;[...disposables, lineGeo, markerGeo, stakeGeo, ringGeo, plumbGeo].forEach((g) => g.dispose())
      ;[lineMat, markerMat, stakeMat, ringMat, plumbMat].forEach((m) => m.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [mode, seed])

  return <div className="terrain-3d-canvas" ref={hostRef} />
}

export default TerrainScene
