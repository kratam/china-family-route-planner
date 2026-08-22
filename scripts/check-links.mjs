import { stat, readFile } from "node:fs/promises";
import { join } from "node:path";

const html = await readFile("out/index.html", "utf8");
const renderedLinks = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&"));
const externalUrls = [...new Set(renderedLinks.filter((url) => /^https?:\/\//.test(url)))];
const internalUrls = [...new Set(renderedLinks.filter((url) => !/^(?:https?:|mailto:|tel:|data:|#)/.test(url)))];
const blocked = [];
const broken = [];

async function checkExternal(url) {
  try {
    const options = { redirect: "follow", signal: AbortSignal.timeout(12_000), headers: { "user-agent": "Mozilla/5.0 FamilyRoutePlannerLinkCheck/1.0" } };
    let response = await fetch(url, { ...options, method: "HEAD" });
    if (response.status >= 400 && ![403, 406, 429].includes(response.status)) {
      response = await fetch(url, { ...options, method: "GET", headers: { ...options.headers, range: "bytes=0-1024" } });
    }
    if ([403, 405, 406, 429].includes(response.status)) blocked.push([response.status, url]);
    else if (response.status >= 400) broken.push([response.status, url]);
  } catch (error) {
    blocked.push(["network", url, error instanceof Error ? error.message : String(error)]);
  }
}

async function checkInternal(url) {
  const clean = decodeURIComponent(url.split("#")[0].split("?")[0])
    .replace(/^\/china-family-route-planner\/?/, "")
    .replace(/^\.\//, "")
    .replace(/^\//, "");
  let target = join("out", clean);
  try {
    const info = await stat(target);
    if (info.isDirectory()) target = join(target, "index.html");
    await stat(target);
  } catch {
    broken.push(["local", url]);
  }
}

for (const url of internalUrls) await checkInternal(url);
for (let index = 0; index < externalUrls.length; index += 8) await Promise.all(externalUrls.slice(index, index + 8).map(checkExternal));
console.log(`Checked ${externalUrls.length} rendered external links and ${internalUrls.length} internal assets/routes.`);
if (blocked.length) console.log(`Warnings (bot block/timeout): ${blocked.length}`);
if (broken.length) {
  console.error("Broken rendered links:");
  for (const item of broken) console.error(item.join(" "));
  process.exitCode = 1;
}
