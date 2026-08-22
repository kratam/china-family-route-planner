import type { Destination, FilterId } from "@/data/types";

export function filterDestinations(destinations: Destination[], filters: FilterId[]) {
  return destinations.filter((destination) => filters.every((filter) => {
    if (filter === "short-stay") return destination.nights.ideal <= 2;
    if (filter === "long-stay") return destination.nights.ideal >= 3;
    return destination.tags.includes(filter);
  }));
}
