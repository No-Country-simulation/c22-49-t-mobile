import { FC } from "react"
import { IFormContainerProps } from "./types"
import { View } from "react-native"
import { twMerge } from "tailwind-merge";
export const FormContainer: FC<IFormContainerProps> = ({
    children,
    transparent,
    className
}) => {
    return (
        <View
            className={twMerge(`
            w-full h-fit
            flex flex-col
            p-6
            gap-6                           
            ${transparent ? "bg-transparent" : "bg-light-background dark:bg-dark-background"}
            `,
                className
            )}
        >
            {children}
        </View>
    )
}