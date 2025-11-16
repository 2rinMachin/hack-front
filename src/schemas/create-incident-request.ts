import { z } from "zod";
import { IncidentKind, IncidentUrgency } from "./incident-enums";

export const CreateIncidentRequest = z.object({
  kind: IncidentKind,
  description: z.string().nonempty(),
  location: z.string().nonempty(),
  urgency: IncidentUrgency,
  image: z.string().nullable().optional(),
});

export type CreateIncidentRequest = z.infer<typeof CreateIncidentRequest>;
