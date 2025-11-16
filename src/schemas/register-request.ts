import { z } from "zod";

export const RegisterRequest = z.object({
  email: z.email().trim(),
  username: z.string().trim().min(3),
  password: z.string().min(4),
  role: z.enum(["student", "staff", "authority"]),
});

export type RegisterRequest = z.infer<typeof RegisterRequest>;
