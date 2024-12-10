import { authFirebase } from "@/lib/firebase/firebase.config";
import { saveToken } from "./secureLocalStore";

export const refreshIdToken = async () => {
    const currentUser = authFirebase.currentUser;
    if (currentUser) {
        const idToken = await currentUser.getIdToken(true); // Forzar la renovacion del token
        await saveToken(idToken);
        return idToken;
    }
    return null;
};
