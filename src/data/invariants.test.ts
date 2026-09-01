import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { destinations } from "./destinations";
import { itineraries } from "./itineraries";
import { travelogues } from "./travelogues";
import { architectures, gateways, regionalFares } from "./flightPrices";

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

  it("routes every destination back to the Shenzhen base", () => {
    for (const destination of destinations) {
      expect(destination.homeward.length).toBeGreaterThan(30);
      expect(destination.homeward).not.toMatch(/open-jaw/i);
    }
    for (const id of ["hong-kong", "guangzhou", "zhaoqing", "chaozhou", "guilin", "xiamen", "shaoguan"]) {
      expect(destinations.find((item) => item.id === id)?.tags).toContain("train");
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
    const expected = { "karszt-tenger": 4, "barlang-to-strand": 4, "regi-kina-tenger": 4, "sziget-ovaros": 4, "sanya-strand": 4, "vietnam-barlang": 5, "ket-nagy-taj": 5, "shanghai-tajvan-kor": 3, "shanghai-tajvan-teknos": 5 };
    for (const itinerary of itineraries) expect(itinerary.changes).toBe(expected[itinerary.id as keyof typeof expected]);
  });

  it("prices every itinerary with a concrete, four-person flight budget", () => {
    for (const itinerary of itineraries) {
      expect(itinerary.flightBudget.totalEur).toBeGreaterThan(1000);
      expect(itinerary.flightBudget.totalEur).toBeLessThan(10_000);
      expect(itinerary.flightBudget.breakdown.length).toBeGreaterThan(20);
      expect(itinerary.flightBudget.note.length).toBeGreaterThan(20);
      expect(itinerary.flightBudget.totalEur).toBeGreaterThanOrEqual(3204);
      expect(itinerary.flightBudget.allDirectLongHaul).toBe(true);
      expect(["Guangzhou", "Shanghai"]).toContain(itinerary.route[1]);
      expect(itinerary.route.at(-2)).toBe(itinerary.route[1]);
      expect(itinerary.frame).toMatch(/kapu/);
      expect(itinerary.swimDays.length).toBeGreaterThan(15);
      expect(itinerary.highlight.length).toBeGreaterThan(25);
    }
    const winner = itineraries.find((route) => route.rank === 1);
    expect(winner?.id).toBe("karszt-tenger");
    expect(winner?.flightBudget.allDirectLongHaul).toBe(true);
    const cheapest = Math.min(...itineraries.map((route) => route.flightBudget.totalEur));
    expect(winner?.flightBudget.totalEur).toBe(cheapest);
    expect(new Set(itineraries.map((route) => route.rank)).size).toBe(itineraries.length);
  });

  it("keeps every quoted fare sourced and internally consistent", () => {
    for (const gateway of gateways) {
      expect(gateway.source.url).toMatch(/^https:\/\//);
      if (gateway.status === "él") {
        expect(gateway.outEur).toBeGreaterThan(500);
        expect(gateway.inEur).toBeGreaterThan(200);
      } else {
        expect(gateway.outEur).toBeNull();
        expect(gateway.inEur).toBeNull();
      }
    }
    expect(gateways.filter((gateway) => gateway.status === "kiesett").map((gateway) => gateway.code)).toEqual(["SZX"]);
    for (const arch of architectures) {
      expect(arch.allDirect).toBe(true);
      expect(arch.eur).toBeGreaterThan(2000);
      expect(arch.fits.length).toBeGreaterThan(40);
      expect(arch.drawback.length).toBeGreaterThan(20);
    }
    const cheapest = [...architectures].sort((a, b) => a.eur - b.eur)[0];
    expect(cheapest.id).toBe("rt-pvg");
    for (const fare of regionalFares) {
      expect(fare.eur).toBeGreaterThan(50);
      expect(fare.source.url).toMatch(/^https:\/\//);
      expect(fare.date).toMatch(/okt\./);
    }
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
