import type { Metadata } from "next";
import { FarePage } from "@/components/FarePage";

export const metadata: Metadata = {
  title: "Archív · 2026-os repülőárak | Keleti Iránytű",
  description:
    "Budapest–Kína 2026. október: lekérdezett, konkrét repülőárak négy főre (2 felnőtt + 2 gyerek), útvonalanként, közvetlen és átszállásos bontásban.",
};

export default function Repuloarak() { return <><aside className="archive-banner"><strong>ARCHÍV · 2026. októberi repülőárak.</strong> Ezek nem a 2027-es utazás ajánlatai. <a href="../">Tavaszi tervek és költségek →</a></aside><FarePage /></>; }
