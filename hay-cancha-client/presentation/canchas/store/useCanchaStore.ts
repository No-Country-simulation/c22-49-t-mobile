import { create } from "zustand";
import { getCanchas } from "@/core/canchas/actions/get-canchas.action";
import { Cancha } from "@/core/canchas/interfaces/cancha.interface";
import { getCanchaById } from "@/core/canchas/actions/get-cancha-by-id.action";

export interface CanchaState {
  canchas: Cancha[];
  selectedCancha: Cancha | null;
  loading: boolean;
  error: string | null;

  fetchCanchas: (filters: any) => Promise<void>;
  fetchCanchaId: (canchaId: string) => Promise<void>;
  clearCanchas: () => void;
  clearCanchaId: () => void;
}

export const useCanchaStore = create<CanchaState>((set) => ({
  // Estado inicial
  canchas: [],
  selectedCancha: null,
  loading: false,
  error: null,

  fetchCanchas: async (filters) => {
    set({ loading: true, error: null });
    try {
      const data = await getCanchas(filters);
      set({ canchas: data, loading: false });
    } catch (error) {
      set({ loading: false, error: "No se pudieron cargar las canchas" });
    }
  },

  fetchCanchaId: async (canchaId) => {
    set({ loading: true, error: null });
    try {
      const data = await getCanchaById(canchaId); 
      set({ selectedCancha: data, loading: false });
    } catch (error) {
      set({ loading: false, error: "No se pudo cargar la cancha seleccionada" });
    }
  },

  clearCanchas: () => set({ canchas: [],  error: null }),
  clearCanchaId: () => set({  selectedCancha: null, error: null }),
}));
