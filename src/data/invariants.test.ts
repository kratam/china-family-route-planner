import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { destinations } from "./destinations";
import { itineraries } from "./itineraries";

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
});
