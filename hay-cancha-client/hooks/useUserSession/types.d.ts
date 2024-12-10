import { User } from "firebase/auth";

export interface IuseUserSession {
    user: User | null;
    loading: boolean;
    error: Error | null;
    isLoggedIn: boolean;
    logout: () => void;
}