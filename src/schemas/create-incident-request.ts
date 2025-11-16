import { z } from "zod";

export const CreateIncidentRequest = z.object({
  kind: z.enum(["behavior", "aggresion"]),
  description: z.string().nonempty(),
  location: z.string().nonempty(),
  urgency: z.enum(["high", "mid", "low"]),
});

export type CreateIncidentRequest = z.infer<typeof CreateIncidentRequest>;
