import { Control, FieldValues, FormState, UseFormRegister, UseFormWatch } from "react-hook-form";
import { TextInputProps } from "react-native";

type InputFieldType = 'email' | 'password' | 'text'
export interface IInputFieldProps extends Pick<TextInputProps,
    | 'placeholder'
    | 'className'
    | 'autoFocus'
    | 'autoCapitalize'
    | 'autoCorrect'
    | 'autoComplete'
    | 'value'
    | 'onChangeText'
    | 'onBlur'
    | 'onTouchStart'
    | 'onTouchEnd'

> {
    control: Control<FieldValues, any>;
    name: string;
    label: string;
    formState: FormState<FieldValues>;
    type: IInputFieldType;
    required?: boolean;
    requiredMessage?: string;   
}

export type statusInputType = 'void' | 'success' | 'error'