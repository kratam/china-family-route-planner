import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mit nézzünk meg Shenzhen mellett? | Családi útvonaltervező",
  description: "Shenzhen oda-vissza 2026. okt. 16–30., 8 és 10 éves gyerekkel: hova mehetünk a shenzheni és hongkongi bázisról vonattal vagy repülővel – fürdés, barlang, hajózás a városnézés mellé.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="hu"><body>{children}</body></html>; }
