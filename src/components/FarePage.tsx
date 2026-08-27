import { itineraries } from "@/data/itineraries";
import {
  dateVariants,
  grouped,
  homewardFares,
  longHaulFares,
  priceCheck,
  regionalFares,
  scheduleFacts,
} from "@/data/flightPrices";
import { SourceLink } from "./SourceLink";

const eur = (value: number) => `${grouped(value)} €`;
const huf = (value: number) => `${grouped(Math.round((value * priceCheck.hufRate) / 1000) * 1000)} Ft`;

const findings = [
  {
    tag: "1. meglepetés",
    title: "A legolcsóbb megoldás egyben az egyetlen végig közvetlen is",
    body: "A Budapest–Shenzhen oda-vissza jegy (Hainan HU 762 / HU 761) 3 016 € négy főre, és mindkét irányban nonstop. Minden nyitott szárú változat vagy drágább, vagy átszállásos, vagy mindkettő.",
  },
  {
    tag: "2. meglepetés",
    title: "A guangzhoui open-jaw EGY jegyen nem ad közvetlen hazautat",
    body: "A közvetlen China Southern CZ 649 (Guangzhou 01:30 → Budapest 07:10) létezik és 1 689 €, de a Hainan odaúttal nem kombinálható egy jegyre. Egy jegyen kérve a rendszer 26 óra 35 perces, kétátszállásos hazautat ad 3 437 €-ért. Külön jegyen mindkettő közvetlen, de 3 768 €.",
  },
  {
    tag: "3. meglepetés",
    title: "Az odaút egyirányban majdnem annyi, mint az egész oda-vissza",
    body: "A BUD→Shenzhen egyirányú közvetlen jegy 2 079 €, az oda-vissza 3 016 €. A visszaút tehát alig 937 €-ba kerül – ezért bünteti meg minden „csak egy irányba repülünk” konstrukció a családot.",
  },
];

export function FarePage() {
  const ranked = [...itineraries].sort((a, b) => a.flightBudget.totalEur - b.flightBudget.totalEur);
  const cheapest = ranked[0].flightBudget.totalEur;

  return (
    <>
      <header className="site-header fare-header">
        <a className="brand" href="../">KELETI <i>IRÁNYTŰ</i></a>
        <nav>
          <a href="../">Vissza a főoldalra</a>
          <a href="#hosszu">Hosszú távú</a>
          <a href="#utvonalak-ara">Útvonalak</a>
          <a href="#regionalis">Regionális</a>
          <a href="#menetrend">Menetrend</a>
        </nav>
        <span className="verified">Lekérdezve: {priceCheck.checkedOn}</span>
      </header>

      <main id="top">
        <section className="fare-hero">
          <span className="hero-kicker">Konkrét árak, nem becslés</span>
          <h1>Mibe kerül <em>tényleg</em> a repülő?</h1>
          <p>
            Minden ár ezen az oldalon a Google Flights {priceCheck.checkedOn}-i lekérdezéséből
            származik, {priceCheck.passengers} részére, {priceCheck.cabin}on, a foglalási panelig
            végigkattintva. Az összegek a <strong>teljes négyfős társaságra</strong> szólnak, adókkal
            és illetékekkel együtt.
          </p>
          <div className="fare-hero-stats">
            <div><strong>{eur(cheapest)}</strong><span>a legolcsóbb teljes repülőcsomag</span></div>
            <div><strong>2</strong><span>közvetlen járat Budapestről Dél-Kínába</span></div>
            <div><strong>0</strong><span>közvetlen járat Hongkongból Budapestre</span></div>
          </div>
        </section>

        <section className="editorial-section">
          <div className="section-kicker">Amit a lekérdezés kihozott</div>
          <h2>Három dolog, ami eldönti a kérdést</h2>
          <div className="finding-grid">
            {findings.map((item) => (
              <article key={item.tag}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section" id="hosszu">
          <div className="section-kicker">Hosszú távú jegyek · Budapest ↔ Ázsia</div>
          <h2>Minden szóba jövő kapu-kombináció</h2>
          <p className="section-lead">
            Ár szerint növekvő sorrendben. A „légitársasági ár” az, amit a légitársaság saját
            oldalán kérnek; ahol van olcsóbb utazási irodai ajánlat, azt külön jelöltük.
          </p>
          <div className="fare-list">
            {[...longHaulFares].sort((a, b) => a.eur - b.eur).map((fare) => (
              <article className={`fare-card${fare.allDirect ? " all-direct" : ""}`} key={fare.id}>
                <header>
                  <div>
                    <span className="fare-dates">{fare.dates} · {fare.ticketing}</span>
                    <h3>{fare.label}</h3>
                    <span className={`direct-flag${fare.allDirect ? " yes" : " no"}`}>
                      {fare.allDirect ? "✓ minden hosszú távú szakasz közvetlen" : "✗ átszállással"}
                    </span>
                  </div>
                  <div className="fare-figure">
                    <strong>{eur(fare.eur)}</strong>
                    <span>4 fő · ≈ {huf(fare.eur)}</span>
                    {fare.agencyEur !== undefined && (
                      <em>{eur(fare.agencyEur)} a {fare.agencyName} oldalán</em>
                    )}
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
                <p className="fare-comfort">{fare.comfort}</p>
                <p className="fare-verdict">{fare.verdict}</p>
                <SourceLink source={fare.source} />
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-section" id="utvonalak-ara">
          <div className="section-kicker">Útvonalanként</div>
          <h2>Mennyi a teljes repülőköltség útvonalanként?</h2>
          <p className="section-lead">
            A hosszú távú jegy és az összes regionális szakasz együtt, négy főre. A legolcsóbbhoz
            képesti különbség mutatja, mennyibe kerül az adott kitérő – csak repülőben.
          </p>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Útvonal</th>
                  <th>Repülő / 4 fő</th>
                  <th>≈ forint</th>
                  <th>Többlet a legolcsóbbhoz</th>
                  <th>Hosszú táv</th>
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
                    <td>
                      <span className={`direct-flag${route.flightBudget.allDirectLongHaul ? " yes" : " no"}`}>
                        {route.flightBudget.allDirectLongHaul ? "közvetlen" : "átszállás"}
                      </span>
                    </td>
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

        <section className="editorial-section" id="regionalis">
          <div className="section-kicker">Regionális szakaszok</div>
          <h2>Egy irány, négy fő – mi mennyi</h2>
          <p className="section-lead">
            Ezek a kitérőkhöz tartozó rövid járatok. A dátumok a főoldali ritmust követik: a
            hongkongi blokk után okt. 25-én indulunk tovább, és okt. 28-án pozicionálunk.
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

          <h3 className="sub-heading">Ha külön jegyen vesszük a hazautat</h3>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>Hazaút</th>
                  <th>Dátum</th>
                  <th>Ár / 4 fő</th>
                  <th>Légitársaság</th>
                  <th>Menetidő</th>
                  <th>Megjegyzés</th>
                  <th>Forrás</th>
                </tr>
              </thead>
              <tbody>
                {homewardFares.map((fare) => (
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

        <section className="editorial-section" id="menetrend">
          <div className="section-kicker">Menetrendi tények</div>
          <h2>Melyik nap van egyáltalán közvetlen járat?</h2>
          <p className="section-lead">
            Ezt napról napra végigkérdeztük, mert a közvetlen járatok heti két-három napon
            közlekednek – és az utazás dátumai emiatt nem szabadon mozgathatók.
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

          <h3 className="sub-heading">Mozgatható-e a dátum? Alig számít.</h3>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr><th>Közvetlen shenzheni oda-vissza</th><th>Hossz</th><th>Ár / 4 fő</th><th>Megjegyzés</th></tr>
              </thead>
              <tbody>
                {dateVariants.map((variant) => (
                  <tr key={variant.dates}>
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
                Google Flights, {priceCheck.checkedOn}, {priceCheck.passengers},
                {" "}{priceCheck.cabin}. Minden opciónál a járatválasztásig és a foglalási
                panelig kattintva, tehát a megjelenített összeg a ténylegesen ajánlott,
                adóval növelt végösszeg négy főre.
              </p>
            </article>
            <article>
              <h3>Poggyász</h3>
              <p>
                A nyertes Hainan oda-vissza jegynél a Google kiírja: fejenként egy kézipoggyász
                és <strong>az első feladott bőrönd is benne van</strong>. A többi tarifánál a
                poggyászt foglalás előtt külön ellenőrizni kell.
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
                A dinamikus árazás miatt ezek pillanatképek. A Hainan-tarifa a mérés szerint
                dátumérzéketlen és stabil, a regionális fapadosok (HK Express, Vietjet, Spring)
                viszont naponta mozognak. Foglalás előtt minden sort érdemes újrafuttatni a
                forráslinkkel.
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
        <div><strong>KELETI IRÁNYTŰ</strong><p>Repülőár-lekérdezés · {priceCheck.checkedOn}</p></div>
        <p>{priceCheck.note}</p>
        <a href="../">← Vissza a főoldalra</a>
      </footer>
    </>
  );
}
