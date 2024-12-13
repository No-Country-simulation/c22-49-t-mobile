import { FC } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { ISocialButtonProps } from "./types";
import { twMerge } from "tailwind-merge";

export const SocialButton: FC<ISocialButtonProps> = ({
    children,
    isLoading,
    ...otherPressableProps
}) => {

    const buttonBaseClass = `
                w-20 h-16
                block
                justify-center
                items-center
                shadow-lg
                rounded-xl             
                bg-light-secondary dark:bg-dark-secondary               
                active:scale-95 
                relative`
    return (
        <Pressable
            {...otherPressableProps}
            className={buttonBaseClass}
         

        >
            {isLoading
                ?
                <ActivityIndicator
                    size="small"
                    color="white"
                    animating={true}
                />
                :
                children
            }
        </Pressable>
    )
}
