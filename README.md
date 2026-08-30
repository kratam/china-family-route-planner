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
- `src/data/itineraries.ts` – teljes útvonalak, költségsávok, éjszakák, fürdős napok és rangsorok.
- `src/data/flightPrices.ts` – konkrét, lekérdezett repülőárak (Google Flights, 2026. augusztus 27., 2 felnőtt + 2 gyerek), a `/repuloarak/` aloldal és az útvonalkártyák árai.
- `src/data/sources.ts` – újrahasznált, változó forráslinkek.
- `src/data/photo-credits.json` – minden kép pontos forrásoldala és háttérben tárolt kreditadata.
- `public/photos/` – célpontonként két, helyi Wikimedia Commons-kép.

Októberig különösen változhat a pontos repülési nap/idő, a viteldíj, a kínai HSR-jegyek elérhetősége, az attrakciók szezonális nyitvatartása és a trópusi időjárás. A **repülőárak konkrét, lekérdezett végösszegek** (nem becslés), de dinamikusak; a szállás- és programköltségek továbbra is tervezési sávok.

## A megvett keret

**Budapest ↔ Shenzhen, oda-vissza, mindkét irányban közvetlenül** – Hainan HU 762 (okt. 16.,
11:50 → 04:50+1) és HU 761 (okt. 30., 01:55 → 07:15), 3016 € négy főre. Kínán belül nincs
open-jaw: minden kitérő oda-vissza értendő a shenzheni vagy hongkongi bázisról, döntően
gyorsvasúttal. Marad 13 éjszaka, okt. 17. hajnalától okt. 29. estéig.

## Repülőárak

A `/repuloarak/` aloldal a 2026. augusztus 27-i Google Flights-lekérdezés eredménye, négy főre
(2 felnőtt + 2 gyerek, 8 és 10 év), turista osztályon, a foglalási panelig végigkattintva.
Fő megállapítások:

- **Budapest ↔ Shenzhen oda-vissza (Hainan HU 762 / HU 761): 3016 €** – ez egyszerre a
  legolcsóbb és az egyetlen mindkét irányban közvetlen megoldás. **Ez lett megvéve.**
- A közvetlen Guangzhou→Budapest járat (China Southern CZ 649, 1689 €) létezik, de **egyetlen
  nyitott szárú jegyre nem kombinálható** a Hainan odaúttal – egy jegyen 26,5 órás, kétátszállásos
  hazautat kapunk 3437 €-ért.
- Hongkongból **nincs** közvetlen járat Budapestre.

## Jelenlegi top 3

1. **Karszt, barlang és tenger** – Shenzhen · Dapeng · Hongkong · Yangshuo (3016 €, nulla regionális repülés, kb. 5 fürdős nap).
2. **Barlang, tó és tengerpart** – Shenzhen · Zhaoqing · Hongkong · Dapeng (3016 €, a legrövidebb szakaszok, kb. 6 fürdős nap).
3. **Régi Kína és tengerpart** – Shenzhen · Chaozhou · Hongkong · Dapeng (3016 €).

Ha a fürdés a fő cél: **Strandmaximum – Sanya** (3825 €, Hongkongból 1 óra 45 perc közvetlen).
Ha a barlangos csónakázás: **Ninh Binh / Trang An** (3986 €).
