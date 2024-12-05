import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { saveToken } from "./utils/secureLocalStore";

const BACKEND_URL_BASE = "http://localhost:3000/api";

// sincroniza el backend con firebase enviando un token con la sesion
const useSyncWithBackend = () => {
    return useMutation({
        mutationKey: ["syncBackend"],
        mutationFn: async ({ path, token }: { path: string; token: string }) => {
            await axios.post(`${BACKEND_URL_BASE}${path}`, { token });
        },
        onSuccess: async (data, variables) => {
            await saveToken(variables.token);
        },
        onError(error) {
            console.error("Error al sincronizar con el backend:", error);
        },
    });
};

export default useSyncWithBackend;