import { describe, expect, it } from "vitest";
import { filterDestinations } from "./filterDestinations";
import type { Destination } from "@/data/types";

const fixture = [
  { id: "rail-beach", tags: ["train", "beach", "family"], nights: { min: 2, ideal: 3 } },
  { id: "flight-history", tags: ["flight", "history", "family"], nights: { min: 3, ideal: 4 } },
  { id: "rail-history", tags: ["train", "history", "family", "good-weather"], nights: { min: 1, ideal: 2 } },
] as Destination[];

describe("filterDestinations", () => {
  it("returns every destination when no filter is selected", () => {
    expect(filterDestinations(fixture, [])).toHaveLength(3);
  });

  it("combines selected filters with AND logic", () => {
    expect(filterDestinations(fixture, ["train", "history"])).toEqual([fixture[2]]);
  });

  it("maps night filters to the recommended stay", () => {
    expect(filterDestinations(fixture, ["short-stay"]).map((item) => item.id)).toEqual(["rail-history"]);
  });
});
