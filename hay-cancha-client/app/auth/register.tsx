import { PageContainer, RegisterForm, Typography } from "@/ui";
import { View } from "react-native";

function Register() {

    return (
        <PageContainer>
            <View className="flex flex-row justify-start items-center p-4 w-full h-fit">
                <Typography text="Registro" variant="title" />
            </View>
            <RegisterForm />
        </PageContainer>
    );
}

export default Register