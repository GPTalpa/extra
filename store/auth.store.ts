import { create } from "zustand";
type AuthMode = "login" | "register" | "reset";

type AuthStateStore = {
  mode: AuthMode;
  loading: boolean;
  setMode: (mode: AuthMode) => void;
  setLoading: (e: boolean) => void;
};

export const useAuthStore = create<AuthStateStore>((set) => ({
  mode: "login",
  setMode: (mode) => set({ mode }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
