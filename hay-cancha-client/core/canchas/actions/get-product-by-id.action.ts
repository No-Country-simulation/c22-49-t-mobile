import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, Product } from "../interfaces/cancha.interface";

const emptyProduct: Product = {
  id: "",
  title: "Nuevo producto",
  description: "",
  price: 0,
  images: [],
  slug: "",
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: [],
};

export const getProductById = async (id: string) => {
  if (id === "new") return emptyProduct;
  
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  } catch (error) {
    throw new Error(`No se encontro el producto de id: ${id}`);
  }
};