const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "www/index.html"), "utf8");
const dataMatch = html.match(/const data=(\[[^\n]+\]);/);

if (!dataMatch) {
  console.error("Could not find the alphabet data array in www/index.html");
  process.exit(1);
}

const data = JSON.parse(dataMatch[1]);
const imageDir = path.join(root, "www/img");
const norm = value => value.toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]/g, "");
const missing = [];
const invalid = [];

for (const [, word] of data) {
  const filename = `${norm(word)}.png`;
  const imagePath = path.join(imageDir, filename);
  if (!fs.existsSync(imagePath)) {
    missing.push(filename);
    continue;
  }

  const png = fs.readFileSync(imagePath);
  const isPng = png.length >= 24
    && png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const width = isPng ? png.readUInt32BE(16) : 0;
  const height = isPng ? png.readUInt32BE(20) : 0;
  if (!isPng || width === 0 || height === 0) invalid.push(`${filename}: invalid PNG`);
}

if (missing.length) {
  console.error("Missing image files:");
  for (const filename of missing) console.error(`- www/img/${filename}`);
}
if (invalid.length) {
  console.error("Invalid PNG files:");
  for (const issue of invalid) console.error(`- ${issue}`);
}

if (missing.length || invalid.length) process.exit(1);
console.log(`Verified ${data.length} word illustrations.`);
