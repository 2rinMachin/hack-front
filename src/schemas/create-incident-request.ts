import { z } from "zod";

export const CreateIncidentRequest = z.object({
  kind: z.string(),
  description: z.string(),
  location: z.string(),
  urgency: z.enum(["high", "mid", "low"]),
});

export type CreateIncidentRequest = z.infer<typeof CreateIncidentRequest>;
