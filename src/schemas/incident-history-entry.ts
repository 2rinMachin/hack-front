import z from "zod";
import { User } from "./user";
import { IncidentStatus } from "./incident-enums";

export const IncidentHistoryEntry = z.object({
  status: IncidentStatus,
  actor: User,
  date: z.string(),
});

export type IncidentHistoryEntry = z.infer<typeof IncidentHistoryEntry>;
