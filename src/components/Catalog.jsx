import { useMemo, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Input, InputGroup, InputLeftElement, Wrap, WrapItem } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ALL_OBJECTS, CATEGORIES } from '../data/planets'

const MotionRow = motion(Box)

// Średnica kropki rośnie logarytmicznie z promieniem — Jowisz nie zasłoni Merkurego
function Swatch({ o }) {
  const d = 14 + Math.log10(o.radiusEarth * 10) * 16
  return (
    <Box
      flexShrink={0}
      w={`${d}px`}
      h={`${d}px`}
      borderRadius="full"
      bg={`radial-gradient(circle at 32% 30%, ${o.color}, ${o.color} 35%, #050a24 100%)`}
      boxShadow={o.habitable ? '0 0 0 2px #0A1238, 0 0 0 3px #FF6B81' : 'none'}
    />
  )
}

function matches(o, cat) {
  if (cat === 'all') return true
  if (cat === 'habitable') return !!o.habitable
  return o.category === cat
}

export default function Catalog({ onSelect }) {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const list = useMemo(
    () => ALL_OBJECTS.filter((o) => matches(o, cat) && o.name.toLowerCase().includes(q.trim().toLowerCase())),
    [cat, q]
  )

  return (
    <Box as="section" id="katalog" className="section">
      <Heading as="h2" className="h2">Katalog obiektów</Heading>
      <Text className="lead">
        Osiem planet Układu Słonecznego i wybrane egzoplanety. Czerwona obwódka oznacza światy w ekosferze swojej gwiazdy.
      </Text>

      <Flex gap={4} direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }} justify="space-between" mt={8} mb={6}>
        <Wrap spacing={2} role="group" aria-label="Filtruj według kategorii">
          {CATEGORIES.map((c) => (
            <WrapItem key={c.id}>
              <Button
                size="sm"
                variant={cat === c.id ? 'solid' : 'outline'}
                color={cat === c.id ? 'lapis' : 'starlight'}
                borderColor="chart"
                aria-pressed={cat === c.id}
                onClick={() => setCat(c.id)}
              >
                {c.label}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
        <InputGroup maxW={{ md: '260px' }} size="sm">
          <InputLeftElement pointerEvents="none" color="mist">⌕</InputLeftElement>
          <Input
            placeholder="Szukaj po nazwie"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            borderColor="chart"
            borderRadius="full"
            _placeholder={{ color: 'mist' }}
            aria-label="Szukaj obiektu po nazwie"
          />
        </InputGroup>
      </Flex>

      <Box as="ul" listStyleType="none" borderTop="1px solid" borderColor="chart">
        <AnimatePresence initial={false}>
          {list.map((o) => (
            <MotionRow
              as="li"
              key={o.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Flex
                as="button"
                w="100%"
                textAlign="left"
                align="center"
                gap={{ base: 3, md: 6 }}
                py={4}
                px={2}
                onClick={() => onSelect(o)}
                _hover={{ bg: 'whiteAlpha.50' }}
              >
                <Flex w="52px" justify="center"><Swatch o={o} /></Flex>
                <Box flex="2" minW={0}>
                  <Text fontWeight={600} fontSize="lg">{o.name}</Text>
                  <Text color="mist" fontSize="sm">{o.kind}</Text>
                </Box>
                <Stat label="Promień" value={`${o.radiusEarth.toLocaleString('pl-PL', { maximumFractionDigits: 2 })} × Ziemi`} />
                <Stat label="Temperatura" value={`${o.tempC} °C`} hideBelow="md" />
                <Stat label="Odległość" value={o.distance} hideBelow="lg" wide />
              </Flex>
            </MotionRow>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <Box as="li" py={10} textAlign="center" color="mist">
            Brak obiektów pasujących do „{q}”. Zmień frazę lub wybierz kategorię „Wszystkie”.
          </Box>
        )}
      </Box>
    </Box>
  )
}

function Stat({ label, value, hideBelow, wide }) {
  return (
    <Box flex={wide ? 2 : 1} display={hideBelow ? { base: 'none', [hideBelow]: 'block' } : 'block'} textAlign="right">
      <Text color="mist" fontSize="xs">{label}</Text>
      <Text fontVariantNumeric="tabular-nums" whiteSpace="nowrap">{value}</Text>
    </Box>
  )
}
