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
  regionalCheckedOn: "2026. augusztus 30.",
  passengers: "2 felnőtt + 2 gyerek (8 és 10 év)",
  cabin: "turista osztály",
  currency: "EUR",
  hufRate: 365,
  note: "Minden ár a teljes négyfős utazásra szól, adókkal és illetékekkel. A forint-értékek a Google foglalási paneljében megjelenő ~365 Ft/€ árfolyamon; az MNB/EKB középárfolyam 2026. augusztus 26-án 360,2 Ft/€ volt.",
} as const;

/** Magyar számcsoportosítás ezresenként, nem törő szóközzel. */
export const grouped = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

/** A megvett keret: a döntés 2026. augusztus 30-án megszületett. */
export const decision = {
  headline: "Budapest ↔ Shenzhen, oda-vissza, közvetlenül",
  out: "okt. 16., Hainan HU 762, 11:50 → 04:50+1 (11 óra)",
  back: "okt. 30., Hainan HU 761, 01:55 → 07:15 (12 óra 20 perc)",
  price: 3016,
  agencyPrice: 2816,
  agencyName: "lastminute.com",
  baggage: "fejenként 1 kézipoggyász és 1 feladott bőrönd az árban",
  ground: "13 éjszaka Kínában, okt. 17. hajnalától okt. 29. estéig",
  why: "Ez volt egyszerre a legolcsóbb és az egyetlen mindkét irányban közvetlen megoldás; a nyitott szárú változatok mind drágábbak vagy átszállásosak voltak.",
} as const;

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
  /** "választott" a megvett jegy, "elvetett" a mérés során kizárt alternatíva. */
  status: "választott" | "elvetett";
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

/** Hosszú távú (Budapest ↔ Ázsia) alapok: a választott jegy és a mérés során elvetett alternatívák. */
export const longHaulFares: Fare[] = [
  {
    id: "rt-szx",
    status: "választott",
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
    status: "elvetett",
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
    status: "elvetett",
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
    status: "elvetett",
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
    status: "elvetett",
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
    status: "elvetett",
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

/**
 * Repülős kitérők a shenzheni / hongkongi bázisról – mind a négy főre.
 * Mivel Shenzhenbe térünk vissza, minden kitérő oda-vissza értendő.
 */
export const regionalFares: RegionalFare[] = [
  { route: "Hongkong ↔ Sanya, oda-vissza", date: "okt. 25. → okt. 29.", eur: 524, airline: "HK Express", code: "UO 250", duration: "1 óra 45 perc oda, 1 óra 35 perc vissza", nonstop: true, note: "A terv legjobb ár/érték aránya: négy fő trópusi tengerhez oda-vissza 524 €-ért. Cserébe kell egy hongkongi éj a hazaút előtt.", source: gf("Google Flights HKG↔SYX oda-vissza", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDU1lYGhwSCjIwMjYtMTAtMjkoAGoFEgNTWVhyBRIDSEtHQgQBAQICSAGYAQE=&hl=en&curr=EUR") },
  { route: "Hongkong → Sanya, egy irányba", date: "okt. 25.", eur: 287, airline: "HK Express", code: "UO 250", duration: "1 óra 45 perc", nonstop: true, note: "Ha Sanyából egyenesen Shenzhenbe repülünk vissza, ez az odaút ára.", source: gf("Google Flights HKG→SYX", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDU1lYQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Sanya → Shenzhen, egy irányba", date: "okt. 28.", eur: 522, airline: "China Southern", duration: "1 óra 45 perc", nonstop: true, note: "Ezzel a hazaút napján már a bázison vagyunk – biztonságosabb, mint Hongkongon át visszajönni.", source: gf("Google Flights SYX→SZX", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjgoAGoFEgNTWVhyBRIDU1pYQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Shenzhen ↔ Sanya, oda-vissza", date: "okt. 25. → okt. 29.", eur: 1045, airline: "China Southern", duration: "1 óra 50 perc irányonként", nonstop: true, note: "Kényelmesebb, de kétszer annyi, mint Hongkongból. Csak akkor éri meg, ha nem akarunk hongkongi éjszakát.", source: gf("Google Flights SZX↔SYX oda-vissza", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNTWlhyBRIDU1lYGhwSCjIwMjYtMTAtMjkoAGoFEgNTWVhyBRIDU1pYQgQBAQICSAGYAQE=&hl=en&curr=EUR") },
  { route: "Shenzhen ↔ Hanoi, oda-vissza", date: "okt. 24. → okt. 28.", eur: 935, airline: "Shenzhen Airlines", duration: "2 óra 5 perc irányonként", nonstop: true, note: "A legolcsóbb vietnámi kitérő, és nem kell hozzá Hongkongba menni.", source: gf("Google Flights SZX↔HAN oda-vissza", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjQoAGoFEgNTWlhyBRIDSEFOGhwSCjIwMjYtMTAtMjgoAGoFEgNIQU5yBRIDU1pYQgQBAQICSAGYAQE=&hl=en&curr=EUR") },
  { route: "Hongkong ↔ Hanoi, oda-vissza", date: "okt. 24. → okt. 28.", eur: 970, airline: "HK Express", duration: "2 óra 10 perc oda, 2 óra vissza", nonstop: true, note: "Kényelmes időpontok: 07:40-kor indul és 12:35-kor ér vissza Hongkongba.", source: gf("Google Flights HKG↔HAN oda-vissza", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjQoAGoFEgNIS0dyBRIDSEFOGhwSCjIwMjYtMTAtMjgoAGoFEgNIQU5yBRIDSEtHQgQBAQICSAGYAQE=&hl=en&curr=EUR") },
  { route: "Shenzhen → Xi’an, egy irányba", date: "okt. 25.", eur: 271, airline: "Spring Airlines", code: "9C 8753", duration: "2 óra 40 perc", nonstop: true, note: "Háromszor olcsóbb, mint Hongkongból (826 €). Ha Xi’an kell, Shenzhenből induljunk.", source: gf("Google Flights SZX→XIY", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNTWlhyBRIDWElZQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong → Da Nang, egy irányba", date: "okt. 25.", eur: 349, airline: "HK Express", code: "UO 552 / 556 / 558", duration: "1 óra 55 perc", nonstop: true, note: "Olcsó, de október Da Nang legcsapadékosabb hónapja – ezért nincs a szűk listán.", source: gf("Google Flights HKG→DAD", "https://www.google.com/travel/flights/search?tfs=GhwSCjIwMjYtMTAtMjUoAGoFEgNIS0dyBRIDREFEQgQBAQICSAGYAQI=&hl=en&curr=EUR") },
  { route: "Hongkong → Siem Reap, egy irányba", date: "okt. 25.", eur: 827, airline: "THAI + Bangkok Airways (Bangkokon át)", duration: "11 óra 50 perc, 1 átszállás", nonstop: false, note: "Nincs közvetlen járat, és oda-vissza kb. két teljes utazónapot visz el. Angkor emiatt esett ki.", source: gf("Google Flights HKG→SAI", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjVqBRIDSEtHcgUSA1NBSUIEAQECAkgBmAEC&hl=en&curr=EUR") },
  { route: "Hongkong → Zhangjiajie, egy irányba", date: "okt. 25.", eur: 1572, airline: "Chongqing Airlines + China Southern", duration: "44 óra 25 perc, 2 átszállás", nonstop: false, note: "Nincs használható repülő – az Avatar-hegyekhez a 6,5 órás közvetlen gyorsvonat az egyetlen ésszerű út.", source: gf("Google Flights HKG→DYG", "https://www.google.com/travel/flights/search?tfs=GhoSCjIwMjYtMTAtMjVqBRIDSEtHcgUSA0RZR0IEAQECAkgBmAEC&hl=en&curr=EUR") },
];

/** A repülés menetrendi tényei, ahogy 2026. augusztus 27-én mérve látszanak. */
export const scheduleFacts = [
  { route: "BUD → Shenzhen (HU 762)", days: "hétfő és péntek", detail: "11:50 → 04:50+1, 11 óra. Okt. 16. péntek és okt. 19. hétfő is jó. Okt. 14., 15., 17., 18., 20. nincs járat.", verified: true },
  { route: "Shenzhen → BUD (HU 761)", days: "hétfő és péntek", detail: "01:55 → 07:15, 12 óra 20 perc. Okt. 26. hétfő és okt. 30. péntek megy; okt. 27–29. nem.", verified: true },
  { route: "Guangzhou → BUD (CZ 649)", days: "kedd, csütörtök, szombat", detail: "Létezik és 1689 € lenne, de a Hainan odaúttal egyetlen jegyre nem kombinálható – ezért nem ezt választottuk.", verified: true },
  { route: "Hongkong → BUD", days: "nincs közvetlen járat", detail: "Október 29-én és 30-án sincs nonstop opció; Doha, Dubaj vagy európai hub kell.", verified: true },
];

/** Alternatív dátumok ugyanarra a közvetlen shenzheni oda-visszára. */
export const dateVariants = [
  { dates: "okt. 16. (P) → okt. 30. (P)", nights: "14 éj", eur: 3016, note: "A tervezett dátum." },
  { dates: "okt. 19. (H) → okt. 30. (P)", nights: "11 éj", eur: 2946, note: "70 euróval olcsóbb – a hétfői indulás mindig kicsit kedvezőbb." },
  { dates: "okt. 16. (P) → okt. 26. (H)", nights: "10 éj", eur: 3016, note: "Ugyanannyi, mint a 14 éjszakás – a hossz nem drágít." },
  { dates: "okt. 16. (P) → nov. 2. (H)", nights: "17 éj", eur: 3016, note: "Szintén ugyanannyi. A Hainan-tarifa gyakorlatilag dátumérzéketlen." },
];
