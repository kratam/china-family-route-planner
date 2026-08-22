import { rankingCategories } from "@/data/itineraries";

export function Rankings() {
  return <section className="editorial-section rankings" id="rangsor"><div className="section-kicker">Melyiket válasszuk?</div><h2>Tizenhárom gyors döntés</h2><p className="section-lead">A pontszám segít, a szerkesztői döntés rangsorol. Nem minden kategória győztese való a konkrét októberi időpontra.</p><div className="ranking-grid">{rankingCategories.map(([label, winner, why], index) => <article key={label} className={index === 0 ? "ranking hero-ranking" : "ranking"}><span>{label}</span><h3>{winner}</h3><p>{why}</p></article>)}</div></section>;
}
