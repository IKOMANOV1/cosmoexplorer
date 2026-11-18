import { Box, Flex, Heading, Text, Select, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ALL_OBJECTS } from '../data/planets'

const byId = Object.fromEntries(ALL_OBJECTS.map((o) => [o.id, o]))
const fmt = (n, d = 2) => Number(n).toLocaleString('pl-PL', { maximumFractionDigits: d })

function Picker({ value, onChange, label }) {
  return (
    <Select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      borderColor="chart"
      bg="deep"
      size="lg"
    >
      <optgroup label="Układ Słoneczny">
        {ALL_OBJECTS.filter((o) => o.au).map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </optgroup>
      <optgroup label="Egzoplanety">
        {ALL_OBJECTS.filter((o) => !o.au).map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </optgroup>
    </Select>
  )
}

export default function Compare({ a, b, setA, setB }) {
  const A = byId[a]
  const B = byId[b]
  const max = Math.max(A.radiusEarth, B.radiusEarth)
  const ratio = A.radiusEarth / B.radiusEarth

  const rows = [
    ['Promień', `${fmt(A.radiusKm, 0)} km`, `${fmt(B.radiusKm, 0)} km`],
    ['Masa', `${fmt(A.massEarth)} × Ziemi`, `${fmt(B.massEarth)} × Ziemi`],
    ['Temperatura', `${A.tempC} °C`, `${B.tempC} °C`],
    ['Odległość od Ziemi', A.distance, B.distance],
    ['Atmosfera', A.atmosphere, B.atmosphere],
  ]

  return (
    <Box as="section" id="porownaj" className="section">
      <Heading as="h2" className="h2">Porównaj w skali</Heading>
      <Text className="lead">Wybierz dwa obiekty. Średnice kół zachowują rzeczywiste proporcje.</Text>

      <SimpleGrid columns={2} spacing={{ base: 3, md: 8 }} mt={8}>
        <Picker value={a} onChange={setA} label="Pierwszy obiekt" />
        <Picker value={b} onChange={setB} label="Drugi obiekt" />
      </SimpleGrid>

      <Flex className="compare-stage" align="flex-end" justify="space-around" mt={6}>
        {[A, B].map((o, i) => {
          const pct = (o.radiusEarth / max) * 100
          return (
            <Flex key={i} direction="column" align="center" w="45%" h="100%" justify="flex-end">
              <motion.div
                animate={{ width: `${pct}%` }}
                initial={false}
                transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                style={{
                  aspectRatio: '1 / 1',
                  minWidth: 3,
                  maxHeight: '100%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 32% 30%, ${o.color}, ${o.color} 30%, #050a24 100%)`,
                  boxShadow: o.habitable ? '0 0 40px rgba(255,107,129,0.25)' : 'none',
                }}
              />
            </Flex>
          )
        })}
      </Flex>

      <Text textAlign="center" mt={4} fontSize={{ base: 'lg', md: 'xl' }}>
        {ratio >= 1
          ? `${A.name} ma promień ${fmt(ratio, 1)}× większy niż ${B.name}`
          : `${B.name} ma promień ${fmt(1 / ratio, 1)}× większy niż ${A.name}`}
      </Text>

      <Box as="table" w="100%" mt={8} className="compare-table">
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Parametr</span></th>
            <th scope="col">{A.name}</th>
            <th scope="col">{B.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([k, x, y]) => (
            <tr key={k}>
              <th scope="row">{k}</th>
              <td>{x}</td>
              <td>{y}</td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  )
}
