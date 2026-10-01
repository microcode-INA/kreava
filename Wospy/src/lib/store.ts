"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { Product, Article, KeywordItem, RankTrackItem, MediaItem, TenantInfo, Language } from "./types";
import { analyzeSeoContent } from "./seo-engine";

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: {
      id: "Biji Vanili Alami Planifolia Gourmet Grade A",
      en: "Indonesian Gourmet Planifolia Vanilla Beans Grade A",
    },
    slug: "indonesian-planifolia-vanilla-beans-grade-a",
    category: "Rempah & Pertanian / Spices & Agriculture",
    tags: ["Vanilla", "Export Quality", "Spices", "Food Ingredients"],
    priceRange: "$180 - $240 / kg FOB",
    minOrderQuantity: "25 Kilograms",
    hsCode: "0905.10.00",
    fobPort: "Tanjung Priok, Jakarta / Tanjung Perak, Surabaya",
    images: [
      "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    ],
    description: {
      id: "Vanili Planifolia Indonesia kualitas ekspor terbaik dari perkebunan dataran tinggi Jawa Timur dan Bali. Kadar air 25-30%, vanillin content > 2.0%, panjang 16-20 cm. Diproses dengan fermentasi curing tradisional standar internasional.",
      en: "Premium export-grade Indonesian Planifolia vanilla beans harvested from fertile volcanic highlands in East Java & Bali. Moisture content 25-30%, vanillin content exceeding 2.0%, lengths 16-20 cm. Sun-cured with traditional artisanal techniques ensuring rich aromatic depth.",
    },
    specifications: [
      { key: "Moisture Content", value: "25% - 30%" },
      { key: "Vanillin Content", value: "2.0% - 2.4%" },
      { key: "Length", value: "16 - 20 cm" },
      { key: "Packaging", value: "Vacuum sealed food-grade 5kg pouches in export cartons" },
    ],
    whatsappNumber: "6281234567890",
    whatsappMessageTemplate: "Halo Wospy Export, saya tertarik untuk memesan Vanili Planifolia Grade A (MOQ 25 kg). Mohon info penawaran harga & COA terbaru.",
    seoScore: 94,
    metaTitle: {
      id: "Supplier Biji Vanili Planifolia Grade A Ekspor | Wospy Export",
      en: "Indonesian Planifolia Vanilla Beans Grade A Supplier | Wospy Export",
    },
    metaDescription: {
      id: "Supplier tangan pertama biji vanili Planifolia Grade A Indonesia. Kadar air 28%, vanillin > 2.0%. Siap ekspor ke US, Eropa, & Asia.",
      en: "Direct source supplier of premium Indonesian Planifolia Gourmet vanilla beans. High vanillin content (>2.0%), vacuum packed, global export ready.",
    },
    featured: true,
    inquiryCount: 42,
  },
  {
    id: "prod-2",
    name: {
      id: "Briket Arang Batok Kelapa Premium untuk Shisha & BBQ",
      en: "Premium Coconut Shell Charcoal Briquettes for Shisha & Hookah",
    },
    slug: "premium-coconut-shell-charcoal-briquettes",
    category: "Energi Ramah Lingkungan / Biofuel",
    tags: ["Coconut Charcoal", "Shisha", "Hookah", "BBQ Briquettes"],
    priceRange: "$1,250 - $1,400 / Metric Ton FOB",
    minOrderQuantity: "1x20ft Container (18 Metric Tons)",
    hsCode: "4402.90.10",
    fobPort: "Tanjung Emas, Semarang / Tanjung Priok, Jakarta",
    images: [
      "https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    ],
    description: {
      id: "Briket arang batok kelapa 100% murni tanpa bahan kimia. Kadar abu putih tipis (<2.5%), panas tinggi kalori >7200 kcal/kg, waktu bakar tahan hingga 2.5 jam. Sangat diminati di pasar Timur Tengah, Turki, dan Jerman.",
      en: "100% natural coconut shell charcoal briquettes with zero chemical additives. Ultra-low white ash (<2.5%), high heat output exceeding 7,200 kcal/kg, and stable burning duration of up to 2.5 hours. Preferred choice for hookah lounges and BBQ in Middle East and Europe.",
    },
    specifications: [
      { key: "Ash Content", value: "Max 2.5% (White Ash)" },
      { key: "Caloric Value", value: "> 7,200 Kcal/kg" },
      { key: "Burning Time", value: "2.0 - 2.5 Hours" },
      { key: "Shape & Size", value: "Cube 25x25x25mm / 26x26x26mm" },
    ],
    whatsappNumber: "6281234567890",
    whatsappMessageTemplate: "Hello, I am inquiring about 1x20ft container of Coconut Shell Charcoal Briquettes (Cube 25mm). Please share quotation and factory audit report.",
    seoScore: 91,
    metaTitle: {
      id: "Produsen Briket Arang Batok Kelapa Shisha Ekspor | Wospy",
      en: "Premium Coconut Shell Charcoal Briquettes Manufacturer Indonesia",
    },
    metaDescription: {
      id: "Pabrik briket arang batok kelapa Indonesia untuk shisha & BBQ. Abu putih <2.5%, kalori >7200 kcal. Kapasitas ekspor 10 kontainer/bulan.",
      en: "Top Indonesian manufacturer of 100% pure coconut shell charcoal briquettes for shisha. Low ash, long burning, private label OEM available.",
    },
    featured: true,
    inquiryCount: 78,
  },
  {
    id: "prod-3",
    name: {
      id: "Kopi Arabika Aceh Gayo Specialty Green Beans Ekspor",
      en: "Specialty Aceh Gayo Arabica Green Coffee Beans Single Origin",
    },
    slug: "aceh-gayo-arabica-green-coffee-beans",
    category: "Kopi & Minuman / Coffee & Beverages",
    tags: ["Specialty Coffee", "Arabica Gayo", "Green Beans", "Organic"],
    priceRange: "$7.50 - $9.80 / kg FOB",
    minOrderQuantity: "1,000 Kilograms (1 MT)",
    hsCode: "0901.11.10",
    fobPort: "Belawan Port, Medan",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    ],
    description: {
      id: "Kopi Arabika single origin dari dataran tinggi Takengon, Aceh Gayo (ketinggian 1.400 - 1.600 mdpl). Cupping score SCA 84+, profile rasa kompleks dengan aroma spicy, hint herbal, dan body yang mantap.",
      en: "Single origin specialty Arabica coffee beans grown in the volcanic soils of Takengon, Aceh Gayo at 1,400 - 1,600 MASL. Certified SCA cupping score 84+, featuring balanced acidity, complex herbal undertones, and smooth heavy body.",
    },
    specifications: [
      { key: "Variety", value: "Catimor, Typica, Bourbon" },
      { key: "Process", value: "Wet Hulled (Giling Basah) / Full Washed" },
      { key: "Cupping Score", value: "84 - 86.5 (SCA Standard)" },
      { key: "Defect Rate", value: "Grade 1 (Max 11 defects per 300g)" },
    ],
    whatsappNumber: "6281234567890",
    whatsappMessageTemplate: "Halo, saya mencari green coffee beans Aceh Gayo Grade 1 untuk ekspor ke Australia. Bisa kirimkan sample 500g dan COA?",
    seoScore: 96,
    metaTitle: {
      id: "Supplier Kopi Arabika Gayo Green Beans Grade 1 | Wospy",
      en: "Aceh Gayo Arabica Green Coffee Beans Wholesaler Indonesia",
    },
    metaDescription: {
      id: "Eksportir resmi biji kopi hijau Arabika Aceh Gayo specialty. Cupping score 84+, sertifikat organik. Kirim ke seluruh dunia.",
      en: "Direct exporter of Indonesian Aceh Gayo specialty Arabica green coffee beans. Certified Grade 1, fair trade, global shipping to roasters.",
    },
    featured: true,
    inquiryCount: 56,
  },
  {
    id: "prod-4",
    name: {
      id: "Paket Jasa Pengurusan Visa Umrah & Badal di Bandung (Haramain Service)",
      en: "Umrah Visa & Processing Service in Bandung (Haramain Service)",
    },
    slug: "visa-umrah-di-bandung",
    category: "Layanan Perjalanan & Visa / Travel Services",
    tags: ["Visa Umrah", "Haramain Service", "Bandung", "Travel Haji"],
    priceRange: "Rp 2.850.000 - Rp 3.500.000 / Paspor",
    minOrderQuantity: "1 Paspor (Perorangan / Rombongan)",
    hsCode: "9983.11.00",
    fobPort: "Kantor Bandung / Seluruh Indonesia",
    images: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    ],
    description: {
      id: "Layanan resmi pengurusan visa umrah mandiri maupun rombongan travel di Bandung oleh Haramain Service International. Proses cepat 3-5 hari kerja, terintegrasi sistem Muassasah & Kemenag, garansi approved atau biaya kembali. Telah melayani lebih dari 10.000 jamaah di Jawa Barat.",
      en: "Authorized Umrah visa issuance and processing service for individuals and travel agencies in Bandung by Haramain Service International. Swift 3-5 day issuance, full Muassasah portal integration, and full compliance with Saudi Arabia regulatory guidelines.",
    },
    specifications: [
      { key: "Waktu Proses", value: "3 - 5 Hari Kerja" },
      { key: "Persyaratan", value: "Paspor asli (min. 7 bln), KTP, Buku Kuning Meningitis" },
      { key: "Tipe Visa", value: "Visa Umrah Elektronik (e-Visa Single/Multiple)" },
      { key: "Legalitas", value: "Terdaftar Kemenag RI & Provider Muassasah Resmi" },
    ],
    whatsappNumber: "6281122334455",
    whatsappMessageTemplate: "Assalamu'alaikum Haramain Service, saya ingin konsultasi pengurusan visa umrah di Bandung untuk keberangkatan bulan depan. Mohon rincian persyaratan & biayanya.",
    seoScore: 98,
    metaTitle: {
      id: "Jasa Pembuatan Visa Umrah Cepat & Resmi di Bandung | Haramain Service",
      en: "Official Umrah Visa Processing Service in Bandung | Haramain Service",
    },
    metaDescription: {
      id: "Pengurusan visa umrah terpercaya di Bandung. Proses cepat 3-5 hari, legalitas Kemenag resmi, tarif transparan. Konsultasi gratis via WhatsApp sekarang!",
      en: "Trusted and reliable Umrah visa assistance in Bandung. Fast 3-5 business day processing, fully compliant, best rates for travel agents.",
    },
    featured: true,
    inquiryCount: 142,
  },
];

export const initialArticles: Article[] = [
  {
    id: "art-1",
    title: {
      id: "Panduan Lengkap Syarat & Biaya Pembuatan Visa Umrah di Bandung 2026",
      en: "Complete Guide: Requirements & Costs for Umrah Visa in Bandung 2026",
    },
    slug: "visa-umrah-di-bandung",
    excerpt: {
      id: "Simak syarat terbaru, estimasi biaya, alur pendaftaran, dan rekomendasi jasa pengurusan visa umrah resmi di Bandung agar ibadah tenang tanpa kendala.",
      en: "Discover latest 2026 requirements, cost breakdown, step-by-step procedures, and trusted official visa agents in Bandung for a smooth Umrah pilgrimage.",
    },
    content: {
      id: `<h2>Mengapa Mengurus Visa Umrah di Bandung Harus Lewat Jalur Resmi?</h2>
<p>Merencanakan ibadah umrah ke Tanah Suci merupakan dambaan setiap muslim. Namun, salah satu tantangan terbesar yang sering dihadapi calon jamaah asal Bandung dan sekitarnya adalah birokrasi pengurusan dokumen perjalanan, khususnya <strong>visa umrah di Bandung</strong>.</p>
<p>Dengan regulasi Kementerian Haji & Umrah Arab Saudi yang terus diperbarui berbasis digital (sistem Nusuk dan Muassasah), kesalahan kecil pada pengisian biodata atau dokumen asuransi kesehatan dapat berakibat pada penolakan visa. Oleh karena itu, bekerja sama dengan penyedia resmi seperti <a href="/catalog/visa-umrah-di-bandung">Layanan Visa Umrah Haramain Service Bandung</a> menjadi solusi paling aman dan efisien.</p>

<h2>Daftar Syarat Terbaru Pengurusan Visa Umrah 2026</h2>
<p>Bagi Anda warga Kota Bandung, Cimahi, Kabupaten Bandung, dan sekitarnya, berikut adalah checklist dokumen penting yang harus dipersiapkan sebelum mengajukan permohonan:</p>
<ul>
  <li><strong>Paspor Asli:</strong> Masih berlaku minimal 7 bulan terhitung sejak tanggal keberangkatan dengan susunan nama minimal 2 atau 3 suku kata.</li>
  <li><strong>Foto Berwarna Terbaru:</strong> Latar belakang putih ukuran 4x6 dengan fokus wajah 80%.</li>
  <li><strong>Buku / Sertifikat Vaksin Meningitis:</strong> Wajib terdaftar di SatuSehat Kementerian Kesehatan RI.</li>
  <li><strong>Buku Nikah / Akta Kelahiran:</strong> Diperlukan untuk jamaah keluarga atau mahram anak/istri.</li>
  <li><strong>Asuransi Perjalanan Umrah:</strong> Polis asuransi yang mencakup perlindungan medis selama di Arab Saudi.</li>
</ul>

<h2>Rincian Biaya Visa Umrah di Bandung</h2>
<p>Secara umum, biaya pengurusan visa umrah berada pada kisaran <strong>Rp 2.850.000 hingga Rp 3.500.000</strong> tergantung pada kurs SAR/USD serta paket layanan tambahan seperti handling bandara dan asuransi darurat. Referensi data ini sejalan dengan panduan resmi Kementerian Agama <a href="https://kemendag.go.id" target="_blank">Kementerian RI</a>.</p>

<h2>Langkah Praktis Mengurus Visa via Haramain Service</h2>
<p>Anda tidak perlu repot antre atau bingung mengisi form berbahasa Arab. Tim konsultan Haramain Service akan memandu Anda dari verifikasi berkas, entry portal Muassasah, hingga e-visa diterbitkan dalam 3-5 hari kerja.</p>`,
      en: `<h2>Why Choose an Official Provider for Umrah Visa in Bandung?</h2>
<p>Planning an Umrah pilgrimage requires accurate visa clearance under the Saudi Ministry of Hajj Nusuk portal. For pilgrims located in West Java, obtaining a compliant <strong>visa umrah in Bandung</strong> ensures smooth boarding and seamless border clearance.</p>
<p>Authorized agencies like <a href="/catalog/visa-umrah-di-bandung">Haramain Service International Bandung</a> streamline the entire process directly with Saudi Muassasah sponsors.</p>`,
    },
    focusKeyword: "visa umrah di bandung",
    secondaryKeywords: ["jasa visa umrah bandung", "biaya visa umrah 2026", "syarat visa umrah bandung"],
    productId: "prod-4",
    productName: "Layanan Visa Umrah Haramain Service",
    featuredImage: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Panduan Pengurusan Visa Umrah Resmi di Bandung Jawa Barat",
    metaDescription: {
      id: "Panduan lengkap syarat, biaya, dan tips pengurusan visa umrah di Bandung 2026. Proses cepat, garansi resmi Kemenag, konsultasi gratis via WhatsApp.",
      en: "Comprehensive guide to Umrah visa requirements and fees in Bandung 2026. Fast processing, reliable official assistance, and direct WhatsApp booking.",
    },
    status: "published",
    publishDate: "2026-09-15",
    views: 2450,
    organicClicks: 340,
    averagePosition: 1.4,
    seoScore: 96,
    faqSchema: [
      {
        question: "Berapa lama proses pembuatan visa umrah di Bandung?",
        answer: "Proses penerbitan e-visa umrah biasanya memakan waktu 3 sampai 5 hari kerja setelah seluruh dokumen terverifikasi lengkap.",
      },
      {
        question: "Apakah bisa mengajukan visa umrah mandiri tanpa ikut paket travel?",
        answer: "Bisa, asalkan Anda mengajukan permohonan melalui provider visa berizin resmi yang memiliki koneksi langsung dengan Muassasah Saudi.",
      },
    ],
    languageMode: "both",
    author: "Tim Riset SEO Wospy",
    updatedAt: "2026-09-28",
  },
  {
    id: "art-2",
    title: {
      id: "Panduan Menemukan Supplier Biji Vanili Indonesia Kualitas Ekspor",
      en: "How to Source Premium Indonesian Vanilla Beans: Exporter Quality Guide",
    },
    slug: "indonesian-vanilla-beans-supplier",
    excerpt: {
      id: "Pelajari standar kadar air, aroma vanillin, klasifikasi Grade A gourmet, dan cara verifikasi supplier vanili tepercaya dari Indonesia untuk buyer global.",
      en: "A comprehensive sourcing guide on moisture grades, vanillin potency, gourmet bean lengths, and how international buyers safely contract Indonesian vanilla exporters.",
    },
    content: {
      id: `<h2>The Rise of Indonesian Gourmet Planifolia Vanilla</h2>
<p>Indonesia is among the top 2 global producers of premium natural vanilla beans. For international flavor houses, gourmet bakeries, and extract manufacturers, finding a reliable <strong>indonesian vanilla beans supplier</strong> with consistent vanillin potency is paramount.</p>
<p>Explore our premium harvests on <a href="/catalog/indonesian-planifolia-vanilla-beans-grade-a">Indonesian Gourmet Planifolia Vanilla Beans</a>.</p>
<h2>Key Quality Specifications for Export Grade Vanilla</h2>
<p>Buyers must verify laboratory certificates covering moisture content between 25% to 30% and vanillin yield above 2.0%.</p>`,
      en: `<h2>The Rise of Indonesian Gourmet Planifolia Vanilla</h2>
<p>Indonesia produces world-renowned Planifolia vanilla beans characterized by rich, oily pods and deep chocolate-fig aroma. Sourcing directly from an established <strong>indonesian vanilla beans supplier</strong> eliminates intermediary markups and guarantees trace-to-farm integrity.</p>
<p>Review export specifications on <a href="/catalog/indonesian-planifolia-vanilla-beans-grade-a">Indonesian Gourmet Planifolia Vanilla Beans Grade A</a>.</p>`,
    },
    focusKeyword: "indonesian vanilla beans supplier",
    secondaryKeywords: ["gourmet vanilla beans wholesale", "planifolia vanilla export indonesia", "vanilla beans price per kg"],
    productId: "prod-1",
    productName: "Biji Vanili Planifolia Grade A",
    featuredImage: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Indonesian Gourmet Planifolia Vanilla Beans Grade A Export",
    metaDescription: {
      id: "Cari supplier biji vanili Indonesia kualitas ekspor? Cek spesifikasi kadar vanillin >2%, kadar air 28%, dan legalitas ekspor rempah di sini.",
      en: "Source direct from certified Indonesian vanilla beans supplier. Grade A Planifolia with >2.0% vanillin, vacuum sealed packaging, global shipping.",
    },
    status: "published",
    publishDate: "2026-09-18",
    views: 1820,
    organicClicks: 280,
    averagePosition: 2.1,
    seoScore: 92,
    faqSchema: [
      {
        question: "What is the minimum order quantity (MOQ) for vanilla export?",
        answer: "Standard MOQ starts at 25 kg packed in vacuum-sealed food-grade pouches.",
      },
    ],
    languageMode: "both",
    author: "Wospy Global Trade Desk",
    updatedAt: "2026-09-29",
  },
  {
    id: "art-3",
    title: {
      id: "Peluang Ekspor Briket Arang Batok Kelapa Indonesia ke Pasar Global",
      en: "Exporting Indonesian Coconut Charcoal Briquettes to Global Markets",
    },
    slug: "ekspor-briket-arang-kelapa",
    excerpt: {
      id: "Ketahui standar abu putih, spesifikasi kalori, izin ekspor SDoC / MSDS, dan cara menembus pasar Timur Tengah & Eropa untuk produk briket arang batok.",
      en: "Understand white ash thresholds, caloric standards, MSDS maritime transport safety compliances, and market entry for Indonesian charcoal briquettes.",
    },
    content: {
      id: `<h2>Potensi Briket Batok Kelapa Indonesia di Pasar Internasional</h2>
<p>Permintaan dunia terhadap briket kelapa alami melonjak tajam seiring tren shisha di Timur Tengah dan BBQ ramah lingkungan di Eropa. Kunci sukses <strong>ekspor briket arang kelapa</strong> terletak pada konsistensi abu putih (maksimal 2.5%) dan pembakaran tanpa asap menyengat.</p>
<p>Lihat portofolio pabrik kami di <a href="/catalog/premium-coconut-shell-charcoal-briquettes">Briket Arang Batok Kelapa Premium</a>.</p>`,
      en: `<h2>Indonesian Coconut Shell Charcoal in the World Market</h2>
<p>Indonesian coconut briquettes dominate global demand due to superior density and natural raw materials. Successfully managing <strong>ekspor briket arang kelapa</strong> requires strict maritime MSDS declarations and factory audit certifications.</p>`,
    },
    focusKeyword: "ekspor briket arang kelapa",
    secondaryKeywords: ["shisha charcoal manufacturer indonesia", "harga briket kelapa ekspor", "briket arang abu putih"],
    productId: "prod-2",
    productName: "Briket Arang Batok Kelapa Premium",
    featuredImage: "https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Pabrik Briket Arang Batok Kelapa Ekspor Indonesia Abu Putih",
    metaDescription: {
      id: "Panduan lengkap ekspor briket arang batok kelapa Indonesia. Standar kadar abu <2.5%, kalori >7200 kcal, dan sertifikasi MSDS pengiriman kapal.",
      en: "Essential guide to exporting Indonesian coconut charcoal briquettes. White ash criteria, caloric density, and international container logistics.",
    },
    status: "published",
    publishDate: "2026-09-22",
    views: 1290,
    organicClicks: 195,
    averagePosition: 3.4,
    seoScore: 89,
    faqSchema: [
      {
        question: "Dokumen apa saja yang dibutuhkan untuk ekspor briket kelapa?",
        answer: "Dokumen wajib meliputi SDoC (Self-Declaration of Conformity), MSDS (Material Safety Data Sheet), Vanning Certificate, dan Bill of Lading.",
      },
    ],
    languageMode: "both",
    author: "Wospy Export Advisory",
    updatedAt: "2026-09-30",
  },
];

export const initialKeywords: KeywordItem[] = [
  {
    id: "kw-1",
    keyword: "visa umrah di bandung",
    language: "id",
    searchVolume: 3600,
    difficulty: 28,
    intent: "Commercial",
    cpc: 0.45,
    trend: [2400, 2600, 2900, 3200, 3500, 3600],
    category: "Layanan Perjalanan",
    competitorGap: {
      competitorDomain: "travelbandung-haji.com",
      competitorRank: 6,
      opportunityScore: 92,
    },
  },
  {
    id: "kw-2",
    keyword: "indonesian vanilla beans supplier",
    language: "en",
    searchVolume: 5400,
    difficulty: 35,
    intent: "Transactional",
    cpc: 1.85,
    trend: [3800, 4200, 4700, 5000, 5200, 5400],
    category: "Rempah & Ekspor",
    competitorGap: {
      competitorDomain: "spiceislandexport.com",
      competitorRank: 8,
      opportunityScore: 87,
    },
  },
  {
    id: "kw-3",
    keyword: "ekspor briket arang kelapa",
    language: "id",
    searchVolume: 4200,
    difficulty: 32,
    intent: "Commercial",
    cpc: 0.65,
    trend: [3100, 3300, 3600, 3900, 4100, 4200],
    category: "Biofuel & Arang",
    competitorGap: {
      competitorDomain: "charcoalindonesia.co.id",
      competitorRank: 7,
      opportunityScore: 85,
    },
  },
  {
    id: "kw-4",
    keyword: "aceh gayo arabica coffee wholesale",
    language: "en",
    searchVolume: 4800,
    difficulty: 42,
    intent: "Transactional",
    cpc: 2.10,
    trend: [3500, 3900, 4200, 4400, 4600, 4800],
    category: "Kopi & Minuman",
    competitorGap: {
      competitorDomain: "sumatracoffeebeans.com",
      competitorRank: 9,
      opportunityScore: 81,
    },
  },
  {
    id: "kw-5",
    keyword: "biaya pembuatan visa umrah mandiri 2026",
    language: "id",
    searchVolume: 2900,
    difficulty: 19,
    intent: "Informational",
    cpc: 0.30,
    trend: [1800, 2100, 2400, 2600, 2800, 2900],
    category: "Layanan Perjalanan",
    competitorGap: {
      competitorDomain: "panduanumrahmandiri.org",
      competitorRank: 4,
      opportunityScore: 94,
    },
  },
  {
    id: "kw-6",
    keyword: "coconut shell charcoal briquettes manufacturer",
    language: "en",
    searchVolume: 6200,
    difficulty: 48,
    intent: "Commercial",
    cpc: 2.40,
    trend: [4800, 5200, 5600, 5900, 6000, 6200],
    category: "Biofuel & Arang",
    competitorGap: {
      competitorDomain: "globalbriquette.com",
      competitorRank: 12,
      opportunityScore: 78,
    },
  },
];

export const initialRankings: RankTrackItem[] = [
  {
    id: "rank-1",
    keyword: "visa umrah di bandung",
    targetUrl: "https://wospy.id/blog/visa-umrah-di-bandung",
    currentRank: 1,
    previousRank: 4,
    bestRank: 1,
    searchVolume: 3600,
    language: "id",
    lastUpdated: "Hari ini 07:15",
    history: [
      { date: "24 Sep", rank: 8, clicks: 18 },
      { date: "25 Sep", rank: 6, clicks: 32 },
      { date: "26 Sep", rank: 4, clicks: 54 },
      { date: "27 Sep", rank: 3, clicks: 76 },
      { date: "28 Sep", rank: 2, clicks: 110 },
      { date: "29 Sep", rank: 1, clicks: 142 },
    ],
  },
  {
    id: "rank-2",
    keyword: "indonesian vanilla beans supplier",
    targetUrl: "https://wospy.id/blog/indonesian-vanilla-beans-supplier",
    currentRank: 2,
    previousRank: 5,
    bestRank: 2,
    searchVolume: 5400,
    language: "en",
    lastUpdated: "Hari ini 06:40",
    history: [
      { date: "24 Sep", rank: 11, clicks: 12 },
      { date: "25 Sep", rank: 8, clicks: 28 },
      { date: "26 Sep", rank: 6, clicks: 45 },
      { date: "27 Sep", rank: 4, clicks: 65 },
      { date: "28 Sep", rank: 3, clicks: 88 },
      { date: "29 Sep", rank: 2, clicks: 104 },
    ],
  },
  {
    id: "rank-3",
    keyword: "ekspor briket arang kelapa",
    targetUrl: "https://wospy.id/blog/ekspor-briket-arang-kelapa",
    currentRank: 3,
    previousRank: 2,
    bestRank: 2,
    searchVolume: 4200,
    language: "id",
    lastUpdated: "Kemarin 18:20",
    history: [
      { date: "24 Sep", rank: 5, clicks: 22 },
      { date: "25 Sep", rank: 4, clicks: 38 },
      { date: "26 Sep", rank: 2, clicks: 58 },
      { date: "27 Sep", rank: 2, clicks: 62 },
      { date: "28 Sep", rank: 2, clicks: 70 },
      { date: "29 Sep", rank: 3, clicks: 65 },
    ],
  },
  {
    id: "rank-4",
    keyword: "aceh gayo arabica coffee wholesale",
    targetUrl: "https://wospy.id/catalog/aceh-gayo-arabica-green-coffee-beans",
    currentRank: 4,
    previousRank: 9,
    bestRank: 4,
    searchVolume: 4800,
    language: "en",
    lastUpdated: "Kemarin 12:00",
    history: [
      { date: "24 Sep", rank: 15, clicks: 8 },
      { date: "25 Sep", rank: 12, clicks: 14 },
      { date: "26 Sep", rank: 9, clicks: 24 },
      { date: "27 Sep", rank: 7, clicks: 39 },
      { date: "28 Sep", rank: 5, clicks: 48 },
      { date: "29 Sep", rank: 4, clicks: 58 },
    ],
  },
];

export const initialMedia: MediaItem[] = [
  {
    id: "med-1",
    name: "haramain-visa-umrah-bandung.webp",
    url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    originalSizeKb: 2450,
    webpSizeKb: 185,
    dimensions: "1920 x 1080",
    altTextId: "Layanan resmi pengurusan visa umrah di Bandung oleh Haramain Service",
    altTextEn: "Official Umrah visa consulting service in Bandung by Haramain Service",
    uploadedAt: "2026-09-15",
    associatedProductOrArticle: "visa-umrah-di-bandung",
  },
  {
    id: "med-2",
    name: "indonesian-planifolia-vanilla-beans.webp",
    url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80",
    originalSizeKb: 3120,
    webpSizeKb: 215,
    dimensions: "1600 x 1200",
    altTextId: "Biji vanili planifolia gourmet grade A siap ekspor",
    altTextEn: "Grade A gourmet Indonesian Planifolia vanilla beans ready for export",
    uploadedAt: "2026-09-18",
    associatedProductOrArticle: "indonesian-planifolia-vanilla-beans-grade-a",
  },
  {
    id: "med-3",
    name: "coconut-charcoal-briquettes-export.webp",
    url: "https://images.unsplash.com/photo-1543083477-4f785aeafaa9?auto=format&fit=crop&w=800&q=80",
    originalSizeKb: 1980,
    webpSizeKb: 142,
    dimensions: "1440 x 960",
    altTextId: "Briket arang batok kelapa ekspor abu putih untuk shisha",
    altTextEn: "Low ash coconut shell charcoal briquettes for shisha and BBQ export",
    uploadedAt: "2026-09-22",
    associatedProductOrArticle: "premium-coconut-shell-charcoal-briquettes",
  },
];

export const initialTenant: TenantInfo = {
  id: "tenant-1",
  companyName: "PT Nusantara Agro & Service Global",
  businessType: "Exporter",
  customDomain: "nusantara-export.wospy.id",
  plan: "Growth",
  articlesGeneratedThisMonth: 18,
  articlesLimit: 50,
  keywordsTracked: 14,
  keywordsLimit: 50,
  aiTokensUsed: 142500,
};

// Global Store Hook with LocalStorage Persistence
export function useWospyStore() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [keywords, setKeywords] = useState<KeywordItem[]>(initialKeywords);
  const [rankings, setRankings] = useState<RankTrackItem[]>(initialRankings);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [tenant, setTenant] = useState<TenantInfo>(initialTenant);
  const [language, setLanguage] = useState<Language>("id");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedProds = localStorage.getItem("wospy_products");
      const storedArts = localStorage.getItem("wospy_articles");
      const storedKws = localStorage.getItem("wospy_keywords");
      const storedRanks = localStorage.getItem("wospy_rankings");
      const storedLang = localStorage.getItem("wospy_lang") as Language;

      if (storedProds) setProducts(JSON.parse(storedProds));
      if (storedArts) setArticles(JSON.parse(storedArts));
      if (storedKws) setKeywords(JSON.parse(storedKws));
      if (storedRanks) setRankings(JSON.parse(storedRanks));
      if (storedLang) setLanguage(storedLang);
    } catch (e) {
      console.warn("Using default initial store", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem("wospy_products", JSON.stringify(newProducts));
    } catch (e) {
      console.warn("Local storage write error", e);
    }
  };

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    try {
      localStorage.setItem("wospy_articles", JSON.stringify(newArticles));
    } catch (e) {
      console.warn("Local storage write error", e);
    }
  };

  const saveKeywords = (newKeywords: KeywordItem[]) => {
    setKeywords(newKeywords);
    try {
      localStorage.setItem("wospy_keywords", JSON.stringify(newKeywords));
    } catch (e) {
      console.warn("Local storage write error", e);
    }
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("wospy_lang", lang);
    } catch (e) {}
  };

  const addProduct = (p: Product) => {
    const updated = [p, ...products];
    saveProducts(updated);
  };

  const updateProduct = (p: Product) => {
    const updated = products.map((item) => (item.id === p.id ? p : item));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((item) => item.id !== id);
    saveProducts(updated);
  };

  const addArticle = (art: Article) => {
    const updated = [art, ...articles];
    saveArticles(updated);
  };

  const updateArticle = (art: Article) => {
    const updated = articles.map((item) => (item.id === art.id ? art : item));
    saveArticles(updated);
  };

  const deleteArticle = (id: string) => {
    const updated = articles.filter((item) => item.id !== id);
    saveArticles(updated);
  };

  return {
    isLoaded,
    products,
    articles,
    keywords,
    rankings,
    media,
    tenant,
    language,
    changeLanguage,
    addProduct,
    updateProduct,
    deleteProduct,
    addArticle,
    updateArticle,
    deleteArticle,
    saveKeywords,
  };
}
