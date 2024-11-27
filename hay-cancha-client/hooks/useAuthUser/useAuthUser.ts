import { authFirebase } from "@/lib/firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IcreateUserParams } from "./types";
import axios from "axios";

const BACKEND_URL_BASE = "http://localhost:3000";

export const useAuthUser = () => {

    // sincroniza el backend con firebase enviando un token con la sesion
    const useSyncWithBackend = () => {
        return useMutation({
            mutationKey: ["syncBackend"],
            mutationFn: async ({ path, token }: { path: string; token: string }) => {
                await axios.post(`https://tu-backend.com/api${path}`, { token });
            },
            onError(error) {
                console.error("Error al sincronizar con el backend:", error);
            },
        });
    };

    const useLoginUser = () => {

        const router = useRouter();
        const syncWithBackend = useSyncWithBackend();

        const mutation = useMutation({
            mutationKey: ["loginUser"],
            mutationFn: async ({ email, password }: { email: string; password: string }) => {
                const userCredentials = await signInWithEmailAndPassword(authFirebase, email, password);
                return userCredentials;
            },
            onSuccess: async (userCredential) => {
                const idToken = await userCredential.user.getIdToken(); // Obtener el token de Firebase
                syncWithBackend.mutate(
                    { path: "/auth/login", token: idToken },
                    {
                        onSuccess: () => {
                            router.push("./");
                        },
                    }
                );
            },
            onError(error, variables) {
                console.log("error", error);
            },
        })
        return mutation
    }

    const useCreateUser = () => {

        const router = useRouter();
        const syncWithBackend = useSyncWithBackend();

        const mutation = useMutation({
            mutationKey: ["createUser"],
            mutationFn: ({ email, password, name }: IcreateUserParams) => {
                return createUserWithEmailAndPassword(authFirebase, email, password)
            },
            onSuccess: async (userCredential, variables) => {
                const { name } = variables
                await updateProfile(userCredential.user, {
                    displayName: name
                })
                const idToken = await userCredential.user.getIdToken(); // Obtener el token de Firebase
                syncWithBackend.mutate(
                    { path: "/auth/register", token: idToken },
                    {
                        onSuccess: () => {
                            router.push("/auth/login");
                        },
                    }
                );       
            },
            onError(error, variables) {
                console.log("error", error)
            },

        })
        return mutation
    }

    const useForgotPassword = () => {
        const router = useRouter();
        const mutation = useMutation({
            mutationKey: ["forgotPassword"],
            mutationFn: ({ email }: { email: string }) => {
                return sendPasswordResetEmail(authFirebase, email);
            },
            onSuccess: (data, variables) => {
                router.push("./auth/updatePassword");
            },
            onError(error, variables) {
                console.log("error", error);
            },
        });
        return mutation
    }

    return { useLoginUser, useCreateUser, useForgotPassword }
}