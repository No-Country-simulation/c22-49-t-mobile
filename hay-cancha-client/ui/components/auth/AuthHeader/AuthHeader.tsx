import { FC } from "react";
import { Pressable, View } from "react-native";

import { IAuthHeaderProps } from "./types";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";

export const AuthHeader: FC<IAuthHeaderProps> = ({ }) => {

    const router = useRouter();

    const handleReturn = () => {
        router.back()
    }

    return (
        <View
            className="relative flex flex-row justify-between items-center bg-light-primary drop-shadow-lg px-2 w-full h-12"
        >
            <Pressable
                className="flex flex-row justify-start items-center"
                onPress={handleReturn}
            >
                <Feather
                    name="arrow-left"
                    size={24}
                    color="black"
                />
            </Pressable>

        </View>
    )
}