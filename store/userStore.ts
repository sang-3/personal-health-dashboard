import { User } from "@/types";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

const UserStore: StateCreator<UserStoreState> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  resetUser: () => set({ user: null }),
  hasHydrated: false,
  setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
});

const useUserStore = create<UserStoreState>()(
  persist(UserStore, {
    name: "user",
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) => ({ user: state.user }),
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    },
  }),
);

export default useUserStore;
