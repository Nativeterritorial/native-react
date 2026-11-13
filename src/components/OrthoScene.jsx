import { useEffect, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'

/* ------------------------------------------------------------------
   Maquete de um levantamento real: ortofoto de drone aplicada sobre o
   relevo do planialtimétrico, com divisa, curso d'água e APP.
   Dados em /public/maquete/<nome>/ (maquete.json, relevo.png, orto.jpg).
   ------------------------------------------------------------------ */
const WIDTH = 10 // largura do modelo em unidades da cena
const EXAGGERATION = 1.7 // exagero vertical, para o relevo ler bem na tela
const MAX_POLY = 48

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  varying vec2 vUv;
  void main() {
    vPos = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  #define MAX_POLY ${MAX_POLY}
  uniform sampler2D uMap;
  uniform vec3 uBg;
  uniform vec3 uLine;
  uniform vec3 uSun;
  uniform float uMeter;     // 1 metro de cota em unidades da cena
  uniform float uZMid;     // cota (m) no plano y = 0 da malha
  uniform float uReveal;
  uniform float uParcel;
  uniform float uSpan;
  uniform int uPolyN;
  uniform vec2 uPoly[MAX_POLY];
  varying vec3 vPos;
  varying vec2 vUv;

  float contour(float h, float w) {
    float f = fract(h);
    float d = min(f, 1.0 - f) / max(fwidth(h), 1e-5);
    return 1.0 - smoothstep(w - 0.5, w + 0.5, d);
  }

  float insideParcel(vec2 p) {
    float inside = 0.0;
    for (int i = 0; i < MAX_POLY; i++) {
      if (i >= uPolyN) break;
      vec2 a = uPoly[i];
      vec2 b = uPoly[i + 1 == uPolyN ? 0 : i + 1];
      if (((a.y > p.y) != (b.y > p.y)) &&
          (p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x)) {
        inside = 1.0 - inside;
      }
    }
    return inside;
  }

  void main() {
    // bordas do recorte se dissolvem no fundo
    vec2 e = min(vUv, 1.0 - vUv);
    float fade = smoothstep(0.0, 0.07, e.x) * smoothstep(0.0, 0.12, e.y);
    fade *= smoothstep(0.0, 1.2, uReveal * uSpan * 1.25 - length(vPos.xz));
    if (fade < 0.004) discard;

    vec3 col = texture2D(uMap, vUv).rgb;

    // sombreado leve do relevo por cima da foto
    vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
    if (n.y < 0.0) n = -n;
    col *= 0.78 + 0.42 * max(dot(n, uSun), 0.0);

    float inside = insideParcel(vPos.xz);
    float lit = inside * uParcel;

    // curvas de nível: mestras a cada 5 m, intermediárias de 1 m dentro do imóvel
    float m = vPos.y / uMeter + uZMid;
    float crowd = 1.0 - smoothstep(0.3, 0.7, fwidth(m));
    float minor = contour(m, 0.7) * crowd * 0.12 * lit;
    float major = contour(m / 5.0, 1.0) * mix(0.14, 0.34, lit);
    col = mix(col, uLine, max(minor, major));

    // o imóvel fica em destaque; o entorno recua para o fundo
    vec3 dim = mix(col, vec3(dot(col, vec3(0.3, 0.59, 0.11))), 0.55);
    dim = mix(dim, uBg, 0.66);
    col = mix(dim, col, lit);

    gl_FragColor = vec4(col, fade);
    #include <colorspace_fragment>
  }
`

const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// relevo.png guarda a cota normalizada em 16 bits (R = byte alto, G = byte baixo)
function decodeHeights(img, zMin, zMax) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(img, 0, 0)
  const px = ctx.getImageData(0, 0, img.width, img.height).data
  const out = new Float32Array(img.width * img.height)
  for (let i = 0; i < out.length; i++) {
    out[i] = zMin + (((px[i * 4] << 8) | px[i * 4 + 1]) / 65535) * (zMax - zMin)
  }
  return out
}

function OrthoScene({ base = '/maquete/demo', onReady, onElevation }) {
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
      return // sem WebGL: a seção segue com o fundo original
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
    const bg = cssColor('--terrain-bg', css.getPropertyValue('--ink').trim() || '#141414')
    const paper = cssColor('--paper', '#f5f5f0')
    const accent = cssColor('--terracotta', '#5E9A6B')

    const scene = new Scene()
    const camera = new PerspectiveCamera(34, 1, 0.1, 80)
    const world = new Group()
    scene.add(world)

    const disposables = []
    let cancelled = false
    let raf = 0
    let visible = true
    let built = null // preenchido quando os dados chegam

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, ndc: new Vector2(), active: false }
    let scrollP = 0
    let width = 1
    let height = 1
    let wide = true

    const layout = () => {
      width = host.clientWidth || 1
      height = host.clientHeight || 1
      wide = width / height > 1.15
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      built?.lineMats.forEach((m) => m.resolution.set(width, height))
      // no desktop a maquete fica à direita, liberando o título à esquerda
      world.position.set(wide ? 3.1 : 0, wide ? 0.2 : 1.8, 0)
      world.scale.setScalar(wide ? 0.84 : 1)
    }

    const build = (meta, heightImg, texture) => {
      const [gw, gh] = meta.grid
      const depth = (WIDTH * meta.heightM) / meta.widthM
      const unit = WIDTH / meta.widthM // unidades por metro
      const meter = unit * EXAGGERATION // unidades por metro de cota
      const zMid = (meta.zMin + meta.zMax) / 2
      const heights = decodeHeights(heightImg, meta.zMin, meta.zMax)

      // cota real (m) em qualquer ponto, por interpolação bilinear da grade
      const cotaAt = (x, z) => {
        const fx = Math.min(Math.max((x / WIDTH + 0.5) * (gw - 1), 0), gw - 1.001)
        const fz = Math.min(Math.max((z / depth + 0.5) * (gh - 1), 0), gh - 1.001)
        const i = Math.floor(fx)
        const j = Math.floor(fz)
        const a = heights[j * gw + i]
        const b = heights[j * gw + i + 1]
        const c = heights[(j + 1) * gw + i]
        const d = heights[(j + 1) * gw + i + 1]
        const u = fx - i
        const v = fz - j
        return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
      }
      const yAt = (x, z) => (cotaAt(x, z) - zMid) * meter
      const toXZ = ([u, v]) => [(u - 0.5) * WIDTH, (v - 0.5) * depth]

      /* ---------- terreno com a ortofoto ---------- */
      const geo = new PlaneGeometry(WIDTH, depth, gw - 1, gh - 1)
      geo.rotateX(-Math.PI / 2)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) pos.setY(i, (heights[i] - zMid) * meter)

      const poly = meta.boundary.slice(0, MAX_POLY).map((p) => new Vector2(...toXZ(p)))
      const polyN = poly.length
      while (poly.length < MAX_POLY) poly.push(new Vector2())
      const uniforms = {
        uMap: { value: texture },
        uBg: { value: bg },
        uLine: { value: paper },
        uSun: { value: new Vector3(-0.5, 0.65, 0.4).normalize() },
        uMeter: { value: meter },
        uZMid: { value: zMid },
        uReveal: { value: 0 },
        uParcel: { value: 0 },
        uSpan: { value: Math.hypot(WIDTH, depth) / 2 },
        uPolyN: { value: polyN },
        uPoly: { value: poly },
      }
      const mat = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true })
      world.add(new Mesh(geo, mat))
      disposables.push(geo, mat, texture)

      /* ---------- linhas assentadas no relevo ---------- */
      const lineMats = []
      const draped = (pts, lift, closed) => {
        const out = []
        const src = closed ? [...pts, pts[0]] : pts
        for (let i = 0; i < src.length - 1; i++) {
          const [ax, az] = toXZ(src[i])
          const [bx, bz] = toXZ(src[i + 1])
          const steps = Math.max(1, Math.round(Math.hypot(bx - ax, bz - az) / 0.06))
          for (let s = 0; s < steps; s++) {
            const t = s / steps
            const x = ax + (bx - ax) * t
            const z = az + (bz - az) * t
            out.push(x, yAt(x, z) + lift, z)
          }
        }
        const [lx, lz] = toXZ(src[src.length - 1])
        out.push(lx, yAt(lx, lz) + lift, lz)
        return out
      }
      const addLine = (pts, opts, lift, closed) => {
        const g = new LineGeometry()
        g.setPositions(draped(pts, lift, closed))
        const m = new LineMaterial({ transparent: true, ...opts })
        const line = new Line2(g, m)
        if (opts.dashed) line.computeLineDistances()
        world.add(line)
        lineMats.push(m)
        disposables.push(g, m)
        return { g, m, total: g.attributes.instanceStart.count }
      }

      const boundary = addLine(meta.boundary, { color: accent, linewidth: small ? 2 : 2.8 }, 0.04, true)
      boundary.g.instanceCount = 0
      const app = meta.app.map((l) =>
        addLine(l, { color: 0xf2d24a, linewidth: 1.6, dashed: true, dashSize: 0.09, gapSize: 0.06, opacity: 0 }, 0.035, false)
      )
      const stream = addLine(meta.stream, { color: 0x58b8ff, linewidth: small ? 2 : 2.6, opacity: 0 }, 0.045, false)

      // nascente
      const [sx, sz] = toXZ(meta.spring)
      const springGeo = new RingGeometry(0.05, 0.085, 28)
      springGeo.rotateX(-Math.PI / 2)
      const springMat = new MeshBasicMaterial({
        color: 0x58b8ff,
        transparent: true,
        opacity: 0,
        side: DoubleSide,
        depthTest: false,
      })
      const spring = new Mesh(springGeo, springMat)
      spring.position.set(sx, yAt(sx, sz) + 0.05, sz)
      world.add(spring)
      disposables.push(springGeo, springMat)

      /* ---------- ponto de leitura que segue o cursor ---------- */
      const probe = new Group()
      const ringGeo = new RingGeometry(0.1, 0.125, 40)
      ringGeo.rotateX(-Math.PI / 2)
      const ringMat = new MeshBasicMaterial({
        color: paper,
        transparent: true,
        side: DoubleSide,
        depthTest: false,
      })
      const ring = new Mesh(ringGeo, ringMat)
      const plumbGeo = new BufferGeometry()
      plumbGeo.setAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0, 0, 0.55, 0]), 3))
      const plumbMat = new LineBasicMaterial({ color: paper, transparent: true, depthTest: false })
      probe.add(ring, new LineSegments(plumbGeo, plumbMat))
      probe.visible = false
      world.add(probe)
      disposables.push(ringGeo, ringMat, plumbGeo, plumbMat)

      return { uniforms, lineMats, boundary, app, stream, springMat, probe, ring, yAt, cotaAt, depth }
    }

    const raycaster = new Raycaster()
    const probeTarget = new Vector3()
    const o = new Vector3()
    const d = new Vector3()
    let lastAlt = null
    let start = 0
    let ready = false

    // interseção raio × relevo por marcha + bisseção
    const castProbe = () => {
      const { yAt, depth } = built
      raycaster.setFromCamera(pointer.ndc, camera)
      world.updateMatrixWorld()
      const inv = world.matrixWorld.clone().invert()
      o.copy(raycaster.ray.origin).applyMatrix4(inv)
      d.copy(raycaster.ray.direction).transformDirection(inv)
      let prev = 0
      for (let t = 2; t < 30; t += 0.25) {
        if (o.y + d.y * t < yAt(o.x + d.x * t, o.z + d.z * t)) {
          let a = prev
          let b = t
          for (let k = 0; k < 10; k++) {
            const m = (a + b) / 2
            if (o.y + d.y * m < yAt(o.x + d.x * m, o.z + d.z * m)) b = m
            else a = m
          }
          const hx = o.x + d.x * b
          const hz = o.z + d.z * b
          if (Math.abs(hx) > WIDTH * 0.46 || Math.abs(hz) > depth * 0.44) return false
          probeTarget.set(hx, yAt(hx, hz) + 0.02, hz)
          return true
        }
        prev = t
      }
      return false
    }

    const frame = (now) => {
      const b = built
      const t = reduced ? 99 : (now - start) / 1000

      b.uniforms.uReveal.value = easeOut(t / 2.2)
      b.boundary.g.instanceCount = Math.round(b.boundary.total * easeOut((t - 1.3) / 1.8))
      b.uniforms.uParcel.value = easeOut((t - 2.1) / 1.4)
      const extras = easeOut((t - 3.0) / 1.2)
      b.app.forEach((l) => (l.m.opacity = extras * 0.9))
      b.stream.m.opacity = extras
      b.springMat.opacity = extras

      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045

      // balanço lento em vez de giro completo: o lote é largo e tem "frente"
      const sway = reduced ? 0 : Math.sin(t * 0.16) * 0.22
      world.rotation.y = -0.28 + sway + pointer.x * 0.14
      const dist = wide ? 8.4 : 13.5
      camera.position.set(pointer.x * 0.45, 7.4 + scrollP * 2.2 - pointer.y * 0.3, dist - scrollP * 1.2)
      camera.lookAt(0, 0.1 + scrollP * 0.5, 0)
      camera.updateMatrixWorld()

      const hit = pointer.active && !reduced ? castProbe() : false
      if (hit) {
        if (!b.probe.visible) b.probe.position.copy(probeTarget)
        b.probe.visible = true
        b.probe.position.lerp(probeTarget, 0.22)
        b.probe.position.y = b.yAt(b.probe.position.x, b.probe.position.z) + 0.02
        const pulse = 1 + Math.sin(now / 320) * 0.08
        b.ring.scale.set(pulse, 1, pulse)
        const rounded = Math.round(b.cotaAt(b.probe.position.x, b.probe.position.z) * 10) / 10
        if (rounded !== lastAlt) {
          lastAlt = rounded
          cbRef.current.onElevation?.(rounded)
        }
      } else if (b.probe.visible) {
        b.probe.visible = false
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
      if (!built) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(frame)
    }

    /* ---------- carga dos dados ---------- */
    Promise.all([
      fetch(`${base}/maquete.json`).then((r) => r.json()),
      loadImage(`${base}/relevo.png`),
      new TextureLoader().loadAsync(`${base}/${small ? 'orto-sm.jpg' : 'orto.jpg'}`),
    ])
      .then(([meta, heightImg, texture]) => {
        if (cancelled) {
          texture.dispose()
          return
        }
        texture.colorSpace = SRGBColorSpace
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
        built = build(meta, heightImg, texture)
        layout()
        start = performance.now()
        kick()
      })
      .catch(() => {
        // sem os dados da maquete a seção segue com o fundo original
      })

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

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      disposables.forEach((x) => x.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [base])

  return <div className="terrain-3d-canvas" ref={hostRef} />
}

export default OrthoScene
