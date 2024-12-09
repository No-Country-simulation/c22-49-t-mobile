import { FC, useState } from "react";
import { IInputFieldProps, statusInputType } from "./types";
import { Controller } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { twMerge } from "tailwind-merge";

const STATUS_COLOR = {
    void: { text: "text-gray-400", border: "border-light-text", hex: "#9B9B9B" },
    success: { text: "text-green-500", border: "border-green-500", hex: "#2AA952" },
    error: { text: "text-red-500", border: "border-red-500", hex: "#F01F0E" },
};
export const InputField: FC<IInputFieldProps> = ({
    control,
    name,
    label,
    type = "text",
    required = false,
    formState,
    placeholder,
    ...otherInputProps
}) => {

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState(false);

    const isDirty: boolean = formState?.dirtyFields[name];
    const hasError = formState?.errors[name];

    const statusInput: statusInputType = isDirty
        ? hasError
            ? "error"
            : "success"
        : "void";

    const containerClass = twMerge(`
        w-full h-16
        flex flex-row
        relative
        items-center justify-center
        px-6
        font-metropolis-regular
        bg-light-background dark:bg-dark-background                     
        rounded-sm
        border-solid border-[1px]      
        ${isFocused ? ` ${STATUS_COLOR[statusInput].border}` : "border-light-acent"}
      
    `);

    const labelClass = `-top-3 left-2 absolute bg-light-background dark:bg-dark-background px-2 font-metropolisLight text-base`;
    const inputClass = `w-full h-fit font-medium text-light-text text-sm dark:text-dark-text`;

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field }) => (
                <View className={containerClass}>
                    {isFocused && <Text className={labelClass}>{label}</Text>}

                    <TextInput
                        {...field}
                        {...otherInputProps}
                        className={inputClass}
                        placeholder={isFocused ? "" : placeholder}
                        secureTextEntry={type === "password" && !isPasswordVisible}
                        keyboardType={type === "email" ? "email-address" : "default"}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={(text) => field.onChange(text)}
                        value={field.value}
                    />
                    {type === "password" ? (
                        <Pressable>
                            <Ionicons
                                style={{ height: 24 }}
                                name={isPasswordVisible ? "eye-off" : "eye"}
                                color={'#9B9B9B'}
                                size={20}
                                onPress={() => setPasswordVisible(!isPasswordVisible)}
                            />
                        </Pressable>
                    ) : (
                        <Ionicons
                            style={{ height: 24 }}
                            name={hasError ? "close-circle" : "checkmark-circle"}
                            color={isFocused ? STATUS_COLOR[statusInput].hex : "#9B9B9B"}
                            size={20}
                        />
                    )}
                </View>
            )}
        />
    );
};
