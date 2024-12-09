import { ILoginFormProps } from "./types";
import { FormContainer, InputField, MainButton } from "../../common";
import {  useForm } from "react-hook-form";
import { singInValidationSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUser } from "@/hooks/AuthHooks";

export const LoginForm = ({

}: ILoginFormProps) => {
    
    const { mutate: loginUser, isPending, isSuccess, error } = useLoginUser();
    const { control, watch, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(singInValidationSchema),
        mode: "onChange",
    })


    const onSubmit = handleSubmit(async (data) => {
        const { email, password } = data;
        loginUser({ email, password })
        if (isSuccess) {
            reset();
        }
    })

    return (
        <FormContainer>
            <InputField
                key="email"
                name="email"
                placeholder="Correo electronico"
                control={control}
                formState={formState}
                type={"email"}
                label="correo electronico"
            />
            <InputField
                key="password"
                name="password"
                placeholder="contraseña"
                control={control}
                formState={formState}
                type={"password"}
                label="Contraseña"
            />
            <MainButton
                text="Iniciar sesion"
                variant="background"
                isLoading={isPending}
                onPress={onSubmit}
            />
        </FormContainer>
    )
}