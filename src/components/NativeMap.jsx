import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Coordenadas Rua Dr. José Montaury, 595, Veranópolis-RS
const POSITION = [-28.9358, -51.5536]
const ZOOM = 15

function NativeMap() {
  const mapEl = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current || !mapEl.current) return

    const map = L.map(mapEl.current, {
      center: POSITION,
      zoom: ZOOM,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true,
    })
    mapRef.current = map

    // Tiles dark (CartoDB Dark Matter — free, sem API key)
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      },
    ).addTo(map)

    // Labels (cidades / ruas) em layer separado, mais sutil
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
      {
        attribution: '',
        subdomains: 'abcd',
        maxZoom: 19,
        opacity: 0.6,
      },
    ).addTo(map)

    // Pin pulsante via DivIcon (HTML/CSS — total controle visual)
    const pulseIcon = L.divIcon({
      className: 'native-pulse-pin',
      html:
        '<span class="pulse-ring"></span>' +
        '<span class="pulse-ring delay"></span>' +
        '<span class="pulse-dot"></span>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })

    L.marker(POSITION, { icon: pulseIcon, keyboard: false, interactive: true })
      .addTo(map)
      .bindTooltip(
        '<strong>NATIVE</strong><br/>Rua Dr. José Montaury, 595<br/>Veranópolis · RS',
        {
          permanent: false,
          direction: 'top',
          offset: [0, -8],
          className: 'native-pulse-tooltip',
        },
      )

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={mapEl} className="native-map-canvas" />
}

export default NativeMap
