# CosmoExplorer

Interaktywna mapa 3D Układu Słonecznego i wybranych egzoplanet.
Projekt z przedmiotu „Webowe interfejsy graficzne” — Ihor Komanov, grupa PAW-2.

**Stack:** React · Three.js / React Three Fiber · Chakra UI · Framer Motion · Vite

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
