import { lazy, Suspense, useState } from 'react'
import {
  Box, Flex, Heading, Text, Button, IconButton, Link,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  useDisclosure, usePrefersReducedMotion,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PlanetDrawer from './components/PlanetDrawer'
import Catalog from './components/Catalog'
import Compare from './components/Compare'
import Exoplanets from './components/Exoplanets'

const SolarSystem = lazy(() => import('./components/SolarSystem'))

const SPEEDS = [0.25, 0.5, 1, 2, 5, 10, 25]

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [selected, setSelected] = useState(null)
  const [speedIdx, setSpeedIdx] = useState(2)
  const [paused, setPaused] = useState(false)
  const [cmpA, setCmpA] = useState('earth')
  const [cmpB, setCmpB] = useState('jupiter')
  const help = useDisclosure()

  const openCompare = (id) => {
    setCmpA(id)
    if (id === cmpB) setCmpB(id === 'earth' ? 'jupiter' : 'earth')
    setSelected(null)
    setTimeout(() => document.getElementById('porownaj')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), 250)
  }

  const intro = (delay) =>
    reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } }

  return (
    <>
      <Box as="header" className="topbar">
        <Text fontFamily="heading" fontWeight={600} fontSize="md">CosmoExplorer</Text>
        <Flex as="nav" gap={{ base: 4, md: 8 }} aria-label="Sekcje strony" display={{ base: 'none', md: 'flex' }}>
          <Link href="#katalog">Katalog</Link>
          <Link href="#porownaj">Porównanie</Link>
          <Link href="#egzoplanety">Egzoplanety</Link>
        </Flex>
      </Box>

      <Box as="main">
        {/* HERO: żywa scena 3D zamiast obrazka */}
        <Box as="section" className="hero" aria-label="Układ Słoneczny w 3D">
          <Box className="hero-canvas">
            <Suspense fallback={null}>
              <SolarSystem
                speed={SPEEDS[speedIdx]}
                paused={paused}
                selected={selected}
                onSelect={setSelected}
                reducedMotion={reduced}
              />
            </Suspense>
          </Box>

          <Box className="hero-copy">
            <motion.div {...intro(1.6)}>
              <Heading as="h1" className="display">
                Układ Słoneczny<br />na wyciągnięcie ręki
              </Heading>
            </motion.div>
            <motion.div {...intro(2.0)}>
              <Text className="hero-sub">
                Obracaj scenę, przybliżaj i klikaj w planety. Potem porównaj je z&nbsp;egzoplanetami odkrytymi przez
                teleskopy Kepler, TESS i&nbsp;JWST.
              </Text>
            </motion.div>
          </Box>

          <motion.div className="hero-controls" {...intro(2.3)}>
            <Flex align="center" gap={4}>
              <Button size="sm" onClick={() => setPaused((p) => !p)} minW="96px">
                {paused ? 'Wznów' : 'Zatrzymaj'}
              </Button>
              <Box flex="1" minW="160px">
                <Flex justify="space-between" fontSize="sm" mb={1}>
                  <Text as="label" id="speed-label" color="mist">Tempo czasu</Text>
                  <Text fontVariantNumeric="tabular-nums">× {SPEEDS[speedIdx]}</Text>
                </Flex>
                <Slider
                  aria-labelledby="speed-label"
                  aria-valuetext={`${SPEEDS[speedIdx]} raza`}
                  min={0}
                  max={SPEEDS.length - 1}
                  step={1}
                  value={speedIdx}
                  onChange={setSpeedIdx}
                >
                  <SliderTrack bg="whiteAlpha.300"><SliderFilledTrack /></SliderTrack>
                  <SliderThumb boxSize={4} />
                </Slider>
              </Box>
              <IconButton size="sm" variant="outline" color="starlight" borderColor="chart" aria-label="Jak sterować sceną" onClick={help.onOpen} icon={<span aria-hidden>?</span>} />
            </Flex>
          </motion.div>

          <a href="#katalog" className="scroll-cue">Przewiń do katalogu</a>
        </Box>

        <Catalog onSelect={setSelected} />
        <Compare a={cmpA} b={cmpB} setA={setCmpA} setB={setCmpB} />
        <Exoplanets onSelect={setSelected} />
      </Box>

      <Box as="footer" className="footer">
        <Text>
          CosmoExplorer — projekt z przedmiotu „Webowe interfejsy graficzne”, Ihor Komanov, grupa PAW-2.
        </Text>
        <Text color="mist" mt={1}>
          Dane: NASA Planetary Fact Sheet i NASA Exoplanet Archive. Skala odległości w scenie 3D jest umowna.
        </Text>
      </Box>

      <PlanetDrawer object={selected} onClose={() => setSelected(null)} onCompare={openCompare} />

      <Modal isOpen={help.isOpen} onClose={help.onClose} isCentered>
        <ModalOverlay bg="rgba(10,18,56,0.6)" />
        <ModalContent mx={4}>
          <ModalHeader fontFamily="heading">Jak sterować sceną</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box as="dl" className="help-list">
              <dt>Obrót</dt><dd>Przeciągnij myszą lub palcem</dd>
              <dt>Przybliżenie</dt><dd>Kółko myszy lub gest szczypania</dd>
              <dt>Szczegóły</dt><dd>Kliknij planetę lub Słońce</dd>
              <dt>Tempo czasu</dt><dd>Suwak w prawym dolnym rogu</dd>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
