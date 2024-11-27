import { PressableProps } from "react-native";

type ButtonVariant = "background" | "transparent";
export interface IMainButtonProps extends Pick<PressableProps,
    | "onPress"
    | "onLongPress"
    | "onPressIn"
    | "onPressOut"
    | "disabled"
    | "nativeID"
    | "id"
    | "className"
> {
    text: string;
    variant: ButtonVariant;
    isLoading: boolean;
}