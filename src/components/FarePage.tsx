import { itineraries } from "@/data/itineraries";
import {
  dateVariants,
  decision,
  grouped,
  longHaulFares,
  priceCheck,
  regionalFares,
  scheduleFacts,
} from "@/data/flightPrices";
import { SourceLink } from "./SourceLink";

const eur = (value: number) => `${grouped(value)} €`;
const huf = (value: number) => `${grouped(Math.round((value * priceCheck.hufRate) / 1000) * 1000)} Ft`;

const chosen = longHaulFares.find((fare) => fare.status === "választott");
const rejected = longHaulFares.filter((fare) => fare.status === "elvetett").sort((a, b) => a.eur - b.eur);

export function FarePage() {
  const ranked = [...itineraries].sort((a, b) => a.flightBudget.totalEur - b.flightBudget.totalEur);
  const cheapest = ranked[0].flightBudget.totalEur;

  return (
    <>
      <header className="site-header fare-header">
        <a className="brand" href="../">KELETI <i>IRÁNYTŰ</i></a>
        <nav>
          <a href="../">Vissza a főoldalra</a>
          <a href="#kiterok">Kitérők ára</a>
          <a href="#utvonalak-ara">Útvonalak</a>
          <a href="#elvetett">Miért nem open-jaw</a>
          <a href="#menetrend">Menetrend</a>
        </nav>
        <span className="verified">Lekérdezve: {priceCheck.checkedOn} és {priceCheck.regionalCheckedOn}</span>
      </header>

      <main id="top">
        <section className="fare-hero">
          <span className="hero-kicker">Eldöntve · a keret megvan</span>
          <h1>Ez a <em>repülőkeret</em></h1>
          <p>
            Budapest–Shenzhen oda-vissza, mindkét irányban közvetlenül. Minden ár ezen az
            oldalon a Google Flights lekérdezéséből származik, {priceCheck.passengers} részére,
            {" "}{priceCheck.cabin}on, a foglalási panelig végigkattintva – tehát a
            <strong> teljes négyfős társaságra</strong> szóló végösszeg, adókkal.
          </p>
          <div className="fare-hero-stats">
            <div><strong>{eur(decision.price)}</strong><span>a megvett oda-vissza jegy, 4 fő</span></div>
            <div><strong>13</strong><span>éjszaka Kínában, okt. 17. hajnalától</span></div>
            <div><strong>0</strong><span>átszállás a hosszú távú szakaszokon</span></div>
          </div>
        </section>

        <section className="editorial-section">
          <div className="section-kicker">A megvett keret</div>
          <h2>{decision.headline}</h2>
          <div className="decision-card">
            <ul className="segment-list">
              <li className="nonstop"><b>BUD → SZX</b><span>{decision.out}</span><i>közvetlen</i></li>
              <li className="nonstop"><b>SZX → BUD</b><span>{decision.back}</span><i>közvetlen</i></li>
            </ul>
            <div className="decision-facts">
              <div><strong>{eur(decision.price)}</strong><span>Hainan Airlines · ≈ {huf(decision.price)}</span></div>
              <div><strong>{eur(decision.agencyPrice)}</strong><span>ugyanez a {decision.agencyName} oldalán</span></div>
              <div><strong>4 db</strong><span>{decision.baggage}</span></div>
            </div>
            <p className="fare-verdict">{decision.why}</p>
          </div>
        </section>

        <section className="editorial-section" id="kiterok">
          <div className="section-kicker">Kitérők a bázisról · lekérdezve {priceCheck.regionalCheckedOn}</div>
          <h2>Mibe kerül egy repülős kitérő?</h2>
          <p className="section-lead">
            Mivel Shenzhenbe térünk vissza, minden repülős kitérő oda-vissza értendő. A vonatos
            kitérők – Hongkong, Guangzhou, Zhaoqing, Chaozhou, Guilin, Xiamen, Shaoguan – ennél
            nagyságrendekkel olcsóbbak: a leghosszabb is ¥250–350 fejenként.
          </p>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>Szakasz</th>
                  <th>Dátum</th>
                  <th>Ár / 4 fő</th>
                  <th>Légitársaság</th>
                  <th>Menetidő</th>
                  <th>Megjegyzés</th>
                  <th>Forrás</th>
                </tr>
              </thead>
              <tbody>
                {[...regionalFares].sort((a, b) => a.eur - b.eur).map((fare) => (
                  <tr key={fare.route} className={fare.nonstop ? "" : "indirect"}>
                    <th scope="row">{fare.route}</th>
                    <td>{fare.date}</td>
                    <td className="num"><strong>{eur(fare.eur)}</strong></td>
                    <td>{fare.airline}{fare.code && <><br /><small>{fare.code}</small></>}</td>
                    <td>{fare.duration}<br /><span className={`direct-flag${fare.nonstop ? " yes" : " no"}`}>{fare.nonstop ? "közvetlen" : "átszállással"}</span></td>
                    <td className="detail">{fare.note ?? "—"}</td>
                    <td><SourceLink source={fare.source} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="editorial-section" id="utvonalak-ara">
          <div className="section-kicker">Útvonalanként</div>
          <h2>Mennyi a teljes repülőköltség útvonalanként?</h2>
          <p className="section-lead">
            A megvett {eur(decision.price)}-s keret plusz az adott útvonal regionális repülőjegyei,
            négy főre. Ahol {eur(cheapest)} szerepel, ott a kitérők végig vonattal mennek.
          </p>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Útvonal</th>
                  <th>Repülő / 4 fő</th>
                  <th>≈ forint</th>
                  <th>Többlet a kerethez</th>
                  <th>Fürdős napok</th>
                  <th>Miből áll össze</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((route) => (
                  <tr key={route.id} className={route.flightBudget.totalEur === cheapest ? "best" : ""}>
                    <td>#{route.rank}</td>
                    <th scope="row">{route.name}</th>
                    <td className="num"><strong>{eur(route.flightBudget.totalEur)}</strong></td>
                    <td className="num">{huf(route.flightBudget.totalEur)}</td>
                    <td className="num">
                      {route.flightBudget.totalEur === cheapest
                        ? "—"
                        : `+ ${eur(route.flightBudget.totalEur - cheapest)}`}
                    </td>
                    <td className="detail">{route.swimDays}</td>
                    <td className="detail">{route.flightBudget.breakdown}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="notice">
            <strong>Hogyan olvasd:</strong> ezek repülőárak, nem teljes utazási költségek. A kínai
            gyorsvasút, a szállás és a programok külön jönnek – azokat a főoldal útvonalkártyái
            tartalmazzák tervezési sávként.
          </div>
        </section>

        <section className="editorial-section" id="elvetett">
          <div className="section-kicker">Miért nem nyitott szárú jegyet vettünk</div>
          <h2>A mérés során elvetett alternatívák</h2>
          <p className="section-lead">
            Mindegyiket ugyanúgy, a foglalási panelig végigkattintva néztük meg. Egyik sem volt
            egyszerre olcsóbb és kényelmesebb a Shenzhen oda-visszánál – a {eur(decision.price)}-s
            keret ezért maradt.
          </p>
          <div className="fare-list">
            {chosen && (
              <article className="fare-card all-direct" key={chosen.id}>
                <header>
                  <div>
                    <span className="fare-dates">{chosen.dates} · {chosen.ticketing} · ✔ EZT VETTÜK</span>
                    <h3>{chosen.label}</h3>
                    <span className="direct-flag yes">✓ minden hosszú távú szakasz közvetlen</span>
                  </div>
                  <div className="fare-figure">
                    <strong>{eur(chosen.eur)}</strong>
                    <span>4 fő · ≈ {huf(chosen.eur)}</span>
                    {chosen.agencyEur !== undefined && <em>{eur(chosen.agencyEur)} a {chosen.agencyName} oldalán</em>}
                  </div>
                </header>
                <p className="fare-verdict">{chosen.verdict}</p>
                <SourceLink source={chosen.source} />
              </article>
            )}
            {rejected.map((fare) => (
              <article className="fare-card rejected" key={fare.id}>
                <header>
                  <div>
                    <span className="fare-dates">{fare.dates} · {fare.ticketing} · elvetve</span>
                    <h3>{fare.label}</h3>
                    <span className={`direct-flag${fare.allDirect ? " yes" : " no"}`}>
                      {fare.allDirect ? "✓ minden hosszú távú szakasz közvetlen" : "✗ átszállással"}
                    </span>
                  </div>
                  <div className="fare-figure">
                    <strong>{eur(fare.eur)}</strong>
                    <span>4 fő · ≈ {huf(fare.eur)}</span>
                    {fare.eur > decision.price && <em>+ {eur(fare.eur - decision.price)} a kerethez képest</em>}
                  </div>
                </header>
                <ul className="segment-list">
                  {fare.segments.map((segment) => (
                    <li key={`${fare.id}-${segment.code}-${segment.from}`} className={segment.nonstop ? "nonstop" : ""}>
                      <b>{segment.from} → {segment.to}</b>
                      <span>{segment.code}</span>
                      <span>{segment.dep} → {segment.arr}</span>
                      <span>{segment.duration}</span>
                      <i>{segment.nonstop ? "közvetlen" : "átszállással"}</i>
                    </li>
                  ))}
                </ul>
                <p className="fare-verdict">{fare.verdict}</p>
                <SourceLink source={fare.source} />
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section" id="menetrend">
          <div className="section-kicker">Menetrendi tények</div>
          <h2>Melyik nap van egyáltalán közvetlen járat?</h2>
          <p className="section-lead">
            Ezt napról napra végigkérdeztük. A Hainan hétfőn és pénteken repül – okt. 16. és
            okt. 30. is péntek, ezért illeszkedik pontosan a két hét.
          </p>
          <div className="schedule-grid">
            {scheduleFacts.map((fact) => (
              <article key={fact.route}>
                <h3>{fact.route}</h3>
                <span className="days">{fact.days}</span>
                <p>{fact.detail}</p>
              </article>
            ))}
          </div>

          <h3 className="sub-heading">A tarifa dátumérzéketlen – ezért nem érdemes tovább keresni</h3>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr><th>Közvetlen shenzheni oda-vissza</th><th>Hossz</th><th>Ár / 4 fő</th><th>Megjegyzés</th></tr>
              </thead>
              <tbody>
                {dateVariants.map((variant) => (
                  <tr key={variant.dates} className={variant.dates.startsWith("okt. 16. (P) → okt. 30.") ? "best" : ""}>
                    <th scope="row">{variant.dates}</th>
                    <td>{variant.nights}</td>
                    <td className="num"><strong>{eur(variant.eur)}</strong></td>
                    <td className="detail">{variant.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="editorial-section">
          <div className="section-kicker">Módszer és korlátok</div>
          <h2>Mit jelent pontosan ez a szám</h2>
          <div className="method-grid">
            <article>
              <h3>Így mértük</h3>
              <p>
                Google Flights, {priceCheck.checkedOn} (hosszú táv) és {priceCheck.regionalCheckedOn}
                {" "}(regionális szakaszok), {priceCheck.passengers}, {priceCheck.cabin}. Minden
                opciónál a járatválasztásig és a foglalási panelig kattintva, tehát a megjelenített
                összeg a ténylegesen ajánlott, adóval növelt végösszeg négy főre.
              </p>
            </article>
            <article>
              <h3>Poggyász</h3>
              <p>
                A megvett Hainan oda-vissza jegynél a Google kiírja: fejenként egy kézipoggyász
                és <strong>az első feladott bőrönd is benne van</strong>. A fapados regionális
                járatoknál (HK Express, Spring, Vietjet) a feladott poggyász külön fizetendő.
              </p>
            </article>
            <article>
              <h3>Árfolyam</h3>
              <p>
                A forintértékek {priceCheck.hufRate} Ft/€-val számolva – ezt az árfolyamot mutatta a
                Google foglalási panelje. Az EKB középárfolyam 2026. augusztus 26-án 360,2 Ft/€ volt.
              </p>
            </article>
            <article>
              <h3>Meddig érvényes</h3>
              <p>
                A hosszú távú keret eldőlt, de a regionális jegyek dinamikusak: a fapadosok naponta
                mozognak. Kitérő foglalása előtt minden sort érdemes újrafuttatni a forráslinkkel.
              </p>
            </article>
          </div>
          <div className="notice">
            <strong>Fontos:</strong> ez nem foglalási szolgáltatás és nem ajánlat. A kínai
            vasúti jegyek októberre augusztusban még nem foglalhatók, a repülőjegyek viszont igen.
          </div>
        </section>
      </main>

      <footer>
        <div><strong>KELETI IRÁNYTŰ</strong><p>Repülőár-lekérdezés · {priceCheck.checkedOn} és {priceCheck.regionalCheckedOn}</p></div>
        <p>{priceCheck.note}</p>
        <a href="../">← Vissza a főoldalra</a>
      </footer>
    </>
  );
}
