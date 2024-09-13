import { z } from "zod";

export const userSchema = z.object({
    username: z.string({required_error: "Username is required"})
        .min(1, "Username is required")
        .max(30, "Username must be 30 characters or less"),
    email: z.string({required_error: "Email is required"})
        .email("Invalid email address"),
    password: z.string({required_error: "Password is required"})
        .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string({required_error: "Confirm Password is required"})
        .min(6, "Confirm Password must be at least 6 characters long"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to the error
});
