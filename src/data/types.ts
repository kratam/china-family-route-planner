export type DestinationTag =
  | "train" | "flight" | "history" | "nature" | "active" | "swimming"
  | "beach" | "cave" | "boat" | "bike" | "family" | "good-weather";

export type FilterId = DestinationTag | "short-stay" | "long-stay";

export type Scores = {
  history: number; nature: number; active: number; swimming: number;
  family: number; weather: number; wow: number;
};

export type SourceRef = { label: string; url: string };

export type Transport = {
  summary: string;
  direct: boolean;
  duration: string;
  doorToDoor: string;
  price: string;
  note?: string;
  source: SourceRef;
};

export type Attraction = {
  name: string;
  description: string;
  type: string;
  kidScore: number;
  duration: string;
  price?: string;
  url: string;
};

export type Travelogue = {
  title: string;
  publisher: string;
  url: string;
  sentiment: "nagyon pozitív" | "pozitív" | "vegyes";
  familyRelevance: "magas" | "közepes";
  note: string;
};

export type Hotel = {
  name: string;
  tier: "ár/érték" | "magasabb kategória" | "legjobb lokáció";
  note: string;
  url: string;
};

export type Photo = {
  src: string;
  alt: string;
  creditUrl: string;
  credit: string;
  license: string;
  licenseUrl: string;
};

export type Destination = {
  id: string;
  name: string;
  country: string;
  emoji: string;
  region: string;
  feeling: string;
  editorial: string;
  tags: DestinationTag[];
  nights: { min: number; ideal: number };
  scores: Scores;
  travelCost: string;
  realisticTime: string;
  fromShenzhen: Transport;
  fromHongKong: Transport;
  homeward: string;
  weather: { air: string; rain: string; risk: "alacsony" | "közepes" | "magas"; note: string; source: SourceRef };
  swimming: { realistic: string; water: string; where: string };
  why: string[];
  attractions: Attraction[];
  hotels: Hotel[];
  photos: Photo[];
};

export type ItineraryScores = {
  culture: number; history: number; nature: number; active: number; swimming: number;
  family: number; logistics: number; value: number; weather: number; wow: number;
};

export type FlightBudget = {
  /** A teljes négyfős repülőköltség euróban, konkrét 2026. augusztusi lekérdezésből. */
  totalEur: number;
  /** Hogyan áll össze ez az összeg. */
  breakdown: string;
  /** Igaz, ha a hosszú távú oda- és hazaút is közvetlen. */
  allDirectLongHaul: boolean;
  /** Egy mondat arról, mit érdemes tudni erről az árról. */
  note: string;
};

export type Itinerary = {
  id: string;
  rank: number;
  name: string;
  dates: string;
  route: string[];
  nights: string[];
  changes: number;
  trains: string[];
  flights: string[];
  regionalCost: string;
  flightBudget: FlightBudget;
  /** Hány nap jut ténylegesen fürdésre ezen az útvonalon. */
  swimDays: string;
  /** Az útvonal egy mondatos „ezért éri meg” kiemelése: barlang, hajó, strand. */
  highlight: string;
  homeAirport: string;
  homeTime: string;
  advantage: string;
  drawback: string;
  weatherRisk: string;
  timeline: { dates: string; place: string; note: string; source?: SourceRef }[];
  sources: SourceRef[];
  scores: ItineraryScores;
};
