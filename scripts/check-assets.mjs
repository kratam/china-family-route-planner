import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const data = await readFile("src/data/destinations.ts", "utf8");
const ids = [...data.matchAll(/\bid: "([a-z-]+)", name:/g)].map((match) => match[1]);
const credits = JSON.parse(await readFile("src/data/photo-credits.json", "utf8"));
if (ids.length !== 22 || new Set(ids).size !== 22) throw new Error(`Expected 22 unique destinations, got ${ids.length}`);
for (const id of ids) {
  if (!Array.isArray(credits[id]) || credits[id].length !== 2) throw new Error(`${id}: missing two photo credits`);
  for (let index = 1; index <= 2; index += 1) {
    const file = join("public/photos", `${id}-${index}.jpg`);
    const info = await stat(file);
    if (info.size < 10_000) throw new Error(`${file}: suspiciously small asset`);
    if (!credits[id][index - 1].creditUrl.startsWith("https://commons.wikimedia.org/wiki/File:")) throw new Error(`${id}: imprecise photo source`);
  }
}
console.log(`Verified ${ids.length * 2} local photos and exact source links.`);
