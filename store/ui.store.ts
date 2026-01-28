import { create } from "zustand";

type UIState = {
  profileOpen: boolean;
  setProfile: (e: boolean) => void;
  closeProfile: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  profileOpen: false,

  setProfile: (profileOpen) => set({ profileOpen }),

  closeProfile: () => set({ profileOpen: false }),
}));
