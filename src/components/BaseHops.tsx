import { destinations } from "@/data/destinations";
import type { Destination } from "@/data/types";
import { SourceLink } from "./SourceLink";

const waterBadges: { tag: Destination["tags"][number]; label: string }[] = [
  { tag: "nature", label: "🏔️ természet" },
  { tag: "swimming", label: "🏖️ fürdés" },
  { tag: "beach", label: "🏝️ strand" },
  { tag: "cave", label: "🕳️ barlang" },
  { tag: "boat", label: "🛶 hajózás" },
];

const modes = [
  {
    id: "vonat",
    title: "🚆 Vonattal",
    lead: "Közvetlen gyorsvasút vagy vonat a bázisról. Nincs reptér, nincs check-in.",
    match: (d: Destination) => d.tags.includes("train"),
  },
  {
    id: "kozut",
    title: "🚗 Közúton, komppal vagy busszal",
    lead: "Nincs hozzájuk vasút, de néhány óra alatt megvannak. A strandnapok nagy része innen jön.",
    match: (d: Destination) => !d.tags.includes("train") && !d.tags.includes("flight"),
  },
  {
    id: "repulo",
    title: "✈️ Repülővel",
    lead: "Repülőjegy kell hozzájuk – a kapuvárosba mindig vissza kell érni a hazaútra.",
    match: (d: Destination) => d.tags.includes("flight") && !d.tags.includes("train"),
  },
];

const clusters = [
  {
    name: "Shenzhen és Hongkong",
    kicker: "A déli terv · guangzhoui kapu",
    lead: "A guangzhoui oda-vissza jegyhez tartozó bázispár. Guangzhou 30–75 perc gyorsvasúttal Shenzhentől, tehát a bázis gyakorlatilag a Gyöngy-folyó deltája.",
  },
  {
    name: "Tajpej és Kaohsiung",
    kicker: "A shanghaji terv · tajvani blokk",
    lead: "A shanghaji oda-vissza jegyhez tartozó tajvani blokk. Shanghaiból 1 óra 50 perc a belvárosi Songshan repülőtér, a szigeten belül pedig a gyorsvasút 1 óra 45 perc alatt visz északról délre.",
  },
];

function Hop({ destination }: { destination: Destination }) {
  const badges = waterBadges.filter((badge) => destination.tags.includes(badge.tag));
  return (
    <tr>
      <th scope="row">
        <a href={`#${destination.id}`}>{destination.emoji} {destination.name}</a>
        <small>{destination.region}</small>
      </th>
      <td>
        <ul className="access-list">
          {destination.access.map((leg) => (
            <li key={leg.from}>
              <b>{leg.from}:</b> {leg.duration}{" "}
              <span className={`direct-flag${leg.direct ? " yes" : " no"}`}>
                {leg.direct ? "közvetlen" : "átszállással"}
              </span>
            </li>
          ))}
        </ul>
      </td>
      <td className="num">{destination.nights.ideal} éj</td>
      <td>
        {badges.length > 0
          ? <span className="water-badges">{badges.map((badge) => <i key={badge.tag}>{badge.label}</i>)}</span>
          : <span className="water-badges empty">csak városnézés</span>}
      </td>
      <td className="detail">
        {destination.homeward}
        <br />
        <SourceLink source={destination.access[0].source} />
      </td>
    </tr>
  );
}

export function BaseHops() {
  return (
    <section className="editorial-section" id="kiterok">
      <div className="section-kicker">Kitérők a bázisokról</div>
      <h2>Innen hova tudunk elmenni?</h2>
      <p className="section-lead">
        Két bázispár van, mert két repülőkeret van versenyben: a guangzhoui kapuval a Gyöngy-folyó
        deltája, a shanghajival Tajvan. Mindkettőnél minden kitérő oda-vissza értendő – a kapuvárosba
        vissza kell érni a hazaútra. A kattintható nevek a lenti részletes leírásokra visznek.
      </p>
      {clusters.map((cluster) => {
        const pool = destinations.filter(
          (destination) => destination.cluster === cluster.name && destination.access[0].duration !== "—",
        );
        return (
          <div className="cluster-block" key={cluster.name}>
            <div className="cluster-head">
              <span className="section-kicker">{cluster.kicker}</span>
              <h3>{cluster.name}</h3>
              <p>{cluster.lead}</p>
            </div>
            {modes.map((mode) => {
              const rows = pool.filter(mode.match);
              if (rows.length === 0) return null;
              return (
                <div className="hop-group" key={`${cluster.name}-${mode.id}`}>
                  <h4 className="hop-title">{mode.title}<span>{rows.length} célpont</span></h4>
                  <p className="hop-lead">{mode.lead}</p>
                  <div className="fare-table-wrap">
                    <table className="fare-table hop-table">
                      <thead>
                        <tr>
                          <th>Célpont</th>
                          <th>Elérés a bázisokról</th>
                          <th>Ideális</th>
                          <th>Mit ad a városnézés mellé</th>
                          <th>Visszaút</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((destination) => <Hop destination={destination} key={destination.id} />)}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
