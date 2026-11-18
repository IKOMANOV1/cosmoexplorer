# CosmoExplorer — instrukcje dla agenta

Projekt na przedmiot „Webowe interfejsy graficzne” (Ihor Komanov, PAW-2).
Interaktywna strona (one-page) o Układzie Słonecznym i egzoplanetach.

## Stack (wymagany przez specyfikację projektu — nie zmieniaj bez prośby)
- React 18 + Vite 5 (JavaScript, bez TypeScript)
- Three.js przez @react-three/fiber v8 + @react-three/drei v9
- Chakra UI v2 (komponenty: Button, Drawer, Modal, Accordion, Slider)
- Framer Motion v11

## Struktura
- `src/data/planets.js` — wszystkie dane (planety, egzoplanety, kategorie). Nowe obiekty dodawaj tutaj.
- `src/components/SolarSystem.jsx` — scena 3D (proceduralne tekstury, orbity, kamera)
- `src/components/PlanetDrawer.jsx` — panel boczny ze szczegółami
- `src/components/Catalog.jsx` — lista z filtrami i wyszukiwarką
- `src/components/Compare.jsx` — porównanie dwóch obiektów w skali
- `src/components/Exoplanets.jsx` — wykres promień × temperatura (SVG)
- `src/theme.js` + `src/styles.css` — paleta i typografia

## Zasady projektowe
- Paleta „atlas nieba”: tło lapis #0A1238, panele #131E52, linie #3A4C9A, tekst #EEF0FF,
  jedyny akcent: sodowy #FFB547. Różowy #FF6B81 wyłącznie dla ekosfery/zamieszkiwalności.
- Fonty: Unbounded (nagłówki), Onest (tekst). Teksty interfejsu po polsku, zdania od małej litery po wielkiej (sentence case), bez CAPS LOCK.
- Animacja nieproszona tylko jedna: przylot kamery na starcie. Reszta animacji odpowiada na działanie użytkownika.
- Respektuj `prefers-reduced-motion` i zachowaj widoczny fokus klawiatury.

## Komendy
- `npm run dev` — serwer deweloperski
- `npm run build` — build produkcyjny (musi przechodzić przed commitem)
