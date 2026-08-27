# Keleti Iránytű – családi Kína + régiós útvonaltervező

Magyar nyelvű, statikus utazási döntéstámogató oldal a 2026. október 16–30. közötti, két felnőtt és két (8 és 10 éves) gyerek részvételével tervezett úthoz.

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
- `src/data/flightPrices.ts` – konkrét, lekérdezett repülőárak (Google Flights, 2026. augusztus 27., 2 felnőtt + 2 gyerek), a `/repuloarak/` aloldal és az útvonalkártyák árai.
- `src/data/sources.ts` – újrahasznált, változó forráslinkek.
- `src/data/photo-credits.json` – minden kép pontos forrásoldala és háttérben tárolt kreditadata.
- `public/photos/` – célpontonként két, helyi Wikimedia Commons-kép.

Októberig különösen változhat a pontos repülési nap/idő, a viteldíj, a kínai HSR-jegyek elérhetősége, az attrakciók szezonális nyitvatartása és a trópusi időjárás. A **repülőárak konkrét, lekérdezett végösszegek** (nem becslés), de dinamikusak; a szállás- és programköltségek továbbra is tervezési sávok.

## Repülőárak

A `/repuloarak/` aloldal a 2026. augusztus 27-i Google Flights-lekérdezés eredménye, négy főre
(2 felnőtt + 2 gyerek, 8 és 10 év), turista osztályon, a foglalási panelig végigkattintva.
Fő megállapítások:

- **Budapest ↔ Shenzhen oda-vissza (Hainan HU 762 / HU 761): 3016 €** – ez egyszerre a
  legolcsóbb és az egyetlen mindkét irányban közvetlen megoldás.
- A közvetlen Guangzhou→Budapest járat (China Southern CZ 649, 1689 €) létezik, de **egyetlen
  nyitott szárú jegyre nem kombinálható** a Hainan odaúttal – egy jegyen 26,5 órás, kétátszállásos
  hazautat kapunk 3437 €-ért.
- Hongkongból **nincs** közvetlen járat Budapestre.

## Jelenlegi top 3

1. Shenzhen oda-vissza + Hongkong + Guilin/Yangshuo, Kínán belül csak vonattal (3016 € repülő).
2. Ugyanez guangzhoui open-jaw kijárattal (3768 € két közvetlen jeggyel).
3. Shenzhen + Hongkong + Hanoi/Ninh Binh open-jaw (3922 €).
