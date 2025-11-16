import z from "zod";
import { User } from "./user";

export const IncidentHistoryEntry = z.object({
  status: z.enum(["pending", "attending", "done"]),
  actor: User,
  date: z.string(),
});

export type IncidentHistoryEntry = z.infer<typeof IncidentHistoryEntry>;
