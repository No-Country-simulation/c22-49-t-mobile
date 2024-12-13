import { AuthHeader } from "@/ui";
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                header: () => <AuthHeader/> 
            }}
        >
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="forgot" />
        </Stack>
    );
}