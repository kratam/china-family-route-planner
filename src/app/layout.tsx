import type { Metadata } from "next";
import "./globals.css";
import "./spring.css";

export const metadata: Metadata = {
  title: "Két családi út Kínába · 2027 tavasz | Keleti Iránytű",
  description: "Peking–Xi’an–Chongqing vagy Peking–Guilin–Yangshuo–Sencsen–Guangzhou: két részletes családi útiterv 2027 tavaszára, programokkal, utazási időkkel, költségekkel és beszámolókkal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="hu"><body>{children}</body></html>; }
