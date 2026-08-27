import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { destinations } from "./destinations";
import { itineraries } from "./itineraries";
import { travelogues } from "./travelogues";
import { homewardFares, longHaulFares, regionalFares } from "./flightPrices";

describe("published travel data invariants", () => {
  it("uses unique destination ids and bounded scores", () => {
    expect(new Set(destinations.map((item) => item.id)).size).toBe(destinations.length);
    for (const destination of destinations) {
      expect(Object.values(destination.scores).every((score) => score >= 1 && score <= 5)).toBe(true);
    }
  });

  it("has two working, precisely credited photos per destination", () => {
    for (const destination of destinations) {
      expect(destination.photos).toHaveLength(2);
      for (const photo of destination.photos) {
        const asset = join(process.cwd(), "public", photo.src);
        expect(existsSync(asset)).toBe(true);
        expect(statSync(asset).size).toBeGreaterThan(10_000);
        expect(photo.creditUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
        expect(photo.credit).toBeTruthy();
        expect(photo.license).toBeTruthy();
      }
    }
  });

  it("keeps open-jaw filtering consistent with the route copy", () => {
    expect(destinations.find((item) => item.id === "shenzhen")?.tags).not.toContain("open-jaw");
    for (const id of ["zhaoqing", "chaozhou", "xiamen", "shaoguan", "kaiping"]) {
      expect(destinations.find((item) => item.id === id)?.tags).toContain("open-jaw");
    }
  });

  it("gives every complete itinerary dated stages and sources", () => {
    for (const itinerary of itineraries) {
      expect(itinerary.timeline.length).toBeGreaterThanOrEqual(4);
      expect(itinerary.timeline.every((stage) => /okt\./.test(stage.dates))).toBe(true);
      expect(itinerary.timeline.at(-1)?.dates).toContain("30.");
      expect(itinerary.timeline.filter((stage) => stage.place.includes("→")).every((stage) => stage.source)).toBe(true);
      expect(itinerary.sources.length).toBeGreaterThanOrEqual(2);
      expect(itinerary.sources.every((source) => source.url.startsWith("https://"))).toBe(true);
    }
  });

  it("counts hotel changes rather than hotel bases", () => {
    const expected = { "shenzhen-return": 4, "classic-guilin": 3, "ninh-binh": 4, xiamen: 3, chaozhou: 4, xian: 3, sanya: 3, angkor: 3, danang: 4, zhangjiajie: 3 };
    for (const itinerary of itineraries) expect(itinerary.changes).toBe(expected[itinerary.id as keyof typeof expected]);
  });

  it("prices every itinerary with a concrete, four-person flight budget", () => {
    for (const itinerary of itineraries) {
      expect(itinerary.flightBudget.totalEur).toBeGreaterThan(1000);
      expect(itinerary.flightBudget.totalEur).toBeLessThan(10_000);
      expect(itinerary.flightBudget.breakdown.length).toBeGreaterThan(20);
      expect(itinerary.flightBudget.note.length).toBeGreaterThan(20);
    }
    const winner = itineraries.find((route) => route.rank === 1);
    expect(winner?.id).toBe("shenzhen-return");
    expect(winner?.flightBudget.allDirectLongHaul).toBe(true);
    const cheapest = Math.min(...itineraries.map((route) => route.flightBudget.totalEur));
    expect(winner?.flightBudget.totalEur).toBe(cheapest);
    expect(new Set(itineraries.map((route) => route.rank)).size).toBe(itineraries.length);
  });

  it("keeps every quoted fare sourced and internally consistent", () => {
    for (const fare of longHaulFares) {
      expect(fare.eur).toBeGreaterThan(1000);
      expect(fare.segments.length).toBeGreaterThanOrEqual(2);
      expect(fare.allDirect).toBe(fare.segments.every((segment) => segment.nonstop));
      expect(fare.source.url).toContain("google.com/travel/flights");
      if (fare.agencyEur !== undefined) expect(fare.agencyName).toBeTruthy();
    }
    for (const fare of [...regionalFares, ...homewardFares]) {
      expect(fare.eur).toBeGreaterThan(50);
      expect(fare.source.url).toMatch(/^https:\/\//);
      expect(fare.date).toMatch(/okt\./);
    }
    const cheapestLongHaulDirect = longHaulFares.filter((fare) => fare.allDirect).sort((a, b) => a.eur - b.eur)[0];
    expect(cheapestLongHaulDirect.id).toBe("rt-szx");
  });

  it("has one transparent, family-aware travelogue for every destination", () => {
    expect(Object.keys(travelogues).sort()).toEqual(destinations.map((item) => item.id).sort());
    for (const travelogue of Object.values(travelogues)) {
      expect(travelogue.url).toMatch(/^https:\/\//);
      expect(["nagyon pozitív", "pozitív", "vegyes"]).toContain(travelogue.sentiment);
      expect(["magas", "közepes"]).toContain(travelogue.familyRelevance);
      expect(travelogue.note.length).toBeGreaterThan(20);
    }
    expect(travelogues.zhaoqing.url).toContain("/moments/detail/zhaoqing-");
  });
});
