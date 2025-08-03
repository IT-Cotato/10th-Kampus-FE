import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  accessToken: null,
  isInitializing: false,

  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  setInitializing: (status) => set({ isInitializing: status }),
}));
