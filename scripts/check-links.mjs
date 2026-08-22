import { readFile } from "node:fs/promises";

const files = ["src/data/destinations.ts", "src/data/sources.ts", "src/components/FlightBrief.tsx"];
const bodies = await Promise.all(files.map((file) => readFile(file, "utf8")));
const urls = [...new Set(bodies.flatMap((body) => body.match(/https?:\/\/[^\s\"'`)}]+/g) ?? []))];
const blocked = [];
const broken = [];

async function check(url) {
  try {
    const options = { redirect: "follow", signal: AbortSignal.timeout(12_000), headers: { "user-agent": "Mozilla/5.0 FamilyRoutePlannerLinkCheck/1.0" } };
    let response = await fetch(url, { ...options, method: "HEAD" });
    if (response.status >= 400 && ![403, 406, 429].includes(response.status)) {
      response = await fetch(url, { ...options, method: "GET", headers: { ...options.headers, range: "bytes=0-1024" } });
    }
    if ([403, 405, 406, 429].includes(response.status)) {
      blocked.push([response.status, url]);
      return;
    }
    if (response.status >= 400) broken.push([response.status, url]);
  } catch (error) {
    blocked.push(["network", url, error instanceof Error ? error.message : String(error)]);
  }
}

for (let index = 0; index < urls.length; index += 8) await Promise.all(urls.slice(index, index + 8).map(check));
console.log(`Checked ${urls.length} unique external links.`);
if (blocked.length) console.log(`Warnings (bot block/timeout): ${blocked.length}`);
if (broken.length) {
  console.error("Broken links:");
  for (const item of broken) console.error(item.join(" "));
  process.exitCode = 1;
}
