import { Language } from "./types";

export const translations = {
  id: {
    // Brand & General
    brandTagline: "Platform SEO AI All-in-One untuk Eksportir & UMKM",
    subTagline: "Website SEO Praktis, sekarang pakai AI. Riset kata kunci, generate artikel, optimasi gambar, katalog produk, dan pantau ranking dalam satu klik.",
    login: "Masuk Dashboard",
    register: "Coba Gratis Sekarang",
    exploreDemo: "Lihat Demo Publik",
    pricing: "Harga Paket",
    features: "Fitur Unggulan",
    caseStudy: "Studi Kasus Haramain",
    catalog: "Katalog Ekspor",
    blog: "Blog & Wawasan",
    documentation: "Panduan",
    language: "Bahasa",
    indonesian: "Bahasa Indonesia",
    english: "English",

    // Navigation & Dashboard
    navOverview: "Ringkasan",
    navKeywords: "Riset Kata Kunci AI",
    navArticleGen: "AI Article Generator",
    navArticles: "Kelola Artikel",
    navProducts: "Katalog Produk",
    navRankTracker: "Rank Tracker & GSC",
    navMedia: "Optimasi Gambar & Media",
    navWizard: "Wizard Pemula 5-Langkah",
    navAdmin: "Super Admin",
    navSettings: "Pengaturan Tenant",

    // Daily Snapshot
    dailySnapshotTitle: "Snapshot SEO Hari Ini",
    dailySnapshotDesc: "Hari ini: 3 keyword naik ke Halaman 1 Google, 1 turun minor, dan 142 klik organik baru!",
    btnViewDetails: "Lihat Detail Ranking",

    // Metrics
    metricTotalClicks: "Total Klik Organik",
    metricAvgPosition: "Posisi Rata-rata Google",
    metricRankingKeywords: "Kata Kunci Terindeks",
    metricTotalInquiries: "Inquiry Buyer Masuk",
    metricArticlesPublished: "Artikel Terpublikasi",
    metricSeoHealth: "Kesehatan SEO Rata-rata",

    // Actions
    btnNewArticle: "Buat Artikel Baru",
    btnNewProduct: "Tambah Produk Ekspor",
    btnStartWizard: "Mulai Wizard 5-Langkah",
    btnGenerateNow: "Generate Artikel Sekarang",
    btnSaveDraft: "Simpan Draf",
    btnPublish: "Publikasikan",
    btnSchedule: "Jadwalkan",
    btnExportCsv: "Ekspor CSV",
    btnImportCsv: "Impor Massal (CSV)",
    btnInquireWa: "Chat WhatsApp Buyer",
    btnSendInquiry: "Kirim Permintaan Penawaran (RFQ)",

    // Sections
    seoChecklistTitle: "Checklist SEO & Live Score",
    outlineEditorTitle: "Editor Kerangka Artikel (Outline)",
    keywordExplorerTitle: "Keyword Explorer AI",
    intentInformational: "Informasional",
    intentCommercial: "Komersial",
    intentTransactional: "Transaksional",
    intentNavigational: "Navigasional",
    difficultyLow: "Mudah",
    difficultyMedium: "Menengah",
    difficultyHard: "Sulit",
  },
  en: {
    // Brand & General
    brandTagline: "All-in-One AI SEO Engine for Exporters & SMBs",
    subTagline: "Practical SEO websites, now supercharged by AI. Keyword research, bilingual article generation, image optimization, product catalogs, and rank tracking in one click.",
    login: "Open Dashboard",
    register: "Start Free Trial",
    exploreDemo: "Explore Public Catalog",
    pricing: "Pricing",
    features: "Features",
    caseStudy: "Haramain Case Study",
    catalog: "Export Catalog",
    blog: "Blog & Insights",
    documentation: "Docs",
    language: "Language",
    indonesian: "Bahasa Indonesia",
    english: "English",

    // Navigation & Dashboard
    navOverview: "Overview",
    navKeywords: "AI Keyword Research",
    navArticleGen: "AI Article Generator",
    navArticles: "Articles & Editor",
    navProducts: "Product Catalog",
    navRankTracker: "Rank Tracker & GSC",
    navMedia: "Image Optimizer & CDN",
    navWizard: "5-Step Beginner Wizard",
    navAdmin: "Super Admin",
    navSettings: "Tenant Settings",

    // Daily Snapshot
    dailySnapshotTitle: "Today's SEO Snapshot",
    dailySnapshotDesc: "Today: 3 keywords climbed to Google Page 1, 1 minor drop, and 142 new organic buyer clicks!",
    btnViewDetails: "View Ranking Details",

    // Metrics
    metricTotalClicks: "Total Organic Clicks",
    metricAvgPosition: "Google Avg Position",
    metricRankingKeywords: "Indexed Keywords",
    metricTotalInquiries: "Buyer Inquiries",
    metricArticlesPublished: "Published Articles",
    metricSeoHealth: "Average SEO Health",

    // Actions
    btnNewArticle: "Create New Article",
    btnNewProduct: "Add Export Product",
    btnStartWizard: "Start 5-Step Wizard",
    btnGenerateNow: "Generate Article Now",
    btnSaveDraft: "Save Draft",
    btnPublish: "Publish",
    btnSchedule: "Schedule",
    btnExportCsv: "Export CSV",
    btnImportCsv: "Batch Import (CSV)",
    btnInquireWa: "Chat Buyer on WhatsApp",
    btnSendInquiry: "Submit Request for Quotation (RFQ)",

    // Sections
    seoChecklistTitle: "Live SEO Checklist & Score",
    outlineEditorTitle: "AI Article Outline Editor",
    keywordExplorerTitle: "AI Keyword Explorer",
    intentInformational: "Informational",
    intentCommercial: "Commercial",
    intentTransactional: "Transactional",
    intentNavigational: "Navigational",
    difficultyLow: "Easy",
    difficultyMedium: "Medium",
    difficultyHard: "Hard",
  },
} as const;

export function useI18n(lang: Language = "id") {
  return translations[lang] || translations.id;
}
