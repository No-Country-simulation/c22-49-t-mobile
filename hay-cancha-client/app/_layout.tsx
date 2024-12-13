import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import "./global.css";
import { Provider } from '@/ui';
import { useSessionUser } from '@/hooks/useUserSession/useUserSession';

// Evitar que la pantalla de carga se oculte hasta que esté listo
SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  // const { loading } = useSessionUser()
  const loading = false
  const isLoggedIn = false
  const [isAppReady, setIsAppReady] = useState(false); // Añadir estado de app lista

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync(); // Ocultar SplashScreen solo cuando esté listo
      setIsAppReady(true); // Establecer la app como lista
    }
  }, [loaded, loading]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Si el usuario está autenticado, mostramos las pantallas de tabs */}
          {isLoggedIn ? (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          ) : (
            // Si no está autenticado, mostramos la pantalla de login
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
