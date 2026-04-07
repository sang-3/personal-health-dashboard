import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  WeightFormValues,
  WeightRecord,
  WeightStorageMap,
} from "@/types/weight";

type WeightState = {
  weightMap: WeightStorageMap;
  editingId: string | null;
  hasHydrated: boolean;

  setWeightsByUser: (userId: string, weights: WeightRecord[]) => void;

  addWeight: (userId: string, data: WeightFormValues) => void;
  updateWeight: (userId: string, id: string, data: WeightFormValues) => void;
  deleteWeight: (userId: string, id: string) => void;

  startEditing: (id: string) => void;
  cancelEditing: () => void;
  clearEditing: () => void;
  clearWeightsByUser: (userId: string) => void;
  setHasHydrated: (value: boolean) => void;
};

export const useWeightStore = create<WeightState>()(
  persist(
    (set) => ({
      weightMap: {},
      editingId: null,
      hasHydrated: false,

      setWeightsByUser: (userId, weights) =>
        set((state) => ({
          weightMap: {
            ...state.weightMap,
            [userId]: weights,
          },
        })),

      addWeight: (userId, data) =>
        set((state) => {
          const current = state.weightMap[userId] ?? [];

          const nextItem: WeightRecord = {
            id: crypto.randomUUID(),
            userId,
            date: data.date,
            weightKg: data.weightKg,
            memo: data.memo?.trim() || "",
            createdAt: new Date().toISOString(),
          };

          return {
            weightMap: {
              ...state.weightMap,
              [userId]: [nextItem, ...current],
            },
          };
        }),

      updateWeight: (userId, id, data) =>
        set((state) => {
          const current = state.weightMap[userId] ?? [];

          return {
            weightMap: {
              ...state.weightMap,
              [userId]: current.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      date: data.date,
                      weightKg: data.weightKg,
                      memo: data.memo?.trim() || "",
                    }
                  : item,
              ),
            },
            editingId: null,
          };
        }),

      deleteWeight: (userId, id) =>
        set((state) => {
          const current = state.weightMap[userId] ?? [];

          return {
            weightMap: {
              ...state.weightMap,
              [userId]: current.filter((item) => item.id !== id),
            },
            editingId: state.editingId === id ? null : state.editingId,
          };
        }),

      startEditing: (id) => set({ editingId: id }),
      cancelEditing: () => set({ editingId: null }),
      clearEditing: () => set({ editingId: null }),

      clearWeightsByUser: (userId) =>
        set((state) => ({
          weightMap: {
            ...state.weightMap,
            [userId]: [],
          },
        })),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "weight-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        weightMap: state.weightMap,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
