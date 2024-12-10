import { ReactNode } from "react";
import { ViewProps } from "react-native";

export interface IFormContainerProps extends Pick<ViewProps,
    | 'className'
> {
    children: ReactNode;
    transparent?: boolean;
}