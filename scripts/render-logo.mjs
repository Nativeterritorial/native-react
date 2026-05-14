import sharp from 'sharp'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

function buildSvg(layout) {
  if (layout === 'og') {
    return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
      <rect width="1200" height="630" fill="#0a0a0a"/>
      <g transform="translate(600 315)">
        <circle cx="-380" cy="0" r="40" fill="#a8c97f"/>
        <text x="-320" y="0" fill="#f5f5f0"
              font-family="Space Grotesk, Inter, Arial, sans-serif"
              font-weight="700"
              font-size="130"
              letter-spacing="-4"
              dominant-baseline="central">NATIVE</text>
        <text x="-320" y="92" fill="#9a9a93"
              font-family="Space Grotesk, Inter, Arial, sans-serif"
              font-weight="500"
              font-size="26"
              letter-spacing="6"
              dominant-baseline="central">INTELIGÊNCIA TERRITORIAL E AMBIENTAL · RS</text>
      </g>
    </svg>`)
  }
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <rect width="1024" height="1024" fill="#0a0a0a"/>
    <g transform="translate(512 512)">
      <circle cx="-300" cy="0" r="56" fill="#a8c97f"/>
      <text x="-220" y="0" fill="#f5f5f0"
            font-family="Space Grotesk, Inter, Arial, sans-serif"
            font-weight="700"
            font-size="170"
            letter-spacing="-5"
            dominant-baseline="central">NATIVE</text>
    </g>
  </svg>`)
}

const targets = [
  { name: 'native-og.png',         w: 1200, h: 630, layout: 'og' },
  { name: 'apple-touch-icon.png',  w: 180,  h: 180, layout: 'square' },
  { name: 'favicon-32.png',        w: 32,   h: 32,  layout: 'square' },
  { name: 'favicon-192.png',       w: 192,  h: 192, layout: 'square' },
  { name: 'favicon-512.png',       w: 512,  h: 512, layout: 'square' },
  { name: 'favicon.png',           w: 64,   h: 64,  layout: 'square' },
]

for (const t of targets) {
  const buf = buildSvg(t.layout)
  await sharp(buf, { density: 400 })
    .resize(t.w, t.h, { fit: 'contain', background: '#0a0a0a' })
    .png()
    .toFile(join(publicDir, t.name))
  console.log(`✓ ${t.name} (${t.w}x${t.h})`)
}
