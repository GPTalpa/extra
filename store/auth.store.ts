import { create } from "zustand";
type AuthMode = "login" | "register" | "reset";

type AuthStateStore = {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
};

export const useAuthStore = create<AuthStateStore>((set) => ({
  mode: "login",
  setMode: (mode) => set({ mode }),
}));
