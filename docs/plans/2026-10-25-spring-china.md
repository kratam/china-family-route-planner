# Tavaszi kínai családi út, 2027

Jóváhagyott brief: két teljes útiterv a meglévő személyes Keleti Iránytű GitHub-oldalon. 2 felnőtt, 8 és 11 éves gyerek. Március 25-i közvetlen kiút, Chongqingból április 7-i vagy Guangzhou-ból április 8-i közvetlen hazaút. Szállás nélkül, napi programokkal, képekkel, családi beszámolókkal, közlekedéssel és összevethető költségbontással. Nincs vásárlás.

Útvonalak: Peking–Xi’an–Chongqing; Peking–Guilin/Yangshuo–Sencsen–Guangzhou.

Megvalósítás: a régi őszi útvonaltervező archív oldal marad; új tavaszi főoldal meglévő vizuális identitással, gyors útvonalválasztóval, napokra bontott programokkal, külön utazási és családi költségpanellel, forrásonkénti bizonyossággal. Helyi, szabad licencű képek forrásmegjelöléssel. Mobilon egyoszlopos olvasható napló; billentyűzettel kezelhető választó és lenyitható napok.

Árazás: CNY tervezési árfolyam felhasználó által állítható, alap 50 Ft. Minden költség négy főre. Egyszemélyes repülőajánlat négyszerezése csak közelítés. Chongqing hazaút ára ismeretlen, nem számolható nullának. Vonatszámok 2026-os minták, 2027 nem foglalható. Alap programkeret és opcionális program külön; napi belépők összege egyezik az összesítővel, kirándulások transzferei külön költségkategória. Étkezés külön tervezési becslés, szállás kizárva.

Lépések: forráskutatás → adatok és számítás tesztje → reszponzív főoldal → saját böngészős ellenőrzés → friss független kód/UX-review → PR, CI, merge és GitHub Pages ellenőrzése.

Alapállapot: main 266f85e, 18 teszt sikeres. Elkülönített worktree: /tmp/china-family-spring-2027, codex/spring-2027 ág. Natív worktree eszköz a szülő AI repóra mutatna, ezért a célrepó saját Git worktree-je készült. CI/deploy konfiguráció nem változik. Személyes utazási adat nem kerül céges memóriába vagy Linearba.

## Review és forrásbizonyíték

A 3171f37 head független Claude-kódreview-ja: a költségképletek, dátumok, basePath/archív linkek és licenckapcsolatok rendben. Az általános északi családi kalauz helyére konkrét chongqingi saját családi beszámoló került (Baba goes China: /chongqing-with-kids/, frissítve 2025. szeptember), a pekingi beszámoló lefedését pontosítottuk. A Mutianyu alsó keret 780 CNY, a palota+Jingshan 168 CNY; így a magyarázat megfelel a négy teljes árú jegyből képzett óvatos keretnek. Déli hash-hivatkozás megnyitja a rejtett útvonalat is; az archív repülőár-oldalról visszalink az archív tervhez.

A reviewer CA435-re tett „csak 2026-os minta lehet” észrevételét közvetlen forrásellenőrzés cáfolja. A https://www.flight.info/CA435 2026. október 25-én külön blokkban adja a 2027-03-31 kezdetű nyári időszakot, szerdai 02:45 CKG → 07:30 BUD, 10h45m adatokkal (a záródátum külön lekérésekben október12/19). Ez nem igazol konkrét árat vagy 2027. április7-i jegykészletet, és a felület ezt külön jelzi. A forrás megnevezését ezért pontosítottuk, nem írtuk át valótlanul 2026-os mintára.

Független UX-review: saját natív Chrome tab, kb.1470px asztal és pontos390px mobil; valódi14/15 napi adat, útváltás, nap összecsukás, árfolyam, vonat/beszámoló link, archív és visszalépés. Nincs piros/sárga hiba, MEHET TAMÁSHOZ. A javasolt visszaugró link bekerült. A mobilgesztus-próba nem teljesült; a megjelenés és kattintásos feladatok ellenőrizve.
