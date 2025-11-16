import z from "zod";
import { User } from "./user";
import { IncidentHistoryEntry } from "./incident-history-entry";
import { IncidentStatus, IncidentUrgency } from "./incident-enums";

export const Incident = z.object({
  id: z.string(),
  kind: z.string(),
  description: z.string(),
  location: z.string(),
  urgency: IncidentUrgency,
  status: IncidentStatus,
  author: User,
  history: z.array(IncidentHistoryEntry),
  created_at: z.string(),
  image_url: z.string().nullable().optional(),
});

export type Incident = z.infer<typeof Incident>;
