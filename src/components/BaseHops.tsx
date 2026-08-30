import { destinations } from "@/data/destinations";
import type { Destination } from "@/data/types";
import { SourceLink } from "./SourceLink";

const waterBadges: { tag: Destination["tags"][number]; label: string }[] = [
  { tag: "swimming", label: "🏖️ fürdés" },
  { tag: "beach", label: "🏝️ strand" },
  { tag: "cave", label: "🕳️ barlang" },
  { tag: "boat", label: "🛶 hajózás" },
];

const groups = [
  {
    id: "vonat",
    title: "🚆 Vonattal",
    lead: "Közvetlen gyorsvasút a shenzheni vagy a hongkongi pályaudvarról. Nincs reptér, nincs check-in – ezekre épül a hét útvonal többsége.",
    match: (d: Destination) => d.tags.includes("train"),
  },
  {
    id: "kozut",
    title: "🚗 Közúton vagy komppal",
    lead: "Nincs hozzájuk vasút, de két-három óra alatt megvannak. A strandnapok nagy része innen jön.",
    match: (d: Destination) => !d.tags.includes("train") && !d.tags.includes("flight"),
  },
  {
    id: "repulo",
    title: "✈️ Repülővel",
    lead: "Oda-vissza jegy kell hozzájuk, mert Shenzhenből indul a hazaút. Egy-két óra repülés, de két fél nap reptérrel.",
    match: (d: Destination) => d.tags.includes("flight") && !d.tags.includes("train"),
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
        {destination.fromShenzhen.duration}
        <br />
        <span className={`direct-flag${destination.fromShenzhen.direct ? " yes" : " no"}`}>
          {destination.fromShenzhen.direct ? "közvetlen" : "átszállással"}
        </span>
      </td>
      <td>
        {destination.fromHongKong.duration}
        <br />
        <span className={`direct-flag${destination.fromHongKong.direct ? " yes" : " no"}`}>
          {destination.fromHongKong.direct ? "közvetlen" : "átszállással"}
        </span>
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
        <SourceLink source={destination.fromShenzhen.source} />
      </td>
    </tr>
  );
}

export function BaseHops() {
  const pool = destinations.filter((destination) => destination.id !== "shenzhen");
  return (
    <section className="editorial-section" id="kiterok">
      <div className="section-kicker">A két bázis: Shenzhen és Hongkong</div>
      <h2>Innen hova tudunk elmenni?</h2>
      <p className="section-lead">
        A repülőjegy Shenzhenbe szól és onnan is jövünk haza, tehát minden kitérő oda-vissza
        értendő. Az alábbi lista azt mutatja, mi mennyire van messze a két bázistól – és melyik
        ad fürdést, barlangot vagy hajózást a városnézés mellé. A kattintható nevek a lenti
        részletes leírásokra visznek.
      </p>
      {groups.map((group) => {
        const rows = pool.filter(group.match);
        return (
          <div className="hop-group" key={group.id}>
            <h3 className="sub-heading">{group.title}<span>{rows.length} célpont</span></h3>
            <p className="hop-lead">{group.lead}</p>
            <div className="fare-table-wrap">
              <table className="fare-table hop-table">
                <thead>
                  <tr>
                    <th>Célpont</th>
                    <th>Shenzhenből</th>
                    <th>Hongkongból</th>
                    <th>Ideális</th>
                    <th>Mit ad a városnézés mellé</th>
                    <th>Visszaút a bázisra</th>
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
    </section>
  );
}
