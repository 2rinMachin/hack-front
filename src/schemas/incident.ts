import z from "zod";
import { User } from "./user";
import { IncidentHistoryEntry } from "./incident-history-entry";

export const Incident = z.object({
  id: z.string(),
  kind: z.string(),
  description: z.string(),
  location: z.string(),
  urgency: z.enum(["high", "mid", "low"]),
  status: z.enum(["pending", "attending", "done"]),
  author: User,
  history: z.array(IncidentHistoryEntry),
  created_at: z.string(),
});

export type Incident = z.infer<typeof Incident>;
