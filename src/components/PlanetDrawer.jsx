import {
  Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, DrawerFooter,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  Box, Text, Heading, Button, Flex,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { toComparable } from '../data/planets'

const fmt = (n, d = 2) => Number(n).toLocaleString('pl-PL', { maximumFractionDigits: d })

function Row({ label, value }) {
  return (
    <Flex justify="space-between" gap={4} py={1.5} borderBottom="1px solid" borderColor="whiteAlpha.100">
      <Text color="mist">{label}</Text>
      <Text textAlign="right" fontWeight={500}>{value}</Text>
    </Flex>
  )
}

// Porównanie z Ziemią w skali logarytmicznej (różnice sięgają 5 rzędów wielkości)
function Bar({ label, value, unit }) {
  const log = Math.log10(Math.max(value, 0.01))
  const width = Math.min(100, Math.max(4, ((log + 2) / 7.6) * 100))
  const earth = (2 / 7.6) * 100
  return (
    <Box mb={4}>
      <Flex justify="space-between" fontSize="sm" mb={1}>
        <Text color="mist">{label}</Text>
        <Text>{fmt(value)} {unit}</Text>
      </Flex>
      <Box position="relative" h="8px" bg="whiteAlpha.100" borderRadius="full">
        <motion.div
          key={value}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ height: '100%', background: '#FFB547', borderRadius: 999 }}
        />
        <Box position="absolute" top="-4px" left={`${earth}%`} w="2px" h="16px" bg="starlight" title="Ziemia" />
      </Box>
    </Box>
  )
}

export default function PlanetDrawer({ object, onClose, onCompare }) {
  const o = object ? (object.id === 'sun' ? object : toComparable(object)) : null
  const isSun = o?.id === 'sun'
  return (
    <Drawer isOpen={!!o} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay bg="rgba(10,18,56,0.35)" backdropFilter="blur(2px)" />
      <DrawerContent>
        <DrawerCloseButton mt={2} />
        {o && (
          <>
            <DrawerHeader pt={8}>
              <Text fontSize="sm" color="mist" fontWeight={400} fontFamily="body">{o.kind}</Text>
              <Heading size="lg" mt={1} letterSpacing="-0.02em">{o.name}</Heading>
            </DrawerHeader>
            <DrawerBody>
              <Text mb={6} color="starlight">{o.blurb}</Text>

              {!isSun && (
                <Box mb={6}>
                  <Text fontWeight={600} mb={3}>W porównaniu z Ziemią</Text>
                  <Bar label="Promień" value={o.radiusEarth} unit="× Ziemi" />
                  <Bar label="Masa" value={o.massEarth} unit="× Ziemi" />
                  <Text fontSize="xs" color="mist">Skala logarytmiczna. Biała kreska oznacza Ziemię.</Text>
                </Box>
              )}

              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem borderColor="whiteAlpha.200">
                  <AccordionButton px={0}>
                    <Box flex="1" textAlign="left" fontWeight={600}>Parametry fizyczne</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <Row label="Promień" value={`${fmt(o.radiusKm, 0)} km`} />
                    <Row label="Masa" value={`${fmt(o.massEarth)} × Ziemi`} />
                    <Row label="Temperatura" value={`${fmt(o.tempC, 0)} °C`} />
                    <Row label="Atmosfera" value={o.atmosphere} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem borderColor="whiteAlpha.200">
                  <AccordionButton px={0}>
                    <Box flex="1" textAlign="left" fontWeight={600}>Orbita i położenie</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel px={0}>
                    <Row label="Odległość od Ziemi" value={o.distance ?? o.fromEarth} />
                    {o.au && <Row label="Odległość od Słońca" value={`${fmt(o.au)} j.a.`} />}
                    {o.periodDays && <Row label="Okres orbitalny" value={`${fmt(o.periodDays, 1)} dni`} />}
                    {o.moons !== undefined && <Row label="Znane księżyce" value={o.moons} />}
                    {o.star && <Row label="Gwiazda macierzysta" value={o.star} />}
                    {o.year && <Row label="Rok odkrycia" value={o.year} />}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DrawerBody>
            {!isSun && (
              <DrawerFooter justifyContent="flex-start">
                <Button onClick={() => onCompare(o.id)}>Porównaj z innym obiektem</Button>
              </DrawerFooter>
            )}
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
