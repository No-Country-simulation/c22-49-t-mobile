import { authFirebase } from "@/lib/firebase/firebase.config";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouter } from "expo-router";

export const useSocialAuth = () => {
    const router = useRouter(); // Para manejar la redirección

    const useGoogleAuth = () => {
        const AuthGoogleProvider = new GoogleAuthProvider();

        const LoginGoogle = async () => {
            try {
                const result = await signInWithRedirect(authFirebase, AuthGoogleProvider);

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);

                console.log("Login con google exitoso");


                // Redirigir al usuario a la página de inicio
                router.push("./home");
            } catch (error: any) {
                console.error("Error en el login de Google:", error.message);
            }
        };

        return LoginGoogle;
    };

    const useFacebookAuth = () => {
        const AuthFacebookProvider = new FacebookAuthProvider();

        const LoginFacebook = async () => {
            try {
                const result = await signInWithRedirect(authFirebase, AuthFacebookProvider);


                console.log("Login con facebook exitoso");

                // Redirigir al usuario a la página de inicio
                router.push("./home");
            } catch (error: any) {
                console.error("Error en el login de Facebook:", error.message);
            }
        };

        return LoginFacebook;
    };

    return { useGoogleAuth, useFacebookAuth };
};
