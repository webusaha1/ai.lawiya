Baik, Masamba. Berikut Full Documentation khusus untuk project AI CS WEBUSAHA (ai.webusaha.shop) yang sudah terintegrasi sebagai widget di webusaha.shop.

---

```markdown
# AI CS WEBUSAHA — Full Documentation (Final)

---

## IDENTITAS PROJECT

AI CS WEBUSAHA v1.3
Status        : PRODUCTION READY ✅ + INTEGRATED
Architecture  : Serverless RAG Customer Service AI (Decoupled Micro App)
Maturity      : Stable Production
Readiness     : 8.8/10
Stack         : SvelteKit 4 + GAS + Google Sheets + OpenRouter + Cloudflare Pages
Domain        : ai.webusaha.shop
Widget Route  : ai.webusaha.shop/widget
Repo          : github.com/webusaha1/ai-cs-webusaha (public)
Purpose       : Customer service AI untuk WEB USAHA (webusaha.shop) — menjelaskan layanan, harga, cara order, teknis, dan lainnya. Terintegrasi sebagai floating widget di landing page webusaha.shop.
Relation      : Sepenuhnya terpisah dari project utama (webusaha.shop). Tidak ada integrasi kode, shared DB, atau shared state. Terhubung via iframe sebagai widget di landing page.

Integration Status:
  ✅ AI CS Widget muncul di webusaha.shop (iframe embed)
  ✅ Tombol AI CS biru di atas tombol WhatsApp hijau
  ✅ Route /widget untuk iframe compact mode
  ✅ CSP headers mengizinkan frame-ancestors dari webusaha.shop
  ✅ GAS Backend dengan keyword scoring + OpenRouter AI
  ✅ Google Sheet "Konteks" dengan 32 row data

Recommended Next Phase :
  → Conversation Memory (kirim 5 pesan terakhir ke AI)
  → Analytics Tracking (Google Analytics di widget)
  → WhatsApp Escalation (auto-redirect ke nomor WA asli)
  → Hybrid Semantic Search (embedding + keyword)
  → Dark Mode Toggle
  → Favicon & PWA Manifest
  → Tambah materi Sheet (target 50+ row)

---

## ARSITEKTUR SISTEM

User Browser (webusaha.shop)
    │
    │  Klik tombol AI CS biru
    │  iframe → ai.webusaha.shop/widget
    ▼
ai.webusaha.shop/widget (Cloudflare Pages — SvelteKit CSR)
    │
    │  widget/+page.svelte → ChatDemo.svelte (compact mode)
    │       │
    │       │  fetch GET ?q=pertanyaan
    │       ▼
    └─── GAS Web App (script.google.com/macros/...)
             │
             ├── Auto-detect sheet "Konteks"
             ├── Auto-detect header dari row 1 (bukan fixed index)
             ├── Filter: status "nonaktif" di-skip
             ├── Skip empty row
             ├── Keyword scoring: exact match +10, partial +5
             ├── Multi-row merge: top 5 by score
             ├── Cache: ScriptCache 10 menit
             ├── Rate limiter: 60 req/menit/IP
             │
             ├── Panggil OpenRouter API
             │       └── System Prompt + Konteks Sheet + User Query
             │       └── Model: google/gemini-2.0-flash-lite
             │
             └── Return JSON { success, jawaban, konteks, sumber, score, timestamp }
                  │
                  ▼
            ChatBubble.svelte → tampilkan jawaban AI di bubble


AI CS juga bisa diakses standalone:
  ai.webusaha.shop → halaman penuh dengan header + ChatDemo + footer + ambient glow

---

## STRUKTUR PROJECT

ai-cs-webusaha/
├── src/
│   ├── app.html                          # Global HTML
│   ├── app.css                           # Tailwind + custom scrollbar
│   ├── app.d.ts
│   ├── lib/
│   │   ├── components/
│   │   │   └── chat/
│   │   │       ├── ChatDemo.svelte       # Container: header + messages + input
│   │   │       │                          # Props: gasUrl (string), compact (boolean)
│   │   │       │                          # State: activeMessages, isLoading
│   │   │       │                          # Methods: handleSend(message)
│   │   │       ├── ChatBubble.svelte     # Bubble user/AI + typing indicator (3 dots bounce)
│   │   │       │                          # Props: message (ChatMessage), isLoading (boolean)
│   │   │       └── ChatInput.svelte      # Textarea + Send button (Lucide) + auto-resize
│   │   │                                  # Props: onSend (function), disabled (boolean)
│   │   │                                  # Enter to send, Shift+Enter new line
│   │   ├── stores/
│   │   │   └── chat.ts                   # activeMessages: Writable<ChatMessage[]>
│   │   │                                  # isLoading: Writable<boolean>
│   │   │                                  # Initial: pesan sambutan WEBUSAHA
│   │   └── types/
│   │       └── chat.ts                   # ChatMessage { role: 'user'|'assistant', content: string }
│   └── routes/
│       ├── +layout.svelte                # Import app.css only
│       ├── +page.svelte                  # Full page standalone:
│       │                                  #   Logo + ChatDemo + footer + ambient glow bg
│       ├── widget/
│       │   ├── +page.js                  # SSR: false, prerender: false
│       │   └── +page.svelte              # Compact widget for iframe:
│       │                                  #   Minimal header + ChatDemo compact + close button
│       │                                  #   Close → postMessage('close-chat-widget', '*')
│       └── blog/[slug]/ (jika ada)
├── static/
│   ├── _headers                          # CSP untuk iframe embedding
│   └── favicon.png (belum ada)
├── GAS.gs                                # Backup file GAS (versi 1.3)
├── konteks-webusaha.csv                  # Backup data Sheet (32 row)
├── package.json
├── svelte.config.js                      # adapter-cloudflare
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── README.md

---

## ROUTING

Route                   Mode    Deskripsi
─────────────────────────────────────────────────────────
/ (home)                SSR     Halaman standalone AI CS (header + ChatDemo + footer)
/widget                 CSR     Widget compact untuk iframe di webusaha.shop
/widget (close btn)     -       Kirim postMessage('close-chat-widget', '*') ke parent

---

## KOMPONEN UTAMA

1. ChatDemo.svelte — Container Utama
─────────────────────────────────────────────
Props:
  - gasUrl: string          → URL GAS Web App
  - compact: boolean        → Mode ringkas tanpa header/footer (default: false)

State internal:
  - chatContainer: HTMLDivElement  → ref untuk auto-scroll
  - errorMessage: string           → pesan error jika fetch gagal

Method:
  - handleSend(message: string) → tambah pesan user → fetch GAS → tambah response AI

Flow:
  1. User ketik pesan → ChatInput.onSend
  2. handleSend() dipanggil
  3. Pesan user ditambahkan ke activeMessages
  4. isLoading = true
  5. fetch GET `${gasUrl}?q=${encodeURIComponent(message)}`
  6. Parse JSON response
  7. Jika data.success → tambah pesan assistant
  8. Jika data.error → tampilkan data.jawaban (fallback)
  9. Jika fetch gagal → tampilkan pesan error + arahkan WA
  10. isLoading = false
  11. Auto-scroll chat container ke bawah

Style (compact mode):
  - Chat area height: calc(100vh - 140px)
  - Tanpa header "WEBUSAHA"
  - Tanpa footer "Butuh bantuan lebih lanjut?"
  - Custom scrollbar 4px

2. ChatBubble.svelte — Tampilan Pesan
─────────────────────────────────────────────
Props:
  - message: ChatMessage
  - isLoading: boolean

Mode:
  - User bubble (role: 'user'):
      Posisi: kanan
      Style: bg-gradient-to-br from-blue-500 to-indigo-600
      Text: white
      Border-radius: rounded-tr-sm
      Avatar: "U" di kiri bubble

  - AI bubble (role: 'assistant'):
      Posisi: kiri
      Style: bg-white/60 backdrop-blur-md border-white/60
      Text: gray-800
      Border-radius: rounded-tl-sm
      Avatar: "W" dengan gradient purple-pink

  - Typing indicator (isLoading: true):
      3 dots animasi bounce
      Durasi: infinite, staggered delay

3. ChatInput.svelte — Input Pesan
─────────────────────────────────────────────
Props:
  - onSend: (message: string) => void
  - disabled: boolean

Features:
  - Textarea auto-resize (tinggi menyesuaikan konten)
  - Tombol Send dengan Lucide icon (SendHorizontal)
  - Enter to send, Shift+Enter for new line
  - Disabled state: tombol abu-abu + spinner
  - Placeholder: "Ketik pertanyaan Anda..."
  - Style: bg-white/40 backdrop-blur-sm border-white/40

---

## STATE MANAGEMENT

Store: src/lib/stores/chat.ts
─────────────────────────────────────────────
activeMessages: Writable<ChatMessage[]>
  - Initial: [
      {
        role: 'assistant',
        content: 'Halo! 👋 Saya WEBUSAHA, asisten AI dari WEB USAHA...'
      }
    ]

isLoading: Writable<boolean>
  - Initial: false

Tidak ada store lain. Tidak ada page state lain.

---

## AI PIPELINE FLOW

1. User ketik pertanyaan di ChatInput
2. handleSend() dipanggil
3. Pesan user ditambahkan ke activeMessages
4. isLoading = true
5. fetch GET `${gasUrl}?q=${encodeURIComponent(message)}`
6. GAS: keyword scoring → cari top 5 match → gabung konteks
7. GAS: build system prompt + konteks → fetch OpenRouter
8. GAS: return JSON { success, jawaban, ... }
9. Frontend: tambah pesan assistant ke activeMessages
10. isLoading = false
11. Auto-scroll chat container ke bawah

Error handling:
- Gagal fetch → tampilkan pesan error di bubble AI
- GAS return error → tampilkan data.jawaban (fallback dari GAS)
- Semua error arahkan ke WhatsApp fallback: 0822-5864-5254

---

## GAS BACKEND (GAS.gs)

Versi: 1.3 (Widget Support)
─────────────────────────────────────────────
Deploy URL: https://script.google.com/macros/s/AKfycbyRuzuoOqEfAoJDD0FpEZhYnHh9T55UngPJERR5gyR9wDf_fvmd_IMwo3kuc_W72QkZZw/exec

Key functions:
- doGet(e) / doPost(e) → handleRequest_
- searchContext_(query) → keyword scoring + return { found, konteks, jawaban, sources, topScore }
- callAI_(query, contextData) → fetch OpenRouter
- buildSystemPrompt_(contextData) → system prompt dengan identitas WEBUSAHA + tone + aturan
- getCache_ / setCache_ → ScriptCache 600s
- checkRateLimit_ → 60/min/IP
- getSheet_ → auto-detect sheet "Konteks"
- getHeaderMap_ → auto-detect header row 1
- getAllData_ → ambil semua row, filter nonaktif & empty
- calculateScore_ → keyword scoring algorithm
- jsonResponse_ → ContentService.createTextOutput(json).setMimeType(JSON)

Konfigurasi:
- MODEL: google/gemini-2.0-flash-lite
- WHATSAPP_NUMBER: 6282258645254
- CACHE_DURATION: 600 detik
- RATE_LIMIT: 60 req/menit/IP
- MAX_RESULTS: 5 (top 5 by score)

System Prompt AI:
- Nama: WEBUSAHA
- Perusahaan: WEB USAHA — Platform jasa pembuatan website profesional
- Website: https://webusaha.shop
- Tone: Profesional, teknis, ramah, natural seperti CS manusia
- Aturan: Jawab berdasarkan KONTEKS saja, jangan mengarang. Jika tidak ada, arahkan ke WA.
- Tanggal & waktu: real-time dari server GAS

---

## GOOGLE SHEET "KONTEKS"

Kolom: ID | keyword | konteks | jawaban | status | urutan
─────────────────────────────────────────────

Total row: 32 (30 aktif, 2 nonaktif)
Nonaktif: ID 23 (lowongan), ID 27 (partnership)

Kategori data:
  Perkenalan, Layanan, Harga, Order, Kontak, Operasional,
  Pembayaran, Garansi, Portfolio, Teknologi, SEO, Maintenance,
  E-commerce, Landing Page, Company Profile, Dashboard, Redesign,
  Keamanan, Revisi, Refund, Kustom, Gratis, Support, Teknis,
  Customer Service, Widget

Fitur Auto-detect GAS:
- Sheet: cari "Konteks", fallback sheet pertama
- Header: dari row 1, bukan fixed A,B,C,D,E,F
- Status: hanya "aktif" yang diproses
- Empty row: skip
- Keyword scoring: query dipecah kata → cocokkan dengan kolom keyword (comma-separated) → exact +10, partial +5
- Multi-row: top 5 by score digabung
- Cache: ScriptCache 600 detik
- Rate limit: 60 req/menit/IP

---

## WIDGET INTEGRATION (dengan webusaha.shop)

Cara integrasi di webusaha.shop (+page.svelte):
─────────────────────────────────────────────

State:
  aiChatOpen: $state(false)
  toggleAiChat(): function

UI:
  <!-- Tombol AI CS -->
  <button onclick={toggleAiChat}>
    position: fixed; bottom: 100px; right: 28px; z-index: 9998;
    width: 56px; height: 56px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    border-radius: 50%;
  </button>

  <!-- Jendela Chat -->
  {#if aiChatOpen}
    <div>
      position: fixed; bottom: 170px; right: 28px; z-index: 9997;
      width: 380px; height: 550px;
      <iframe src="https://ai.webusaha.shop/widget"></iframe>
    </div>
  {/if}

Posisi (Desktop):
  - Tombol AI CS:  bottom: 100px, right: 28px
  - Jendela Chat:  bottom: 170px, right: 28px
  - Tombol WA:     bottom: 28px, right: 28px

Mobile responsive:
  - Jendela Chat: width: calc(100vw - 2rem), height: calc(100vh - 200px)

---

## CSP & SECURITY HEADERS

File: static/_headers
─────────────────────────────────────────────
/*
  Content-Security-Policy: frame-ancestors 'self' https://webusaha.shop https://*.webusaha.shop

Catatan:
- X-Frame-Options: ALLOW-FROM sudah deprecated, tidak digunakan
- Hanya CSP frame-ancestors yang berlaku di browser modern
- Mengizinkan embedding dari webusaha.shop dan subdomain-nya

---

## DESIGN SYSTEM

Colors:
  - Primary: blue-500 (#3b82f6) → indigo-600 (#4f46e5)
  - Accent: purple-500 (#a855f7) → pink-600 (#db2777)
  - User bubble: blue-500 → indigo-600
  - AI bubble: white/60 glassmorphism
  - Success: green-500 (#22c55e)
  - Error: red-500 (#ef4444)
  - Background: gray-50 (#f9fafb)

Typography:
  - Font: Inter (Google Fonts), weights 400-700
  - Size: text-sm untuk chat, text-xs untuk info

Effects:
  - Glassmorphism: bg-white/30 backdrop-blur-xl border-white/50
  - Ambient glow: bg-blue-500/30 blur-[180px] (fixed, pointer-events-none)
  - Shadow: shadow-2xl untuk chat card
  - Animation: slideUp 0.3s ease-out untuk widget

Scrollbar:
  - Width: 4px
  - Thumb: gray-400, rounded
  - Track: transparent

---

## PERFORMANCE

Build Size (client):
  - Total: ~87 KB (16 files)
  - CSS: ~43 KB (4 files)
  - JS: ~44 KB (12 files)
  - Gzip: significantly smaller

Optimizations:
  ✅ Tailwind CSS purging
  ✅ Minimal JS bundles
  ✅ Cloudflare CDN global
  ✅ GAS ScriptCache 600s
  ✅ Rate limiter prevents abuse
  ✅ No external CSS framework (Tailwind only)
  ✅ Lucide icons tree-shakeable

---

## URL PENTING

AI CS Standalone         : https://ai.webusaha.shop
AI CS Widget             : https://ai.webusaha.shop/widget
GAS Backend              : https://script.google.com/macros/s/AKfycbyRuzuoOqEfAoJDD0FpEZhYnHh9T55UngPJERR5gyR9wDf_fvmd_IMwo3kuc_W72QkZZw/exec
OpenRouter API           : https://openrouter.ai/api/v1/chat/completions
Landing Page (Utama)     : https://webusaha.shop
Dashboard (Utama)        : https://app.webusaha.shop
GitHub Repo              : github.com/webusaha1/ai-cs-webusaha

---

## KNOWN LIMITATIONS

1.  Response tidak streaming (utuh)
2.  Belum ada conversation memory (setiap request independen)
3.  Belum ada dark mode toggle
4.  Belum ada analytics tracking
5.  Favicon belum ada
6.  GAS header method tidak support → CORS default GAS
7.  Rate limit GAS ~20.000/hari (akun gratis)
8.  Worker cache invalidation manual di GAS (ubah Sheet → clear cache atau tunggu 10 menit)
9.  Nomor WhatsApp di beberapa tempat masih placeholder (0812-3456-7890) — sudah diganti ke 0822-5864-5254 di GAS
10. Data Sheet baru 32 row — perlu ditambah untuk coverage lebih luas

---

## REKOMENDASI NEXT STEP (Prioritas)

1.  Conversation Memory
    - Kirim 5 pesan terakhir ke AI sebagai context
    - Store di store/chat.ts
    - Update system prompt dengan history

2.  Analytics Tracking
    - Tambah Google Analytics ke widget
    - Track: jumlah chat, topik populer, fallback rate

3.  WhatsApp Escalation
    - Tombol "Hubungi CS Manusia" di dalam chat
    - Auto-redirect ke nomor WA asli dengan pre-filled message

4.  Hybrid Semantic Search
    - Kombinasi keyword scoring + embedding similarity
    - Embedding: hitung cosine similarity antara query dan konteks
    - Fallback ke keyword scoring jika embedding gagal

5.  Dark Mode Toggle
    - Simpan preferensi di localStorage
    - Tailwind dark: variant
    - Update semua komponen

6.  Favicon & PWA
    - Buat favicon.png (logo "W" WEBUSAHA)
    - Tambah manifest.json untuk PWA

7.  Tambah Materi Sheet
    - Target 50+ row
    - Kategori baru: Troubleshooting, Perbandingan Paket, Domain & Hosting
    - Update backup CSV

8.  Error Monitoring
    - Log error ke Google Sheets terpisah
    - Track: timestamp, query, error message, IP

---

## QUICK START (Untuk AI Baru)

Jika dokumen ini diberikan ke chat AI baru, cukup bilang:

"Saya punya project AI CS WEBUSAHA yang sudah production ready dan
terintegrasi sebagai widget di webusaha.shop. Tolong baca dokumentasi
di atas dan lanjutkan dari situ."

AI akan langsung paham:
- Arsitektur lengkap
- Semua file yang sudah dibuat
- GAS URL yang live
- Sheet yang sudah ada
- Cara integrasi dengan project utama
- Apa yang sudah selesai dan apa yang belum

---

## CHANGELOG

Versi 1.0 — 2025
- Inisialisasi project SvelteKit + GAS
- ChatDemo, ChatBubble, ChatInput components
- Keyword scoring + OpenRouter integration
- Google Sheet "Konteks" (30 row)
- Deploy ke ai.webusaha.shop

Versi 1.1 — Juni 2026
- Auto-detect sheet & header di GAS
- ScriptCache + Rate limiter
- Multi-row merge (top 5)
- System prompt dengan identitas WEBUSAHA
- Error handling + fallback

Versi 1.2 — 26 Juni 2026
- Perbaikan error handling di ChatDemo
- Support compact mode
- Nomor WhatsApp asli (0822-5864-5254)
- Perbaikan JSON response GAS

Versi 1.3 — 29 Juni 2026
- Route /widget untuk iframe (CSR only, SSR: false)
- CSP headers untuk cross-domain embedding
- Widget terintegrasi di webusaha.shop
- Tombol AI CS biru di landing page
- PostMessage communication (close widget)
- Animasi slide-up untuk widget
- Responsive mobile layout
- 32 row data di Google Sheet
- Cleanup ChatWidget.svelte (tidak dipakai, diganti inline)
```

---

Dokumentasi khusus AI CS WEBUSAHA sudah lengkap. Mencakup arsitektur, struktur project, komponen, state management, AI pipeline, GAS backend, Google Sheet, widget integration, CSP security, design system, performance, known limitations, dan rekomendasi next step. Siap digunakan sebagai referensi untuk pengembangan AI CS selanjutnya.
