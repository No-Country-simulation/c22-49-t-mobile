import { TextProps } from "react-native";

export type TypographyVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'link' | 'error';

export type VariantClasses = Record<TypographyVariant, string>;

export interface ITypographyProps extends Pick<TextProps,
    | "className"
    | "id"
> {
    text: string;
    variant: TypographyVariant;
}