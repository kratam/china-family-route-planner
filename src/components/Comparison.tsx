import type { Destination } from "@/data/types";

const Stars = ({ value }: { value: number }) => <span className="stars" aria-label={`${value} az 5-ből`}>{"★".repeat(value)}<i>{"★".repeat(5 - value)}</i></span>;

export function Comparison({ destinations }: { destinations: Destination[] }) {
  return <div className="comparison-wrap">
    <table className="comparison-table">
      <thead><tr><th>Hely</th><th>Ország</th><th>Shenzhenből</th><th>Hongkongból</th><th>Vonat</th><th>Repülő</th><th>Reális idő</th><th>Regionális odaút / fő</th><th>Történelem</th><th>Természet</th><th>Aktív</th><th>Fürdés</th><th>Gyerek</th><th>Időjárás</th><th>Éjszaka</th><th>Wow</th></tr></thead>
      <tbody>{destinations.map((d) => <tr key={d.id}>
        <th><a href={`#${d.id}`}>{d.emoji} {d.name}</a></th><td>{d.country}</td><td>{d.fromShenzhen.duration}</td><td>{d.fromHongKong.duration}</td><td>{d.tags.includes("train") ? "✓" : "—"}</td><td>{d.tags.includes("flight") ? "✓" : "—"}</td><td>{d.realisticTime}</td><td>{d.travelCost}</td><td><Stars value={d.scores.history} /></td><td><Stars value={d.scores.nature} /></td><td><Stars value={d.scores.active} /></td><td><Stars value={d.scores.swimming} /></td><td><Stars value={d.scores.family} /></td><td><Stars value={d.scores.weather} /></td><td>{d.nights.min} / {d.nights.ideal}</td><td><Stars value={d.scores.wow} /></td>
      </tr>)}</tbody>
    </table>
  </div>;
}
