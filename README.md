📋 LAWIYA ECOSYSTEM — Full Stack Final Documentation

---

🏗️ ARSITEKTUR FULL STACK

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LAWIYA ECOSYSTEM                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🌐 LANDING PAGE (lawiya.webusaha.shop)                             │
│  ├── Repo: github.com/webusaha1/lawiya (Private)                   │
│  ├── Stack: SvelteKit 2 + Svelte 5 + TS + Tailwind + daisyUI 4     │
│  ├── Theme: BLOSSOM 🌸 (Rose Pink + Lavender + Gold)               │
│  ├── Font: Cormorant Garamond + Inter                              │
│  ├── Arsitektur: Hybrid SPA + SSR                                  │
│  ├── Deploy: Cloudflare Pages                                      │
│  ├── 14 Sections (Full CMS via Google Sheets)                      │
│  ├── Blog SSR + SEO (JSON-LD)                                      │
│  ├── Supabase Contact Form (RLS)                                   │
│  ├── PWA + Dark/Light Toggle                                       │
│  ├── Sitemap: lawiya-sitemap.xml                                   │
│  └── 7 JSON-LD Schema Types                                        │
│                                                                      │
│  🤖 AI CS WIDGET (ai-lawiya.webusaha.shop)                          │
│  ├── Repo: github.com/webusaha1/ai-lawiya (clone ai-cs-webusaha)   │
│  ├── Stack: SvelteKit 4 + GAS + OpenRouter + Cloudflare Pages      │
│  ├── Warna: Rose-Pink (BLOSSOM synced)                             │
│  ├── Route /widget → iframe embed di landing page                  │
│  ├── AI Model: google/gemini-2.0-flash-lite                        │
│  ├── GAS: Keyword scoring + cache 600s + rate limit 60/min         │
│  ├── Google Sheet: "Konteks" (32 row → perlu isi ulang LAWIYA)     │
│  └── WA Fallback: 0858-1754-3733                                   │
│                                                                      │
│  📊 DATA LAYER                                                       │
│  ├── Google Sheets (13 sheets) → CMS konten landing page           │
│  ├── Google Sheets (1 sheet) → Konteks AI CS                       │
│  ├── Supabase → Kontak form submissions                            │
│  └── GAS API → Backend middleware untuk sheets + AI                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

📦 PROJECT #1 — LAWIYA BUTIK (Landing Page)

Detail Teknis

Item Value
Repo github.com/webusaha1/lawiya (Private)
Domain lawiya.webusaha.shop
Source Clone KEDAIKU v4.2.1
Stack SvelteKit 2 + Svelte 5 (runes) + TypeScript + Tailwind CSS + daisyUI 4
Deploy Cloudflare Pages
Version v1.0 — PRODUCTION READY

Theme — BLOSSOM 🌸

Token Light Dark
Primary #B8315B Deep Rose #F08CAE Soft Rose
Secondary #6D3A9E Deep Lavender #B794DE Soft Lavender
Accent #C8890A Deep Gold #F5C542 Soft Gold
Base-100 #FDF2F8 Soft Pink #1A0A12 Deep Plum
Heading Font Cormorant Garamond —
Body Font Inter —
Border Radius 0.75rem card, 1rem button —

14 Sections (Full CMS)

# Section Nav Data Source Features
1 Hero — GAS Non-blocking fetch, BLOSSOM gradient, stats
2 ProblemSolution #masalah GAS Problem + Solution cards
3 Layanan #layanan GAS 3 tabs + category grouping
4 Produk #produk GAS 2 tabs — Paket Jahit & Custom
5 Unggulan #unggulan GAS 2 tabs
6 Harga #harga GAS 2 tabs + ARIA tablist
7 Portofolio #portfolio GAS Filter + lazy load
8 Testimoni #testimoni GAS Carousel + dots
9 FAQ #faq GAS Accordion + search
10 Blog #blog GAS → SSR Filter → blog page
11 Koleksi #katalog GAS 2 tabs + ARIA
12 Kontak #kontak Supabase Form validation
13 Lokasi #lokasi GAS Maps embed
14 Footer — GAS 6 group CMS

Static Pages (Prerendered)

Route Status Meta
/about ✅ Synced LAWIYA BUTIK
/privacy ✅ Synced Kebijakan Privasi (9 sections)
/terms ✅ Synced Syarat & Ketentuan (11 sections)
/dashboard ⬜ Belum dicek —

Floating Elements

Element Z-Index Position Trigger
🤖 AI CS Widget z-[9998] bottom: 152px / right Always
🟢 WhatsApp z-50 bottom: 88px / right Always
⬆️ Scroll to Top z-50 bottom: 24px / right Scroll >500px

Environment Variables (wrangler.toml)

Variable Purpose
VITE_GAS_API_URL GAS endpoint untuk 13 sheets CMS
VITE_SUPABASE_URL Supabase project URL
VITE_SUPABASE_ANON_KEY Supabase anon key (RLS)

Perbaikan dari Clone KEDAIKU

# Issue Fix
1 @sveltejs/vite-plugin-svelte@4 incompatible vite@6 Update ke @^5.0.0
2 output.addHeader is not a function GAS Ganti ke setContent()
3 Cache keys prefix kedai_ Rename ke lawiya_
4 ZIP backup name KEDAIKU Rename ke LAWIYA_BUTIK
5 HeroSection import sheets tidak diexport Fetch non-blocking + static fallback
6 Sitemap output kedai-sitemap.xml Rename ke lawiya-sitemap.xml
7 HargaSection tertimpa HeroSection Kembalikan ke file benar
8 Navbar labels website Sesuaikan: Layanan, Portofolio, Koleksi
9 UnggulanSection typo 'paket}' Fix ke 'paket'}

Stats

```
╔═══════════════════════════════════╗
║  LAWIYA BUTIK v1.0              ║
╠═══════════════════════════════════╣
║  Sections      : 14             ║
║  GAS Sheets    : 13             ║
║  Schema Types  : 7              ║
║  Hardcode      : 0              ║
║  Sitemap       : ✅             ║
║  Blog SSR SEO  : ✅             ║
║  PWA           : ✅             ║
║  Dark Mode     : ✅             ║
║  AI CS Widget  : ✅             ║
║  Build Stable  : ✅ 0 errors    ║
║  Files Updated : 26             ║
║  Theme Tokens  : 12             ║
╚═══════════════════════════════════╝
```

---

🤖 PROJECT #2 — AI CS LAWIYA (Widget)

Detail Teknis

Item Value
Repo github.com/webusaha1/ai-lawiya
Domain ai-lawiya.webusaha.shop
Widget ai-lawiya.webusaha.shop/widget
Source Clone ai-cs-webusaha v1.3
Stack SvelteKit 4 + GAS + Google Sheets + OpenRouter + Cloudflare Pages
Model AI google/gemini-2.0-flash-lite

File yang Disesuaikan (7 file — teks saja, 0% skrip berubah)

# File Perubahan
1 widget/+page.svelte Avatar K→L, KEDAIKU AI→LAWIYA AI, gradient rose-pink
2 +page.svelte Title, meta, glow rose-pink, logo L, footer lawiya.webusaha.shop
3 ChatInput.svelte Placeholder jasa jahit, focus ring rose, button rose-pink, footer text
4 ChatDemo.svelte Footer link lawiya.webusaha.shop, link color rose-500
5 stores/chat.ts Pesan sambutan LAWIYA BUTIK, konteks jahit
6 ChatBubble.svelte Avatar L, gradient rose-pink-fuchsia, bubble pink-50, dots rose-300
7 app.html Title + meta description LAWIYA

Identitas AI

Element Value
Nama AI LAWIYA AI
Brand LAWIYA BUTIK
Bidang Jasa jahit pakaian wanita & anak
Website lawiya.webusaha.shop
WA Fallback 0858-1754-3733
Avatar "L"
Warna Rose-Pink (#B8315B)

Komponen Chat

Komponen Fungsi
ChatDemo.svelte Container: messages + scroll + fetch GAS + error handling
ChatBubble.svelte User bubble (rose gradient kanan) + AI bubble (pink glass kiri) + typing dots
ChatInput.svelte Textarea auto-resize + Send button + Enter/Shift+Enter

GAS Backend

Feature Value
Deploy URL (perlu GAS baru untuk LAWIYA)
Scoring Keyword exact +10, partial +5
Cache ScriptCache 600 detik
Rate Limit 60 req/menit/IP
Max Results Top 5 by score
Model google/gemini-2.0-flash-lite

Google Sheet "Konteks"

Status Keterangan
Struktur Clone dari WEBUSAHA (32 row)
Isi ⚠️ Perlu diisi ulang dengan konteks LAWIYA BUTIK
Kategori baru Layanan jahit, harga, bahan, estimasi, garansi, fitting, lokasi Depok

CSP Security

```
/*
  Content-Security-Policy: frame-ancestors 'self' https://lawiya.webusaha.shop https://*.webusaha.shop
```

---

🔗 INTEGRASI KEDUA PROJECT

```
┌──────────────────────────────────────────┐
│  lawiya.webusaha.shop (Landing Page)     │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  +page.svelte                      │  │
│  │  ├── 14 Sections                   │  │
│  │  └── Floating Elements:            │  │
│  │      ├── 🤖 AI CS Button           │  │
│  │      │   onclick → toggleAiChat()  │  │
│  │      │   position: fixed           │  │
│  │      │   bottom: 100px, right: 28px│  │
│  │      │                              │  │
│  │      └── 🤖 AI CS Window (iframe)  │  │
│  │          src: ai-lawiya..../widget │  │
│  │          width: 380px, height: 550px│  │
│  │          animation: slideUp 0.3s   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Communication:                          │
│  ├── Parent → iframe: (none)            │
│  └── iframe → Parent: postMessage       │
│       ('close-chat-widget', '*')        │
└──────────────────────────────────────────┘
```

---

📊 PROGRESS STATUS

✅ COMPLETED

Area Detail
Landing Page 14 sections, 13 GAS sheets, BLOSSOM theme
Blog SSR + SEO + JSON-LD
Static Pages about, privacy, terms — semua synced LAWIYA
PWA Service worker + manifest
Dark/Light Theme toggle (lawiyaLight ⇄ lawiyaDark)
Sitemap lawiya-sitemap.xml (auto-generate)
AI CS Widget 7 file disesuaikan — teks + warna LAWIYA
Build Stable — 0 errors
GAS Fix addHeader → setContent
Deps @sveltejs/vite-plugin-svelte@^5.0.0

⚠️ PENDING (HIGH PRIORITY)

# Task
1 Update Google Sheets LAWIYA — isi 13 sheets dengan konten butik (produk, harga, portofolio, FAQ, dll)
2 Setup GAS baru untuk AI CS LAWIYA — clone script, ubah system prompt + WA number, deploy
3 Isi Google Sheet "Konteks" AI — 32+ row konteks jahit (layanan, harga, bahan, estimasi, garansi)
4 Ganti favicon & OG image — logo LAWIYA BUTIK
5 Cek file /dashboard — masih ada reference KEDAIKU?

⚠️ PENDING (MEDIUM)

# Task
6 Deploy AI CS ke ai-lawiya.webusaha.shop
7 Update _headers CSP AI CS → domain lawiya
8 Update wrangler.toml AI CS → name: ai-lawiya
9 Update package.json AI CS → name: ai-lawiya
10 Performance optimization (target 90+)

---

🌐 URL MAP

Resource URL
Landing Page https://lawiya.webusaha.shop
Blog https://lawiya.webusaha.shop/blog
Sitemap https://lawiya.webusaha.shop/lawiya-sitemap.xml
AI CS Standalone https://ai-lawiya.webusaha.shop
AI CS Widget https://ai-lawiya.webusaha.shop/widget
GitHub LAWIYA github.com/webusaha1/lawiya
GitHub AI CS github.com/webusaha1/ai-lawiya
GAS API (Landing) https://script.google.com/macros/s/AKfycbwxHNCIY7LgpxN8l1OKpvVCFjhIBC6yaeFQxjyRFpGj3sYsiafTNvgIK76UIhf3Dnwo/exec
GAS API (AI CS) ⚠️ Belum dibuat
Supabase https://guugjdrstuzbhsybruxj.supabase.co

---

🎯 NEXT ACTION — Rekomendasi

```
🔴 HIGH ─────────────────────────────────
  1. Update 13 GAS Sheets LAWIYA (konten butik)
  2. Clone + deploy GAS AI CS LAWIYA
  3. Isi Google Sheet "Konteks" AI (32+ row)
  4. Ganti favicon + OG image LAWIYA

🟡 MEDIUM ───────────────────────────────
  5. Cek file /dashboard
  6. Deploy AI CS ke ai-lawiya.webusaha.shop
  7. Update CSP + wrangler.toml AI CS
  8. Performance optimization

🟢 LOW ──────────────────────────────────
  9. Lookbook / Instagram feed section
  10. Size guide section
  11. Blog pagination
  12. Integrasi katalog → order via WA
```

---

Document Version: v1.0 — 8 Juli 2026
Status: ✅ LAWIYA ECOSYSTEM — LANDING PAGE READY + AI CS WIDGET READY
Tema: 🌸 BLOSSOM — Elegan Feminin Modern
Siap Deploy? Landing page ✅ | AI CS widget ⚠️ (perlu GAS + Sheet baru)
