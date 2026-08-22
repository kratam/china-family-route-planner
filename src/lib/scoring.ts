import type { Itinerary } from "@/data/types";

export function scoreItinerary(itinerary: Itinerary) {
  const values = Object.values(itinerary.scores);
  return Math.round((values.reduce((sum, score) => sum + score, 0) / values.length) * 10) / 10;
}
