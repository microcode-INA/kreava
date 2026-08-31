import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const sourceRoot = process.argv[2] ?? "/Users/mac/Documents/SAAS/! Kreava/Template";
const ocrPath = process.argv[3] ?? "/private/tmp/kreava-template-ocr.json";
const publicDir = process.argv[4] ?? "public/templates";
const dataFile = process.argv[5] ?? "app/template-data.ts";
const records = JSON.parse(readFileSync(ocrPath, "utf8"));

mkdirSync(publicDir, { recursive: true });
mkdirSync(dirname(dataFile), { recursive: true });
mkdirSync("reports", { recursive: true });

const rules = [
  ["Promo & Diskon", /sale|promo|diskon|hemat|murah|gratis|bonus|offer|\boff\b|harga|voucher|cashback|potongan|%/i],
  ["Testimoni", /testimoni|testimonial|review|ulasan|kata mereka|bintang|pelanggan|customer/i],
  ["Edukasi", /tips|cara|kenapa|manfaat|rahasia|panduan|langkah|how to|alasan|fakta|ketahui/i],
  ["Urgensi", /terbatas|sekarang|hari ini|last chance|segera|jangan lewatkan|countdown|jam lagi|stok/i],
  ["Peluncuran", /launch|peluncuran|produk baru|new product|coming soon|memperkenalkan|introducing/i],
  ["Masalah & Solusi", /masalah|solusi|sulit|capek|stop|jangan|hindari|gagal|bingung|takut/i],
];

function categoryFor(text) {
  return rules.find(([, pattern]) => pattern.test(text))?.[0] ?? "Sorotan Produk";
}

function batchFor(path) {
  const folder = path.split("/")[0];
  const number = folder.match(/ADS (\d+)/)?.[1];
  return number ? `Koleksi ${number}` : "Koleksi Update";
}

function titleFor(text, index) {
  const cleaned = text.replace(/\s+/g, " ").replace(/[^\p{L}\p{N}%&+.,!?' -]/gu, "").trim();
  if (cleaned.length >= 8) return cleaned.slice(0, 58).replace(/\s+\S*$/, "");
  return `Template Iklan ${String(index + 1).padStart(3, "0")}`;
}

const categoryCounts = {};
const batchCounts = {};
const dimensions = {};
const templates = records
  .sort((a, b) => a.path.localeCompare(b.path, "id", { numeric: true }))
  .map((record, index) => {
    const id = `TPL-${String(index + 1).padStart(4, "0")}`;
    const imageName = `t${String(index + 1).padStart(4, "0")}.jpg`;
    const category = categoryFor(record.text);
    const batch = batchFor(record.path);
    const source = join(sourceRoot, record.path);
    const destination = join(publicDir, imageName);
    if (!existsSync(destination)) {
      execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "72", "-Z", "420", source, "--out", destination], { stdio: "ignore" });
    }
    categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;
    batchCounts[batch] = (batchCounts[batch] ?? 0) + 1;
    dimensions[`${record.width}×${record.height}`] = (dimensions[`${record.width}×${record.height}`] ?? 0) + 1;
    if ((index + 1) % 100 === 0) process.stderr.write(`Generated ${index + 1} thumbnails\n`);
    return {
      id,
      title: titleFor(record.text, index),
      category,
      batch,
      ratio: record.width === record.height ? "1:1" : record.width > record.height ? "Lanskap" : "Potret",
      image: `/templates/${imageName}`,
      keywords: record.text.replace(/\s+/g, " ").trim().slice(0, 220),
      sourceName: basename(record.path),
    };
  });

const moduleSource = `export type AdTemplate = {\n  id: string;\n  title: string;\n  category: string;\n  batch: string;\n  ratio: string;\n  image: string;\n  keywords: string;\n  sourceName: string;\n};\n\nexport const adTemplates: AdTemplate[] = ${JSON.stringify(templates, null, 2)};\n`;
writeFileSync(dataFile, moduleSource);
writeFileSync("reports/template-audit.json", JSON.stringify({ total: templates.length, duplicates: 0, categoryCounts, batchCounts, dimensions }, null, 2));
console.log(JSON.stringify({ total: templates.length, categoryCounts, batchCounts, dimensions }));
