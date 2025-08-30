import { create } from 'zustand';

export const useSnackbarStore = create((set) => ({
  message: null,
  showSnackbar: (message) => set({ message }),
  hideSnackbar: () => set({ message: null }),
}));
