# Keleti Iránytű – családi Kína + régiós útvonaltervező

Magyar nyelvű, statikus utazási döntéstámogató oldal a 2026. október 16–30. közötti, két felnőtt és két (8 és 11 éves) gyerek részvételével tervezett úthoz.

Publikus oldal: <https://kratam.github.io/china-family-route-planner/>

## Indítás

```bash
npm install
npm run dev
```

A helyi oldal alapértelmezetten a `http://localhost:3000` címen érhető el. Statikus build:

```bash
npm test -- --run
npm run typecheck
npm run lint
npm run check:assets
npm run build
npm run check:links
```

## Frissíthető adatok

- `src/data/destinations.ts` – célpontok, közlekedés, időjárás, programok, szállások, pontszámok és képek.
- `src/data/itineraries.ts` – teljes útvonalak, költségsávok, éjszakák és rangsorok.
- `src/data/sources.ts` – újrahasznált, változó forráslinkek.
- `src/data/photo-credits.json` – minden kép pontos forrásoldala és háttérben tárolt kreditadata.
- `public/photos/` – célpontonként két, helyi Wikimedia Commons-kép.

Októberig különösen változhat a pontos repülési nap/idő, a viteldíj, a kínai HSR-jegyek elérhetősége, az attrakciók szezonális nyitvatartása és a trópusi időjárás. Minden ár tervezési becslés vagy jelenlegi árszint, nem ajánlat.

## Jelenlegi top 3

1. Shenzhen + Hongkong + Guilin/Yangshuo + Guangzhou open-jaw.
2. Shenzhen + Hongkong + Hanoi/Ninh Binh open-jaw.
3. Shenzhen + Hongkong + Xiamen/Gulangyu + Guangzhou open-jaw.
