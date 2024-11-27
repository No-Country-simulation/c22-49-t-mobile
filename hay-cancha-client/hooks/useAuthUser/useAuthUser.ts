import { authFirebase } from "@/lib/firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IcreateUserParams } from "./types";

export const useAuthUser = () => {
    const useLoginUser = () => {
        const router = useRouter();
        const mutation = useMutation({
            mutationKey: ["loginUser"],
            mutationFn: async ({ email, password }: { email: string; password: string }) => {
                return signInWithEmailAndPassword(authFirebase, email, password);
            },
            onSuccess: (data, variables) => {
                router.push("/");
            },
            onError(error, variables) {
                console.log("error", error);
            },
        })
        return mutation
    }

    const useCreateUser = () => {
        const router = useRouter();
        const mutation = useMutation({
            mutationKey: ["createUser"],
            mutationFn: ({ email, password, name }: IcreateUserParams) => {
                return createUserWithEmailAndPassword(authFirebase, email, password)
            },
            onSuccess: async (data, variables) => {
                const { name } = variables
                await updateProfile(data.user, {
                    displayName: name
                })
                router.push("/auth/login")
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