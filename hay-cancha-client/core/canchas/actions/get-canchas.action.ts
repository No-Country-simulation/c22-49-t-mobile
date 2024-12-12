import { productsApi } from "@/core/api/productsApi";
import { type Cancha } from "../interfaces/cancha.interface";

export const getCanchas = async (filters = {}) => {
  try {
    const { data } = await productsApi.get<Cancha[]>("/cancha", {
      params: filters, 
    });
    return data;
  } catch (error) {
    throw new Error("Unable to load products");
  }
};
