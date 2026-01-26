import { create } from "zustand";

type UIState = {
  profileOpen: boolean;
  toggleProfile: () => void;
  closeProfile: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  profileOpen: false,

  toggleProfile: () => set((state) => ({ profileOpen: !state.profileOpen })),

  closeProfile: () => set({ profileOpen: false }),
}));
