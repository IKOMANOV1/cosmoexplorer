import { extendTheme } from '@chakra-ui/react'

// Paleta „atlas nieba”: głęboki lapis zamiast czerni, światło sodowe jako jedyny akcent.
export const colors = {
  lapis: '#0A1238', // tło
  deep: '#131E52', // panele
  chart: '#3A4C9A', // linie orbit, obramowania
  mist: '#9AA6D8', // tekst drugorzędny
  starlight: '#EEF0FF', // tekst główny
  sodium: '#FFB547', // akcent (Słońce, aktywne elementy)
  halpha: '#FF6B81', // oznaczenie ekosfery / zamieszkiwalności
}

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  colors: {
    ...colors,
    brand: {
      50: '#FFF6E6', 100: '#FFE7BF', 200: '#FFD58F', 300: '#FFC664', 400: '#FFB547',
      500: '#F29E1F', 600: '#C97E10', 700: '#9A5F0B', 800: '#6B4107', 900: '#3D2504',
    },
  },
  fonts: {
    heading: `'Unbounded Variable', system-ui, sans-serif`,
    body: `'Onest Variable', system-ui, sans-serif`,
  },
  styles: {
    global: {
      'html, body': { bg: 'lapis', color: 'starlight' },
      body: { fontSize: '17px', lineHeight: 1.6, WebkitFontSmoothing: 'antialiased' },
      '::selection': { bg: 'sodium', color: 'lapis' },
      '*:focus-visible': { outline: '2px solid #FFB547 !important', outlineOffset: '3px' },
    },
  },
  components: {
    Button: { defaultProps: { colorScheme: 'brand' }, baseStyle: { borderRadius: 'full', fontWeight: 600 } },
    Drawer: { baseStyle: { dialog: { bg: 'deep', color: 'starlight' } } },
    Modal: { baseStyle: { dialog: { bg: 'deep', color: 'starlight' } } },
    Slider: { defaultProps: { colorScheme: 'brand' } },
  },
})

export default theme
