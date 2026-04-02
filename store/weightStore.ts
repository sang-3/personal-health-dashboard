import { create } from "zustand";
import { initialWeightData } from "@/lib/mockData";
import { WeightRecord } from "@/types/weight";

type WeightFormValues = {
  date: string;
  weight: number;
  memo?: string;
};

type WeightState = {
  weights: WeightRecord[];
  editingId: string | null;

  addWeight: (data: WeightFormValues) => void;
  updateWeight: (id: string, data: WeightFormValues) => void;
  deleteWeight: (id: string) => void;

  startEditing: (id: string) => void;
  cancelEditing: () => void;
};

export const useWeightStore = create<WeightState>((set) => ({
  weights: initialWeightData,
  editingId: null,

  addWeight: (data) =>
    set((state) => ({
      weights: [
        {
          id: crypto.randomUUID(),
          date: data.date,
          weight: data.weight,
          memo: data.memo?.trim() || "",
          createdAt: new Date().toISOString(),
        },
        ...state.weights,
      ],
    })),

  updateWeight: (id, data) =>
    set((state) => ({
      weights: state.weights.map((item) =>
        item.id === id
          ? {
              ...item,
              date: data.date,
              weight: data.weight,
              memo: data.memo?.trim() || "",
            }
          : item,
      ),
      editingId: null,
    })),

  deleteWeight: (id) =>
    set((state) => ({
      weights: state.weights.filter((item) => item.id !== id),
      editingId: state.editingId === id ? null : state.editingId,
    })),

  startEditing: (id) =>
    set(() => ({
      editingId: id,
    })),

  cancelEditing: () =>
    set(() => ({
      editingId: null,
    })),
}));
