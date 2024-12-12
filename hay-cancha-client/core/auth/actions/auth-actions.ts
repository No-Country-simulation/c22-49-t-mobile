import { productsApi } from "../../api/productsApi";
import { User } from "../interfaces/user";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();
  console.log({ email, password });

  try {
    const { data } = await productsApi.post("/user/login", {
      email,
      password,
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    // throw new Error("Usuario y/o password inválido");
    return null;
  }
};

export const authRegister = async (
  name: string,
  email: string,
  password: string
) => {
  name = name.toLowerCase();
  email = email.toLowerCase();

  try {
    const { data } = await productsApi.post("/user", {
      name,
      email,
      password,
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    // throw new Error("Usuario y/o password inválido");
    return null;
  }
};
