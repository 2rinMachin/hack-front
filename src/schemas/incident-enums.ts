import z from "zod";

export const IncidentUrgency = z.literal(["high", "mid", "low"]);
export type IncidentUrgency = z.infer<typeof IncidentUrgency>;

export const IncidentStatus = z.literal(["pending", "attending", "done"]);
export type IncidentStatus = z.infer<typeof IncidentStatus>;
