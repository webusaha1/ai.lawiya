<script lang="ts">
  import { Send } from 'lucide-svelte';

  export let onSend: (message: string) => Promise<void>;
  export let disabled: boolean = false;

  let inputValue: string = '';
  let inputElement: HTMLTextAreaElement;

  async function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;

    await onSend(trimmed);
    inputValue = '';
    
    // Fokus kembali ke input
    setTimeout(() => {
      inputElement?.focus();
    }, 100);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  // Auto-resize textarea
  function autoResize() {
    const el = inputElement;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }
  }
</script>

<div class="border-t border-white/40 bg-white/40 backdrop-blur-sm px-4 py-3 rounded-b-3xl">
  <div class="flex items-end gap-2">
    <!-- Textarea -->
    <textarea
      bind:this={inputElement}
      bind:value={inputValue}
      on:keydown={handleKeydown}
      on:input={autoResize}
      placeholder="Tanyakan seputar layanan KEDAIKU..."
      disabled={disabled}
      rows="1"
      class="flex-1 resize-none bg-white/60 backdrop-blur-sm border border-white/60 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      style="min-height: 42px; max-height: 120px;"
    ></textarea>

    <!-- Send Button -->
    <button
      on:click={handleSend}
      disabled={disabled || !inputValue.trim()}
      class="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      aria-label="Kirim pesan"
    >
      {#if disabled}
        <div class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
      {:else}
        <Send size={18} />
      {/if}
    </button>
  </div>
  
  <p class="text-[10px] text-gray-400 text-center mt-2">
    KEDAIKU · Customer Service AI · KEDAIKU.shop
  </p>
</div>
