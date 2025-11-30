import { z } from "zod";

// Login validation
export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


// Register validation
export const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});