import { FC } from "react";
import { IMainButtonProps } from "./types";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { twMerge } from "tailwind-merge";

export const MainButton: FC<IMainButtonProps> = ({
    text,
    className,
    variant = "background",
    isLoading,
    ...otherPressableProps
}) => {
    const buttonBaseClass = `block justify-center items-center border-2 shadow-lg border-solid rounded-l-full rounded-r-full w-full h-14 font-metropolisMedium active:scale-x-[0.99] active:scale-y-[0.95]`

    const variantClass = {
        background: {
            button: `
            bg-light-primary dark:bg-dark-primary
            border-light-primary dark:border-dark-primary
            `,
            text: `
            text-light-secondary dark:text-dark-secondary
            `
        },
        transparent: {
            button: `
            bg-transparent dark:bg-transparent
            border-light-secondary dark:border-dark-secondary
            `,
            text: `
              text-light-secondary dark:text-dark-secondary
            `
        }
    }

    const selectedVariant = variantClass[variant] || variantClass.background; // Fallback a "background"
    if (!selectedVariant) {
        console.error(`Invalid variant: ${variant}`);
        return null;
    }

    const textBaseClass = `text-lg`

    return (
        <Pressable
            {...otherPressableProps}
            className={twMerge(
                buttonBaseClass,
                selectedVariant.button,
                className
            )}
        >
            {isLoading ?
                <ActivityIndicator
                    size="small"
                    color="white"
                    animating={true}
                />
                :
                <Text
                    className={twMerge(
                        textBaseClass,
                        selectedVariant.text
                    )}
                >
                    {text}
                </Text>
            }
        </Pressable>
    )
}