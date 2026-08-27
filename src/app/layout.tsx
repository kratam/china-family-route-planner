import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mit nézzünk meg Shenzhen mellett? | Családi útvonaltervező",
  description: "Kína és Délkelet-Ázsia 8 és 10 éves gyerekkel – 22 célpont, 10 teljes útvonal konkrét, lekérdezett repülőárral és friss 2026-os kutatás.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="hu"><body>{children}</body></html>; }
