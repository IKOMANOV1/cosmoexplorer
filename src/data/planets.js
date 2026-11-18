// Dane fizyczne: NASA Planetary Fact Sheet (wartości przybliżone).
// scene.* — parametry wyłącznie wizualne (skala sceny 3D nie jest realistyczna).

export const CATEGORIES = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'rocky', label: 'Skaliste' },
  { id: 'gas', label: 'Gazowe olbrzymy' },
  { id: 'ice', label: 'Lodowe olbrzymy' },
  { id: 'habitable', label: 'Potencjalnie zamieszkiwalne' },
]

export const SUN = {
  id: 'sun',
  name: 'Słońce',
  kind: 'Gwiazda typu G2V',
  radiusKm: 696340,
  massEarth: 333000,
  tempC: 5500,
  atmosphere: 'Wodór 73%, hel 25%',
  fromEarth: '1 j.a. (8,3 min świetlnej)',
  blurb:
    'Zawiera 99,86% masy całego układu. Każdej sekundy zamienia ok. 4 mln ton materii w energię.',
}

export const PLANETS = [
  {
    id: 'mercury', name: 'Merkury', category: 'rocky', kind: 'Planeta skalista',
    radiusKm: 2440, massEarth: 0.055, tempC: 167, au: 0.39, periodDays: 88, moons: 0,
    atmosphere: 'Praktycznie brak (egzosfera: O₂, Na, H₂)',
    fromEarth: '77–222 mln km',
    blurb: 'Najmniejsza planeta. Doba słoneczna trwa tu dłużej niż rok: 176 dni ziemskich.',
    scene: { color: '#9a8f86', size: 0.38, orbit: 6, speed: 4.15 },
  },
  {
    id: 'venus', name: 'Wenus', category: 'rocky', kind: 'Planeta skalista',
    radiusKm: 6052, massEarth: 0.815, tempC: 464, au: 0.72, periodDays: 225, moons: 0,
    atmosphere: 'CO₂ 96,5%, N₂ 3,5%; chmury kwasu siarkowego',
    fromEarth: '38–261 mln km',
    blurb: 'Najgorętsza planeta układu: efekt cieplarniany podnosi temperaturę powyżej punktu topnienia ołowiu.',
    scene: { color: '#e3c38a', size: 0.62, orbit: 8.5, speed: 1.62 },
  },
  {
    id: 'earth', name: 'Ziemia', category: 'rocky', habitable: true, kind: 'Planeta skalista',
    radiusKm: 6371, massEarth: 1, tempC: 15, au: 1, periodDays: 365.25, moons: 1,
    atmosphere: 'N₂ 78%, O₂ 21%, Ar 0,9%',
    fromEarth: '—',
    blurb: 'Jedyne znane miejsce z życiem. 71% powierzchni pokrywa ciekła woda.',
    scene: { color: '#3d7bd9', size: 0.66, orbit: 11, speed: 1 },
  },
  {
    id: 'mars', name: 'Mars', category: 'rocky', kind: 'Planeta skalista',
    radiusKm: 3390, massEarth: 0.107, tempC: -65, au: 1.52, periodDays: 687, moons: 2,
    atmosphere: 'CO₂ 95%, N₂ 2,8%, Ar 2%',
    fromEarth: '55–401 mln km',
    blurb: 'Ma najwyższy wulkan w układzie — Olympus Mons, prawie 22 km wysokości.',
    scene: { color: '#c1532f', size: 0.48, orbit: 14, speed: 0.53 },
  },
  {
    id: 'jupiter', name: 'Jowisz', category: 'gas', kind: 'Gazowy olbrzym',
    radiusKm: 69911, massEarth: 317.8, tempC: -110, au: 5.2, periodDays: 4333, moons: 95,
    atmosphere: 'H₂ 90%, He 10%',
    fromEarth: '588–968 mln km',
    blurb: 'Wielka Czerwona Plama to burza większa od Ziemi, obserwowana od ponad 190 lat.',
    scene: { color: '#d3a273', size: 1.7, orbit: 19, speed: 0.084, bands: ['#e8d3b0', '#b9875a', '#d9b48a', '#a5714a', '#efe0c8'] },
  },
  {
    id: 'saturn', name: 'Saturn', category: 'gas', kind: 'Gazowy olbrzym',
    radiusKm: 58232, massEarth: 95.2, tempC: -140, au: 9.58, periodDays: 10759, moons: 146,
    atmosphere: 'H₂ 96%, He 3%',
    fromEarth: '1,2–1,7 mld km',
    blurb: 'Jego średnia gęstość jest mniejsza od gęstości wody. Pierścienie mają grubość zaledwie ok. 10 m.',
    scene: { color: '#e4cf9c', size: 1.45, orbit: 25, speed: 0.034, ring: true, bands: ['#f1e2bc', '#d6bd86', '#e9d6a8', '#c7a96f'] },
  },
  {
    id: 'uranus', name: 'Uran', category: 'ice', kind: 'Lodowy olbrzym',
    radiusKm: 25362, massEarth: 14.5, tempC: -195, au: 19.2, periodDays: 30687, moons: 28,
    atmosphere: 'H₂ 83%, He 15%, CH₄ 2%',
    fromEarth: '2,6–3,2 mld km',
    blurb: 'Obraca się „na boku” — oś obrotu jest nachylona o 98°.',
    scene: { color: '#9fd8de', size: 1.05, orbit: 30.5, speed: 0.012 },
  },
  {
    id: 'neptune', name: 'Neptun', category: 'ice', kind: 'Lodowy olbrzym',
    radiusKm: 24622, massEarth: 17.1, tempC: -200, au: 30.05, periodDays: 60190, moons: 16,
    atmosphere: 'H₂ 80%, He 19%, CH₄ 1,5%',
    fromEarth: '4,3–4,7 mld km',
    blurb: 'Wieją tu najszybsze wiatry w układzie — do 2100 km/h.',
    scene: { color: '#3f63d6', size: 1.0, orbit: 35.5, speed: 0.006 },
  },
]

// Wybrane egzoplanety — dane: NASA Exoplanet Archive (wartości przybliżone).
// radiusEarth / massEarth: w promieniach / masach Ziemi; tempK: temperatura równowagowa.
export const EXOPLANETS = [
  {
    id: 'proxima-b', name: 'Proxima Centauri b', category: 'habitable', habitable: true,
    kind: 'Egzoplaneta skalista', star: 'Proxima Centauri (czerwony karzeł)',
    radiusEarth: 1.07, massEarth: 1.07, tempK: 234, lightYears: 4.24, periodDays: 11.2, year: 2016,
    atmosphere: 'Nieznana', blurb: 'Najbliższa znana egzoplaneta. Krąży w ekosferze swojej gwiazdy.',
    color: '#b7624a',
  },
  {
    id: 'trappist-1e', name: 'TRAPPIST-1 e', category: 'habitable', habitable: true,
    kind: 'Egzoplaneta skalista', star: 'TRAPPIST-1 (ultrachłodny karzeł)',
    radiusEarth: 0.92, massEarth: 0.69, tempK: 250, lightYears: 40.7, periodDays: 6.1, year: 2017,
    atmosphere: 'Badana przez JWST', blurb: 'Jedna z siedmiu planet układu TRAPPIST-1; rozmiarem najbardziej przypomina Ziemię.',
    color: '#6f8fb0',
  },
  {
    id: 'toi-700d', name: 'TOI-700 d', category: 'habitable', habitable: true,
    kind: 'Egzoplaneta skalista', star: 'TOI-700 (czerwony karzeł)',
    radiusEarth: 1.07, massEarth: 1.25, tempK: 269, lightYears: 101.4, periodDays: 37.4, year: 2020,
    atmosphere: 'Nieznana', blurb: 'Pierwsza planeta wielkości Ziemi w ekosferze odkryta przez satelitę TESS.',
    color: '#7c9a6b',
  },
  {
    id: 'kepler-452b', name: 'Kepler-452 b', category: 'habitable', habitable: true,
    kind: 'Superziemia', star: 'Kepler-452 (gwiazda typu G)',
    radiusEarth: 1.63, massEarth: 5, tempK: 265, lightYears: 1800, periodDays: 385, year: 2015,
    atmosphere: 'Nieznana', blurb: 'Nazywana „kuzynką Ziemi”: rok trwa tu 385 dni, a gwiazda przypomina Słońce.',
    color: '#9c8a5c',
  },
  {
    id: 'k2-18b', name: 'K2-18 b', category: 'habitable', habitable: true,
    kind: 'Subneptun', star: 'K2-18 (czerwony karzeł)',
    radiusEarth: 2.61, massEarth: 8.6, tempK: 255, lightYears: 124, periodDays: 33, year: 2015,
    atmosphere: 'Wykryto CH₄ i CO₂ (JWST)', blurb: 'Kandydat na „świat hiceański” — z oceanem pod atmosferą bogatą w wodór.',
    color: '#5b86a8',
  },
  {
    id: 'hd189733b', name: 'HD 189733 b', category: 'gas',
    kind: 'Gorący Jowisz', star: 'HD 189733 A (pomarańczowy karzeł)',
    radiusEarth: 12.7, massEarth: 360, tempK: 1200, lightYears: 64.5, periodDays: 2.2, year: 2005,
    atmosphere: 'H₂O, CO, krzemiany', blurb: 'Niebieska planeta, na której prawdopodobnie pada deszcz ze szkła przy wietrze 8700 km/h.',
    color: '#2f5fb3',
  },
]

export const earthRadiusKm = 6371

// Wspólny format dla trybu porównania i katalogu
export function toComparable(o) {
  if (o.radiusKm) {
    return {
      ...o,
      radiusEarth: o.radiusKm / earthRadiusKm,
      tempK: Math.round(o.tempC + 273),
      color: o.scene?.color ?? '#ffb547',
      distance: o.fromEarth,
    }
  }
  return {
    ...o,
    radiusKm: Math.round(o.radiusEarth * earthRadiusKm),
    tempC: Math.round(o.tempK - 273),
    distance: `${o.lightYears.toLocaleString('pl-PL')} lat świetlnych`,
  }
}

export const ALL_OBJECTS = [...PLANETS, ...EXOPLANETS].map(toComparable)
