# Családi Kína + régiós útvonaltervező — design

## Cél

Egy nyilvánosan megosztható, magyar nyelvű, mobilbarát utazási magazin és döntéstámogató oldal készül a 2026. október 16–30. közötti, két felnőtt és két (8 és 11 éves) gyerek részvételével tervezett utazáshoz. Shenzhen biztos állomás; a tervező open-jaw útvonalakat részesít előnyben, és kb. három fő bázist javasol.

## Termékstruktúra

- Fotóközpontú hero, vezető ajánlás és frissességi/árbizonytalansági jelzés.
- Döntési gyorssáv a legfontosabb következtetésekkel.
- Többszörös, URL-t nem módosító kliensoldali szűrés.
- Mobilon kártyás, desktopon széles táblázatos összehasonlítás.
- Húsz vizsgált célpont, mindegyiknél hangulat, logisztika Shenzhenből és Hongkongból, programok, fürdés, időjárás, szállás és források.
- Tizenhárom kategóriás rangsor és legalább nyolc, dátumozott teljes útvonal.
- Egyértelmű szerkesztői ajánlás, nem puszta katalógus.

## Adatmodell és hitelesség

Az adatokat a `src/data/destinations.ts`, `src/data/itineraries.ts` és `src/data/sources.ts` fájlok tárolják. Minden változó közlekedési és időjárási állítás kattintható forrást kap. Az árak kizárólag tervezési sávok, `becslés` vagy `jelenlegi árszint` címkével; a kínai vasúti jegyek rövid értékesítési ablaka miatt az októberi konkrét vonatok még nem tekinthetők foglalhatónak.

## Technika

Next.js, TypeScript, Tailwind CSS és statikus `output: export`. Nincs backend. A GitHub Actions a `main` ágat buildeli és GitHub Pagesre publikálja. A külső képek helyett helyi, optimalizált, licencelhető Wikimedia Commons képek készülnek lazy-loadinggal és alt szöveggel.

## Minőség

Vitest ellenőrzi a szűrést, a pontszámokat és a táblázat/kártyák közös adatforrását. A build után link- és képfájl-ellenőrzés, majd Playwright CLI-s desktop és mobil render/interakció ellenőrzés következik. A sikerkritérium egy publikus `https://kratam.github.io/china-family-route-planner/` URL.
