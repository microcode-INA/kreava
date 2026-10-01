"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Layers,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Ship,
  Globe,
  FileCheck,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { Product } from "@/lib/types";

export default function PublicCatalogPage() {
  const { language, products } = useStore();
  const t = useI18n(language);

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerCountry, setBuyerCountry] = useState("Germany / Europe");
  const [buyerMessage, setBuyerMessage] = useState("");

  const categories = [
    "all",
    "Rempah & Pertanian / Spices & Agriculture",
    "Energi Ramah Lingkungan / Biofuel",
    "Kopi & Minuman / Coffee & Beverages",
    "Layanan Perjalanan & Visa / Travel Services",
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.en.toLowerCase().includes(search.toLowerCase()) ||
      p.hsCode.includes(search);
    const matchesCat = selectedCat === "all" || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleOpenInquiry = (prod: Product) => {
    setInquiryProduct(prod);
    setBuyerMessage(
      `Hello, I represent an importing company in ${buyerCountry}. We are interested in ordering ${prod.name.en || prod.name.id} (MOQ: ${prod.minOrderQuantity}). Please send your latest FOB pricing and COA lab results.`
    );
    setInquiryModalOpen(true);
  };

  const handleSendWaInquiry = () => {
    if (!inquiryProduct) return;
    const waUrl = `https://wa.me/${inquiryProduct.whatsappNumber}?text=${encodeURIComponent(buyerMessage)}`;
    window.open(waUrl, "_blank");
    setInquiryModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Catalog Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 text-white shadow-xl">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center space-x-2">
              <Badge variant="purple" className="text-xs">
                Exportree.id Model Showcase
              </Badge>
              <span className="text-xs text-blue-300">
                Verified Indonesian Exporters & Commodities
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {language === "en"
                ? "Verified Indonesian Commodities & Services"
                : "Katalog Produk & Layanan Ekspor Indonesia"}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === "en"
                ? "Connect directly with verified Indonesian growers, processors, and official service providers. Transparent HS Code classification, port logistics, and direct WhatsApp RFQ."
                : "Terhubung langsung dengan produsen rempah, arang briket, kopi specialty, dan biro jasa resmi Indonesia. Didukung data HS Code, MOQ, dan inquiry WhatsApp langsung."}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-blue-200 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Official Phytosanitary & Lab Certified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Ship className="h-4 w-4 text-blue-400" />
              <span>Global FOB / CIF Maritime Freight Ready</span>
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder={
                language === "en"
                  ? "Search by commodity name, HS code..."
                  : "Cari produk ekspor, HS code, atau kategori..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 text-xs bg-white dark:bg-slate-900"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center overflow-x-auto w-full sm:w-auto gap-1 text-xs pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 font-medium transition-all ${
                  selectedCat === cat
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {cat === "all" ? (language === "en" ? "All Categories" : "Semua Kategori") : cat.split(" / ")[language === "en" ? 1 : 0] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const name = language === "en" ? p.name.en : p.name.id;
            const desc = language === "en" ? p.description.en : p.description.id;

            return (
              <Card key={p.id} className="overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  {/* Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <img
                      src={p.images[0]}
                      alt={name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="purple" className="text-[10px] font-mono shadow-md backdrop-blur-sm bg-slate-900/80 text-white border-0">
                        HS: {p.hsCode}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {p.category.split(" / ")[language === "en" ? 1 : 0] || p.category}
                    </span>

                    <h2 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600">
                      <Link href={`/catalog/${p.slug}`}>
                        {name}
                      </Link>
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>

                    <div className="rounded-lg bg-slate-50 dark:bg-slate-900 p-3 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Price FOB:</span>
                        <strong className="text-slate-900 dark:text-white">{p.priceRange}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Min. Order (MOQ):</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{p.minOrderQuantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Port of Loading:</span>
                        <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{p.fobPort}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <Link href={`/catalog/${p.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                      <span>Detail & COA</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>

                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleOpenInquiry(p)}
                    className="flex-1 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Inquiry WA</span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* WhatsApp Inquiry Modal */}
      <Dialog open={inquiryModalOpen} onOpenChange={setInquiryModalOpen}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-emerald-600" />
            <span>Kirim Inquiry Langsung ke WhatsApp Produsen</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Hubungi perwakilan eksportir secara instan untuk negosiasi kuantitas, harga FOB, dan pengiriman sampel.
          </DialogDescription>
        </DialogHeader>

        {inquiryProduct && (
          <div className="space-y-4 my-3 text-xs">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={inquiryProduct.images[0]}
                alt={inquiryProduct.name.id}
                className="h-12 w-12 rounded object-cover"
              />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  {language === "en" ? inquiryProduct.name.en : inquiryProduct.name.id}
                </div>
                <div className="text-slate-500 font-mono">
                  HS: {inquiryProduct.hsCode} • MOQ: {inquiryProduct.minOrderQuantity}
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold">
                Negara Asal Buyer:
              </label>
              <Input
                value={buyerCountry}
                onChange={(e) => setBuyerCountry(e.target.value)}
                className="mt-1 h-9 text-xs"
              />
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-semibold">
                Pesan / Kebutuhan Kuotasi (RFQ):
              </label>
              <textarea
                value={buyerMessage}
                onChange={(e) => setBuyerMessage(e.target.value)}
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setInquiryModalOpen(false)} className="text-xs">
            Batal
          </Button>
          <Button
            variant="success"
            onClick={handleSendWaInquiry}
            className="text-xs font-bold"
          >
            <MessageCircle className="h-4 w-4 mr-1.5" />
            <span>Kirim Pesan WhatsApp Sekarang</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Footer />
    </div>
  );
}
