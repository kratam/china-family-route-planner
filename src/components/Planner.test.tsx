import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Planner } from "./Planner";
import { destinations } from "@/data/destinations";
import { filterDestinations } from "@/lib/filterDestinations";

describe("Planner", () => {
  it("renders the full researched destination set", () => {
    render(<Planner />);
    expect(screen.getByText(`${destinations.length} célpont látható`)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Guilin + Yangshuo + Xingping" })).toBeInTheDocument();
  });

  it("combines interactive filters and updates the visible count", () => {
    render(<Planner />);
    fireEvent.click(screen.getByRole("button", { name: "🚆 csak vonattal" }));
    fireEvent.click(screen.getByRole("button", { name: "🏯 történelem" }));
    const expected = filterDestinations(destinations, ["train", "history"]).length;
    expect(expected).toBeGreaterThan(0);
    expect(screen.getByText(`${expected} célpont látható`)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Sanya / Hainan" })).not.toBeInTheDocument();
  });

  it("derives the winning score from the itinerary data", () => {
    render(<Planner />);
    const verdict = document.querySelector(".verdict-stats");
    expect(verdict).not.toBeNull();
    expect(within(verdict as HTMLElement).getByText("4,5")).toBeInTheDocument();
  });
});
