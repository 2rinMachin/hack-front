import z from "zod";

export const EmailSubscribeRequest = z.object({
  email: z.email(),
});

export type EmailSubscribeRequest = z.infer<typeof EmailSubscribeRequest>;
