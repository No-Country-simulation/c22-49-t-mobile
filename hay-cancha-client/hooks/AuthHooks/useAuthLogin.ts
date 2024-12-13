import { useRouter } from "expo-router";
import useSyncWithBackend from "./useSyncWithBackend";
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "@/lib/firebase/firebase.config";
import { saveToken } from "./utils/secureLocalStore";

export const useLoginUser = () => {

    const router = useRouter();
    const { mutate: syncWithBackend } = useSyncWithBackend();

    const mutation = useMutation({
        mutationKey: ["loginUser"],
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const userCredentials = await signInWithEmailAndPassword(authFirebase, email, password);
            return userCredentials;
        },
        onSuccess: async (userCredential) => {
            const token = await userCredential.user.getIdToken(); // Obtener el token de Firebase
            syncWithBackend(
                { path: "/auth/login", token: token },
                {
                    onSuccess: () => {
                        router.push("./");
                    },
                }
            );
            await saveToken(token);
        },
        onError(error, variables) {
            console.log("error", error);
        },
        
    })
    return mutation
}