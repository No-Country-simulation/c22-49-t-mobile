import { FC } from "react";
import { ILoginFormProps } from "./types";
import { FormContainer, InputField, MainButton } from "../../common";
import { FieldValues, useForm } from "react-hook-form";
import { singInValidationSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthUser } from "@/hooks/useAuthUser/useAuthUser";
export const LoginForm = ({

}: ILoginFormProps) => {

    const { control, watch, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(singInValidationSchema),
        mode: "onChange",
    })

    const { mutate: loginUser, isPending, isSuccess, error } = useAuthUser().useLoginUser();

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