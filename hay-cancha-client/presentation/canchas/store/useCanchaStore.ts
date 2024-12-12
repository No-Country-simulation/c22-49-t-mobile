import { create } from "zustand";
import { getCanchas } from "@/core/canchas/actions/get-canchas.action";
import { Cancha } from "@/core/canchas/interfaces/cancha.interface";

export interface CanchaState {
  canchas: Cancha[];
  loading: boolean;
  error: string | null;

  fetchCanchas: (filters: any) => Promise<void>;
  clearCanchas: () => void;
}

export const useCanchaStore = create<CanchaState>((set) => ({
  // Estado inicial
  canchas: [],
  loading: false,
  error: null,

  // Acción para obtener las canchas
  fetchCanchas: async (filters) => {
    set({ loading: true, error: null });
    try {
      const data = await getCanchas(filters);
      set({ canchas: data, loading: false });
    } catch (error) {
      set({ loading: false, error: "No se pudieron cargar las canchas" });
    }
  },

  clearCanchas: () => set({ canchas: [] }),
}));
