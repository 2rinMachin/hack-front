import z from "zod";

export const UpdateStatusRequest = z.object({
  status: z.enum(["pending", "attending", "done"]),
});

export type UpdateStatusRequest = z.infer<typeof UpdateStatusRequest>;
