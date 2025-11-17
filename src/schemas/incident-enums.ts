import z from "zod";

export const INCIDENT_KINDS = [
  "aggression",
  "behavior",
  "plagiarism",
  "discrimination",
  "robbery",
  "lost_item",
  "technical",
  "other",
] as const;
export const IncidentKind = z.literal(INCIDENT_KINDS);
export type IncidentKind = z.infer<typeof IncidentKind>;

export const IncidentUrgency = z.literal(["high", "mid", "low"]);
export type IncidentUrgency = z.infer<typeof IncidentUrgency>;

export const IncidentStatus = z.literal(["pending", "attending", "done"]);
export type IncidentStatus = z.infer<typeof IncidentStatus>;
