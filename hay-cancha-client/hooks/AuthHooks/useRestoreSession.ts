import { useEffect } from "react";
import { refreshIdToken } from "./utils/refreshIdToken";
import { getToken } from "./utils/secureLocalStore";
import useSyncWithBackend from "./useSyncWithBackend";

export const useRestoreSession = () => {
    const syncWithBackend = useSyncWithBackend();

    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = await getToken();
            if (storedToken) {
                try {
                    const refreshedToken = await refreshIdToken();
                    if (refreshedToken) {
                        syncWithBackend.mutate({ path: "/auth/restore-session", token: refreshedToken });
                    }
                } catch (error) {
                    console.error("Error al restaurar la sesión:", error);
                }
            }
        };
        restoreSession();
    }, []);
};
