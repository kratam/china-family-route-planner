import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Planner } from "./Planner";

describe("Planner", () => {
  it("renders the full researched destination set", () => {
    render(<Planner />);
    expect(screen.getByText("22 célpont látható")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Guilin + Yangshuo + Xingping" })).toBeInTheDocument();
  });

  it("combines interactive filters and updates the visible count", () => {
    render(<Planner />);
    fireEvent.click(screen.getByRole("button", { name: "🚆 csak vonattal" }));
    fireEvent.click(screen.getByRole("button", { name: "🏯 történelem" }));
    expect(screen.getByText("6 célpont látható")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Sanya / Hainan" })).not.toBeInTheDocument();
  });
});
