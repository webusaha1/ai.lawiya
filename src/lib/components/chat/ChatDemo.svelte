<script lang="ts">
  import { activeMessages, isLoading } from '$lib/stores/chat';
  import ChatBubble from './ChatBubble.svelte';
  import ChatInput from './ChatInput.svelte';

  export let gasUrl: string = '';

  let chatContainer: HTMLDivElement;
  let errorMessage: string = '';
  let isNearBottom = true;

  function scrollToBottom() {
    if (!chatContainer) return;
    if (isNearBottom) {
      requestAnimationFrame(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    }
  }

  function handleScroll() {
    if (!chatContainer) return;
    const threshold = 50;
    const distance = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight;
    isNearBottom = distance < threshold;
  }

  $: if ($activeMessages.length || $isLoading) {
    scrollToBottom();
  }

  async function handleSend(message: string) {
    errorMessage = '';
    isNearBottom = true;

    $activeMessages = [
      ...$activeMessages,
      { role: 'user', content: message }
    ];

    $isLoading = true;

    try {
      const response = await fetch(`${gasUrl}?q=${encodeURIComponent(message)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.message || 'Gagal memproses pertanyaan.');
      }

      $activeMessages = [
        ...$activeMessages,
        { role: 'assistant', content: data.jawaban }
      ];

    } catch (error: any) {
      console.error('Chat error:', error);
      
      $activeMessages = [
        ...$activeMessages,
        {
          role: 'assistant',
          content: '⚠️ Maaf, terjadi kendala teknis. Silakan coba lagi atau hubungi WhatsApp kami di 0858-1754-3733.'
        }
      ];
    } finally {
      $isLoading = false;
    }
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  <div class="bg-white/30 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
    
    <!-- HEADER DIHAPUS — widget sudah punya header sendiri -->

    <div
      bind:this={chatContainer}
      on:scroll={handleScroll}
      class="px-4 py-4 overflow-y-auto"
      style="height: 400px; max-height: 60vh;"
    >
      {#each $activeMessages as msg, i}
        <ChatBubble message={msg} isLoading={false} />
      {/each}

      {#if $isLoading}
        <ChatBubble message={{ role: 'assistant', content: '' }} isLoading={true} />
      {/if}

      {#if errorMessage}
        <div class="text-center text-red-500 text-xs py-2">
          {errorMessage}
        </div>
      {/if}
    </div>

    <ChatInput onSend={handleSend} disabled={$isLoading} />
  </div>

  <p class="text-center text-xs text-gray-400 mt-3">
    © 2026 <a href="https://kedai.webusaha.shop" class="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">KEDAIKU</a> · AI Customer Service
  </p>
</div>
