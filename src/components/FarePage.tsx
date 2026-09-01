import { itineraries } from "@/data/itineraries";
import {
  architectures,
  dateVariants,
  gateways,
  grouped,
  priceCheck,
  regionalFares,
  scheduleFacts,
} from "@/data/flightPrices";
import { SourceLink } from "./SourceLink";

const eur = (value: number) => `${grouped(value)} €`;
const huf = (value: number) => `${grouped(Math.round((value * priceCheck.hufRate) / 1000) * 1000)} Ft`;

const live = gateways.filter((gateway) => gateway.status === "él");
const dead = gateways.filter((gateway) => gateway.status === "kiesett");
const cheapestArch = [...architectures].sort((a, b) => a.eur - b.eur)[0];

const findings = [
  {
    tag: "Ami elromlott",
    title: "A shenzheni járat papíron él, a gyakorlatban nem eladó",
    body: "A Hainan HU 761/762 ott van a menetrendben, de október 16-ra és a teljes okt. 26–31. ablakra egyetlen jegyárus sem ad árat. A Google szó szerint azt írja: „We can’t find booking options for this itinerary.” Az eddigi terv teljes alapja ezzel megszűnt.",
  },
  {
    tag: "Ami kiderült",
    title: "Nem egy, hanem három közvetlen kínai kapu van",
    body: "Peking (Air China, naponta, 9 óra 10 perc), Shanghai (Shanghai Airlines, naponta, 11 óra 5 perc) és Guangzhou (China Southern, kedd/csütörtök/szombat, 10 óra 45 perc). Ezek közül a Google kettőt egyáltalán nem árazott – csak a Trip.com hozta ki őket.",
  },
  {
    tag: "Ami a legtöbbet ér",
    title: "Pekingből van az egyetlen nappali hazaút",
    body: "A pekingi járat 14:00-kor indul és 17:35-kor ér Budapestre – ugyanaznap este otthon vagyunk. Minden más kapu hajnali 01:30 és 01:55 között indul. Nyolc- és tízéves gyerekkel ez a különbség többet ér, mint pár száz euró.",
  },
];

export function FarePage() {
  const ranked = [...itineraries].sort((a, b) => a.flightBudget.totalEur - b.flightBudget.totalEur);
  const cheapestRoute = ranked[0].flightBudget.totalEur;

  return (
    <>
      <header className="site-header fare-header">
        <a className="brand" href="../">KELETI <i>IRÁNYTŰ</i></a>
        <nav>
          <a href="../">Vissza a főoldalra</a>
          <a href="#kapuk">Kapuk</a>
          <a href="#architekturak">Open-jaw</a>
          <a href="#kiterok">Belső szakaszok</a>
          <a href="#menetrend">Menetrend</a>
        </nav>
        <span className="verified">Újramérve: {priceCheck.checkedOn}</span>
      </header>

      <main id="top">
        <section className="fare-hero">
          <span className="hero-kicker">Újratervezés · {priceCheck.checkedOn}</span>
          <h1>A shenzheni járat <em>kiesett</em></h1>
          <p>
            Az eddigi terv arra épült, hogy Budapestről közvetlenül Shenzhenbe repülünk oda-vissza.
            Ez a jegy a mi dátumainkra megszűnt megvásárolhatónak lenni. Az egész repülőkeretet
            újramértük, két forrásból – és a helyzet nem rosszabb lett, hanem más:{" "}
            <strong>három közvetlen kínai kapu</strong> közül lehet választani.
          </p>
          <div className="fare-hero-stats">
            <div><strong>3</strong><span>közvetlen kínai kapu Budapestről</span></div>
            <div><strong>{eur(cheapestArch.eur)}</strong><span>a legolcsóbb teljes megoldás, 4 fő</span></div>
            <div><strong>9 ó 10 p</strong><span>a legrövidebb repülés (Peking)</span></div>
          </div>
        </section>

        <section className="editorial-section">
          <div className="section-kicker">Amit az újramérés kihozott</div>
          <h2>Három dolog, ami átírja a tervet</h2>
          <div className="finding-grid">
            {findings.map((item) => (
              <article key={item.tag}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="notice">
            <strong>Miért nem hozta ki a Google?</strong> A Google Flights menetrendben mutatja a
            Shanghai- és a Peking-járatot, de tarifát nem kap hozzájuk: minden dátumon és minden
            pénznemben „Price unavailable”. A kínai légitársaságok saját tarifái csak kínai
            jegyárusítókon – például a Trip.comon – jelennek meg. Ezért mértünk mindkét forrásból.
          </div>
        </section>

        <section className="editorial-section" id="kapuk">
          <div className="section-kicker">Közvetlen kapuk Budapestről</div>
          <h2>Hova lehet átszállás nélkül eljutni?</h2>
          <p className="section-lead">
            Minden ár egy irányra, a teljes négyfős társaságra. Ahol két dátum szerepel, ott a
            járat nem jár mindennap – a menetrendi napokat külön ellenőriztük.
          </p>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>Kapu</th>
                  <th>Légitársaság · napok</th>
                  <th>Oda</th>
                  <th>Ár oda</th>
                  <th>Vissza</th>
                  <th>Ár vissza</th>
                  <th>Miért érdekes</th>
                </tr>
              </thead>
              <tbody>
                {live.map((gateway) => (
                  <tr key={gateway.id}>
                    <th scope="row">{gateway.city}<br /><small>{gateway.code}</small></th>
                    <td>{gateway.airline}<br /><small>{gateway.days}</small></td>
                    <td>{gateway.outbound}<br /><small>{gateway.outNote}</small></td>
                    <td className="num"><strong>{gateway.outEur ? eur(gateway.outEur) : "—"}</strong></td>
                    <td>{gateway.inbound}<br /><small>{gateway.inNote}</small></td>
                    <td className="num"><strong>{gateway.inEur ? eur(gateway.inEur) : "—"}</strong></td>
                    <td className="detail">{gateway.verdict}<br /><SourceLink source={gateway.source} /></td>
                  </tr>
                ))}
                {dead.map((gateway) => (
                  <tr key={gateway.id} className="indirect">
                    <th scope="row">{gateway.city}<br /><small>{gateway.code} · kiesett</small></th>
                    <td>{gateway.airline}<br /><small>{gateway.days}</small></td>
                    <td>{gateway.outbound}<br /><small>{gateway.outNote}</small></td>
                    <td className="num">nincs ár</td>
                    <td>{gateway.inbound}<br /><small>{gateway.inNote}</small></td>
                    <td className="num">nincs ár</td>
                    <td className="detail">{gateway.verdict}<br /><SourceLink source={gateway.source} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="editorial-section" id="architekturak">
          <div className="section-kicker">Teljes megoldások</div>
          <h2>Oda-vissza vagy nyitott szárú – mibe kerül?</h2>
          <p className="section-lead">
            Mind a nyolc változatban <strong>mindkét hosszú távú szakasz közvetlen</strong>. Az
            oda-vissza árak egy jegyre szólnak; a nyitott szárú árak két külön egyirányú jegy
            összege, mert két különböző légitársaságról van szó. Egyetlen multi-city jegyen ezek
            jellemzően olcsóbbak, de azt a légitársaság saját oldalán kell megkérdezni.
          </p>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr>
                  <th>Megoldás</th>
                  <th>Ár / 4 fő</th>
                  <th>≈ forint</th>
                  <th>Dátum</th>
                  <th>Jegy</th>
                  <th>Nappali hazaút</th>
                  <th>Mit ad</th>
                </tr>
              </thead>
              <tbody>
                {[...architectures].sort((a, b) => a.eur - b.eur).map((arch) => (
                  <tr key={arch.id} className={arch.id === cheapestArch.id ? "best" : ""}>
                    <th scope="row">{arch.label}<br /><small>{arch.kind}</small></th>
                    <td className="num"><strong>{eur(arch.eur)}</strong></td>
                    <td className="num">{huf(arch.eur)}</td>
                    <td>{arch.dates}</td>
                    <td><small>{arch.ticketing}</small></td>
                    <td>
                      <span className={`direct-flag${arch.dayFlightHome ? " yes" : " no"}`}>
                        {arch.dayFlightHome ? "nappali" : "hajnali indulás"}
                      </span>
                    </td>
                    <td className="detail"><strong>{arch.fits}</strong><br />{arch.drawback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="notice">
            <strong>Szubjektív ajánlás:</strong> ha az eddigi program – Shenzhen, Hongkong, Guilin,
            tengerpart – érintetlenül fontos, akkor a <em>Guangzhou oda-vissza</em> a legkisebb
            változtatás {eur(3204)}-ért. Ha viszont a történelem és a buddhista sziklatemplomok is
            súlyt kapnak, akkor a <em>Guangzhou be / Peking ki</em> ív {eur(3696)}-ért mindent
            lefed, és nappali hazaúttal zár.
          </div>
        </section>

        <section className="editorial-section" id="kiterok">
          <div className="section-kicker">Belső szakaszok</div>
          <h2>Mibe kerül egy repülős kitérő?</h2>
          <p className="section-lead">
            Mind a négy főre. A vonatos kitérők ennél nagyságrendekkel olcsóbbak: a leghosszabb
            kínai gyorsvasúti szakasz is ¥250–350 fejenként.
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

        <section className="editorial-section">
          <div className="section-kicker">Útvonalanként</div>
          <h2>Mennyi a teljes repülőköltség a jelenlegi útvonalakon?</h2>
          <p className="section-lead">
            A főoldalon szereplő hét útvonal a guangzhoui oda-vissza keretre átszámolva – ez a
            legkisebb változtatás, amivel megmenthetők. Az északi, pekingi ívekhez új célpontok
            kellenének (Peking, Xi’an, Luoyang, Datong), azok még nincsenek megírva.
          </p>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr><th>#</th><th>Útvonal</th><th>Repülő / 4 fő</th><th>≈ forint</th><th>Többlet</th><th>Fürdős napok</th><th>Miből áll össze</th></tr>
              </thead>
              <tbody>
                {ranked.map((route) => (
                  <tr key={route.id} className={route.flightBudget.totalEur === cheapestRoute ? "best" : ""}>
                    <td>#{route.rank}</td>
                    <th scope="row">{route.name}</th>
                    <td className="num"><strong>{eur(route.flightBudget.totalEur)}</strong></td>
                    <td className="num">{huf(route.flightBudget.totalEur)}</td>
                    <td className="num">{route.flightBudget.totalEur === cheapestRoute ? "—" : `+ ${eur(route.flightBudget.totalEur - cheapestRoute)}`}</td>
                    <td className="detail">{route.swimDays}</td>
                    <td className="detail">{route.flightBudget.breakdown}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="editorial-section" id="menetrend">
          <div className="section-kicker">Menetrendi tények</div>
          <h2>Melyik nap van egyáltalán közvetlen járat?</h2>
          <p className="section-lead">Napról napra ellenőrizve, mindkét irányban.</p>
          <div className="schedule-grid">
            {scheduleFacts.map((fact) => (
              <article key={fact.route}>
                <h3>{fact.route}</h3>
                <span className="days">{fact.days}</span>
                <p>{fact.detail}</p>
              </article>
            ))}
          </div>

          <h3 className="sub-heading">A nap megválasztása több százezer forintot mozgat</h3>
          <div className="fare-table-wrap">
            <table className="fare-table">
              <thead>
                <tr><th>Ugyanaz a pekingi járat</th><th>Irány</th><th>Ár / 4 fő</th><th>Megjegyzés</th></tr>
              </thead>
              <tbody>
                {dateVariants.map((variant) => (
                  <tr key={variant.dates}>
                    <th scope="row">{variant.dates}</th>
                    <td>{variant.nights}</td>
                    <td className="num"><strong>{eur(variant.eur)}</strong></td>
                    <td className="detail">{variant.note || "—"}</td>
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
              <h3>Két forrás, mert egy nem elég</h3>
              <p>
                Google Flights és Trip.com, {priceCheck.checkedOn}, {priceCheck.passengers},
                {" "}{priceCheck.cabin}. A Google a kínai légitársaságok tarifáit nem árazza; a
                Trip.com igen. Ezért került elő a pekingi és a shanghaji járat.
              </p>
            </article>
            <article>
              <h3>Miért két külön jegy a nyitott szárú ár</h3>
              <p>
                A nyitott szárú változatokban két különböző légitársaság repül. A két egyirányú
                jegy összege a biztosan megvásárolható felső korlát; egyetlen multi-city jegyen
                jellemzően olcsóbb, de azt a légitársaságnál kell megkérdezni.
              </p>
            </article>
            <article>
              <h3>Poggyász</h3>
              <p>
                A kínai légitársaságok hosszú távú turista tarifáiban a Trip.com „Included”
                jelzést mutat a feladott poggyászra. A fapados regionális járatoknál (HK Express,
                Spring, Vietjet) külön fizetendő.
              </p>
            </article>
            <article>
              <h3>Meddig érvényes</h3>
              <p>
                A shenzheni példa mutatja, milyen gyorsan tud eltűnni egy jegy. A pekingi ár egy
                héten belül 1803 € és 3231 € között mozgott ugyanarra a járatra. Foglalás előtt
                minden sort újra kell futtatni.
              </p>
            </article>
          </div>
          <div className="notice">
            <strong>Fontos:</strong> ez nem foglalási szolgáltatás és nem ajánlat. Az árak
            pillanatképek, és a kínai carrierek tarifáit a legmegbízhatóbban a saját oldalukon
            (airchina.com, ceair.com, csair.com) lehet ellenőrizni.
          </div>
        </section>
      </main>

      <footer>
        <div><strong>KELETI IRÁNYTŰ</strong><p>Repülőár-újramérés · {priceCheck.checkedOn}</p></div>
        <p>{priceCheck.note}</p>
        <a href="../">← Vissza a főoldalra</a>
      </footer>
    </>
  );
}
