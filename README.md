# CosmoExplorer

Interaktywna mapa 3D Układu Słonecznego i wybranych egzoplanet.
Projekt z przedmiotu „Webowe interfejsy graficzne” — Ihor Komanov, grupa PAW-2.

**Strona:** https://ikomanov1.github.io/cosmoexplorer/

**Stack:** React, Three.js / React Three Fiber, Chakra UI, Framer Motion, Vite

## Funkcje
- Interaktywna scena 3D Układu Słonecznego: obrót, przybliżanie, ruch planet po orbitach
- Suwak tempa symulacji i pauza
- Panel boczny ze szczegółami obiektu (dane fizyczne, orbita, porównanie z Ziemią)
- Katalog planet i egzoplanet z filtrami według kategorii i wyszukiwarką
- Porównanie dwóch obiektów w rzeczywistej skali
- Wykres promienia i temperatury egzoplanet z zaznaczoną strefą możliwej ciekłej wody

## Jak powstał projekt

Specyfikację projektu (funkcjonalności, komponenty UI, stack technologiczny) przygotował autor.
Pierwsza wersja kodu, projekt graficzny i konfiguracja GitHub Actions zostały wygenerowane
z pomocą asystenta AI **Claude** (Anthropic) na podstawie tej specyfikacji.
Dalszy rozwój projektu prowadzi autor, a kolejne zmiany są widoczne w historii commitów.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona otworzy się pod adresem http://localhost:5173.

## Publikacja

Każdy push do gałęzi `main` automatycznie publikuje stronę na GitHub Pages
(workflow `.github/workflows/deploy.yml`). Jednorazowo: Settings → Pages → Source: **GitHub Actions**.

## Zmiany z pomocą Claude

W repozytorium działa agent Claude (`.github/workflows/claude.yml`).
Utwórz issue, np. „@claude dodaj księżyce Jowisza do sceny 3D”, a Claude przygotuje pull request.

## Plan rozwoju
- [ ] Pobieranie danych z NASA Exoplanet Archive (TAP API)
- [ ] Realistyczne tekstury planet
- [ ] Księżyce (Księżyc, księżyce galileuszowe)
- [ ] Konta użytkowników i listy obserwacyjne (backend opcjonalny)
