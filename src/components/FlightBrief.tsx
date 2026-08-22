import { SourceLink } from "./SourceLink";
import { sources } from "@/data/sources";

export function FlightBrief() {
  return <section className="editorial-section flight-brief" id="repules"><div className="section-kicker">Repülési alapok · ellenőrizve 2026. augusztus 22.</div><h2>Az open-jaw tényleg működik</h2><div className="flight-grid">
    <article><span className="airport">SZX</span><h3>Shenzhen → Budapest</h3><p>A jelenlegi téli menetrendben a Hainan Airlines közvetlen HU761 járata október 26-tól hétfőn és pénteken szerepel, 01:55 körüli indulással és kb. 12:20 repülési idővel. Október 30. péntek különösen releváns.</p><SourceLink source={sources.flightSZXBUD} /></article>
    <article className="recommended"><span className="badge">AJÁNLOTT KIJÁRAT</span><span className="airport">CAN</span><h3>Guangzhou → Budapest</h3><p>A China Southern közvetlen járata a jelenlegi téli menetrendben október 29. csütörtökön 01:30 körül indul és kb. 12:40 alatt ér Budapestre. Guilin, Zhaoqing és Shaoguan felől ez a logikus végpont.</p><SourceLink source={sources.flightCANBUD} /></article>
    <article><span className="airport">HKG</span><h3>Hongkong → Budapest</h3><p>Nincs stabil közvetlen járat; Istanbul, Doha, Dubai vagy európai hub felé egy átszállással jellemzően kb. 15–19 óra. HKG akkor jó végpont, ha nem megyünk tovább nyugatra.</p><SourceLink source={{ label: "HKG hivatalos járatkereső", url: "https://www.hongkongairport.com/en/flights/airlines-information/airlines.page" }} /></article>
    <article><span className="airport">HAN</span><h3>Hanoi → Budapest</h3><p>Jó egyátszállásos utak vannak Istanbul, Doha és Dubai felé. A menetrendi teljes idő tipikusan kb. 14–18 óra; ez jobb, mint visszarepülni Kínába csak egy közvetlen BUD-járatért.</p><SourceLink source={sources.flightHANBUD} /></article>
  </div><div className="notice"><strong>Indulási dátumok: okt. 16–19.</strong> A pontos BUD→SZX/CAN/HKG multi-city árakat élő foglalási keresőben kell összevetni. A kínai vasúti jegyek rövid értékesítési ablaka miatt az októberi konkrét vonatjegyek augusztusban még nem foglalhatók; az oldalon 2026-os aktuális menetrend és árszint szerepel.</div></section>;
}
