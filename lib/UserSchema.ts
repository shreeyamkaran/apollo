import {z} from "zod";

export const UserSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
    agreedToTNC: z.literal(true, {
        errorMap: () => ({ message:"You must accept the terms and conditions" })
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export type TUserSchema = z.infer<typeof UserSchema>;