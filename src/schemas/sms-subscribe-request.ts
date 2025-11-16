import z from "zod";

export const SmsSubscribeRequest = z.object({
  sms: z.string(),
});

export type SmsSubscribeRequest = z.infer<typeof SmsSubscribeRequest>;
