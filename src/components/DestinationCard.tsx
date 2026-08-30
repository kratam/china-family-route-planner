import { Clock3, ExternalLink, MapPin, Plane, TrainFront, Waves } from "lucide-react";
import type { Destination } from "@/data/types";
import { travelogues } from "@/data/travelogues";
import { buildProgramLinks } from "@/lib/programLinks";
import { SourceLink } from "./SourceLink";

const Stars = ({ value }: { value: number }) => <span className="stars big" aria-label={`${value} az 5-ből`}>{"★".repeat(value)}<i>{"★".repeat(5 - value)}</i></span>;

export function DestinationCard({ destination: d, index }: { destination: Destination; index: number }) {
  return <article className="destination" id={d.id}>
    <div className="destination-head">
      <div className="destination-number">{String(index + 1).padStart(2, "0")}</div>
      <div><div className="eyebrow"><MapPin size={14} /> {d.region} · {d.country}</div><h3>{d.name}</h3></div>
      <div className={`risk ${d.weather.risk}`}>{d.weather.risk} időjárási kockázat</div>
    </div>
    <div className="photo-pair">
      {d.photos.map((p, i) => <figure key={p.src} className={i === 0 ? "photo-primary" : "photo-secondary"}><img src={`.${p.src}`} alt={p.alt} loading="lazy" /><figcaption><a href={p.creditUrl} target="_blank" rel="noreferrer">{p.credit}</a><span> · </span><a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license} <ExternalLink size={11} /></a></figcaption></figure>)}
    </div>
    <div className="destination-intro">
      <div><div className="section-kicker">Milyen érzés?</div><p className="feeling">{d.feeling}</p></div>
      <aside><strong>Szerkesztői ítélet</strong><p>{d.editorial}</p><div className="score-line"><span>Wow</span><Stars value={d.scores.wow} /></div></aside>
    </div>
    <div className="destination-grid">
      <section><h4>Miért mennénk ide?</h4><ul className="check-list">{d.why.map((reason) => <li key={reason}>{reason}</li>)}</ul></section>
      <section className="transport-card"><h4><TrainFront size={18} /> Shenzhenből</h4><strong>{d.fromShenzhen.summary}</strong><dl><div><dt>Menetidő</dt><dd>{d.fromShenzhen.duration}</dd></div><div><dt>Ajtótól ajtóig</dt><dd>{d.fromShenzhen.doorToDoor}</dd></div><div><dt>Költség</dt><dd>{d.fromShenzhen.price}</dd></div></dl>{d.fromShenzhen.note && <p className="fineprint">{d.fromShenzhen.note}</p>}<SourceLink source={d.fromShenzhen.source} /></section>
      <section className="transport-card"><h4>{d.fromHongKong.summary.toLowerCase().includes("repül") ? <Plane size={18} /> : <TrainFront size={18} />} Hongkongból</h4><strong>{d.fromHongKong.summary}</strong><dl><div><dt>Menetidő</dt><dd>{d.fromHongKong.duration}</dd></div><div><dt>Ajtótól ajtóig</dt><dd>{d.fromHongKong.doorToDoor}</dd></div><div><dt>Költség</dt><dd>{d.fromHongKong.price}</dd></div></dl><SourceLink source={d.fromHongKong.source} /></section>
    </div>
    <details className="destination-details" open={index < 3}>
      <summary>Programok, fürdés, időjárás és szállások <span>+</span></summary>
      <div className="details-body">
        <section className="attractions"><h4>Legjobb programok</h4><p className="link-guide">Minden programhoz négy út vezet: az elsőnél látod, hogy hivatalos oldal vagy foglalóplatform; utána családos beszámoló, célzott Google-keresés és GetYourGuide következik.</p><div className="attraction-list">{d.attractions.map((item) => {
          const links = buildProgramLinks(item, d, travelogues[d.id]);
          return <article className="attraction" key={item.name}>
            <div className="attraction-copy"><span className="type">{item.type}</span><h5>{item.name}</h5><p>{item.description}</p><div className="attraction-meta"><span>Gyerek {item.kidScore}/5</span><span><Clock3 size={13} /> {item.duration}</span>{item.price && <span>{item.price}</span>}</div></div>
            <nav className="attraction-links" aria-label={`${item.name} hasznos linkjei`}><ol>
              {links.map((link, linkIndex) => <li key={link.kind}><a className={`program-link ${link.kind}`} href={link.url} target="_blank" rel="noreferrer">
                <span className="link-number">0{linkIndex + 1}</span>
                <span className="link-content">
                  <strong>{link.label}</strong>
                  {link.kind === "source" && <small>Elsődleges programlink · {link.label === "Hivatalos oldal" || link.label.startsWith("Hivatalos") ? "közvetlen forrás" : "külső szolgáltató"}</small>}
                  {link.travelogue && <><span className="travelogue-title">{link.travelogue.title}</span><span className="travelogue-badges"><i>{link.travelogue.sentiment}</i><i>családi relevancia: {link.travelogue.familyRelevance}</i></span><small>{link.travelogue.note}</small></>}
                  {link.kind === "google" && <small>Angol, gyerekes keresőkifejezéssel előkészítve</small>}
                  {link.kind === "getyourguide" && <small>Alternatív túrák és friss elérhetőség keresése</small>}
                </span>
                <span className="sr-only">Új lapon nyílik.</span>
                <ExternalLink size={14} />
              </a></li>)}
            </ol></nav>
          </article>;
        })}</div></section>
        <section className="fact-panels">
          <div><h4><Waves size={18} /> Fürdés</h4><p><strong>{d.swimming.realistic}</strong></p><p>{d.swimming.where}</p><p>Víz: {d.swimming.water}</p></div>
          <div><h4>☀️ Október vége</h4><p><strong>{d.weather.air}</strong> · {d.weather.rain}</p><p>{d.weather.note}</p><SourceLink source={d.weather.source} /></div>
          <div><h4>↩ Vissza Shenzhenbe</h4><p>{d.homeward}</p></div>
          <div><h4>🛏️ Mennyi idő?</h4><p>Minimum: <strong>{d.nights.min} éj</strong><br />Ideális: <strong>{d.nights.ideal} éj</strong></p></div>
        </section>
        <section><h4>Hol aludnánk?</h4><div className="hotel-grid">{d.hotels.map((hotel) => <a href={hotel.url} target="_blank" rel="noreferrer" key={hotel.name}><span>{hotel.tier}</span><strong>{hotel.name}</strong><p>{hotel.note}</p><ExternalLink size={14} /></a>)}</div></section>
      </div>
    </details>
  </article>;
}
