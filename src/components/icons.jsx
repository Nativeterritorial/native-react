// Ícones de linha do site — 24×24, stroke 1.5, cor herdada (currentColor).
// Uso: <Icon name="target" /> — substituem os emojis dos cards.

const paths = {
  // alvo / precisão
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  // escudo / responsabilidade
  shield: (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.5-3 8.1-7 9.8-4-1.7-7-5.3-7-9.8V5.8L12 3z" />
      <path d="M9 11.8l2.2 2.2L15.5 9.5" />
    </>
  ),
  // balão de conversa
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.2 3.5c-.4.3-.8 0-.8-.4V6.5z" />
      <path d="M8.5 9.5h7M8.5 12.5h4.5" />
    </>
  ),
  // pino de mapa
  pin: (
    <>
      <path d="M12 21s7-6.6 7-11.4A7 7 0 1 0 5 9.6C5 14.4 12 21 12 21z" />
      <circle cx="12" cy="9.6" r="2.5" />
    </>
  ),
  // esquadro / medição
  ruler: (
    <>
      <path d="M4.5 19.5v-15l15 15h-15z" />
      <path d="M8 16h.01M8 12.5h.01M8 9h.01M11.5 16h.01M15 16h.01" />
    </>
  ),
  // documento técnico
  doc: (
    <>
      <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5L14 3z" />
      <path d="M14 3v4.5h4.5" />
      <path d="M9 13h6M9 16.5h6" />
    </>
  ),
  // pasta / entrega
  folder: (
    <>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17V6.5z" />
    </>
  ),
  // pessoas / atendimento direto
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.9c1.8.8 3 2.4 3 4.6" />
    </>
  ),
  // satélite / GNSS
  satellite: (
    <>
      <rect x="9.2" y="9.2" width="5.6" height="5.6" rx="0.8" transform="rotate(45 12 12)" />
      <path d="M6.2 9.4L3 6.2l3.2-3.2 3.2 3.2M17.8 14.6l3.2 3.2-3.2 3.2-3.2-3.2" />
      <path d="M12 7.2l-1.6-1.6M16.8 12l1.6 1.6" />
    </>
  ),
  // mapa dobrado
  map: (
    <>
      <path d="M9 4.5L3.5 6.5v13L9 17.5l6 2 5.5-2v-13l-5.5 2-6-2z" />
      <path d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  // balança / jurídico
  scale: (
    <>
      <path d="M12 4v16M7.5 20.5h9" />
      <path d="M5 7h14" />
      <path d="M5 7l-2.5 5.5a2.8 2.8 0 0 0 5 0L5 7zM19 7l-2.5 5.5a2.8 2.8 0 0 0 5 0L19 7z" />
    </>
  ),
  // broto / ambiental
  sprout: (
    <>
      <path d="M12 21v-8" />
      <path d="M12 13c0-3.5-2.5-6-6.5-6C5.5 10.5 8 13 12 13z" />
      <path d="M12 10.5c0-3 2-5.5 5.5-5.5 0 3-2 5.5-5.5 5.5z" />
    </>
  ),
  // montanhas / paisagem
  mountains: (
    <>
      <path d="M3 19l6-10 4 6.5L16 11l5 8H3z" />
      <circle cx="17.5" cy="6" r="1.8" />
    </>
  ),
  // conferido
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.5 2.5 4.8-5" />
    </>
  ),
  // trigo / rural
  wheat: (
    <>
      <path d="M12 21V8" />
      <path d="M12 8c-2.8 0-4.5-1.7-4.5-4.5C10.3 3.5 12 5.2 12 8zM12 8c2.8 0 4.5-1.7 4.5-4.5C13.7 3.5 12 5.2 12 8z" />
      <path d="M12 13c-2.8 0-4.5-1.7-4.5-4.5 2.8 0 4.5 1.7 4.5 4.5zM12 13c2.8 0 4.5-1.7 4.5-4.5-2.8 0-4.5 1.7-4.5 4.5z" />
      <path d="M12 18c-2.8 0-4.5-1.7-4.5-4.5 2.8 0 4.5 1.7 4.5 4.5zM12 18c2.8 0 4.5-1.7 4.5-4.5-2.8 0-4.5 1.7-4.5 4.5z" />
    </>
  ),
  // prédio / empresa
  building: (
    <>
      <rect x="5.5" y="3.5" width="13" height="17" rx="1" />
      <path d="M9 7.5h.01M12 7.5h.01M15 7.5h.01M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01" />
      <path d="M10.5 20.5v-3h3v3" />
    </>
  ),
}

function Icon({ name, size = 26 }) {
  const p = paths[name]
  if (!p) return null
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p}
    </svg>
  )
}

export default Icon
