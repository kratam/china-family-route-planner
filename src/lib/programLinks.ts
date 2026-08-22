import type { Attraction, Destination, Travelogue } from "@/data/types";

export type ProgramLink = {
  kind: "source" | "travelogue" | "google" | "getyourguide";
  label: string;
  url: string;
  travelogue?: Travelogue;
};

const marketplaceLabels: Record<string, string> = {
  "www.trip.com": "Trip.com",
  "trip.com": "Trip.com",
  "www.klook.com": "Klook",
  "klook.com": "Klook",
  "www.getyourguide.com": "GetYourGuide",
  "getyourguide.com": "GetYourGuide",
  "www.travelchinaguide.com": "TravelChinaGuide",
  "travelchinaguide.com": "TravelChinaGuide",
  "www.chinahighlights.com": "China Highlights útleírás",
  "chinahighlights.com": "China Highlights útleírás",
};

const officialTourismHosts = new Set([
  "www.discoverhongkong.com",
  "www.macaotourism.gov.mo",
]);

const officialHosts = new Set([
  "www.hongkongdisneyland.com",
  "www.thepeak.com.hk",
  "www.np360.com.hk",
  "www.szwwco.com",
  "www.chimelong.com",
  "www.atlantissanya.com",
  "banahills.sunworld.vn",
  "honthom.sunworld.vn",
  "vinwonders.com",
  "www.chaophrayaexpressboat.com",
  "www.elephantnaturepark.org",
  "www.royalgrandpalace.th",
  "www.xmferry.com",
  "www.bmy.com.cn",
]);

export function classifyProgramSource(url: string): string {
  const host = new URL(url).hostname.toLowerCase();
  if (host === "whc.unesco.org") return "Hivatalos UNESCO-oldal";
  if (officialTourismHosts.has(host)) return "Hivatalos turisztikai oldal";
  if (officialHosts.has(host)) return "Hivatalos oldal";
  return marketplaceLabels[host] ?? "Programleírás / forrás";
}

export function buildProgramLinks(attraction: Attraction, destination: Destination, travelogue: Travelogue): ProgramLink[] {
  const googleQuery = `${attraction.name} ${destination.name} with kids family day trip`;
  const activityQuery = `${attraction.name} ${destination.name}`;

  return [
    { kind: "source", label: classifyProgramSource(attraction.url), url: attraction.url },
    { kind: "travelogue", label: `${travelogue.publisher} · családos beszámoló`, url: travelogue.url, travelogue },
    { kind: "google", label: "Google: további családos tippek", url: `https://www.google.com/search?q=${encodeURIComponent(googleQuery)}` },
    { kind: "getyourguide", label: "GetYourGuide programkereső", url: `https://www.getyourguide.com/s/?q=${encodeURIComponent(activityQuery)}` },
  ];
}
