import { describe, expect, it } from "vitest";
import { scoreItinerary } from "./scoring";
import type { Itinerary } from "@/data/types";

describe("scoreItinerary", () => {
  it("averages all ten decision axes on a five-point scale", () => {
    const itinerary = {
      scores: {
        culture: 5, history: 4, nature: 5, active: 4, swimming: 3,
        family: 5, logistics: 4, value: 4, weather: 4, wow: 5,
      },
    } as Itinerary;
    expect(scoreItinerary(itinerary)).toBe(4.3);
  });
});
