"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { destinations } from "@/data/destinations";
import { itineraries } from "@/data/itineraries";
import type { FilterId } from "@/data/types";
import { filterDestinations } from "@/lib/filterDestinations";
import { scoreItinerary } from "@/lib/scoring";
import { Comparison } from "./Comparison";
import { DestinationCard } from "./DestinationCard";
import { FilterBar } from "./FilterBar";
import { FlightBrief } from "./FlightBrief";
import { Itineraries } from "./Itineraries";
import { Rankings } from "./Rankings";
import { BaseHops } from "./BaseHops";

export function Planner() {
  const [selected, setSelected] = useState<FilterId[]>([]);
  const visible = useMemo(() => filterDestinations(destinations, selected), [selected]);
  const toggle = (id: FilterId) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const winningScore = scoreItinerary(itineraries.find((route) => route.id === "karszt-tenger") ?? itineraries[0]).toFixed(1).replace(".", ",");
  return <>
    <header className="site-header"><a className="brand" href="#top">KELETI <i>IRÁNYTŰ</i></a><nav><a href="#kiterok">Innen hova</a><a href="#osszehasonlitas">Célpontok</a><a href="#rangsor">Rangsor</a><a href="#utvonalak">Útvonalak</a><a href="#repules">Repülés</a><a href="./repuloarak/" className="nav-cta">Repülőárak</a></nav><span className="verified">Adatok ellenőrizve: 2026. augusztus</span></header>
    <main id="top">
      <section className="hero"><img src="./photos/guilin-1.jpg" alt="A Li folyó karszthegyei Guilin és Yangshuo között" /><div className="hero-shade" /><div className="hero-content"><span className="hero-kicker">Családi útikalauz · 2026. okt. 16–30.</span><h1>Mit nézzünk meg<br /><em>Shenzhen mellett?</em></h1><p>A repülőjegy megvan: okt. 16–30., Shenzhen oda-vissza, közvetlenül. Már csak az a kérdés, mivel dobjuk fel a városnézést – fürdés, barlang, hajózás, mind vonattávolságra.</p><div className="hero-actions"><a href="#ajanlas" className="primary">Mutasd a győztest</a><a href="#kiterok">Innen hova mehetünk?</a></div></div><a className="scroll-cue" href="#ajanlas" aria-label="Ugrás a legjobb ajánláshoz"><ChevronDown /></a></section>
      <section className="verdict-band" id="ajanlas"><div><span>🥇 LEGJOBB ÖSSZESSÉGÉBEN</span><h2>Karszt, barlang és tenger</h2><p>Shenzhen → Dapeng → Hongkong → Yangshuo → Shenzhen. Két teljes strandnap Xichongban, négy nap Hongkong az öbleivel, majd a Li-folyó hajóútja, bambusztutaj és a Reed Flute-barlang. <strong>Nulla regionális repülés</strong>, minden belső szakasz vonat vagy autó – és így a repülőköltség marad a megvett 3016 €.</p><p className="verdict-cta"><a href="#kiterok">Nézd meg, mi mennyire van messze a bázistól →</a></p></div><div className="verdict-stats"><div><strong>{winningScore}</strong><span>összpont / 5</span></div><div><strong>5</strong><span>fürdős nap</span></div><div><strong>0</strong><span>regionális repülés</span></div></div></section>
      <section className="decision-strip"><article><span>🏖️</span><div><strong>Fürdés</strong><p>Dapeng két óra Shenzhentől, Hongkongnak saját öblei vannak. Sanya a legmelegebb tenger, de októberben tájfunfogadás.</p></div></article><article><span>🕳️</span><div><strong>Barlang</strong><p>Zhaoqing Seven Star Crags másfél órára; Guilinben a Reed Flute a látványosabb. Vietnámban Trang An a csúcs.</p></div></article><article><span>🛶</span><div><strong>Hajózás</strong><p>Li-folyó hajóút és bambusztutaj Yangshuóban, kompok Hongkongban és Gulangyun, csónak a zhaoqingi tavon.</p></div></article></section>
      <BaseHops />
      <section className="editorial-section comparison-section" id="osszehasonlitas"><div className="section-kicker">Gyors összehasonlítás</div><h2>Minden szóba jövő hely, egy nézetben</h2><p className="section-lead">A költségoszlop a Shenzhenből vagy Hongkongból induló odaút jelenlegi tervezési sávja, egy irányra – a visszautat is hozzá kell számolni, mert Shenzhenből repülünk haza. Mobilon a táblázat a saját keretében görgethető.</p><FilterBar selected={selected} onToggle={toggle} onClear={() => setSelected([])} /><div className="result-count" aria-live="polite">{visible.length} célpont látható</div><Comparison destinations={visible} /></section>
      <section className="destination-section"><div className="section-kicker">Úti célok közelről</div><h2>Nem lista. Huszonkét külön világ.</h2><p className="section-lead">Nyisd le a programokat, fürdést, szállásokat és a változó adatok forrásait.</p>{visible.map((destination, index) => <DestinationCard destination={destination} index={index} key={destination.id} />)}{visible.length === 0 && <div className="empty-state"><strong>Nincs ilyen kombináció.</strong><p>Vegyél ki egy szűrőt – az októberi jó idő + strand + csak vonat például nagyon szűk metszet.</p></div>}</section>
      <Rankings /><Itineraries /><FlightBrief />
      <section className="final-picks"><div className="section-kicker">Saját ajánlás</div><h2>Ha ma kellene döntenem</h2><div className="pick-grid"><article className="pick-winner"><span>🥇 Legjobb összességében</span><h3>Karszt, barlang és tenger</h3><p>Shenzhen, Dapeng, Hongkong és Yangshuo. Öt fürdős nap, egy nagy barlang, kétféle hajózás és két világváros – regionális repülés nélkül, a megvett repülőkereten belül.</p></article><article><span>🏖️ Legjobb fürdés vonattávolságra</span><h3>Dapeng-félsziget</h3><p>Xichong és Dongchong két óra Shenzhentől; itt lehet több egymást követő strandnapot betervezni kockázat nélkül.</p></article><article><span>🕳️ Legjobb barlangnap</span><h3>Zhaoqing</h3><p>Seven Star Crags: barlangok és csónakázás a Star Lake-en, másfél órás vonatúttal. Egy-két éjre tökéletes.</p></article><article><span>🛶 Legjobb hajózás</span><h3>Li-folyó és Yulong</h3><p>Négyórás hajóút a karsztok között, majd kétfős bambusztutaj a rizsföldeken – a gyerekeknek ez marad meg.</p></article><article><span>🌊 Ha a tenger a fő cél</span><h3>Sanya</h3><p>Hongkongból 1 óra 45 perc közvetlen, oda-vissza 524 € négy főre. Kb. 28 °C-os tenger – de októberi tájfunkockázattal.</p></article><article><span>👨‍👩‍👧‍👦 Legjobb gyerekekkel</span><h3>Hongkong</h3><p>Felvonó, komp, strand, könnyű túra, Disneyland és Ocean Park egyetlen hotelből, fél órára Shenzhentől.</p></article></div></section>
    </main>
    <footer><div><strong>KELETI IRÁNYTŰ</strong><p>Családi döntéstámogató útikalauz · 2026</p></div><p>Minden menetrend és ár változhat. Repülés és vasút foglalása előtt ellenőrizd az üzemeltető oldalát. Az oldal nem foglalási szolgáltatás.</p><a href="#top">Vissza a tetejére ↑</a></footer>
  </>;
}
