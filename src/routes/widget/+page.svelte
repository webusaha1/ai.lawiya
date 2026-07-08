<script lang="ts">
  import ChatDemo from '$lib/components/chat/ChatDemo.svelte';
  
  const GAS_URL = import.meta.env.VITE_GAS_API_URL;
  
  function closeWidget() {
    window.parent.postMessage('close-chat-widget', '*');
  }
</script>

<div class="widget-container bg-gray-50 h-screen flex flex-col relative">
  <div class="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200 flex-shrink-0">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
        K
      </div>
      <div>
        <p class="text-sm font-semibold text-gray-800">KEDAIKU AI</p>
        <p class="text-xs text-green-600 flex items-center gap-1">
          <span class="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
          Online · Siap membantu
        </p>
      </div>
    </div>
    <button
      on:click={closeWidget}
      class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
      aria-label="Tutup chat"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
  
  <div class="flex-1 overflow-hidden">
    <ChatDemo gasUrl={GAS_URL} compact={true} />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: transparent;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }
  
  .widget-container {
    border-radius: inherit;
  }
</style>
