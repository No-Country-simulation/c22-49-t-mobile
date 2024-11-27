import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

export function Provider({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}