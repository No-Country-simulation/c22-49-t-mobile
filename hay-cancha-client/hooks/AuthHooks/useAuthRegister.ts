import { useRouter } from "expo-router";
import useSyncWithBackend from "./useSyncWithBackend";
import { useMutation } from "@tanstack/react-query";
import { IcreateUserParams } from "./types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authFirebase } from "@/lib/firebase/firebase.config";

export const useCreateUser = () => {

    const router = useRouter();
    const { mutate: syncWithBackend } = useSyncWithBackend();

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
            const idToken = await userCredential.user.getIdToken(); // Obtiene el token de Firebase
            syncWithBackend(
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