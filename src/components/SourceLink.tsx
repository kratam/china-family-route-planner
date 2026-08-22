import { ExternalLink } from "lucide-react";
import type { SourceRef } from "@/data/types";

export function SourceLink({ source, className = "" }: { source: SourceRef; className?: string }) {
  return <a className={`source-link ${className}`} href={source.url} target="_blank" rel="noreferrer">{source.label}<ExternalLink size={12} aria-hidden="true" /></a>;
}
