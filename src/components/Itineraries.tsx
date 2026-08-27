import { itineraries } from "@/data/itineraries";
import { grouped, priceCheck } from "@/data/flightPrices";
import { scoreItinerary } from "@/lib/scoring";
import { SourceLink } from "./SourceLink";

const scoreLabels: Record<string, string> = {
  culture: "Kultúra",
  history: "Történelem",
  nature: "Természet",
  active: "Aktív",
  swimming: "Fürdés",
  family: "Gyerek",
  logistics: "Logisztika",
  value: "Ár/érték",
  weather: "Időjárás",
  wow: "Wow",
};

export function Itineraries() {
  return (
    <section className="editorial-section" id="utvonalak">
      <div className="section-kicker">2026. október 16–30.</div>
      <h2>Tíz teljes útvonal – konkrét repülőárral</h2>
      <p className="section-lead">
        A <strong>repülőár minden kártyán konkrét, 2026. augusztus 27-én lekérdezett
        ár</strong> a teljes négyfős társaságra (2 felnőtt + 2 gyerek, 8 és 10 év),
        adókkal együtt. A régiós költségsáv ezen felül értendő, és továbbra is
        tervezési becslés. A teljes összevetés a{" "}
        <a href="./repuloarak/">repülőárak oldalon</a> van.
      </p>
      <div className="itinerary-list">
        {itineraries.map((route) => (
          <article className="itinerary" key={route.id}>
            <header>
              <div className="route-rank">#{route.rank}</div>
              <div>
                <span>{route.dates}</span>
                <h3>{route.name}</h3>
              </div>
              <div className="total-score">
                <strong>{scoreItinerary(route).toLocaleString("hu-HU")}</strong>
                <span>/ 5</span>
              </div>
            </header>
            <div className={`flight-price${route.flightBudget.allDirectLongHaul ? " is-direct" : ""}`}>
              <div className="flight-price-figure">
                <strong>{grouped(route.flightBudget.totalEur)} €</strong>
                <span>repülő · 4 fő · ≈ {grouped(Math.round((route.flightBudget.totalEur * priceCheck.hufRate) / 1000) * 1000)} Ft</span>
              </div>
              <div className="flight-price-body">
                <span className={`direct-flag${route.flightBudget.allDirectLongHaul ? " yes" : " no"}`}>
                  {route.flightBudget.allDirectLongHaul ? "✓ oda és vissza is közvetlen" : "átszállásos hosszú távú szakasz"}
                </span>
                <p>{route.flightBudget.breakdown}</p>
                <p className="flight-price-note">{route.flightBudget.note}</p>
              </div>
            </div>
            <div className="route-line">
              {route.route.map((place, i) => (
                <span key={`${place}-${i}`}>
                  {place}
                  {i < route.route.length - 1 && <b>→</b>}
                </span>
              ))}
            </div>
            <div className="itinerary-grid">
              <div>
                <h4>Dátumozott ritmus</h4>
                {route.timeline.map((stage) => (
                  <p key={`${stage.dates}-${stage.place}`}><strong>{stage.dates}</strong> {stage.place}<br /><small>{stage.note}</small>{stage.source && <><br /><SourceLink source={stage.source} /></>}</p>
                ))}
                <h4>Éjszakák</h4>
                {route.nights.map((n) => (
                  <p key={n}>{n}</p>
                ))}
                <small>{route.changes} szállásváltás</small>
              </div>
              <div>
                <h4>Közlekedés</h4>
                {route.trains.map((n) => (
                  <p key={n}>🚆 {n}</p>
                ))}
                {route.flights.map((n) => (
                  <p key={n}>✈️ {n}</p>
                ))}
              </div>
              <div>
                <h4>Költség és hazaút</h4>
                <p>
                  <strong>{route.regionalCost}</strong>
                </p>
                <p>
                  {route.homeAirport} · {route.homeTime}
                </p>
                <div className="route-sources">
                  {route.sources.map((source) => <SourceLink source={source} key={source.url} />)}
                </div>
              </div>
            </div>
            <div className="pros-cons">
              <p>
                <strong>+</strong>
                {route.advantage}
              </p>
              <p>
                <strong>−</strong>
                {route.drawback}
              </p>
              <p>
                <strong>☂</strong>
                {route.weatherRisk}
              </p>
            </div>
            <div className="score-grid">
              {Object.entries(route.scores).map(([key, value]) => (
                <div key={key}>
                  <span>{scoreLabels[key]}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
