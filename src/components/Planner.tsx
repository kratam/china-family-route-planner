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

export function Planner() {
  const [selected, setSelected] = useState<FilterId[]>([]);
  const visible = useMemo(() => filterDestinations(destinations, selected), [selected]);
  const toggle = (id: FilterId) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const winningScore = scoreItinerary(itineraries.find((route) => route.id === "classic-guilin") ?? itineraries[0]).toFixed(1).replace(".", ",");
  return <>
    <header className="site-header"><a className="brand" href="#top">KELETI <i>IRÁNYTŰ</i></a><nav><a href="#osszehasonlitas">Célpontok</a><a href="#rangsor">Rangsor</a><a href="#utvonalak">Útvonalak</a><a href="#repules">Repülés</a></nav><span className="verified">Adatok ellenőrizve: 2026. augusztus</span></header>
    <main id="top">
      <section className="hero"><img src="./photos/guilin-1.jpg" alt="A Li folyó karszthegyei Guilin és Yangshuo között" /><div className="hero-shade" /><div className="hero-content"><span className="hero-kicker">Családi útikalauz · 2026 ősz</span><h1>Mit nézzünk meg<br /><em>Shenzhen mellett?</em></h1><p>Kína és Délkelet-Ázsia 8 és 11 éves gyerekkel – természet, történelem, aktív programok és tenger</p><div className="hero-actions"><a href="#ajanlas" className="primary">Mutasd a győztest</a><a href="#osszehasonlitas">22 célpont összevetése</a></div></div><a className="scroll-cue" href="#ajanlas" aria-label="Ugrás a legjobb ajánláshoz"><ChevronDown /></a></section>
      <section className="verdict-band" id="ajanlas"><div><span>🥇 LEGJOBB ÖSSZESSÉGÉBEN</span><h2>Shenzhen + Hongkong + Guilin/Yangshuo</h2><p>A legkevesebb felesleges repülés, a legtöbbféle élmény. Hongkongból három óra közvetlen gyorsvasút, a végén Guangzhou felé folytatva pedig nincs visszafordulás.</p></div><div className="verdict-stats"><div><strong>{winningScore}</strong><span>összpont / 5</span></div><div><strong>0</strong><span>regionális repülés</span></div><div><strong>3</strong><span>fő bázis</span></div></div></section>
      <section className="decision-strip"><article><span>🌄</span><div><strong>Természet</strong><p>Guilin veri Ninh Binht változatosságban; Ninh Binh jobb történelemben.</p></div></article><article><span>🏯</span><div><strong>Történelem</strong><p>Angkor a legnagyobb wow; Xi’an a legerősebb kínai; Chaozhou a könnyű kitérő.</p></div></article><article><span>🏖️</span><div><strong>Strand</strong><p>Sanya a legjobb, de októberben időjárási fogadás. Hongkong biztonságosabb vegyes opció.</p></div></article></section>
      <section className="editorial-section comparison-section" id="osszehasonlitas"><div className="section-kicker">Gyors összehasonlítás</div><h2>Minden szóba jövő hely, egy nézetben</h2><p className="section-lead">A költségoszlop a Shenzhenből vagy Hongkongból induló regionális odaút jelenlegi tervezési sávja; eltérő kapuk és pénznemek miatt nem teljes utazási ár. Mobilon a táblázat a saját keretében görgethető.</p><FilterBar selected={selected} onToggle={toggle} onClear={() => setSelected([])} /><div className="result-count" aria-live="polite">{visible.length} célpont látható</div><Comparison destinations={visible} /></section>
      <section className="destination-section"><div className="section-kicker">Úti célok közelről</div><h2>Nem lista. Huszonkét külön világ.</h2><p className="section-lead">Nyisd le a programokat, fürdést, szállásokat és a változó adatok forrásait.</p>{visible.map((destination, index) => <DestinationCard destination={destination} index={index} key={destination.id} />)}{visible.length === 0 && <div className="empty-state"><strong>Nincs ilyen kombináció.</strong><p>Vegyél ki egy szűrőt – az októberi jó idő + strand + csak vonat például nagyon szűk metszet.</p></div>}</section>
      <Rankings /><Itineraries /><FlightBrief />
      <section className="final-picks"><div className="section-kicker">Saját ajánlás</div><h2>Ha ma kellene foglalnom</h2><div className="pick-grid"><article className="pick-winner"><span>🥇 Legjobb összességében</span><h3>Shenzhen + Hongkong + Guilin/Yangshuo</h3><p>Mert a két hét minden fontos célját teljesíti regionális repülés nélkül, és Guangzhou felől tiszta open-jaw hazautat ad.</p></article><article><span>🌄 Legjobb természet</span><h3>Guilin / Yangshuo</h3><p>Nem egyetlen panoráma: hajó, tutaj, bicikli, barlang és falvak négy napon át.</p></article><article><span>🏯 Legjobb történelem</span><h3>Siem Reap / Angkor</h3><p>Ha vállaljuk a gyengébb repülési logisztikát, semmi más nem ad ekkora történelmi felfedezésélményt.</p></article><article><span>🚆 Legjobb repülés nélküli</span><h3>Hongkong + Guilin</h3><p>A háromórás közvetlen vonat a teljes régió egyik legjobb idő/élmény aránya.</p></article><article><span>💰 Legjobb ár/érték</span><h3>Chaozhou</h3><p>Két éj, gyors vonat, erős történelem és kiváló konyha – kis kockázat, nagy karakter.</p></article><article><span>👨‍👩‍👧‍👦 Legjobb gyerekekkel</span><h3>Hongkong</h3><p>Felvonó, komp, strand, könnyű túra, Disneyland és Ocean Park egyetlen hotelből.</p></article></div></section>
    </main>
    <footer><div><strong>KELETI IRÁNYTŰ</strong><p>Családi döntéstámogató útikalauz · 2026</p></div><p>Minden menetrend és ár változhat. Repülés és vasút foglalása előtt ellenőrizd az üzemeltető oldalát. Az oldal nem foglalási szolgáltatás.</p><a href="#top">Vissza a tetejére ↑</a></footer>
  </>;
}
