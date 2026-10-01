"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Plus,
  Search,
  Upload,
  ExternalLink,
  Edit3,
  Trash2,
  FileSpreadsheet,
  MessageCircle,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useStore } from "@/lib/store-context";
import { useI18n } from "@/lib/i18n";
import { Product } from "@/lib/types";

export default function ProductCatalogPage() {
  const { language, products, addProduct, updateProduct, deleteProduct } = useStore();
  const t = useI18n(language);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [formNameId, setFormNameId] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Pertanian & Rempah / Spices");
  const [formPriceRange, setFormPriceRange] = useState("$150 - $200 / kg");
  const [formMoq, setFormMoq] = useState("50 Kilograms");
  const [formHsCode, setFormHsCode] = useState("0905.10.00");
  const [formFobPort, setFormFobPort] = useState("Tanjung Priok, Jakarta");
  const [formDescId, setFormDescId] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80");
  const [isAiTranslating, setIsAiTranslating] = useState(false);

  const filteredProducts = products.filter((p) => {
    const nameMatch =
      p.name.id.toLowerCase().includes(search.toLowerCase()) ||
      p.name.en.toLowerCase().includes(search.toLowerCase()) ||
      p.hsCode.includes(search);
    return nameMatch;
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormNameId("");
    setFormNameEn("");
    setFormSlug("");
    setFormCategory("Rempah & Pertanian / Spices & Agriculture");
    setFormPriceRange("$180 - $220 / kg");
    setFormMoq("25 kg");
    setFormHsCode("0905.10.00");
    setFormFobPort("Tanjung Priok, Jakarta");
    setFormDescId("");
    setFormDescEn("");
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormNameId(p.name.id);
    setFormNameEn(p.name.en);
    setFormSlug(p.slug);
    setFormCategory(p.category);
    setFormPriceRange(p.priceRange);
    setFormMoq(p.minOrderQuantity);
    setFormHsCode(p.hsCode);
    setFormFobPort(p.fobPort);
    setFormDescId(p.description.id);
    setFormDescEn(p.description.en);
    setFormImageUrl(p.images[0] || "");
    setModalOpen(true);
  };

  // AI translate and write description for export
  const handleAiGenerateEnglish = () => {
    setIsAiTranslating(true);
    setTimeout(() => {
      setFormNameEn(
        formNameId
          ? `Premium Export-Grade ${formNameId}`
          : "Premium Indonesian Export Commodity"
      );
      setFormDescEn(
        `Direct manufacturer and verified exporter from Indonesia. Strictly adheres to international food safety and trade standards. Sourced from sustainable smallholder farms with laboratory COA traceability. Minimum order quantity: ${formMoq}, FOB port: ${formFobPort}. Inquire via WhatsApp for custom specifications and volume discounts.`
      );
      setIsAiTranslating(false);
    }, 1000);
  };

  const handleSaveProduct = () => {
    if (!formNameId.trim()) return;

    const cleanSlug = formSlug.trim() || formNameId.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: { id: formNameId, en: formNameEn || formNameId },
        slug: cleanSlug,
        category: formCategory,
        priceRange: formPriceRange,
        minOrderQuantity: formMoq,
        hsCode: formHsCode,
        fobPort: formFobPort,
        description: { id: formDescId, en: formDescEn || formDescId },
        images: [formImageUrl],
      });
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: { id: formNameId, en: formNameEn || formNameId },
        slug: cleanSlug,
        category: formCategory,
        tags: ["Export Quality", "Indonesia"],
        priceRange: formPriceRange,
        minOrderQuantity: formMoq,
        hsCode: formHsCode,
        fobPort: formFobPort,
        images: [formImageUrl],
        description: { id: formDescId, en: formDescEn || formDescId },
        specifications: [
          { key: "Kualitas Standar", value: "Grade 1 Export" },
          { key: "Packaging", value: "Standard Export Box" },
        ],
        whatsappNumber: "6281234567890",
        whatsappMessageTemplate: `Halo, saya tertarik dengan produk ${formNameId}. Mohon kirimkan spesifikasi dan harga FOB.`,
        seoScore: 92,
        metaTitle: {
          id: `Supplier ${formNameId} Ekspor Indonesia`,
          en: `Indonesian ${formNameEn || formNameId} Export Supplier`,
        },
        metaDescription: {
          id: `Supplier tangan pertama ${formNameId} Indonesia. Kualitas ekspor terpercaya.`,
          en: `Direct source exporter of ${formNameEn || formNameId} from Indonesia. Worldwide delivery.`,
        },
        featured: true,
        inquiryCount: 0,
      };
      addProduct(newProd);
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              {t.navProducts}
            </h1>
            <Badge variant="purple" className="text-xs">
              Exportree.id Style
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Katalog produk ekspor multi-bahasa (ID/EN) dengan HS Code, FOB Port, MOQ, dan tombol inquiry WhatsApp langsung ke buyer internasional.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBatchModalOpen(true)}
            className="text-xs"
          >
            <FileSpreadsheet className="h-4 w-4 mr-1.5 text-emerald-600" />
            <span>{t.btnImportCsv}</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={openAddModal}
            className="text-xs font-semibold"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            <span>{t.btnNewProduct}</span>
          </Button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari nama produk, HS Code, atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-500">
            <span>
              Total Produk: <strong className="text-slate-900 dark:text-white">{products.length}</strong>
            </span>
            <span>•</span>
            <Link href="/catalog" target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Lihat Tampilan Publik Katalog</span>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => {
          const name = language === "en" ? p.name.en : p.name.id;
          const desc = language === "en" ? p.description.en : p.description.id;

          return (
            <Card key={p.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                {/* Product Image */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="purple" className="text-[10px] shadow">
                      HS Code {p.hsCode}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="text-[10px] shadow">
                      {p.inquiryCount} Inquiries
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {p.category}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                    {name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {desc}
                  </p>

                  <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3 text-xs space-y-1 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Harga Est:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{p.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">MOQ:</span>
                      <span className="text-slate-700 dark:text-slate-300">{p.minOrderQuantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">FOB Port:</span>
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{p.fobPort}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-2">
                <Link href={`/catalog/${p.slug}`} target="_blank" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    <span>Lihat</span>
                  </Button>
                </Link>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openEditModal(p)}
                  className="flex-1 text-xs"
                >
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  <span>Edit</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProduct(p.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add / Edit Product Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Edit Produk Ekspor" : "Tambah Produk Ekspor Baru"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Lengkapi data spesifikasi produk katalog standar ekspor internasional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2 max-h-[70vh] overflow-y-auto pr-1">
          {/* AI Helper Banner */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 p-3 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-900 dark:text-blue-200 font-semibold">
                AI Bilingual Assistant:
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleAiGenerateEnglish}
              disabled={isAiTranslating}
              className="h-7 text-xs bg-white dark:bg-slate-900"
            >
              {isAiTranslating ? "Menerjemahkan..." : "Auto-Generate English Copy"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Nama Produk (ID) <span className="text-red-500">*</span>
              </label>
              <Input
                value={formNameId}
                onChange={(e) => setFormNameId(e.target.value)}
                placeholder="Contoh: Biji Vanili Planifolia Gourmet"
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Product Name (EN)
              </label>
              <Input
                value={formNameEn}
                onChange={(e) => setFormNameEn(e.target.value)}
                placeholder="e.g. Gourmet Planifolia Vanilla Beans"
                className="mt-1 h-9 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                HS Code Ekspor
              </label>
              <Input
                value={formHsCode}
                onChange={(e) => setFormHsCode(e.target.value)}
                placeholder="0905.10.00"
                className="mt-1 h-9 text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Min. Order (MOQ)
              </label>
              <Input
                value={formMoq}
                onChange={(e) => setFormMoq(e.target.value)}
                placeholder="25 kg / 1x20ft"
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Port Keberangkatan (FOB)
              </label>
              <Input
                value={formFobPort}
                onChange={(e) => setFormFobPort(e.target.value)}
                placeholder="Tanjung Priok / Tanjung Perak"
                className="mt-1 h-9 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Kategori Produk
              </label>
              <Input
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                placeholder="Rempah & Pertanian"
                className="mt-1 h-9 text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Estimasi Harga FOB
              </label>
              <Input
                value={formPriceRange}
                onChange={(e) => setFormPriceRange(e.target.value)}
                placeholder="$180 - $240 / kg"
                className="mt-1 h-9 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              URL Foto Produk
            </label>
            <Input
              value={formImageUrl}
              onChange={(e) => setFormImageUrl(e.target.value)}
              placeholder="https://..."
              className="mt-1 h-9 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Deskripsi Produk (Bahasa Indonesia)
            </label>
            <Textarea
              value={formDescId}
              onChange={(e) => setFormDescId(e.target.value)}
              rows={3}
              placeholder="Deskripsi keunggulan, spesifikasi teknis, kadar air, proses pengolahan..."
              className="mt-1 text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Product Description (English for Global Buyers)
            </label>
            <Textarea
              value={formDescEn}
              onChange={(e) => setFormDescEn(e.target.value)}
              rows={3}
              placeholder="Export specifications, lab testing certification, harvest origins..."
              className="mt-1 text-xs"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)} className="text-xs">
            Batal
          </Button>
          <Button variant="primary" onClick={handleSaveProduct} className="text-xs">
            Simpan Produk
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Batch Import CSV Modal (PRD Feature) */}
      <Dialog open={batchModalOpen} onOpenChange={setBatchModalOpen}>
        <DialogHeader>
          <DialogTitle>Impor Produk Massal (Batch CSV/Excel)</DialogTitle>
          <DialogDescription className="text-xs">
            Unggah file CSV dengan format nama, HS Code, MOQ, harga, dan port untuk menambahkan puluhan produk sekaligus.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
            <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Tarik file CSV ke sini atau klik untuk browse
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Maksimal 500 produk per batch (Format: .csv, .xlsx)
            </div>
          </div>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-3 text-xs flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Belum punya template CSV?
            </span>
            <button
              onClick={() => alert("Mengunduh template_katalog_ekspor_wospy.csv")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Unduh Template CSV Contoh
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setBatchModalOpen(false)} className="text-xs">
            Tutup
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              alert("12 Produk ekspor berhasil diimpor ke sistem!");
              setBatchModalOpen(false);
            }}
            className="text-xs"
          >
            Mulai Impor File
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
