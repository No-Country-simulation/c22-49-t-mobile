import { productsApi } from "@/core/api/productsApi";
import { Cancha } from "../interfaces/cancha.interface";


export const getProductById = async (id: string) => {

  try {
    const { data } = await productsApi.get<Cancha>(`/cancha/${id}`);
    return data
  } catch (error) {
    throw new Error(`No se encontro el producto de id: ${id}`);
  }
};
