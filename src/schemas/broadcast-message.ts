import { z } from "zod";
import { Incident } from "./incident";

export const BroadcastMessage = z.object({
  kind: z.literal(["incident_create", "incident_status_update"]),
  data: Incident,
});

export type BroadcastMessage = z.infer<typeof BroadcastMessage>;
