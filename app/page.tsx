"use client";

import {
  ArrowDownToLine, Bell, BookOpen, Check, ChevronDown, Image as ImageIcon,
  LayoutTemplate, Menu, MoreHorizontal, Palette, Plus, RefreshCw, Search,
  Sparkles, Type, WandSparkles, X, Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type View = "studio" | "library" | "brand";
type Format = "square" | "portrait" | "story" | "landscape";

const formats: { id: Format; label: string; ratio: string; className: string }[] = [
  { id: "square", label: "Persegi", ratio: "1:1", className: "square" },
  { id: "portrait", label: "Potret", ratio: "4:5", className: "portrait" },
  { id: "story", label: "Story", ratio: "9:16", className: "story" },
  { id: "landscape", label: "Lanskap", ratio: "16:9", className: "landscape" },
];

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
        <button onClick={() => select("studio")}><LayoutTemplate size={18} /> Sales page</button>
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

function Studio() {
  const [format, setFormat] = useState<Format>("square");
  const [mode, setMode] = useState("AI Kreatif");
  const [product, setProduct] = useState("Kala Glow Serum");
  const [audience, setAudience] = useState("Perempuan 20–35 tahun yang ingin kulit cerah dan sehat");
  const [concept, setConcept] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
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
        <button className="generate-button" onClick={generate} disabled={generating}><Sparkles size={18} />{generating ? "Meracik konsep..." : "Buat 4 konsep iklan"}<span>12 kredit</span></button><p className="brand-note"><Palette size={14} /> Otomatis menggunakan Brand Kit <strong>Kala Skin</strong></p>
      </section>
      <section className="result-card">
        <div className="result-head"><div><p className="status"><i /> Konsep #{concept} siap</p><h2>{product || "Materi iklan baru"}</h2></div><button className="icon-button" aria-label="Menu hasil"><MoreHorizontal size={19} /></button></div>
        <div className="format-tabs">{formats.map((f) => <button key={f.id} onClick={() => setFormat(f.id)} className={format === f.id ? "active" : ""}><span>{f.label}</span><small>{f.ratio}</small></button>)}</div>
        <div className={`preview-stage ${generating ? "is-generating" : ""}`}>{generating && <div className="generating-overlay"><Sparkles size={26} /><strong>Menyusun visual terbaik...</strong></div>}<AdPreview format={format} concept={concept} /><span className="preview-size">{format === "square" ? "1080 × 1080 px" : format === "portrait" ? "1080 × 1350 px" : format === "story" ? "1080 × 1920 px" : "1920 × 1080 px"}</span></div>
        <div className="concept-row"><span>Variasi konsep</span><div>{[1,2,3,4].map((n) => <button key={n} onClick={() => setConcept(n)} className={concept === n ? "active" : ""}>{n}</button>)}</div></div>
        <div className="result-actions"><button className="secondary-action" onClick={() => setSaved(!saved)}>{saved ? <Check size={17} /> : <BookOpen size={17} />}{saved ? "Tersimpan" : "Simpan"}</button><button className="download-button"><ArrowDownToLine size={17} /> Unduh PNG <ChevronDown size={15} /></button></div>
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
  const [view, setView] = useState<View>("studio"); const [menuOpen, setMenuOpen] = useState(false);
  const title = view === "studio" ? "Studio AI" : view === "library" ? "Perpustakaan" : "Brand Kit";
  return <div className="app-shell"><Sidebar view={view} setView={setView} open={menuOpen} close={() => setMenuOpen(false)} /><div className="main-shell"><Header title={title} onMenu={() => setMenuOpen(true)} />{view === "studio" ? <Studio /> : view === "library" ? <LibraryView /> : <BrandView />}</div></div>;
}
