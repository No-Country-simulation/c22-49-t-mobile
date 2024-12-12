import { authLogin, authRegister } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;

  checkStatus: () => Promise<void>;
  changueStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Properties
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions
  changueStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({
      status: "authenticated",
      token: token,
      user: user,
    });

    await SecureStorageAdapter.setItem("token", token);

    return true;
  },

  checkStatus: async () => {
    const token = await SecureStorageAdapter.getITem("token");
    if (token) {
      set({ status: "authenticated", token });
    } else {
      set({ status: "unauthenticated" });
    }
  },

  login: async (email, password) => {
    const resp = await authLogin(email, password);
    return get().changueStatus(resp?.token, resp?.user);
  },

  register: async (name, email, password) => {
    const resp = await authRegister(name, email, password);
    return get().changueStatus(resp?.token, resp?.user);
  },

  logout: async () => {
    console.log("Logging out...");
    await SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
    console.log("Logout complete. Current status:", get().status);
  },
}));
