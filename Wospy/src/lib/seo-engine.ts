import { SeoChecklistResult } from "./types";

export function analyzeSeoContent(params: {
  title: string;
  metaDescription: string;
  content: string;
  focusKeyword: string;
  slug: string;
  featuredImage: string;
  imageAlt: string;
}): SeoChecklistResult {
  const {
    title = "",
    metaDescription = "",
    content = "",
    focusKeyword = "",
    slug = "",
    featuredImage = "",
    imageAlt = "",
  } = params;

  const normalizedKeyword = focusKeyword.trim().toLowerCase();
  const normalizedTitle = title.trim().toLowerCase();
  const normalizedContent = content.toLowerCase();

  // 1. Title contains keyword
  const titleHasKeyword = Boolean(
    normalizedKeyword && normalizedTitle.includes(normalizedKeyword)
  );

  // 2. Meta description optimal length (140 - 165 characters) and has keyword
  const metaDescLength = metaDescription.length >= 130 && metaDescription.length <= 170;

  // 3. First H2 contains keyword
  const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/i) || content.match(/^##\s+(.*$)/im);
  const firstH2Text = h2Matches ? h2Matches[1].toLowerCase() : "";
  const firstH2HasKeyword = Boolean(
    normalizedKeyword && firstH2Text.includes(normalizedKeyword)
  );

  // 4. Internal links (e.g. /produk, /catalog, /katalog, /product)
  const hasInternalLinks =
    content.includes("/produk/") ||
    content.includes("/catalog/") ||
    content.includes("/katalog/") ||
    content.includes("/product/") ||
    content.includes("href=\"/");

  // 5. External authority links (http:// or https://)
  const hasExternalLinks =
    (content.includes("https://") || content.includes("http://")) &&
    (content.includes("wikipedia.org") ||
      content.includes("kemendag.go.id") ||
      content.includes("bps.go.id") ||
      content.includes("trade.gov") ||
      content.includes("insw.go.id") ||
      content.includes("target=\"_blank\""));

  // 6. Image alt text present
  const hasImageAltText = Boolean(
    (imageAlt && imageAlt.trim().length > 3) ||
    content.includes("alt=\"") ||
    /!\[[^\]]+\]\(/.test(content)
  );

  // 7. Optimal slug (lowercase, dashes, contains core keyword parts)
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const keywordSlug = normalizedKeyword.replace(/\s+/g, "-");
  const optimalSlug = Boolean(
    cleanSlug.length > 3 &&
    !cleanSlug.includes(" ") &&
    (normalizedKeyword ? cleanSlug.includes(keywordSlug.slice(0, 10)) : true)
  );

  // 8. Featured image present
  const hasFeaturedImage = Boolean(featuredImage && featuredImage.trim().length > 5);

  // 9. Word count > 800 words
  const words = content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const wordCountMin = wordCount >= 700;

  // Calculate score (0-100)
  let score = 0;
  if (titleHasKeyword) score += 15;
  if (metaDescLength) score += 12;
  if (firstH2HasKeyword) score += 15;
  if (hasInternalLinks) score += 12;
  if (hasExternalLinks) score += 8;
  if (hasImageAltText) score += 10;
  if (optimalSlug) score += 8;
  if (hasFeaturedImage) score += 10;
  if (wordCountMin) score += 10;

  return {
    titleHasKeyword,
    metaDescLength,
    firstH2HasKeyword,
    hasInternalLinks,
    hasExternalLinks,
    hasImageAltText,
    optimalSlug,
    hasFeaturedImage,
    wordCountMin,
    overallScore: Math.min(100, Math.max(0, score)),
  };
}
