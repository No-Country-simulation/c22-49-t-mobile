import { LoginForm, PageContainer, SocialAuth, Typography } from "@/ui";
import { View } from "react-native";


function Login() {

    return (
        <PageContainer>
            <View className="flex flex-row justify-start items-center p-4 w-full h-fit">
                <Typography text="Inicio de sesión" variant="title" />
            </View>
            <LoginForm />
            <SocialAuth />
        </PageContainer>
    );
}

export default Login