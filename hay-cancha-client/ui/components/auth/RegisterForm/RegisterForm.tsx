import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer, InputField, MainButton } from "../../common"
import { IRegisterFormProps } from "./types"
import { useForm } from "react-hook-form"
import { singUpValidationSchema } from "../validationSchema"
import { useCreateUser } from "@/hooks/AuthHooks"

export const RegisterForm = ({

}: IRegisterFormProps) => {

    const { control, watch, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(singUpValidationSchema),
        mode: "onChange",
    })
    const { mutate: createUser, isPending, isSuccess, error } = useCreateUser();

    const onSubmit = handleSubmit(async (data) => {
        const { name, email, password } = data;
        createUser({ email, password, name })
        if (isSuccess) {
            reset();
        }
    })
    return (
        <FormContainer>
            <InputField
                key="name"
                name="name"
                label="Nombre"
                placeholder="name"
                control={control}
                formState={formState}
                type={"text"}
            />
            <InputField
                key="email"
                name="email"
                label="Email"
                placeholder="email"
                control={control}
                formState={formState}
                type={"email"}
            />
            <InputField
                key="password"
                name="password"
                label="Contraseña"
                placeholder="contraseña"
                control={control}
                type={"password"}
                formState={formState}
            />
            <InputField
                key="confirm"
                name="confirm"
                label="Confirmar contraseña"
                placeholder="confirmar contraseña"
                type={"password"}
                control={control}
                formState={formState}
            />
            <MainButton
                text="Registrar"
                variant="background"
                isLoading={isPending}
                onPress={onSubmit}
            />
        </FormContainer>
    )
}