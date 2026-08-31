"use client";

import {
  ArrowDownToLine, Bell, BookOpen, Check, CheckCircle2, ChevronDown, Code2,
  Copy, Eye, Grid3X3, Image as ImageIcon, LayoutTemplate, Menu, Monitor,
  MoreHorizontal, Palette, Plus, RefreshCw, Search, ShieldCheck,
  SlidersHorizontal, Smartphone, Sparkles, Type, WandSparkles, X, Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { adTemplates, type AdTemplate } from "./template-data";
import { buildSalesPageHtml } from "./sales-page-template";

type View = "studio" | "templates" | "salespage" | "library" | "brand";
type Format = "square" | "portrait" | "story" | "landscape" | "mini";

const formats: { id: Format; label: string; ratio: string; className: string }[] = [
  { id: "square", label: "Persegi", ratio: "1:1", className: "square" },
  { id: "portrait", label: "Potret", ratio: "4:5", className: "portrait" },
  { id: "story", label: "Story", ratio: "9:16", className: "story" },
  { id: "landscape", label: "Lanskap", ratio: "16:9", className: "landscape" },
  { id: "mini", label: "Mini banner", ratio: "16:5", className: "mini" },
];

const formatSizes: Record<Format, string> = {
  square: "1080 × 1080 px", portrait: "1080 × 1350 px", story: "1080 × 1920 px",
  landscape: "1920 × 1080 px", mini: "320 × 100 px",
};

const projects = [
  { title: "Flash Sale Skincare", type: "Gambar iklan", date: "Hari ini", tone: "coral" },
  { title: "Launch Kopi Karsa", type: "Halaman penjualan", date: "Kemarin", tone: "lime" },
  { title: "Promo Kelas Bahasa", type: "Teks iklan", date: "28 Agu", tone: "blue" },
  { title: "Bundling Weekend", type: "Gambar iklan", date: "26 Agu", tone: "violet" },
];

function Logo() {
  return <div className="logo-mark" aria-label="Kreava"><span><Sparkles size={17} strokeWidth={2.6} /></span><strong>Kreava</strong></div>;
}

function Sidebar({ view, setView, open, close }: { view: View; setView: (v: View) => void; open: boolean; close: () => void }) {
  const select = (next: View) => { setView(next); close(); };
  return <>
    {open && <button className="mobile-backdrop" onClick={close} aria-label="Tutup navigasi" />}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="side-top"><Logo /><button className="icon-button mobile-close" onClick={close} aria-label="Tutup"><X size={18} /></button></div>
      <button className="new-project" onClick={() => select("studio")}><Plus size={17} /> Proyek baru</button>
      <nav className="side-nav" aria-label="Navigasi utama">
        <p className="nav-label">Ruang kerja</p>
        <button className={view === "studio" ? "active" : ""} onClick={() => select("studio")}><WandSparkles size={18} /> Studio AI</button>
        <button className={view === "library" ? "active" : ""} onClick={() => select("library")}><BookOpen size={18} /> Perpustakaan <span className="count">12</span></button>
        <button className={view === "brand" ? "active" : ""} onClick={() => select("brand")}><Palette size={18} /> Brand Kit</button>
        <p className="nav-label nav-section">Generator</p>
        <button onClick={() => select("studio")}><ImageIcon size={18} /> Gambar iklan</button>
        <button className={view === "templates" ? "active" : ""} onClick={() => select("templates")}><Grid3X3 size={18} /> Template iklan <span className="count">797</span></button>
        <button className={view === "salespage" ? "active" : ""} onClick={() => select("salespage")}><LayoutTemplate size={18} /> Sales page</button>
        <button onClick={() => select("studio")}><Type size={18} /> Teks iklan</button>
      </nav>
      <div className="plan-card"><div><span className="plan-icon"><Zap size={15} /></span><div><strong>Paket Starter</strong><small>18 dari 30 kredit</small></div></div><div className="meter"><span /></div><button>Upgrade paket</button></div>
      <div className="profile"><div className="avatar">AR</div><div><strong>Andi Rahman</strong><small>andi@kreava.id</small></div><MoreHorizontal size={18} /></div>
    </aside>
  </>;
}

function Header({ title, onMenu }: { title: string; onMenu: () => void }) {
  return <header className="topbar"><button className="icon-button mobile-menu" onClick={onMenu} aria-label="Buka navigasi"><Menu size={20} /></button><div><p>Workspace /</p><strong>{title}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Cari"><Search size={18} /></button><button className="icon-button notice" aria-label="Notifikasi"><Bell size={18} /><i /></button></div></header>;
}

function AdPreview({ format, concept }: { format: Format; concept: number }) {
  const selected = formats.find((f) => f.id === format)!;
  return <div className={`ad-preview ${selected.className}`}>
    <div className="ad-orb orb-one" /><div className="ad-orb orb-two" />
    <div className="ad-brand"><span>K</span> KALA SKIN</div><span className="ad-pill">FLASH SALE • 48 JAM</span>
    <div className="ad-copy"><small>Ritual baru untuk kulitmu</small><h2>{concept % 2 ? "Glow alami, tanpa kompromi." : "Kulit sehat dimulai hari ini."}</h2><p>Serum ringan dengan Niacinamide untuk kulit cerah, halus, dan lebih percaya diri.</p><div className="price"><s>Rp189.000</s><strong>Rp129.000</strong></div><button>Beli sekarang <span>→</span></button></div>
    <div className="product-shape"><span>KALA</span><b>GLOW<br />SERUM</b><i>30ml</i></div><div className="rating"><strong>4.9 ★</strong><span>2.4k+ pelanggan</span></div>
  </div>;
}

function Studio({ template }: { template?: AdTemplate | null }) {
  const [format, setFormat] = useState<Format>("square");
  const [mode, setMode] = useState(template ? "Template" : "AI Kreatif");
  const [product, setProduct] = useState("Kala Glow Serum");
  const [audience, setAudience] = useState("Perempuan 20–35 tahun yang ingin kulit cerah dan sehat");
  const [concept, setConcept] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState<"ai" | "manual">("ai");
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState(50);
  const generate = () => { setGenerating(true); setSaved(false); window.setTimeout(() => { setConcept((v) => v % 4 + 1); setGenerating(false); }, 900); };
  return <main className="studio-page">
    <section className="page-heading"><div><p className="eyebrow"><Sparkles size={14} /> Studio AI</p><h1>Buat iklan yang <em>siap menjual.</em></h1><p>Isi brief singkat, lalu dapatkan materi iklan yang konsisten dengan brand-mu.</p></div><button className="history-button"><RefreshCw size={15} /> Riwayat generasi</button></section>
    <div className="studio-layout">
      <section className="brief-card">
        <div className="card-title"><span>01</span><div><h2>Brief produk</h2><p>Ceritakan produk yang ingin kamu promosikan.</p></div></div>
        <label>Nama produk<input value={product} onChange={(e) => setProduct(e.target.value)} /></label>
        <label>Target audiens<textarea value={audience} onChange={(e) => setAudience(e.target.value)} rows={3} /></label>
        <div className="field"><span className="field-label">Tujuan kampanye</span><button className="select-like">Tingkatkan penjualan <ChevronDown size={16} /></button></div>
        <div className="field"><span className="field-label">Gaya komunikasi</span><div className="chips">{["Persuasif", "Hangat", "Berani", "Elegan"].map((x, i) => <button key={x} className={i === 0 ? "selected" : ""}>{x}</button>)}</div></div>
        <div className="divider" /><div className="card-title compact"><span>02</span><div><h2>Mode kreatif</h2></div></div>
        <div className="mode-grid">{[{name:"AI Kreatif", desc:"Konsep unik dari nol", icon:WandSparkles},{name:"Template",desc:"Pilih layout terbukti",icon:LayoutTemplate}].map((item) => <button key={item.name} onClick={() => setMode(item.name)} className={mode === item.name ? "mode active" : "mode"}><item.icon size={19} /><span><strong>{item.name}</strong><small>{item.desc}</small></span>{mode === item.name && <i><Check size={11} /></i>}</button>)}</div>
        {mode === "Template" && template && <div className="chosen-template"><img src={template.image} alt="" /><div><span>Template dipilih</span><strong>{template.title}</strong><small>{template.category} • {template.id}</small></div></div>}
        <button className="generate-button" onClick={generate} disabled={generating}><Sparkles size={18} />{generating ? "Meracik konsep..." : mode === "Template" ? "Terapkan Brand Kit" : "Buat 4 konsep iklan"}<span>{mode === "Template" ? "6" : "12"} kredit</span></button><p className="brand-note"><Palette size={14} /> Otomatis menggunakan Brand Kit <strong>Kala Skin</strong></p>
      </section>
      <section className="result-card">
        <div className="result-head"><div><p className="status"><i /> {mode === "Template" && template ? `${template.id} dipilih` : `Konsep #${concept} siap`}</p><h2>{mode === "Template" && template ? template.title : product || "Materi iklan baru"}</h2></div><button className="icon-button" aria-label="Menu hasil"><MoreHorizontal size={19} /></button></div>
        <div className="format-tabs">{formats.map((f) => <button key={f.id} onClick={() => setFormat(f.id)} className={format === f.id ? "active" : ""}><span>{f.label}</span><small>{f.ratio}</small></button>)}</div>
        {mode === "Template" && template && <div className="adapt-toolbar"><div className="adapt-modes"><button className={editMode === "ai" ? "active" : ""} onClick={() => setEditMode("ai")}><WandSparkles size={14} /> AI Adaptasi</button><button className={editMode === "manual" ? "active" : ""} onClick={() => setEditMode("manual")}><SlidersHorizontal size={14} /> Edit Manual</button></div>{editMode === "manual" && <div className="manual-controls"><label>Zoom <input type="range" min="100" max="180" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><span>{zoom}%</span></label><label>Posisi <input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} /></label></div>}</div>}
        <div className={`preview-stage ${generating ? "is-generating" : ""}`}>{generating && <div className="generating-overlay"><Sparkles size={26} /><strong>Menyusun visual terbaik...</strong></div>}{mode === "Template" && template ? <div className={`template-result-frame ${format} ${editMode}`}><img className="template-backdrop" src={template.image} alt="" /><img className="template-main" src={template.image} alt={template.title} style={editMode === "manual" ? { transform: `scale(${zoom / 100})`, objectPosition: `${position}% 50%` } : undefined} />{format === "mini" && editMode === "ai" && <div className="mini-ai-copy"><span>PROMO SPESIAL</span><strong>Penawaran terbaik<br />untukmu hari ini.</strong><b>Lihat sekarang →</b></div>}</div> : <AdPreview format={format} concept={concept} />}<span className="preview-size">{formatSizes[format]} • {editMode === "ai" ? "Komposisi otomatis" : "Penyesuaian manual"}</span></div>
        <div className="concept-row"><span>Variasi konsep</span><div>{[1,2,3,4].map((n) => <button key={n} onClick={() => setConcept(n)} className={concept === n ? "active" : ""}>{n}</button>)}</div></div>
        <div className="result-actions"><button className="secondary-action" onClick={() => setSaved(!saved)}>{saved ? <Check size={17} /> : <BookOpen size={17} />}{saved ? "Tersimpan" : "Simpan"}</button><button className="download-button"><ArrowDownToLine size={17} /> Unduh PNG <ChevronDown size={15} /></button></div>
      </section>
    </div>
  </main>;
}

const templateCategories = ["Semua", "Sorotan Produk", "Promo & Diskon", "Urgensi", "Testimoni", "Edukasi", "Masalah & Solusi", "Peluncuran"];

function TemplateCatalog({ onUse }: { onUse: (template: AdTemplate) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [batch, setBatch] = useState("Semua koleksi");
  const [visibleCount, setVisibleCount] = useState(32);
  const [selected, setSelected] = useState<AdTemplate | null>(null);
  const counts = useMemo(() => Object.fromEntries(templateCategories.map((name) => [name, name === "Semua" ? adTemplates.length : adTemplates.filter((item) => item.category === name).length])), []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return adTemplates.filter((item) => (category === "Semua" || item.category === category) && (batch === "Semua koleksi" || item.batch === batch) && (!needle || `${item.title} ${item.keywords} ${item.id}`.toLowerCase().includes(needle)));
  }, [query, category, batch]);
  const chooseCategory = (next: string) => { setCategory(next); setVisibleCount(32); };
  return <main className="content-page templates-page">
    <section className="page-heading"><div><p className="eyebrow"><Grid3X3 size={14} /> Template iklan</p><h1>Inspirasi yang sudah <em>siap dipakai.</em></h1><p>797 template iklan unik, diklasifikasikan otomatis dan siap disesuaikan dengan Brand Kit.</p></div><span className="asset-badge"><Check size={14} /> 797 aset terindeks</span></section>
    <section className="catalog-toolbar">
      <label className="catalog-search"><Search size={17} /><input placeholder="Cari headline, promo, atau ID template..." value={query} onChange={(e) => { setQuery(e.target.value); setVisibleCount(32); }} /></label>
      <label className="batch-filter"><SlidersHorizontal size={15} /><select value={batch} onChange={(e) => { setBatch(e.target.value); setVisibleCount(32); }}><option>Semua koleksi</option>{["Koleksi 1","Koleksi 2","Koleksi 3","Koleksi 4","Koleksi 5","Koleksi 6","Koleksi Update"].map((item) => <option key={item}>{item}</option>)}</select></label>
    </section>
    <div className="category-strip">{templateCategories.map((item) => <button key={item} onClick={() => chooseCategory(item)} className={category === item ? "active" : ""}>{item}<span>{counts[item]}</span></button>)}</div>
    <div className="catalog-summary"><p>Menampilkan <strong>{Math.min(visibleCount, filtered.length)}</strong> dari <strong>{filtered.length}</strong> template</p><span>Semua aset • 1080 × 1080 px</span></div>
    {filtered.length ? <div className="template-grid">{filtered.slice(0, visibleCount).map((item) => <article className="template-card" key={item.id}><button className="template-image-button" onClick={() => setSelected(item)} aria-label={`Lihat ${item.title}`}><img src={item.image} alt={item.title} loading="lazy" /><span><Eye size={15} /> Lihat detail</span></button><div className="template-meta"><div><span>{item.category}</span><h3>{item.title}</h3><p>{item.id} • {item.batch}</p></div><button onClick={() => onUse(item)} aria-label={`Gunakan ${item.title}`}><WandSparkles size={16} /></button></div></article>)}</div> : <div className="catalog-empty"><Search size={25} /><h3>Template tidak ditemukan</h3><p>Coba kata kunci atau kategori lain.</p></div>}
    {visibleCount < filtered.length && <button className="load-more" onClick={() => setVisibleCount((count) => count + 32)}>Tampilkan 32 template berikutnya <ChevronDown size={16} /></button>}
    {selected && <div className="template-modal" role="dialog" aria-modal="true" aria-label="Detail template"><button className="modal-backdrop" onClick={() => setSelected(null)} aria-label="Tutup detail" /><div className="modal-card"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Tutup"><X size={19} /></button><div className="modal-image"><img src={selected.image} alt={selected.title} /></div><div className="modal-info"><span className="modal-category">{selected.category}</span><h2>{selected.title}</h2><p>{selected.id} • {selected.batch} • 1080 × 1080 px</p><div className="modal-tags"><span>1:1</span><span>Brand Kit ready</span><span>Teks terdeteksi</span></div><button onClick={() => onUse(selected)}><WandSparkles size={17} /> Gunakan template ini</button></div></div></div>}
  </main>;
}

function SalesPageBuilder() {
  const defaults = {
    product: "797 Template Iklan High-Conversion",
    audience: "Pemilik bisnis, seller online, dan marketer Indonesia",
    price: "Rp149.000",
    originalPrice: "Rp1.497.000",
    cta: "AMBIL SEMUA TEMPLATE SEKARANG",
  };
  const [form, setForm] = useState(defaults);
  const [html, setHtml] = useState(() => buildSalesPageHtml(defaults));
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [resultMode, setResultMode] = useState<"preview" | "html">("preview");
  const [copied, setCopied] = useState(false);
  const update = (key: keyof typeof defaults, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const generate = () => { setHtml(buildSalesPageHtml(form)); setResultMode("preview"); setCopied(false); };
  const copyHtml = async () => { await navigator.clipboard.writeText(html); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };

  return <main className="content-page sales-builder-page">
    <section className="page-heading"><div><p className="eyebrow"><LayoutTemplate size={14} /> Sales Page Generator</p><h1>Susun halaman yang <em>menggerakkan emosi.</em></h1><p>Struktur konversi tinggi, responsif, dan siap disalin sebagai satu file HTML.</p></div><span className="asset-badge"><Code2 size={14} /> Output HTML siap pakai</span></section>
    <div className="sales-builder-layout">
      <section className="sales-controls">
        <div className="card-title"><span>01</span><div><h2>Penawaran utama</h2><p>Informasi ini langsung diterapkan ke halaman.</p></div></div>
        <label>Nama produk<input value={form.product} onChange={(event) => update("product", event.target.value)} /></label>
        <label>Target pembeli<textarea rows={3} value={form.audience} onChange={(event) => update("audience", event.target.value)} /></label>
        <div className="sales-price-grid"><label>Harga coret<input value={form.originalPrice} onChange={(event) => update("originalPrice", event.target.value)} /></label><label>Harga promo<input value={form.price} onChange={(event) => update("price", event.target.value)} /></label></div>
        <label>Teks tombol beli<input value={form.cta} onChange={(event) => update("cta", event.target.value)} /></label>
        <div className="conversion-rules"><p>Formula konversi aktif</p>{[
          "Pain → agitasi → solusi", "Scarcity dan penawaran terbatas", "Sticky tombol beli", "Tipografi besar dan jelas", "Responsif desktop dan mobile", "Visual dari aset template"
        ].map((rule) => <span key={rule}><CheckCircle2 size={14} /> {rule}</span>)}</div>
        <button className="generate-button" onClick={generate}><Sparkles size={18} /> Buat ulang sales page <span>8 kredit</span></button>
        <p className="brand-note"><ShieldCheck size={14} /> Semua tombol transaksi masih mengarah ke <strong>#</strong></p>
      </section>
      <section className="sales-result">
        <div className="sales-result-bar"><div className="result-tabs"><button className={resultMode === "preview" ? "active" : ""} onClick={() => setResultMode("preview")}><Eye size={15} /> Preview</button><button className={resultMode === "html" ? "active" : ""} onClick={() => setResultMode("html")}><Code2 size={15} /> HTML</button></div><div className="result-tools"><div className="device-toggle"><button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")} aria-label="Preview desktop"><Monitor size={16} /></button><button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")} aria-label="Preview mobile"><Smartphone size={16} /></button></div><button className={`copy-html ${copied ? "copied" : ""}`} onClick={copyHtml}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Tersalin" : "Salin HTML"}</button></div></div>
        <div className={`sales-preview-shell ${device}`}>
          {resultMode === "preview" ? <iframe title="Preview sales page" srcDoc={html} sandbox="allow-scripts" /> : <pre className="html-output"><code>{html}</code></pre>}
        </div>
        <div className="sales-result-foot"><span><CheckCircle2 size={13} /> HTML + CSS dalam satu file</span><span>Responsif • Tidak perlu library</span></div>
      </section>
    </div>
  </main>;
}

function LibraryView() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => projects.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())), [query]);
  return <main className="content-page"><section className="page-heading"><div><p className="eyebrow"><BookOpen size={14} /> Perpustakaan</p><h1>Semua kreasi, <em>rapi di satu tempat.</em></h1><p>Buka kembali, edit, dan unduh hasil kampanye kapan saja.</p></div><button className="new-project small"><Plus size={16} /> Proyek baru</button></section><div className="library-tools"><label><Search size={17} /><input placeholder="Cari proyek..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><div className="chips"><button className="selected">Semua</button><button>Gambar</button><button>Sales page</button><button>Teks</button></div></div><div className="project-grid">{visible.map((p, i) => <article className="project-card" key={p.title}><div className={`project-art ${p.tone}`}><span>K</span><strong>{i % 2 ? "IDE BESAR.\nHASIL NYATA." : "SALE\nIS ON."}</strong></div><div className="project-info"><span>{p.type}</span><h3>{p.title}</h3><p>Diedit {p.date}</p></div><button className="icon-button" aria-label="Menu proyek"><MoreHorizontal size={18} /></button></article>)}</div></main>;
}

function BrandView() {
  const [primary, setPrimary] = useState("#F25B45");
  return <main className="content-page"><section className="page-heading"><div><p className="eyebrow"><Palette size={14} /> Brand Kit</p><h1>Satu identitas untuk <em>setiap kreasi.</em></h1><p>Simpan elemen merek sekali. Kreava akan menerapkannya secara otomatis.</p></div><span className="saved-badge"><Check size={14} /> Tersimpan otomatis</span></section><div className="brand-layout"><section className="settings-card"><div className="card-title"><span>01</span><div><h2>Identitas visual</h2><p>Atur elemen utama brand-mu.</p></div></div><label>Nama brand<input defaultValue="Kala Skin" /></label><div className="field"><span className="field-label">Logo brand</span><button className="logo-upload"><span>K</span><div><strong>kala-logo.svg</strong><small>SVG • 18 KB</small></div><span>Ganti</span></button></div><div className="color-fields"><label>Warna utama<div><input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} /><input value={primary.toUpperCase()} onChange={(e) => setPrimary(e.target.value)} /></div></label><label>Warna aksen<div><input type="color" defaultValue="#C7F15A" /><input defaultValue="#C7F15A" /></div></label></div><div className="field"><span className="field-label">Tipografi</span><button className="select-like"><span><b className="font-sample">Aa</b> Plus Jakarta Sans</span><ChevronDown size={16} /></button></div></section><section className="brand-preview"><div className="preview-label">Pratinjau Brand Kit</div><div className="brand-sheet" style={{"--brand-primary": primary} as React.CSSProperties}><div className="brand-sheet-top"><div className="sheet-logo">K</div><span>KALA SKIN</span></div><p>Brand colors</p><div className="swatches"><i style={{background: primary}} /><i /><i /></div><small>Natural skincare for your everyday glow.</small><h2>Feel good in<br />your own skin.</h2><button>Explore collection →</button></div></section></div></main>;
}

export default function Home() {
  const [view, setView] = useState<View>("studio"); const [menuOpen, setMenuOpen] = useState(false); const [selectedTemplate, setSelectedTemplate] = useState<AdTemplate | null>(null);
  const title = view === "studio" ? "Studio AI" : view === "templates" ? "Template Iklan" : view === "salespage" ? "Sales Page" : view === "library" ? "Perpustakaan" : "Brand Kit";
  const useTemplate = (template: AdTemplate) => { setSelectedTemplate(template); setView("studio"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="app-shell"><Sidebar view={view} setView={setView} open={menuOpen} close={() => setMenuOpen(false)} /><div className="main-shell"><Header title={title} onMenu={() => setMenuOpen(true)} />{view === "studio" ? <Studio key={selectedTemplate?.id ?? "ai"} template={selectedTemplate} /> : view === "templates" ? <TemplateCatalog onUse={useTemplate} /> : view === "salespage" ? <SalesPageBuilder /> : view === "library" ? <LibraryView /> : <BrandView />}</div></div>;
}
