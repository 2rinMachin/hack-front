import { z } from "zod";
import { Incident } from "./incident";

export const WebSocketMessage = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("incident_create"), data: Incident }),
  z.object({ kind: z.literal("incident_status_update"), data: Incident }),
  z.object({ kind: z.literal("subscription_failed"), data: z.string() }),
  z.object({ kind: z.literal("subscription_success"), data: z.string() }),
]);

export type WebSocketMessage = z.infer<typeof WebSocketMessage>;
