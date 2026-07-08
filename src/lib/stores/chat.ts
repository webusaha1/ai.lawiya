import { writable } from 'svelte/store';
import type { ChatMessage } from '$lib/types/chat';

export const activeMessages = writable<ChatMessage[]>([
  {
    role: 'assistant',
    content: 'Halo! 👋 Aku LAWIYA AI, asisten dari LAWIYA BUTIK. Mau tanya seputar jasa jahit pakaian wanita & anak? Aku siap bantu! 🧵✨'
  }
]);

export const isLoading = writable(false);
