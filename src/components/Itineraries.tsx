import { itineraries } from "@/data/itineraries";
import { scoreItinerary } from "@/lib/scoring";

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
      <h2>Kilenc teljes, open-jaw útvonal</h2>
      <p className="section-lead">
        A regionális költségek négy főre szóló tervezési sávok, nem ajánlatok. A
        nemzetközi BUD-jegyet nem tartalmazzák.
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
                <strong>{scoreItinerary(route)}</strong>
                <span>/ 5</span>
              </div>
            </header>
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
