import { useState } from 'react'
import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import { ALL_OBJECTS } from '../data/planets'

// Wykres: promień (oś X, log) × temperatura równowagowa (oś Y, K).
// Pas 180–310 K to umowny zakres, w którym na powierzchni mogłaby istnieć ciekła woda.
const W = 760
const H = 420
const PAD = { l: 56, r: 24, t: 24, b: 48 }
const xMin = Math.log10(0.3)
const xMax = Math.log10(15)
const yMin = 0
const yMax = 800

const sx = (r) => PAD.l + ((Math.log10(r) - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r)
const sy = (k) => H - PAD.b - ((Math.min(k, yMax) - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b)

const points = ALL_OBJECTS.filter((o) => o.tempK < 800)

export default function Exoplanets({ onSelect }) {
  const [hover, setHover] = useState(null)
  const xTicks = [0.5, 1, 2, 5, 10]
  const yTicks = [0, 200, 400, 600, 800]

  return (
    <Box as="section" id="egzoplanety" className="section">
      <Heading as="h2" className="h2">Gdzie szukać drugiej Ziemi</Heading>
      <Text className="lead">
        Każdy punkt to planeta: im dalej w prawo, tym większa; im wyżej, tym cieplejsza. Planety w różowym pasie
        mają temperaturę, przy której mogłaby istnieć ciekła woda. Kliknij punkt, żeby zobaczyć szczegóły.
      </Text>

      <Box mt={8} overflowX="auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="exo-chart" role="img" aria-label="Wykres promienia i temperatury planet">
          <rect x={PAD.l} y={sy(310)} width={W - PAD.l - PAD.r} height={sy(180) - sy(310)} fill="#FF6B81" opacity="0.12" />
          <text x={W - PAD.r - 8} y={sy(310) + 18} textAnchor="end" className="exo-band">ciekła woda możliwa</text>

          {yTicks.map((t) => (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={sy(t)} y2={sy(t)} stroke="#3A4C9A" strokeOpacity="0.4" />
              <text x={PAD.l - 10} y={sy(t) + 4} textAnchor="end" className="exo-tick">{t}</text>
            </g>
          ))}
          {xTicks.map((t) => (
            <text key={t} x={sx(t)} y={H - PAD.b + 22} textAnchor="middle" className="exo-tick">{String(t).replace('.', ',')}</text>
          ))}
          <text x={(W + PAD.l) / 2} y={H - 6} textAnchor="middle" className="exo-axis">Promień (Ziemia = 1)</text>
          <text transform={`translate(14 ${(H - PAD.b) / 2}) rotate(-90)`} textAnchor="middle" className="exo-axis">Temperatura (K)</text>

          {points.map((o) => {
            const r = 5 + Math.log10(o.radiusEarth * 10) * 4
            const active = hover === o.id
            return (
              <g
                key={o.id}
                tabIndex={0}
                role="button"
                aria-label={`${o.name}: promień ${o.radiusEarth.toFixed(2)}, temperatura ${o.tempK} K`}
                onMouseEnter={() => setHover(o.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(o.id)}
                onBlur={() => setHover(null)}
                onClick={() => onSelect(o)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelect(o))}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <circle
                  cx={sx(o.radiusEarth)}
                  cy={sy(o.tempK)}
                  r={active ? r + 3 : r}
                  fill={o.au ? '#EEF0FF' : '#FFB547'}
                  stroke={active ? '#FFB547' : '#0A1238'}
                  strokeWidth={active ? 3 : 2}
                  style={{ transition: 'r .2s' }}
                />
                {(active || ['earth', 'k2-18b', 'jupiter', 'mars', 'mercury'].includes(o.id)) && (
                  <text x={sx(o.radiusEarth) + r + 6} y={sy(o.tempK) + 4} className="exo-label">{o.name}</text>
                )}
              </g>
            )
          })}
        </svg>
      </Box>
      <Flex gap={6} mt={3} color="mist" fontSize="sm" wrap="wrap">
        <Flex align="center" gap={2}><Box w="10px" h="10px" borderRadius="full" bg="starlight" />Układ Słoneczny</Flex>
        <Flex align="center" gap={2}><Box w="10px" h="10px" borderRadius="full" bg="sodium" />Egzoplanety</Flex>
        <Text>Wenus i gorące Jowisze leżą poza skalą wykresu.</Text>
      </Flex>
    </Box>
  )
}
