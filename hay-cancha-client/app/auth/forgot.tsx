import { ForgotForm, PageContainer, RegisterForm, Typography } from "@/ui";
import { View } from "react-native";

function Forgot() {

    return (
        <PageContainer>
            <View className="flex flex-row justify-start items-center p-4 w-full h-fit">
                <Typography text="Recuperar contraseña" variant="title" />
            </View>
            <ForgotForm />
        </PageContainer>
    );
}

export default Forgot