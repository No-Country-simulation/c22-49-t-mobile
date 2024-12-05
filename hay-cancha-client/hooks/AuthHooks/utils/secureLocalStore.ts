import * as SecureStore from 'expo-secure-store';

export const saveToken = async ( value: string) => {
    await SecureStore.setItemAsync("idToken", value);
};

export const getToken = async () => {
    return await SecureStore.getItemAsync("idToken");
};

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync("idToken");
};
