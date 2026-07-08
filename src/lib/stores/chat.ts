import { writable } from 'svelte/store';
import type { ChatMessage } from '$lib/types/chat';

export const activeMessages = writable<ChatMessage[]>([
  {
    role: 'assistant',
    content: 'Halo! 👋 Aku KEDAIKU AI, customer service dari KEDAIKU. Mau tanya seputar layanan pembuatan website UMKM? Aku siap bantu!'
  }
]);

export const isLoading = writable(false);
