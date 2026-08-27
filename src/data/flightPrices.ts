import type { SourceRef } from "./types";

/**
 * Konkrét, lekérdezett repülőárak – nem becslés.
 *
 * Módszer: Google Flights, 2026. augusztus 27-i lekérdezés, 2 felnőtt + 2 gyerek
 * (8 és 10 év), turista osztály, „végleges ár” (adók és illetékek benne, poggyász
 * a légitársaság szabálya szerint). Minden ár a TELJES négyfős utazásra vonatkozik.
 */
export const priceCheck = {
  checkedOn: "2026. augusztus 27.",
  passengers: "2 felnőtt + 2 gyerek (8 és 10 év)",
  cabin: "turista osztály",
  currency: "EUR",
  hufRate: 365,
  note: "Minden ár a teljes négyfős utazásra szól, adókkal és illetékekkel. A forint-értékek a Google foglalási paneljében megjelenő ~365 Ft/€ árfolyamon; az MNB/EKB középárfolyam 2026. augusztus 26-án 360,2 Ft/€ volt.",
} as const;

/** Magyar számcsoportosítás ezresenként, nem törő szóközzel. */
export const grouped = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

export type FlightSegment = {
  code: string;
  from: string;
  to: string;
  dep: string;
  arr: string;
  duration: string;
  nonstop: boolean;
};

export type Fare = {
  id: string;
  label: string;
  dates: string;
  ticketing: "egy jegy" | "két külön jegy";
  eur: number;
  agencyEur?: number;
  agencyName?: string;
  airline: string;
  segments: FlightSegment[];
  allDirect: boolean;
  comfort: string;
  verdict: string;
  source: SourceRef;
};

const gf = (label: string, url: string): SourceRef => ({ label, url });

/** Hosszú távú (Budapest ↔ Ázsia) alapok. */
export const longHaulFares: Fare[] = [
  {
    id: "rt-szx",
    label: "Budapest ↔ Shenzhen oda-vissza (Kínán belül csak vonat)",
    dates: "okt. 16. → okt. 30.",
    ticketing: "egy jegy",
    eur: 3016,
    agencyEur: 2816,
    agencyName: "lastminute.com",
    airline: "Hainan Airlines",
    segments: [
      { code: "HU 762", from: "BUD", to: "SZX", dep: "11:50", arr: "04:50+1", duration: "11 óra", nonstop: true },
      { code: "HU 761", from: "SZX", to: "BUD", dep: "01:55", arr: "07:15", duration: "12 óra 20 perc", nonstop: true },
    ],
    allDirect: true,
    comfort: "Mindkét irány közvetlen. Fejenként 1 kézipoggyász és 1 feladott bőrönd az árban.",
    verdict: "A legolcsóbb ÉS az egyetlen mindkét irányban közvetlen megoldás. Egyben ez a legjobb ár/kényelem arány az összes vizsgált változat közül.",
    source: gf("Google Flights – BUD↔SZX közvetlen oda-vissza", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMTYoAGoFEgNCVURyBRIDU1pYGhwSCjIwMjYtMTAtMzAoAGoFEgNTWlhyBRIDQlVEQgQBAQICSAGYAQE=&hl=en&curr=EUR"),
  },
  {
    id: "oj-szx-xiy",
    label: "Open-jaw: Shenzhen be / Xi’an ki",
    dates: "okt. 16. / okt. 29.",
    ticketing: "egy jegy",
    eur: 2610,
    agencyEur: 2594,
    agencyName: "lastminute.com",
    airline: "Hainan Airlines",
    segments: [
      { code: "HU 762", from: "BUD", to: "SZX", dep: "11:50", arr: "04:50+1", duration: "11 óra", nonstop: true },
      { code: "Hainan XIY→SZX→BUD", from: "XIY", to: "BUD", dep: "16:10", arr: "07:15+1", duration: "22 óra 5 perc (6 óra 45 perc átszállás Shenzhenben)", nonstop: false },
    ],
    allDirect: false,
    comfort: "Odaút közvetlen, hazaút egy átszállással, de végig Hainan-jegyen.",
    verdict: "Papíron a legolcsóbb hosszú távú jegy, mert a Hainan a Xi’an→Shenzhen szakaszt olcsó átszállójegyként adja. A 6 óra 45 perces éjszakai várakozás Shenzhenben viszont gyerekekkel kemény, és a Xi’an-hoz még kell egy HKG→XIY jegy is.",
    source: gf("Google Flights – open-jaw BUD→SZX / XIY→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMTZqBRIDQlVEcgUSA1NaWBoaEgoyMDI2LTEwLTI5agUSA1hJWXIFEgNCVURCBAEBAgJIAZgBAw==&hl=en&curr=EUR"),
  },
  {
    id: "oj-szx-can-one",
    label: "Open-jaw: Shenzhen be / Guangzhou ki – EGY jegyen",
    dates: "okt. 16. / okt. 29.",
    ticketing: "egy jegy",
    eur: 3437,
    agencyEur: 3416,
    agencyName: "lastminute.com",
    airline: "Hainan Airlines",
    segments: [
      { code: "HU 762", from: "BUD", to: "SZX", dep: "11:50", arr: "04:50+1", duration: "11 óra", nonstop: true },
      { code: "Hainan CAN→CKG→SZX→BUD", from: "CAN", to: "BUD", dep: "11:40", arr: "07:15+1", duration: "26 óra 35 perc, 2 átszállás", nonstop: false },
    ],
    allDirect: false,
    comfort: "A hazaút Csungkingon és Shenzhenen keresztül vezet – 26 és fél óra.",
    verdict: "Ez az a csapda, amit a Google elsőre kidob: a nyitott szárú jegyen a közvetlen China Southern hazaút NEM kombinálható a Hainan odaúttal. Drágább is, rosszabb is, mint az egyszerű shenzheni oda-vissza.",
    source: gf("Google Flights – open-jaw BUD→SZX / CAN→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMTZqBRIDQlVEcgUSA1NaWBoaEgoyMDI2LTEwLTI5agUSA0NBTnIFEgNCVURCBAEBAgJIAZgBAw==&hl=en&curr=EUR"),
  },
  {
    id: "oj-szx-can-two",
    label: "Open-jaw: Shenzhen be / Guangzhou ki – KÉT külön jegyen, mindkettő közvetlen",
    dates: "okt. 16. / okt. 29.",
    ticketing: "két külön jegy",
    eur: 3768,
    agencyEur: 3718,
    agencyName: "lastminute.com + China Southern",
    airline: "Hainan Airlines + China Southern",
    segments: [
      { code: "HU 762", from: "BUD", to: "SZX", dep: "11:50", arr: "04:50+1", duration: "11 óra · 2 079 €", nonstop: true },
      { code: "CZ 649", from: "CAN", to: "BUD", dep: "01:30", arr: "07:10", duration: "12 óra 40 perc · 1 689 €", nonstop: true },
    ],
    allDirect: true,
    comfort: "Mindkét irány közvetlen, de két külön jegy: késés esetén nincs átvállalás.",
    verdict: "Ez az eredeti terv „tisztán közvetlen” ára. Működik, de 752 euróval drágább a shenzheni oda-visszánál, és a két jegy miatt kockázatosabb.",
    source: gf("Google Flights – BUD→SZX egyirányú közvetlen", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMTYoAGoFEgNCVURyBRIDU1pYQgQBAQICSAGYAQI=&hl=en&curr=EUR"),
  },
  {
    id: "oj-szx-han",
    label: "Open-jaw: Shenzhen be / Hanoi ki – egy jegyen",
    dates: "okt. 16. / okt. 29.",
    ticketing: "egy jegy",
    eur: 3618,
    airline: "Emirates + flydubai",
    segments: [
      { code: "FZ/EK BUD→DXB→SZX", from: "BUD", to: "SZX", dep: "22:40", arr: "22:40+1", duration: "18 óra, 1 átszállás", nonstop: false },
      { code: "EK HAN→DXB→BUD", from: "HAN", to: "BUD", dep: "00:25", arr: "13:05", duration: "18 óra 40 perc, 1 átszállás", nonstop: false },
    ],
    allDirect: false,
    comfort: "Egy jegy, de mindkét irányban dubaji átszállással – a Hainan közvetlen odaút itt nem kombinálható.",
    verdict: "Ha Vietnám a kijárat, jobb két külön jegy: közvetlen BUD→SZX (2 079 €) + Hanoi→Budapest Qatarral (1 336 €) = 3 415 €, és az odaút közvetlen marad.",
    source: gf("Google Flights – open-jaw BUD→SZX / HAN→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMTZqBRIDQlVEcgUSA1NaWBoaEgoyMDI2LTEwLTI5agUSA0hBTnIFEgNCVURCBAEBAgJIAZgBAw==&hl=en&curr=EUR"),
  },
  {
    id: "oj-szx-sai",
    label: "Open-jaw: Shenzhen be / Siem Reap ki",
    dates: "okt. 16. / okt. 29.",
    ticketing: "egy jegy",
    eur: 3864,
    airline: "Emirates + flydubai",
    segments: [
      { code: "FZ/EK BUD→DXB→SZX", from: "BUD", to: "SZX", dep: "22:40", arr: "22:40+1", duration: "18 óra, 1 átszállás", nonstop: false },
      { code: "EK SAI→BKK→DXB→BUD", from: "SAI", to: "BUD", dep: "23:50", arr: "13:05+1", duration: "19 óra 15 perc, 2 átszállás", nonstop: false },
    ],
    allDirect: false,
    comfort: "Sehol nincs közvetlen szakasz; a hazaút két átszállás.",
    verdict: "A shortlist legdrágább és leggyengébb logisztikájú hosszú távú jegye.",
    source: gf("Google Flights – open-jaw BUD→SZX / SAI→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMTZqBRIDQlVEcgUSA1NaWBoaEgoyMDI2LTEwLTI5agUSA1NBSXIFEgNCVURCBAEBAgJIAZgBAw==&hl=en&curr=EUR"),
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

/** Regionális szakaszok – mind a négy főre, egy irányra. */
export const regionalFares: RegionalFare[] = [
  { route: "Hongkong → Hanoi", date: "okt. 25.", eur: 507, airline: "Sun PhuQuoc Airways / HK Express (524 €)", code: "UO 540", duration: "2 óra 5 perc", nonstop: true, source: gf("Google Flights HKG→HAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDSEFOQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Shenzhen → Hanoi", date: "okt. 25.", eur: 515, airline: "Shenzhen Airlines", duration: "2 óra 5 perc", nonstop: true, source: gf("Google Flights SZX→HAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNTWlhyBRIDSEFOQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong → Sanya", date: "okt. 25.", eur: 287, airline: "HK Express", code: "UO 250", duration: "1 óra 45 perc", nonstop: true, note: "A shortlist legolcsóbb regionális repülése.", source: gf("Google Flights HKG→SYX", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDU1lYQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Sanya → Shenzhen", date: "okt. 28.", eur: 522, airline: "China Southern", duration: "1 óra 45 perc", nonstop: true, note: "Napi több járat; ezzel Sanya beköthető a shenzheni oda-visszába.", source: gf("Google Flights SYX→SZX", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNTWVhyBRIDU1pYQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Sanya → Guangzhou", date: "okt. 28.", eur: 714, airline: "China Southern", duration: "1 óra 35 perc", nonstop: true, source: gf("Google Flights SYX→CAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNTWVhyBRIDQ0FOQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong → Da Nang", date: "okt. 25.", eur: 349, airline: "HK Express", code: "UO 552 / 556 / 558", duration: "1 óra 55 perc", nonstop: true, source: gf("Google Flights HKG→DAD", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDREFEQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Da Nang → Hanoi", date: "okt. 28.", eur: 114, airline: "Pacific Airlines / Vietjet (118 €)", duration: "1 óra 25 perc", nonstop: true, note: "A legolcsóbb szakasz az egész tervben.", source: gf("Google Flights DAD→HAN", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNEQURyBRIDSEFOQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong → Xi’an", date: "okt. 25.", eur: 826, airline: "Cathay Pacific", duration: "3 óra 35 perc", nonstop: true, source: gf("Google Flights HKG→XIY", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDWElZQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Shenzhen → Xi’an", date: "okt. 25.", eur: 271, airline: "Spring Airlines", code: "9C 8753", duration: "2 óra 40 perc", nonstop: true, note: "Háromszor olcsóbb, mint Hongkongból – ha Xi’an kell, Shenzhenből induljunk.", source: gf("Google Flights SZX→XIY", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNTWlhyBRIDWElZQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong → Siem Reap", date: "okt. 25.", eur: 827, airline: "THAI + Bangkok Airways (Bangkokon át)", duration: "11 óra 50 perc, 1 átszállás", nonstop: false, note: "Nincs közvetlen járat. A 768 eurós legolcsóbb ajánlat 22 órás – gyerekekkel nem reális.", source: gf("Google Flights HKG→SAI", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjVqBRIDSEtHcgUSA1NBSUIEAQECAkgBmAEC&hl=en&curr=EUR") },
  { route: "Hongkong → Zhangjiajie", date: "okt. 25.", eur: 1572, airline: "Chongqing Airlines + China Southern", duration: "44 óra 25 perc, 2 átszállás", nonstop: false, note: "Nincs használható repülő – az Avatar-hegyekhez a 6,5 órás közvetlen gyorsvonat az egyetlen ésszerű út.", source: gf("Google Flights HKG→DYG", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjVqBRIDSEtHcgUSA0RZR0IEAQECAkgBmAEC&hl=en&curr=EUR") },
];

/** Egyirányú hazautak, ha nem egy jegyen vesszük az open-jaw-t. */
export const homewardFares: RegionalFare[] = [
  { route: "Guangzhou → Budapest", date: "okt. 29.", eur: 1689, airline: "China Southern", code: "CZ 649", duration: "12 óra 40 perc", nonstop: true, note: "Kedd / csütörtök / szombat közlekedik; okt. 29. csütörtök, 01:30-kor indul.", source: gf("Google Flights CAN→BUD közvetlen", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjkoAGoFEgNDQU5yBRIDQlVEQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hanoi → Budapest", date: "okt. 29.", eur: 1336, airline: "Qatar Airways", duration: "13 óra 5 perc, 1 átszállás Dohában", nonstop: false, source: gf("Google Flights HAN→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjlqBRIDSEFOcgUSA0JVREIEAQECAkgBmAEC&hl=en&curr=EUR") },
  { route: "Xi’an → Budapest", date: "okt. 29.", eur: 978, airline: "Hainan Airlines", duration: "15 óra 20 perc, 1 átszállás Shenzhenben", nonstop: false, source: gf("Google Flights XIY→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjlqBRIDWElZcgUSA0JVREIEAQECAkgBmAEC&hl=en&curr=EUR") },
  { route: "Siem Reap → Budapest", date: "okt. 29.", eur: 1951, airline: "Bangkok Airways + Finnair", duration: "19 óra 10 perc, 2 átszállás", nonstop: false, source: gf("Google Flights SAI→BUD", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjlqBRIDU0FJcgUSA0JVREIEAQECAkgBmAEC&hl=en&curr=EUR") },
];

/** A repülés menetrendi tényei, ahogy 2026. augusztus 27-én mérve látszanak. */
export const scheduleFacts = [
  { route: "BUD → Shenzhen (HU 762)", days: "hétfő és péntek", detail: "11:50 → 04:50+1, 11 óra. Okt. 16. péntek és okt. 19. hétfő is jó. Okt. 14., 15., 17., 18., 20. nincs járat.", verified: true },
  { route: "Shenzhen → BUD (HU 761)", days: "hétfő és péntek", detail: "01:55 → 07:15, 12 óra 20 perc. Okt. 26. hétfő és okt. 30. péntek megy; okt. 27–29. nem.", verified: true },
  { route: "Guangzhou → BUD (CZ 649)", days: "kedd, csütörtök, szombat", detail: "01:30 → 07:10, 12 óra 40 perc. Okt. 22., 24., 27., 29. megy; okt. 25., 26., 28., 30. nem.", verified: true },
  { route: "Hongkong → BUD", days: "nincs közvetlen járat", detail: "Október 29-én és 30-án sincs nonstop opció; Doha, Dubaj vagy európai hub kell.", verified: true },
];

/** Alternatív dátumok ugyanarra a közvetlen shenzheni oda-visszára. */
export const dateVariants = [
  { dates: "okt. 16. (P) → okt. 30. (P)", nights: "14 éj", eur: 3016, note: "A tervezett dátum." },
  { dates: "okt. 19. (H) → okt. 30. (P)", nights: "11 éj", eur: 2946, note: "70 euróval olcsóbb – a hétfői indulás mindig kicsit kedvezőbb." },
  { dates: "okt. 16. (P) → okt. 26. (H)", nights: "10 éj", eur: 3016, note: "Ugyanannyi, mint a 14 éjszakás – a hossz nem drágít." },
  { dates: "okt. 16. (P) → nov. 2. (H)", nights: "17 éj", eur: 3016, note: "Szintén ugyanannyi. A Hainan-tarifa gyakorlatilag dátumérzéketlen." },
];
