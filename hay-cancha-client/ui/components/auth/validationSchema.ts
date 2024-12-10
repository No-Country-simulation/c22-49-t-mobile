import { z } from "zod";

const emailSchema = z
    .string()
    .min(1, "Email no puede estar vacío")
    .email("Email inválido")
    .min(5, "Email debe tener al menos 5 caracteres")
    .max(50, "Email debe tener máximo 50 caracteres")
    .toLowerCase()
    .trim();

const passwordSchema = z
    .string()
    .min(1, "Contraseña no puede estar vacía")
    .min(8, "Contraseña debe tener al menos 8 caracteres")
    .max(20, "Contraseña debe tener máximo 20 caracteres")
    .regex(/[A-Z]/, "Contraseña debe tener al menos una letra mayúscula")
    .regex(/[a-z]/, "Contraseña debe tener al menos una letra minúscula")
    .regex(/[0-9]/, "Contraseña debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Contraseña debe tener al menos un carácter especial")
    .trim();

export const singUpValidationSchema = z.object({
    name: z
        .string()
        .min(1, "Nombre no puede estar vacío")
        .min(3, "Nombre debe tener al menos 3 caracteres")
        .max(50, "Nombre debe tener máximo 50 caracteres")
        .regex(/^[a-zA-Z\s]+$/, "Nombre solo debe contener letras y espacios")
        .toLowerCase()
        .trim(),
    email: emailSchema,
    password: passwordSchema,
    confirm: z
        .string()
        .min(1, "Repita la contraseña")
        .trim(),
}).refine((data) => data.password === data.confirm, {
    message: "Las contraseñas deben coincidir",
    path: ["confirm"], // Apunta el error a confirm
})

export const singInValidationSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export const forgotPasswordValidationSchema = z.object({
    email: emailSchema,
})