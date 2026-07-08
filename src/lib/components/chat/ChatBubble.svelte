<script lang="ts">
  import type { ChatMessage } from '$lib/types/chat';

  export let message: ChatMessage;
  export let isLoading: boolean = false;

  $: isUser = message.role === 'user';
  $: isAssistant = message.role === 'assistant';
</script>

{#if isLoading}
  <!-- Typing Indicator -->
  <div class="flex justify-start mb-4">
    <div class="bg-pink-50/60 backdrop-blur-md border border-pink-100/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
      <div class="flex gap-1.5">
        <span class="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
        <span class="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
        <span class="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
      </div>
    </div>
  </div>
{:else}
  <div class="flex mb-4 {isUser ? 'justify-end' : 'justify-start'}">
    <!-- Avatar -->
    <div class="flex-shrink-0 {isUser ? 'order-2 ml-3' : 'mr-3'}">
      {#if isUser}
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
          U
        </div>
      {:else}
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 flex items-center justify-center text-white text-sm font-semibold">
          L
        </div>
      {/if}
    </div>

    <!-- Bubble -->
    <div class="max-w-[80%] {isUser ? 'order-1' : ''}">
      <div
        class="px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
        {isUser
          ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-tr-sm'
          : 'bg-pink-50/60 backdrop-blur-md border border-pink-100/60 text-gray-800 rounded-tl-sm'
        }"
      >
        <!-- Render Markdown sederhana (line break) -->
        {#each message.content.split('\n') as line, i}
          {#if line.trim() === ''}
            <br />
          {:else if line.startsWith('- ')}
            <div class="flex gap-2">
              <span>•</span>
              <span>{line.substring(2)}</span>
            </div>
          {:else if /^\d+\./.test(line)}
            <div>{line}</div>
          {:else}
            <span>{line}</span>
          {/if}
          {i < message.content.split('\n').length - 1 ? ' ' : ''}
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes bounce {
    0%, 60%, 100% {
      transform: translateY(0);
    }
    30% {
      transform: translateY(-8px);
    }
  }

  .animate-bounce {
    animation: bounce 1.4s infinite ease-in-out;
  }
</style>
