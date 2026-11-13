import { useEffect, useRef } from 'react'
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Raycaster,
  RingGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three'
import { Line2 } from 'three/addons/lines/Line2.js'
import { LineGeometry } from 'three/addons/lines/LineGeometry.js'
import { LineMaterial } from 'three/addons/lines/LineMaterial.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'

/* ------------------------------------------------------------------
   Maquete de uma propriedade rural da Serra: relevo procedural com
   talhões (lavoura, pasto, parreiral, mata), rio com mata ciliar,
   açude, sede com galpão e silo, araucárias e a divisa com marcos.
   As mesmas funções alimentam a malha, os objetos e a leitura de cota.
   ------------------------------------------------------------------ */
const SIZE = 16
const RADIUS = SIZE / 2
const INTERVAL = 0.11 // equidistância das curvas (unidades do modelo)
const BASE_ALT = 705 // altitude aproximada de Veranópolis (m)
const M_PER_UNIT = 38
const NC = 20 // talhões (células de Voronoi)

// Uso do solo de cada talhão
const PASTO = 0
const MATA = 5
const USES = [0, 0, 0, 1, 1, 2, 3, 3, 4, 4, 5] // sorteio ponderado

// Perímetro do imóvel (coordenadas locais x,z)
const PARCEL = [
  [-1.7, -1.0],
  [0.1, -1.7],
  [1.8, -0.8],
  [2.0, 0.8],
  [0.4, 1.5],
  [-1.5, 0.9],
]
const POND = { x: -0.7, z: 0.3, r: 0.27 } // açude
const YARD = { x: 0.95, z: -0.45, r: 0.36 } // pátio da sede
const ROAD = [
  [YARD.x, YARD.z],
  [1.25, -1.05],
  [2.2, -2.4],
  [2.7, -4.8],
]
const SUN = new Vector3(-0.55, 0.62, 0.45).normalize()

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
const smooth = (a, b, x) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1)
  return t * t * (3 - 2 * t)
}
function inParcel(x, z) {
  let inside = false
  for (let i = 0, j = PARCEL.length - 1; i < PARCEL.length; j = i++) {
    const [ax, az] = PARCEL[i]
    const [bx, bz] = PARCEL[j]
    if (az > z !== bz > z && x < ((bx - ax) * (z - az)) / (bz - az) + ax) inside = !inside
  }
  return inside
}
function distToRoad(x, z) {
  let best = Infinity
  for (let i = 0; i < ROAD.length - 1; i++) {
    const [ax, az] = ROAD[i]
    const [bx, bz] = ROAD[i + 1]
    const dx = bx - ax
    const dz = bz - az
    const t = Math.min(Math.max(((x - ax) * dx + (z - az) * dz) / (dx * dx + dz * dz), 0), 1)
    best = Math.min(best, Math.hypot(x - ax - dx * t, z - az - dz * t))
  }
  return best
}

// cada seed gera uma paisagem diferente (uma "folha" por página)
function makeLand(seed) {
  const ox = 3.1 + seed * 17.3
  const oz = 7.7 + seed * 9.1
  const phase = 0.6 + seed * 1.7

  // distância ao eixo do rio que corta o vale
  const riverDist = (x, z) => Math.abs(z - 3.4 - Math.sin(x * 0.45 + phase) * 1.3)
  const base = (x, z) => {
    const hills = (fbm(x * 0.24 + ox, z * 0.24 + oz) - 0.48) * 2.9
    const d = riverDist(x, z)
    return hills - Math.exp(-(d * d) / 1.6) * 1.2
  }
  // açude e pátio da sede ficam em terreno aplainado
  const flats = [
    { ...POND, r: POND.r + 0.22, h: base(POND.x, POND.z) - 0.05 },
    { ...YARD, r: YARD.r + 0.2, h: base(YARD.x, YARD.z) },
  ]
  const heightAt = (x, z) => {
    let h = base(x, z)
    for (const f of flats) {
      const w = 1 - smooth(f.r * 0.55, f.r, Math.hypot(x - f.x, z - f.z))
      h += (f.h - h) * w
    }
    return h
  }
  const upAt = (x, z) => {
    const e = 0.06
    const gx = (heightAt(x + e, z) - heightAt(x - e, z)) / (2 * e)
    const gz = (heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e)
    return 1 / Math.sqrt(1 + gx * gx + gz * gz)
  }

  // talhões: sementes espalhadas com distância mínima entre si
  const cells = []
  for (let i = 0; cells.length < NC && i < 600; i++) {
    const a = hash(i + seed * 3.1, 1.7) * Math.PI * 2
    const r = Math.sqrt(hash(i * 1.3 + 5, seed + 2.9)) * 6.4
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (cells.some((c) => Math.hypot(c.x - x, c.z - z) < 1.55)) continue
    cells.push({
      x,
      z,
      use: USES[Math.floor(hash(i + 9.1, seed * 2.3 + 4) * USES.length)],
      angle: hash(i * 2.7, seed + 8.8) * Math.PI,
    })
  }
  while (cells.length < NC) cells.push({ x: 99, z: 99, use: PASTO, angle: 0 })

  const cellAt = (x, z) => {
    let d1 = Infinity
    let d2 = Infinity
    let cell = cells[0]
    for (const c of cells) {
      const d = Math.hypot(c.x - x, c.z - z)
      if (d < d1) {
        d2 = d1
        d1 = d
        cell = c
      } else if (d < d2) d2 = d
    }
    return { cell, edge: d2 - d1 }
  }
  // o açude fica em pasto
  cellAt(POND.x, POND.z).cell.use = PASTO

  return { heightAt, upAt, riverDist, cells, cellAt, phase }
}

const vertexShader = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  #define NC ${NC}
  uniform vec3 uBg;
  uniform vec3 uLine;
  uniform vec3 uSun;
  uniform float uInterval;
  uniform float uRadius;
  uniform float uReveal;
  uniform float uParcel;
  uniform float uFocus;
  uniform float uPhase;
  uniform vec2 uPoly[6];
  uniform vec4 uCells[NC];
  uniform vec3 uPond;
  uniform vec3 uYard;
  uniform vec2 uRoad[4];
  varying vec3 vPos;

  // cores escritas em sRGB, convertidas para o espaço linear do cálculo
  vec3 c(float r, float g, float b) { return pow(vec3(r, g, b), vec3(2.2)); }

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

  float sdSeg(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  vec3 fieldColor(float use, float stripe) {
    if (use < 0.5) return c(0.44, 0.56, 0.31);                                   // pasto
    if (use < 1.5) return mix(c(0.33, 0.46, 0.22), c(0.49, 0.63, 0.32), stripe); // lavoura
    if (use < 2.5) return mix(c(0.37, 0.27, 0.18), c(0.53, 0.41, 0.28), stripe); // solo preparado
    if (use < 3.5) return mix(c(0.63, 0.52, 0.27), c(0.78, 0.67, 0.38), stripe); // trigo
    if (use < 4.5) return mix(c(0.25, 0.21, 0.15), c(0.34, 0.49, 0.25), stripe); // parreiral
    return c(0.17, 0.28, 0.17);                                                  // mata
  }

  void main() {
    vec2 p = vPos.xz;
    float r = length(p);
    float fade = 1.0 - smoothstep(uRadius * 0.5, uRadius * 0.98, r);
    fade *= smoothstep(0.0, 0.9, uReveal * uRadius * 1.15 - r);
    if (fade < 0.004) discard;

    // talhão mais próximo e distância até a divisa entre talhões
    float d1 = 1e9;
    float d2 = 1e9;
    vec4 cell = uCells[0];
    for (int i = 0; i < NC; i++) {
      float d = distance(p, uCells[i].xy);
      if (d < d1) { d2 = d1; d1 = d; cell = uCells[i]; }
      else if (d < d2) { d2 = d; }
    }
    float hedge = 1.0 - smoothstep(0.03, 0.075, d2 - d1);

    // linhas de plantio
    float freq = (cell.z > 3.5 && cell.z < 4.5) ? 86.0 : 58.0;
    float ph = dot(p, vec2(cos(cell.w), sin(cell.w))) * freq;
    float stripe = smoothstep(-0.35, 0.35, sin(ph));
    stripe = mix(stripe, 0.5, smoothstep(0.9, 2.4, fwidth(ph)));
    vec3 col = fieldColor(cell.z, stripe);

    vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
    if (n.y < 0.0) n = -n;
    vec3 mata = c(0.17, 0.28, 0.17);

    // encostas íngremes e margens do rio ficam com mata nativa
    col = mix(col, mata, smoothstep(0.82, 0.70, n.y));
    col = mix(col, c(0.14, 0.22, 0.14), hedge * 0.85);
    float rd = abs(p.y - 3.4 - sin(p.x * 0.45 + uPhase) * 1.3);
    col = mix(col, mata, 1.0 - smoothstep(0.45, 0.85, rd));

    // pátio da sede e estrada de acesso
    float yard = 1.0 - smoothstep(uYard.z * 0.7, uYard.z, distance(p, uYard.xy));
    float rdist = min(sdSeg(p, uRoad[0], uRoad[1]), min(sdSeg(p, uRoad[1], uRoad[2]), sdSeg(p, uRoad[2], uRoad[3])));
    float road = 1.0 - smoothstep(0.03, 0.055, rdist);
    col = mix(col, c(0.60, 0.51, 0.37), max(yard * 0.92, road));

    // rio e açude
    float water = 1.0 - smoothstep(0.19, 0.25, rd);
    float pd = length((p - uPond.xy) / vec2(1.0, 0.74));
    water = max(water, 1.0 - smoothstep(uPond.z - 0.035, uPond.z, pd));
    col = mix(col, c(0.20, 0.36, 0.42), water);

    // sol baixo de fim de tarde
    float diff = max(dot(n, uSun), 0.0);
    col *= 0.42 + 0.8 * diff;

    // curvas de nível discretas, como na planta
    float h = vPos.y / uInterval;
    float crowd = 1.0 - smoothstep(0.3, 0.7, fwidth(h));
    float lines = max(contour(h, 0.7) * crowd * 0.09, contour(h / 5.0, 1.0) * 0.16) * (1.0 - water);
    col = mix(col, uLine, lines);

    // o imóvel fica iluminado; o entorno recua para o fundo
    float lit = mix(1.0, insideParcel(p) * uParcel, uFocus);
    vec3 dim = mix(col, vec3(dot(col, vec3(0.3, 0.59, 0.11))), 0.35);
    dim = mix(dim, uBg, mix(0.56, 0.62, uFocus));
    col = mix(dim, col, lit);

    gl_FragColor = vec4(col, fade);
    #include <colorspace_fragment>
  }
`

const easeOut = (t) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

// junta partes coloridas numa geometria só (cor por vértice)
function colored(geo, hex) {
  const g = geo.index ? geo.toNonIndexed() : geo
  const col = new Color(hex)
  const n = g.attributes.position.count
  const arr = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) arr.set([col.r, col.g, col.b], i * 3)
  g.setAttribute('color', new BufferAttribute(arr, 3))
  g.deleteAttribute('uv')
  return g
}
function roof(w, h, d, hex) {
  const g = new ConeGeometry(Math.SQRT1_2, h, 4)
  g.rotateY(Math.PI / 4)
  g.scale(w, 1, d)
  return colored(g, hex)
}

function TerrainScene({ seed = 0, focus = true, onReady, onElevation }) {
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

    const land = makeLand(seed)
    const { heightAt } = land
    const disposables = []

    const scene = new Scene()
    const camera = new PerspectiveCamera(34, 1, 0.1, 60)
    const world = new Group()
    scene.add(world)

    // luz presa ao terreno, para acompanhar o giro da maquete
    const sun = new DirectionalLight(0xfff0d8, 2.5)
    sun.position.copy(SUN).multiplyScalar(10)
    world.add(sun, sun.target)
    world.add(new HemisphereLight(0xdfe8f0, 0x3a3326, 1.35))

    /* ---------- terreno ---------- */
    const uniforms = {
      uBg: { value: bg },
      uLine: { value: paper },
      uSun: { value: SUN },
      uInterval: { value: INTERVAL },
      uRadius: { value: RADIUS },
      uReveal: { value: 0 },
      uParcel: { value: 0 },
      uFocus: { value: focus ? 1 : 0 },
      uPhase: { value: land.phase },
      uPoly: { value: PARCEL.map(([x, z]) => new Vector2(x, z)) },
      uCells: { value: land.cells.map((c) => new Vector4(c.x, c.z, c.use, c.angle)) },
      uPond: { value: new Vector3(POND.x, POND.z, POND.r) },
      // sem a sede (paisagem do CTA) o pátio sai de cena
      uYard: { value: new Vector3(focus ? YARD.x : 99, YARD.z, YARD.r) },
      uRoad: { value: ROAD.map(([x, z]) => new Vector2(x, z)) },
    }
    {
      const seg = small ? 130 : 220
      const geo = new PlaneGeometry(SIZE, SIZE, seg, seg)
      geo.rotateX(-Math.PI / 2)
      const pos = geo.attributes.position
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)))
      }
      const mat = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true })
      world.add(new Mesh(geo, mat))
      disposables.push(geo, mat)
    }

    /* ---------- árvores, cerca e sede ---------- */
    const propMat = new MeshLambertMaterial({ vertexColors: true, flatShading: true })
    disposables.push(propMat)

    // araucária: tronco fino e copas em taça
    const araucariaGeo = mergeGeometries([
      colored(new CylinderGeometry(0.011, 0.018, 0.24, 5).translate(0, 0.12, 0), '#4d3d2c'),
      colored(new ConeGeometry(0.115, 0.06, 7).rotateX(Math.PI).translate(0, 0.235, 0), '#2e5a35'),
      colored(new ConeGeometry(0.075, 0.045, 7).rotateX(Math.PI).translate(0, 0.285, 0), '#3d7042'),
    ])
    // árvore de copa redonda (mata nativa)
    const roundGeo = mergeGeometries([
      colored(new CylinderGeometry(0.012, 0.016, 0.1, 5).translate(0, 0.05, 0), '#4d3d2c'),
      colored(new IcosahedronGeometry(0.075, 0).translate(0, 0.14, 0), '#3b6a3a'),
    ])
    const postGeo = colored(new BoxGeometry(0.014, 0.075, 0.014).translate(0, 0.0375, 0), '#7a664d')
    disposables.push(araucariaGeo, roundGeo, postGeo)

    const trees = [[], []]
    const maxTrees = small ? 420 : 900
    for (let i = 0; trees[0].length + trees[1].length < maxTrees && i < 14000; i++) {
      const a = hash(i * 1.1 + seed, 3.3) * Math.PI * 2
      const r = Math.sqrt(hash(i * 0.7 + 2, seed + 6.1)) * RADIUS * 0.5
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r
      const rd = land.riverDist(x, z)
      if (rd < 0.3) continue
      if (Math.hypot(x - POND.x, (z - POND.z) / 0.74) < POND.r + 0.07) continue
      if (Math.hypot(x - YARD.x, z - YARD.z) < YARD.r + 0.2) continue
      if (distToRoad(x, z) < 0.1) continue
      const { cell, edge } = land.cellAt(x, z)
      const roll = hash(i * 3.7, seed + 1.9)
      const keep =
        (cell.use === MATA && roll < 0.85) ||
        (land.upAt(x, z) < 0.74 && roll < 0.75) ||
        (rd < 0.85 && roll < 0.8) ||
        (edge < 0.07 && roll < 0.32)
      if (!keep) continue
      const kind = hash(i * 5.3, seed + 7.7) < 0.55 ? 0 : 1
      trees[kind].push({
        x,
        z,
        y: heightAt(x, z) - 0.01,
        s: 0.5 + hash(i * 2.9, 4.4) * 0.4,
        rot: hash(i, 9.9) * 6.28,
        lit: !focus || inParcel(x, z),
      })
    }

    const posts = []
    const linePts = []
    const LIFT = 0.03
    for (let i = 0; i < PARCEL.length; i++) {
      const [ax, az] = PARCEL[i]
      const [bx, bz] = PARCEL[(i + 1) % PARCEL.length]
      const len = Math.hypot(bx - ax, bz - az)
      const steps = Math.round(len / 0.07)
      const every = Math.max(1, Math.round(steps / Math.round(len / 0.17)))
      for (let s = 0; s < steps; s++) {
        const t = s / steps
        const x = ax + (bx - ax) * t
        const z = az + (bz - az) * t
        const y = heightAt(x, z)
        linePts.push(x, y + LIFT, z)
        if (s % every === 0 && s > 0) posts.push({ x, y, z, s: 1, rot: 0, lit: true })
      }
    }
    linePts.push(linePts[0], linePts[1], linePts[2])

    const dummy = new Object3D()
    const tint = new Color()
    const origin = new Vector2(0.2, 0)
    const makeInstanced = (geo, items) => {
      const mesh = new InstancedMesh(geo, propMat, Math.max(items.length, 1))
      mesh.count = items.length
      items.forEach((it, i) => {
        tint.setScalar(it.lit ? 1 : 0.34)
        mesh.setColorAt(i, tint)
      })
      world.add(mesh)
      return { mesh, items }
    }
    const instanced = [makeInstanced(araucariaGeo, trees[0]), makeInstanced(roundGeo, trees[1])]
    if (focus) instanced.push(makeInstanced(postGeo, posts))

    // crescem do chão, em onda a partir do centro do imóvel
    const setGrow = (g) => {
      for (const { mesh, items } of instanced) {
        items.forEach((it, i) => {
          const dist = Math.hypot(it.x - origin.x, it.z - origin.y)
          const s = Math.max(it.s * easeOut(g * 2.2 - dist * 0.3), 0.0001)
          dummy.position.set(it.x, it.y, it.z)
          dummy.rotation.set(0, it.rot, 0)
          dummy.scale.setScalar(s)
          dummy.updateMatrix()
          mesh.setMatrixAt(i, dummy.matrix)
        })
        mesh.instanceMatrix.needsUpdate = true
      }
    }

    // sede: casa, galpão e silo
    const farmGeo = mergeGeometries([
      colored(new BoxGeometry(0.2, 0.1, 0.14).translate(0, 0.05, 0), '#e9e3d2'),
      roof(0.25, 0.07, 0.18, '#8f4d34').translate(0, 0.135, 0),
      colored(new BoxGeometry(0.3, 0.12, 0.17).translate(0.02, 0.06, -0.3), '#b7ad9b'),
      roof(0.35, 0.065, 0.21, '#6c6a63').translate(0.02, 0.152, -0.3),
      colored(new CylinderGeometry(0.045, 0.045, 0.2, 10).translate(-0.24, 0.1, -0.24), '#cfcfc8'),
      colored(new ConeGeometry(0.052, 0.045, 10).translate(-0.24, 0.222, -0.24), '#8e8e88'),
    ])
    const farm = new Mesh(farmGeo, propMat)
    farm.position.set(YARD.x, heightAt(YARD.x, YARD.z), YARD.z + 0.12)
    farm.rotation.y = 0.5
    farm.visible = focus
    world.add(farm)
    disposables.push(farmGeo)

    /* ---------- divisa do imóvel e marcos ---------- */
    const lineGeo = new LineGeometry()
    lineGeo.setPositions(linePts)
    const totalSegments = linePts.length / 3 - 1
    const lineMat = new LineMaterial({ color: accent, linewidth: small ? 2 : 2.6, transparent: true })
    const boundary = new Line2(lineGeo, lineMat)
    lineGeo.instanceCount = 0

    const STAKE = 0.4
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
    const stakeGeo = new BufferGeometry()
    stakeGeo.setAttribute('position', new BufferAttribute(stakePos, 3))
    const stakeMat = new LineBasicMaterial({ color: paper, transparent: true, opacity: 0 })
    if (focus) {
      world.add(boundary, new Points(markerGeo, markerMat), new LineSegments(stakeGeo, stakeMat))
    }

    /* ---------- ponto de leitura que segue o cursor ---------- */
    const probe = new Group()
    const ringGeo = new RingGeometry(0.11, 0.135, 40)
    ringGeo.rotateX(-Math.PI / 2)
    const ringMat = new MeshBasicMaterial({
      color: paper,
      transparent: true,
      opacity: 0.95,
      side: DoubleSide,
      depthTest: false,
    })
    const ring = new Mesh(ringGeo, ringMat)
    const plumbGeo = new BufferGeometry()
    plumbGeo.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([0, 0, 0, 0, 0.6, 0]), 3)
    )
    const plumbMat = new LineBasicMaterial({ color: paper, transparent: true, depthTest: false })
    probe.add(ring, new LineSegments(plumbGeo, plumbMat))
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
    let lastGrow = -1
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
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      // no desktop a maquete fica à direita, liberando o título à esquerda
      world.position.set(wide ? 2.7 : 0, wide ? -0.35 : 1.7, 0)
    }

    // interseção raio × relevo por marcha + bisseção
    const castProbe = () => {
      raycaster.setFromCamera(pointer.ndc, camera)
      world.updateMatrixWorld()
      const inv = world.matrixWorld.clone().invert()
      o.copy(raycaster.ray.origin).applyMatrix4(inv)
      d.copy(raycaster.ray.direction).transformDirection(inv)
      let prev = 0
      for (let t = 2; t < 30; t += 0.25) {
        if (o.y + d.y * t < heightAt(o.x + d.x * t, o.z + d.z * t)) {
          let a = prev
          let b = t
          for (let k = 0; k < 10; k++) {
            const m = (a + b) / 2
            if (o.y + d.y * m < heightAt(o.x + d.x * m, o.z + d.z * m)) b = m
            else a = m
          }
          const hx = o.x + d.x * b
          const hz = o.z + d.z * b
          if (Math.hypot(hx, hz) > RADIUS * 0.6) return false
          probeTarget.set(hx, heightAt(hx, hz) + 0.02, hz)
          return true
        }
        prev = t
      }
      return false
    }

    const frame = (now) => {
      const t = reduced ? 99 : (now - start) / 1000

      uniforms.uReveal.value = easeOut(t / 2.4)
      lineGeo.instanceCount = Math.round(totalSegments * easeOut((t - 1.5) / 1.8))
      uniforms.uParcel.value = easeOut((t - 2.3) / 1.4)
      const stakeP = easeOut((t - 2.9) / 0.9)
      markerMat.opacity = stakeP
      stakeMat.opacity = stakeP * 0.55

      const grow = Math.min(Math.max((t - 1.6) / 2.4, 0), 1)
      if (grow !== lastGrow) {
        lastGrow = grow
        setGrow(grow)
        farm.scale.setScalar(Math.max(1.3 * easeOut(grow * 2.2), 0.0001))
      }

      pointer.x += (pointer.tx - pointer.x) * 0.045
      pointer.y += (pointer.ty - pointer.y) * 0.045

      world.rotation.y = (reduced ? 0.45 : 0.45 + t * 0.018) + pointer.x * 0.12
      const dist = wide ? 10.2 : 14.5
      camera.position.set(
        pointer.x * 0.45,
        4.9 + scrollP * 2.2 - pointer.y * 0.3,
        dist - scrollP * 1.2
      )
      camera.lookAt(0, 0.1 + scrollP * 0.5, 0)
      camera.updateMatrixWorld()

      probeHit = pointer.active && !reduced && focus ? castProbe() : false
      if (probeHit) {
        if (!probe.visible) probe.position.copy(probeTarget)
        probe.visible = true
        probe.position.lerp(probeTarget, 0.22)
        probe.position.y = heightAt(probe.position.x, probe.position.z) + 0.02
        const pulse = 1 + Math.sin(now / 320) * 0.08
        ring.scale.set(pulse, 1, pulse)
        const rounded = Math.round((BASE_ALT + probe.position.y * M_PER_UNIT) * 10) / 10
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
      instanced.forEach(({ mesh }) => mesh.dispose())
      ;[
        ...disposables,
        lineGeo,
        lineMat,
        markerGeo,
        markerMat,
        stakeGeo,
        stakeMat,
        ringGeo,
        ringMat,
        plumbGeo,
        plumbMat,
      ].forEach((x) => x.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [seed, focus])

  return <div className="terrain-3d-canvas" ref={hostRef} />
}

export default TerrainScene
