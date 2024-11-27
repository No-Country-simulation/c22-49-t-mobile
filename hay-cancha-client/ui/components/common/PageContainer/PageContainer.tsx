import { FC } from "react";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IPageContainerProps } from "./types";

export const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  
    return (
        <View
            className={`          
                flex-1          
                flex-col
                justify-center items-start
                gap-8
                py-4                                           
                `}       
        >
            {children}
        </View>
    )
}