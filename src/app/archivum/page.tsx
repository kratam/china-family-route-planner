import type { Metadata } from 'next';
import { Planner } from '@/components/Planner';
export const metadata: Metadata = {title:'Archív kutatás · 2026 ősz | Keleti Iránytű',robots:{index:false,follow:true}};
export default function Archive() { return <><aside className="archive-banner"><strong>ARCHÍV · 2026. őszi kutatás.</strong> Az alábbi dátumok, árak és strandos ajánlások a régi tervhez tartoznak. <a href="../">A 2027-es tavaszi útitervek →</a></aside><Planner /></>; }
