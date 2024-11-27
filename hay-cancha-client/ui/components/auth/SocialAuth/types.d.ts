import { PressableProps } from "react-native";

export interface ISocialButtonProps extends Pick<PressableProps,
    | "onPress"
    | "style"
    | "children"
> {
    isLoading: boolean
}