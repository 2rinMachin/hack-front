import z from "zod";

export const Incident = z.object({
  id: z.string(),
  kind: z.string(),
  description: z.string(),
  location: z.string(),
  urgency: z.enum(["high", "mid", "low"]),
  status: z.enum(["pending", "attending", "done"]),
});

export type Incident = z.infer<typeof Incident>;
