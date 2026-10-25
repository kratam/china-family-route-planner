# Keleti Iránytű – családi kínai útitervek

A főoldal két 2027. tavaszi utat hasonlít össze 2 felnőtt és 8, illetve 11 éves gyerek számára:

- Peking–Xi’an–Chongqing, március 25. – április 7.
- Peking–Guilin–Yangshuo–Sencsen–Guangzhou, március 25. – április 8.

Napi programok, családi költségek, árfolyampróba, források, szabad licencű képek és útvonalanként két családi beszámoló. Szállás nélkül. Az árak 2026-os referenciák: a repülőképernyőképek egy utasra szóltak, a négyszerezés nem családi ajánlat. A Chongqing–Budapest hazaút ára hiányzik, ezért ott részösszeg jelenik meg. Vonatjegy még nem vásárolható a 2027-es napokra.

Publikus oldal: <https://kratam.github.io/china-family-route-planner/>

## Adatok és frissítés

- `src/data/spring2027.ts`: két napi terv, utazási minták, árak és források.
- `src/lib/springBudget.ts`: napi programok + helyi közlekedés + távolsági vonatok + étkezés, egyszer számolva.
- `src/data/spring-photos.json`, `public/spring/`: új képek és pontos szerző/licenc.
- `src/components/SpringPlanner.tsx`, `src/app/spring.css`: tavaszi felület.
- `/archivum/`: megőrzött 2026-os kutatás, külön archív jelöléssel.
- `/repuloarak/`: kizárólag a korábbi, 2026-os repülőárak.

## Fejlesztés és ellenőrzés

```bash
npm ci
npm run dev
npm test -- --run
npm run typecheck
npm run lint
npm run check:assets
npm run build
npm run check:links
```

Statikus Next.js export. A meglévő GitHub Actions munkafolyamat a main ágat GitHub Pagesre publikálja. A GitHub Actions alatti build a repónévnek megfelelő basePath-t használja; a képek és archív linkek relatív útvonalak.

## A korábbi kutatás dokumentációja · archív

Az alábbi rész a 2026-os állapot történeti leírása, nem a tavaszi utazás aktuális adata.

## A repülőkeret – 2026. augusztus 30-i újramérés

**A shenzheni közvetlen járat kiesett.** A Hainan HU 761/762 a menetrendben szerepel, de az
októberi dátumokra egyetlen jegyárus sem ad árat. Három közvetlen kínai kapu maradt:

| Kapu | Légitársaság | Napok | Menetidő | Ár egy irányba (4 fő) |
|---|---|---|---|---|
| Peking PEK | Air China | naponta | 9 ó 10 p oda / 10 ó 35 p vissza | 2431 € oda, 1306 € vissza |
| Shanghai PVG | Shanghai Airlines | naponta | 11 ó 5 p / 12 ó 15 p | 2090 € oda, 1704 € vissza |
| Guangzhou CAN | China Southern | K/Cs/Szo | 10 ó 45 p / 12 ó 40 p | 2390 € oda, 1750 € vissza |

Teljes megoldások: Shanghai oda-vissza 2884 €, Guangzhou oda-vissza 3204 €, Peking oda-vissza
3256 €, Shanghai be / Peking ki 3396 €, **Guangzhou be / Peking ki 3696 €** (ez fed le mindent,
és ez az egyetlen nappali hazaút). A hét útvonal jelenleg a guangzhoui keretre van átszámolva.

⚠️ A Google Flights a kínai légitársaságok tarifáit nem árazza – a pekingi és a shanghaji
járat csak a Trip.comon és a carrierek saját oldalán látszik árral.

## Repülőárak

A `/repuloarak/` aloldal a 2026. augusztus 27-i Google Flights-lekérdezés eredménye, négy főre
(2 felnőtt + 2 gyerek, 8 és 10 év), turista osztályon, a foglalási panelig végigkattintva.
Fő megállapítások:

- ~~Budapest ↔ Shenzhen oda-vissza 3016 €~~ – **2026. augusztus 30-tól nem megvásárolható.**
- A közvetlen Guangzhou→Budapest járat (China Southern CZ 649, 1689 €) létezik, de **egyetlen
  nyitott szárú jegyre nem kombinálható** a Hainan odaúttal – egy jegyen 26,5 órás, kétátszállásos
  hazautat kapunk 3437 €-ért.
- Hongkongból **nincs** közvetlen járat Budapestre.

## Jelenlegi top 3 – guangzhoui keret

1. **Karszt, barlang és tenger** – Guangzhou · Shenzhen · Dapeng · Hongkong · Yangshuo (3204 €, kb. 5 fürdős nap).
2. **Barlang, tó és tengerpart** – Guangzhou · Shenzhen · Zhaoqing · Hongkong · Dapeng (3204 €).
3. **Régi Kína és tengerpart** – Guangzhou · Shenzhen · Chaozhou · Hongkong · Dapeng (3204 €).

## Shanghaji keret – Tajvannal

Budapest ↔ Shanghai oda-vissza 2884 € + Shanghai ↔ Tajpej (Songshan) oda-vissza 1152 € =
**4036 €**, négy közvetlen járattal. Tíz tajvani célpont és két teljes útvonal:

- **Shanghai és Tajvan – a nagy kör**: Shanghai 4 · Tajpej 4 · Kaohsiung 4 éj.
- **Shanghai és Tajvan – teknősök és tenger**: ugyanez, két nap Xiaoliuqiun a zöld teknősökkel.

Októberben Tajpej az év legszárazabb hónapját éli, a tájfunszezon ekkorra kifut – ez a legjobb
időjárási fogadás a mezőnyben. A Taroko-szurdok a 2024-es földrengés óta csak részlegesen nyitva.
