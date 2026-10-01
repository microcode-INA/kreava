export type Language = "id" | "en";

export type SearchIntent = "Informational" | "Commercial" | "Transactional" | "Navigational";

export interface KeywordItem {
  id: string;
  keyword: string;
  language: Language;
  searchVolume: number;
  difficulty: number; // 0 - 100
  intent: SearchIntent;
  cpc: number; // in USD
  trend: number[]; // monthly sparkline
  isBookmarked?: boolean;
  category: string;
  competitorGap?: {
    competitorDomain: string;
    competitorRank: number;
    opportunityScore: number;
  };
}

export interface SeoChecklistResult {
  titleHasKeyword: boolean;
  metaDescLength: boolean; // 150-160 chars
  firstH2HasKeyword: boolean;
  hasInternalLinks: boolean;
  hasExternalLinks: boolean;
  hasImageAltText: boolean;
  optimalSlug: boolean;
  hasFeaturedImage: boolean;
  wordCountMin: boolean; // > 800 words
  overallScore: number; // 0 - 100
}

export interface ArticleOutlineItem {
  id: string;
  type: "h2" | "h3" | "faq" | "cta";
  title: string;
  points?: string[];
}

export interface Article {
  id: string;
  title: {
    id: string;
    en: string;
  };
  slug: string;
  excerpt: {
    id: string;
    en: string;
  };
  content: {
    id: string;
    en: string;
  };
  focusKeyword: string;
  secondaryKeywords: string[];
  productId?: string;
  productName?: string;
  featuredImage: string;
  imageAlt: string;
  metaDescription: {
    id: string;
    en: string;
  };
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  scheduledFor?: string;
  views: number;
  organicClicks: number;
  averagePosition: number;
  seoScore: number;
  faqSchema: { question: string; answer: string }[];
  languageMode: "id" | "en" | "both";
  author: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: {
    id: string;
    en: string;
  };
  slug: string;
  category: string;
  tags: string[];
  priceRange: string;
  minOrderQuantity: string;
  hsCode: string;
  fobPort: string;
  images: string[];
  description: {
    id: string;
    en: string;
  };
  specifications: { key: string; value: string }[];
  whatsappNumber: string;
  whatsappMessageTemplate: string;
  seoScore: number;
  metaTitle: {
    id: string;
    en: string;
  };
  metaDescription: {
    id: string;
    en: string;
  };
  featured: boolean;
  inquiryCount: number;
}

export interface RankTrackItem {
  id: string;
  keyword: string;
  targetUrl: string;
  currentRank: number;
  previousRank: number;
  bestRank: number;
  searchVolume: number;
  language: Language;
  lastUpdated: string;
  history: { date: string; rank: number; clicks: number }[];
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  originalSizeKb: number;
  webpSizeKb: number;
  dimensions: string;
  altTextId: string;
  altTextEn: string;
  uploadedAt: string;
  associatedProductOrArticle?: string;
}

export interface TenantInfo {
  id: string;
  companyName: string;
  businessType: "Exporter" | "UMKM" | "Agency" | "Creator";
  customDomain: string;
  plan: "Starter" | "Growth" | "Pro" | "Enterprise";
  articlesGeneratedThisMonth: number;
  articlesLimit: number;
  keywordsTracked: number;
  keywordsLimit: number;
  aiTokensUsed: number;
}
