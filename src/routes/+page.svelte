<script lang="ts">
  import ChatDemo from '$lib/components/chat/ChatDemo.svelte';

  const GAS_URL = import.meta.env.VITE_GAS_API_URL;
</script>

<svelte:head>
  <title>AI CS — KEDAIKU</title>
  <meta name="description" content="Customer Service AI KEDAIKU — Tanyakan seputar layanan pembuatan website UMKM" />
</svelte:head>

<main id="main-content" class="min-h-screen relative overflow-hidden bg-gray-100">
  <div class="fixed inset-0 pointer-events-none" aria-hidden="true">
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[180px] opacity-15"></div>
    <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[180px] opacity-15"></div>
  </div>

  <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
    <header class="text-center mb-6">
      <div class="inline-flex items-center gap-2 mb-2">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white font-bold text-xl shadow-lg" role="img" aria-label="KEDAIKU Logo">
          K
        </div>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">
        KEDAIKU AI Assistant
      </h1>
      <p class="text-gray-600 text-sm mt-1">
        Customer service cerdas siap bantu 24/7
      </p>
    </header>

    <ChatDemo gasUrl={GAS_URL} />

    <footer class="text-center text-xs text-gray-600 mt-6 space-y-1">
      <p>
        © 2026 <a href="https://kedai.webusaha.shop" class="text-blue-700 hover:text-blue-900 underline font-medium" target="_blank" rel="noopener noreferrer">KEDAIKU</a> · AI Customer Service
      </p>
      <p class="text-gray-500 text-[11px]">
        Butuh bantuan lebih lanjut? Hubungi WhatsApp{' '}
        <a href="https://wa.me/6285817543733" class="text-blue-700 hover:text-blue-900 underline font-medium" target="_blank" rel="noopener noreferrer">
          0858-1754-3733
        </a>
      </p>
    </footer>
  </div>
</main>
