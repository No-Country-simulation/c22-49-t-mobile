import { FieldValues, useForm } from "react-hook-form"
import { FormContainer, InputField, MainButton } from "../../common"
import { IForgotFormProps } from "./types"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordValidationSchema } from "../validationSchema"
import { useAuthUser } from "@/hooks/useAuthUser/useAuthUser"

export const ForgotForm = ({

}: IForgotFormProps) => {

    const { control, watch, handleSubmit, formState } = useForm({
        resolver: zodResolver(forgotPasswordValidationSchema),
        mode: "onChange",
    })
    const { mutate: sendEmail, isPending, isSuccess, error, reset } = useAuthUser().useForgotPassword();

    const onSubmit = handleSubmit(async (data) => {
        const { email } = data;
        sendEmail({ email })
        if (isSuccess) {
            reset();
        }
    })

    return (
        <FormContainer>
            <InputField
                key="email"
                name="email"
                placeholder="correo electronico"
                control={control}
                formState={formState}
                label="correo electronico"
                type={"email"}
            />
            <MainButton
                text="Enviar"
                variant="background"
                isLoading={false}
                onPress={onSubmit}
            />
        </FormContainer>
    )
}