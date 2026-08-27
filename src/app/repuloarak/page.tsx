import type { Metadata } from "next";
import { FarePage } from "@/components/FarePage";

export const metadata: Metadata = {
  title: "Konkrét repülőárak | Keleti Iránytű",
  description:
    "Budapest–Kína 2026. október: lekérdezett, konkrét repülőárak négy főre (2 felnőtt + 2 gyerek), útvonalanként, közvetlen és átszállásos bontásban.",
};

export default function Repuloarak() { return <FarePage />; }
