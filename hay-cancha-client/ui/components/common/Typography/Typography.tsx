import { FC } from "react";
import { ITypographyProps, TypographyVariant, VariantClasses } from "./types";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";


export const Typography: FC<ITypographyProps> = ({
    text,
    variant,
    className,
    id
}) => {
    const baseTextClass = ``

    const textVariant: VariantClasses = {
        title: "text-6xl py-1 font-bold text-light-text dark:text-dark-text",
        subtitle: "text-xl font-semibold",
        body: "text-base font-normal",
        caption: "text-sm font-light",
        link: "text-base text-blue-500 underline",
        error: "text-base text-red-500 font-semibold",
    }
    return (
        <Text
            id={id}
            className={twMerge(
                baseTextClass,
                textVariant[variant],
                className
            )}
        >
            {text}
        </Text>
    )

}