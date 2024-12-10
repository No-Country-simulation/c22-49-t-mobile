import { useEffect, useState } from "react";
import { IuseUserSession } from "./types";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase/firebase.config";
import { useRouter } from "expo-router";
import { getToken } from "../AuthHooks/utils/secureLocalStore";
import { refreshIdToken } from "../AuthHooks/utils/refreshIdToken";
import useSyncWithBackend from "../AuthHooks/useSyncWithBackend";

export const useSessionUser = (): IuseUserSession => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const router = useRouter();
    const { mutate: syncWithBackend } = useSyncWithBackend()

    useEffect(() => {
        const auth = getAuth(firebaseApp);
        const unsubscribe = onAuthStateChanged(
            auth,
            async (currentUser) => {
                if (currentUser) {                    
                    setUser(currentUser)              
                }  else {
                    // await clearToken();
                    setUser(null);
                }
                setLoading(false);
            }

        );
        return () => unsubscribe();
    }, []);
    const isLoggedIn = !!user;
    const logout = async () => {
        setLoading(true);
        setError(null);
        const auth = getAuth(firebaseApp);
        try {
            await signOut(auth);
            router.push('/auth/login');

        } catch (err) {
            setError(err as Error);
            console.error("Error during logout:", err);
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, error, logout, isLoggedIn };

}