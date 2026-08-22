import { describe, expect, it } from "vitest";
import type { Attraction, Destination, Travelogue } from "@/data/types";
import { destinations } from "@/data/destinations";
import { travelogues } from "@/data/travelogues";
import { buildProgramLinks, classifyProgramSource } from "./programLinks";

describe("program link helpers", () => {
  it("labels the primary source explicitly", () => {
    expect(classifyProgramSource("https://www.hongkongdisneyland.com/")).toBe("Hivatalos oldal");
    expect(classifyProgramSource("https://www.trip.com/travel-guide/search/?keyword=Disneyland")).toBe("Trip.com");
    expect(classifyProgramSource("https://www.klook.com/en-US/search/?query=Disneyland")).toBe("Klook");
    expect(classifyProgramSource("https://whc.unesco.org/en/list/1110/")).toBe("Hivatalos UNESCO-oldal");
    expect(classifyProgramSource("https://www.bmy.com.cn/")).toBe("Hivatalos oldal");
  });

  it("builds four useful fallbacks for every attraction", () => {
    const attraction: Attraction = {
      name: "Dragon’s Back + Big Wave Bay",
      description: "Túra és strand.",
      type: "túra/strand",
      kidScore: 5,
      duration: "fél nap",
      url: "https://www.discoverhongkong.com/eng/explore/great-outdoor/wellness/dragons-back-hiking-tour.html",
    };
    const destination = { name: "Hongkong" } as Destination;
    const travelogue: Travelogue = {
      title: "Öt családi kirándulás Hongkong vad oldalán",
      publisher: "HK Outdoors",
      url: "https://www.hkoutdoors.com/five-fun-family-friendly-outings-in-hong-kong-wild-side-html/",
      sentiment: "nagyon pozitív",
      familyRelevance: "magas",
      note: "Konkrét, gyerekekkel bejárt útvonalak.",
    };

    const links = buildProgramLinks(attraction, destination, travelogue);

    expect(links).toHaveLength(4);
    expect(links.map((link) => link.kind)).toEqual(["source", "travelogue", "google", "getyourguide"]);
    expect(links[0].label).toBe("Hivatalos turisztikai oldal");
    expect(links[1].travelogue).toEqual(travelogue);
    expect(decodeURIComponent(links[2].url)).toContain("Dragon’s Back + Big Wave Bay Hongkong with kids");
    expect(links[3].url).toContain("getyourguide.com");
  });

  it("builds four valid, distinct links for the complete published dataset", () => {
    for (const destination of destinations) {
      for (const attraction of destination.attractions) {
        const links = buildProgramLinks(attraction, destination, travelogues[destination.id]);
        expect(links.map((link) => link.kind)).toEqual(["source", "travelogue", "google", "getyourguide"]);
        expect(new Set(links.map((link) => link.url)).size).toBe(4);
        for (const link of links) expect(() => new URL(link.url)).not.toThrow();
      }
    }
  });
});
