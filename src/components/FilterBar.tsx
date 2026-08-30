"use client";

import type { FilterId } from "@/data/types";

const filters: { id: FilterId; label: string }[] = [
  { id: "train", label: "🚆 csak vonattal" }, { id: "flight", label: "✈️ repülés belefér" },
  { id: "history", label: "🏯 történelem" }, { id: "nature", label: "🏔️ természet" },
  { id: "active", label: "🚣 aktív" }, { id: "swimming", label: "🏖️ fürdés" },
  { id: "beach", label: "🏝️ strand" }, { id: "cave", label: "🕳️ barlang" },
  { id: "boat", label: "🚤 hajózás" }, { id: "bike", label: "🚲 bicikli" },
  { id: "family", label: "👨‍👩‍👧‍👦 gyerekekkel" }, { id: "short-stay", label: "1–2 éj" },
  { id: "long-stay", label: "3–4 éj" }, { id: "good-weather", label: "☀️ jó idő októberben" },
];

export function FilterBar({ selected, onToggle, onClear }: { selected: FilterId[]; onToggle: (id: FilterId) => void; onClear: () => void }) {
  return <div className="filter-shell">
    <div className="section-kicker">Szűrd a saját utatokat</div>
    <div className="filters" aria-label="Célpontszűrők">
      {filters.map((filter) => <button key={filter.id} type="button" aria-pressed={selected.includes(filter.id)} className={selected.includes(filter.id) ? "filter active" : "filter"} onClick={() => onToggle(filter.id)}>{filter.label}</button>)}
      {selected.length > 0 && <button type="button" className="filter clear" onClick={onClear}>× mind törlése</button>}
    </div>
    <p className="filter-note">A szűrők ÉS kapcsolatban működnek: minden kiválasztott feltételnek teljesülnie kell. Mivel Shenzhenbe térünk vissza, minden célpont oda-vissza értendő a shenzheni vagy hongkongi bázisról.</p>
  </div>;
}
