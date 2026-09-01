import type { SourceRef } from "./types";

/**
 * Konkrét, lekérdezett repülőárak – nem becslés.
 *
 * Fordulat 2026. augusztus 30-án: a budapesti közvetlen Shenzhen-járat (Hainan HU 761/762)
 * a menetrendben még látszik, de az októberi dátumainkra sehol nem eladó. A méréseket ezért
 * újra elvégeztük, két forrásból: Google Flights (nyugati jegyárusítók) és Trip.com (a kínai
 * légitársaságok saját tarifái – a Google ezeket egyáltalán nem árazza).
 *
 * Minden ár a TELJES négyfős utazásra vonatkozik (2 felnőtt + 2 gyerek, 8 és 10 év),
 * turista osztályon, adókkal együtt.
 */
export const priceCheck = {
  checkedOn: "2026. augusztus 30.",
  regionalCheckedOn: "2026. augusztus 30.",
  passengers: "2 felnőtt + 2 gyerek (8 és 10 év)",
  cabin: "turista osztály",
  currency: "EUR",
  hufRate: 365,
  note: "Minden ár a teljes négyfős utazásra szól, adókkal és illetékekkel. Két forrás: Google Flights és Trip.com – az utóbbi azért kell, mert a kínai légitársaságok tarifáit a Google nem árazza. A forintértékek ~365 Ft/€-val számolva.",
} as const;

/** Magyar számcsoportosítás ezresenként, nem törő szóközzel. */
export const grouped = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const gf = (label: string, url: string): SourceRef => ({ label, url });
const trip = (label: string, path: string): SourceRef => ({ label, url: `https://us.trip.com/flights/${path}` });

/** A Budapestről közvetlenül elérhető ázsiai és közel-keleti kapuk, mérve. */
export type Gateway = {
  id: string;
  city: string;
  code: string;
  airline: string;
  days: string;
  outbound: string;
  inbound: string;
  outEur: number | null;
  inEur: number | null;
  outNote: string;
  inNote: string;
  verdict: string;
  status: "él" | "kiesett";
  source: SourceRef;
};

export const gateways: Gateway[] = [
  {
    id: "pek", city: "Peking", code: "PEK", airline: "Air China", days: "naponta",
    outbound: "13:00 → 04:10+1 · 9 óra 10 perc", inbound: "14:00 → 17:35 · 10 óra 35 perc",
    outEur: 2431, inEur: 1306,
    outNote: "okt. 16. (P). A legrövidebb repülés Budapestről Kínába.",
    inNote: "okt. 29. (Cs). Az egyetlen nappali hazaút: délután indul, ugyanaznap este otthon.",
    verdict: "A legrövidebb repülőút és az egyetlen emberi időpontú hazajárat – gyerekekkel ez sokat számít.",
    status: "él",
    source: trip("Trip.com BUD–PEK", "budapest-to-beijing/tickets-bud-pek"),
  },
  {
    id: "pvg", city: "Shanghai", code: "PVG", airline: "Shanghai Airlines / China Eastern", days: "naponta",
    outbound: "12:30 → 05:35+1 · 11 óra 5 perc", inbound: "01:50 → 07:05 · 12 óra 15 perc",
    outEur: 2090, inEur: 1704,
    outNote: "okt. 16. (P). A legolcsóbb odaút.",
    inNote: "okt. 30. (P). Hajnali indulás.",
    verdict: "A legolcsóbb kapu, és naponta megy – de a Google egyáltalán nem árazza, csak a Trip.com és a China Eastern saját oldala.",
    status: "él",
    source: trip("Trip.com BUD–PVG", "budapest-to-shanghai/tickets-bud-sha"),
  },
  {
    id: "can", city: "Guangzhou", code: "CAN", airline: "China Southern", days: "kedd, csütörtök, szombat",
    outbound: "12:45 → 05:30+1 · 10 óra 45 perc", inbound: "01:30 → 07:10 · 12 óra 40 perc",
    outEur: 2390, inEur: 1750,
    outNote: "okt. 17. (Szo). Okt. 16-án nincs járat.",
    inNote: "okt. 29. (Cs) 1750 €, okt. 31. (Szo) 1720 €. Okt. 30-án nincs.",
    verdict: "A Gyöngy-folyó deltájának kapuja: Shenzhen 30–75 perc gyorsvasúttal, Hongkong kb. 1 óra. A régi terv ezzel szinte változtatás nélkül megmenthető.",
    status: "él",
    source: gf("Google Flights CAN–BUD közvetlen", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjkoAGoFEgNDQU5yBRIDQlVEQgQBAQICSAGYAQI=&hl=en&curr=EUR"),
  },
  {
    id: "icn", city: "Szöul", code: "ICN", airline: "Korean Air", days: "naponta",
    outbound: "20:10 → 13:40+1 · 10 óra 30 perc", inbound: "12:15 → 16:55 · 12 óra 40 perc",
    outEur: 3155, inEur: 1783,
    outNote: "okt. 19. 3155 €; okt. 17-re 4941 € – erősen dátumfüggő.",
    inNote: "okt. 29. (Cs) 1783 €; okt. 31-re már 4085 €.",
    verdict: "Korea is közvetlenül elérhető, és a hazaút szintén nappali – de az odaút kétszer annyi, mint Shanghaié.",
    status: "él",
    source: trip("Trip.com BUD–ICN", "budapest-to-seoul/tickets-bud-sel"),
  },
  {
    id: "dxb", city: "Dubaj", code: "DXB", airline: "flydubai / Emirates", days: "naponta",
    outbound: "22:40 → 06:40+1 · 6 óra", inbound: "6 óra",
    outEur: 1287, inEur: 338,
    outNote: "okt. 16., flydubai.",
    inNote: "okt. 29., Wizz Air 338 € – a legolcsóbb hazaút az egész mezőnyben.",
    verdict: "Hat óra repülés, és önmagában is úti cél: strand, futurisztikus város, gyerekprogramok. Innen az Emirates hálózata visz tovább Ázsiába.",
    status: "él",
    source: trip("Trip.com BUD–DXB", "budapest-to-dubai/tickets-bud-dxb"),
  },
  {
    id: "doh", city: "Doha", code: "DOH", airline: "Qatar Airways", days: "naponta",
    outbound: "10:00 → 16:00 · 5 óra", inbound: "5 óra 35 perc",
    outEur: 2268, inEur: 1989,
    outNote: "okt. 16.", inNote: "okt. 29. és okt. 31. is 1989 €.",
    verdict: "A legrövidebb ugrás Európából, és a Qatar hálózata Délkelet-Ázsia egészét lefedi – de drágább, mint Dubaj.",
    status: "él",
    source: trip("Trip.com BUD–DOH", "budapest-to-doha/tickets-bud-doh"),
  },
  {
    id: "szx", city: "Shenzhen", code: "SZX", airline: "Hainan Airlines", days: "hétfő és péntek – de nem eladó",
    outbound: "11:50 → 04:50+1 · 11 óra", inbound: "01:55 → 07:15 · 12 óra 20 perc",
    outEur: null, inEur: null,
    outNote: "A menetrendben szerepel, de okt. 16-ra egyetlen jegyárus sem ad árat.",
    inNote: "Okt. 26., 29., 30., 31.: sehol nincs eladó jegy. A Google szó szerint azt írja: „We can’t find booking options for this itinerary.”",
    verdict: "Ez borította az egész eddigi tervet. A járat papíron létezik, a gyakorlatban nem megvásárolható a mi dátumainkra.",
    status: "kiesett",
    source: gf("Google Flights BUD↔SZX – nincs foglalási opció", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMTYoAGoFEgNCVURyBRIDU1pYGhwSCjIwMjYtMTAtMzAoAGoFEgNTWlhyBRIDQlVEQgQBAQICSAGYAQE=&hl=en&curr=EUR"),
  },
];

/** Teljes hosszú távú architektúrák: oda-vissza és nyitott szárú változatok. */
export type Architecture = {
  id: string;
  label: string;
  kind: "oda-vissza" | "open-jaw";
  ticketing: "egy jegy" | "két egyirányú jegy";
  eur: number;
  dates: string;
  inGate: string;
  outGate: string;
  allDirect: boolean;
  dayFlightHome: boolean;
  fits: string;
  drawback: string;
};

export const architectures: Architecture[] = [
  {
    id: "rt-pvg", label: "Shanghai oda-vissza", kind: "oda-vissza", ticketing: "egy jegy", eur: 2884,
    dates: "okt. 16. → okt. 30.", inGate: "Shanghai PVG", outGate: "Shanghai PVG",
    allDirect: true, dayFlightHome: false,
    fits: "A legolcsóbb megoldás, és Shanghai maga is technológiai nagyváros. Innen Hangzhou, Suzhou és a vízi városok egy-két óra vonattal.",
    drawback: "Shenzhen 7 óra gyorsvasútra van, a déli tengerpartok és Guilin karsztja pedig kiesnek. A hazaút hajnali 01:50-kor indul.",
  },
  {
    id: "oj-pvg-pek", label: "Shanghai be / Peking ki", kind: "open-jaw", ticketing: "két egyirányú jegy", eur: 3396,
    dates: "okt. 16. → okt. 29.", inGate: "Shanghai PVG", outGate: "Peking PEK",
    allDirect: true, dayFlightHome: true,
    fits: "A legolcsóbb nyitott szárú változat, és nappali hazaúttal zár. Shanghai (technológia) → Suzhou/Hangzhou (történelem, csónakázás) → Xi’an vagy Luoyang (buddhista sziklatemplomok) → Peking (Nagy Fal).",
    drawback: "Nincs benne Shenzhen és nincs benne tengerpart – ez tisztán város- és történelemút.",
  },
  {
    id: "oj-can-pek", label: "Guangzhou be / Peking ki", kind: "open-jaw", ticketing: "két egyirányú jegy", eur: 3696,
    dates: "okt. 17. → okt. 29.", inGate: "Guangzhou CAN", outGate: "Peking PEK",
    allDirect: true, dayFlightHome: true,
    fits: "Ez az egyetlen változat, ami MINDENT lefed: Shenzhen (technológia) és Hongkong a bázison, Dapeng vagy hongkongi öblök (strand), Guilin/Yangshuo (barlang és hajózás), majd északra Xi’an vagy Luoyang (Longmen buddha-barlangtemplomok) és Peking (Nagy Fal, Tiltott Város). A hazaút délután indul.",
    drawback: "Sok gyorsvasút: Guilin→Xi’an kb. 7 óra, Xi’an→Peking 4,5 óra. Belföldi repülővel rövidíthető.",
  },
  {
    id: "oj-pvg-can", label: "Shanghai be / Guangzhou ki", kind: "open-jaw", ticketing: "két egyirányú jegy", eur: 3810,
    dates: "okt. 16. → okt. 31.", inGate: "Shanghai PVG", outGate: "Guangzhou CAN",
    allDirect: true, dayFlightHome: false,
    fits: "Észak-déli ív Peking nélkül: Shanghai (technológia) → Hangzhou/Suzhou (történelem, csónakázás) → Guilin (barlang, hajózás) → Shenzhen (technológia) → Hongkong (strand) → Guangzhou.",
    drawback: "Hajnali 01:30-as hazaút, és a Nagy Fal kimarad.",
  },
  {
    id: "rt-can", label: "Guangzhou oda-vissza", kind: "oda-vissza", ticketing: "egy jegy", eur: 3204,
    dates: "okt. 17. → okt. 29.", inGate: "Guangzhou CAN", outGate: "Guangzhou CAN",
    allDirect: true, dayFlightHome: false,
    fits: "A legkisebb változtatás: a meglévő hét útvonal szinte érintetlenül működik, csak Shenzhen helyett Guangzhouba érkezünk és onnan megyünk haza – ez 30–75 perc gyorsvasút a bázisig.",
    drawback: "188 euróval drágább, mint a régi shenzheni keret volt, és a hazaút hajnali 01:30-kor indul.",
  },
  {
    id: "rt-pek", label: "Peking oda-vissza", kind: "oda-vissza", ticketing: "egy jegy", eur: 3256,
    dates: "okt. 16. → okt. 29.", inGate: "Peking PEK", outGate: "Peking PEK",
    allDirect: true, dayFlightHome: true,
    fits: "A legrövidebb repülés (9 óra 10 perc oda) és nappali hazaút. Peking + Datong (Yungang buddha-barlangok) + Xi’an mind gyorsvasúttal elérhető.",
    drawback: "A déli felét – Shenzhen, Hongkong, Guilin, tengerpart – teljesen kihagyja.",
  },
  {
    id: "oj-can-pvg", label: "Guangzhou be / Shanghai ki", kind: "open-jaw", ticketing: "két egyirányú jegy", eur: 4094,
    dates: "okt. 17. → okt. 30.", inGate: "Guangzhou CAN", outGate: "Shanghai PVG",
    allDirect: true, dayFlightHome: false,
    fits: "Dél-észak ív Peking nélkül: Shenzhen és Hongkong, Guilin, majd Shanghai és a vízi városok.",
    drawback: "Drágább, mint fordítva, és hajnali hazaúttal zár.",
  },
  {
    id: "oj-pek-can", label: "Peking be / Guangzhou ki", kind: "open-jaw", ticketing: "két egyirányú jegy", eur: 4151,
    dates: "okt. 16. → okt. 31.", inGate: "Peking PEK", outGate: "Guangzhou CAN",
    allDirect: true, dayFlightHome: false,
    fits: "Ugyanaz az ív, mint a Guangzhou→Peking, csak fordítva: a Nagy Fallal kezdünk és a tengerparton fejezzük be.",
    drawback: "455 euróval drágább, mint fordított irányban, és elveszti a nappali hazautat.",
  },
];

export type RegionalFare = {
  route: string;
  date: string;
  eur: number;
  airline: string;
  code?: string;
  duration: string;
  nonstop: boolean;
  note?: string;
  source: SourceRef;
};

/** Belső szakaszok repülővel – mind a négy főre, egy irányra, ha nincs jelölve másképp. */
export const regionalFares: RegionalFare[] = [
  { route: "Shanghai → Tajpej", date: "okt. 24.", eur: 638, airline: "China Airlines / China Southern", duration: "2 óra", nonstop: true, note: "Tajvan olcsón beköthető: technológia, éjszakai piacok, Taroko-szurdok és tengerpart.", source: gf("Google Flights PVG→TPE", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjQoAGoFEgNQVkdyBRIDVFBFQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Tajpej → Hongkong", date: "okt. 28.", eur: 310, airline: "HK Express", duration: "2 óra 5 perc", nonstop: true, note: "A legolcsóbb regionális szakasz; napi több járat.", source: gf("Google Flights TPE→HKG", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNUUEVyBRIDSEtHQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Tajpej → Guangzhou", date: "okt. 28.", eur: 681, airline: "China Southern", duration: "2 óra 15 perc", nonstop: true, source: gf("Google Flights TPE→CAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNUUEVyBRIDQ0FOQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong ↔ Sanya, oda-vissza", date: "okt. 25. → okt. 29.", eur: 524, airline: "HK Express", code: "UO 250", duration: "1 óra 45 perc irányonként", nonstop: true, note: "Változatlanul a legjobb ár/érték a trópusi tengerhez.", source: gf("Google Flights HKG↔SYX", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDU1lYGhwSCjIwMjYtMTAtMjkoAGoFEgNTWVhyBRIDSEtHQgQBAQICSAGYAQE=&hl=en&curr=EUR") },
  { route: "Sanya → Guangzhou", date: "okt. 28.", eur: 714, airline: "China Southern", duration: "1 óra 35 perc", nonstop: true, note: "A guangzhoui kijárathoz ez a logikus záró szakasz.", source: gf("Google Flights SYX→CAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNTWVhyBRIDQ0FOQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong ↔ Hanoi, oda-vissza", date: "okt. 24. → okt. 28.", eur: 970, airline: "HK Express", duration: "2 óra irányonként", nonstop: true, note: "Trang An barlangos csónakázásához.", source: gf("Google Flights HKG↔HAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjQoAGoFEgNIS0dyBRIDSEFOGhwSCjIwMjYtMTAtMjgoAGoFEgNIQU5yBRIDSEtHQgQBAQICSAGYAQE=&hl=en&curr=EUR") },
  { route: "Shenzhen → Xi’an", date: "okt. 25.", eur: 271, airline: "Spring Airlines", code: "9C 8753", duration: "2 óra 40 perc", nonstop: true, note: "Ha az északi ívet repülővel rövidítenénk: ez a legolcsóbb ugrás a buddhista sziklatemplomokhoz.", source: gf("Google Flights SZX→XIY", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNTWlhyBRIDWElZQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
];

/** Menetrendi tények, napról napra ellenőrizve. */
export const scheduleFacts = [
  { route: "Peking (Air China)", days: "naponta, két rotációval", detail: "BUD 13:00 → PEK 04:10+1 (9 óra 10 perc) és BUD 20:10 → PEK 11:20+1. Vissza PEK 14:00 → BUD 17:35, illetve PEK 03:00 → BUD 07:00.", verified: true },
  { route: "Shanghai (Shanghai Airlines)", days: "naponta", detail: "BUD 12:30 → PVG 05:35+1 (11 óra 5 perc), vissza PVG 01:50 → BUD 07:05. A Google egyetlen dátumon és pénznemben sem árazza – csak a Trip.com és a China Eastern saját oldala.", verified: true },
  { route: "Guangzhou (China Southern)", days: "kedd, csütörtök, szombat", detail: "BUD 12:45 → CAN 05:30+1 (10 óra 45 perc). Okt. 13., 15., 17., 20. megy; okt. 14., 16., 18., 19. nem. Vissza okt. 27., 29., 31.; okt. 30-án nincs.", verified: true },
  { route: "Shenzhen (Hainan)", days: "menetrendben van, de nem eladó", detail: "Okt. 16-ra és okt. 26–31-re egyetlen jegyárus sem ad árat. Ami látszik a naptárban: okt. 12-re 2462 €, nov. 6-ra 1664 € – tehát a járat él, csak a mi ablakunk üres vagy kiárazott.", verified: true },
  { route: "Hongkong → Budapest", days: "nincs közvetlen járat", detail: "Változatlanul nincs nonstop; Hongkong csak bázisnak jó, kapunak nem.", verified: true },
  { route: "Szöul (Korean Air)", days: "naponta", detail: "BUD 20:10 → ICN 13:40+1 (10 óra 30 perc), vissza ICN 12:15 → BUD 16:55. Az ár erősen dátumfüggő: okt. 19-re 3155 €, okt. 17-re 4941 €.", verified: true },
];

/** Ugyanaz a járat, más napokon – mennyit mozog az ár. */
export const dateVariants = [
  { dates: "Peking, okt. 20. (K)", nights: "egy irányba", eur: 1803, note: "A legolcsóbb pekingi odaút a vizsgált héten." },
  { dates: "Peking, okt. 19. (H)", nights: "egy irányba", eur: 2334, note: "" },
  { dates: "Peking, okt. 16. (P)", nights: "egy irányba", eur: 2431, note: "A tervezett indulási napunk." },
  { dates: "Peking, okt. 13. (K)", nights: "egy irányba", eur: 3231, note: "Ugyanaz a járat, 1428 €-val drágábban – érdemes napot választani." },
];
