import { FC } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Typography } from "../../common";
import { SocialButton } from "./SocialButton";
import { FacebookIcon, GoogleIcon } from "@/ui/svg";
import { useSocialAuth } from "@/hooks/useSocialAuth/useSocialAuth";


export const SocialAuth: FC = () => {

    const loginFacebook = useSocialAuth().useFacebookAuth();
    const loginGoogle = useSocialAuth().useGoogleAuth();

    const containerClassBase = `
                w-full h-fit 
                flex flex-col gap-4 
                justify-center items-center
                py-6
                border-t-[1px] border-solid
                 border-light-acent dark:border-dark-acent 
                 border-opacity-25 dark:border-opacity-25`;
    const bottonContainerClass = `
            w-full h-fit 
            flex flex-row 
            justify-center items-center gap-4`;

    const handleFacebookLogin = () => {
        loginFacebook();
    }

    const handleGoogleLogin = () => {
        loginGoogle();
    }

    return (
        <View
            className={twMerge(containerClassBase)}
        >
            <Typography
                text="registrate con una cuenta de google o facebook"
                variant="body"
                key={"registratecon"}
            />
            <View
                className={twMerge(bottonContainerClass)}            >
                <SocialButton
                    isLoading={false}
                    key={"google"}
                    onPress={handleGoogleLogin}
                >
                    <GoogleIcon />
                </SocialButton>
                <SocialButton
                    key={"facebook"}
                    isLoading={false}
                    onPress={handleFacebookLogin}
                >
                    <FacebookIcon />
                </SocialButton>
            </View>
        </View>
    )
}