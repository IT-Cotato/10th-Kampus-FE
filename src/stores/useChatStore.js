import { create } from 'zustand';

export const useChatStore = create((set) => ({
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
}));
