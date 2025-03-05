import { z } from "zod";

export const signUpSchema = z
   .object({
      fname: z.string().trim().min(1, { message: "First name is required." }),
      lname: z.string().trim().min(1, { message: "Last name is required." }),
      email: z
         .string()
         .trim()
         .min(1, { message: "Email is required." })
         .email({ message: "Invalid email address" }),
      password: z
         .string()
         .min(1, { message: "Password is required." })
         .min(8, { message: "Password must be at least 8 characters long." }),
      confirmPassword: z.string().min(1, { message: "Confirm password is required." })
   })
   .superRefine(({ password, confirmPassword }, ctx) => {
      if (password !== confirmPassword) {
         ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match"
         });
      }
   });

export const logInSchema = z.object({
   email: z
      .string()
      .trim()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email address" }),
   password: z
      .string()
      .min(1, { message: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
});
