import z from "zod";
import {
  IncidentKind,
  IncidentStatus,
  IncidentUrgency,
} from "./incident-enums";

export const GetIncidentsSummaryRequest = z.object({
  total_incidents: z.number(),
  kind_count: z.record(IncidentKind, z.number()),
  urgency_count: z.record(IncidentUrgency, z.number()),
  status_count: z.record(IncidentStatus, z.number()),
});

export type GetIncidentsSummaryRequest = z.infer<
  typeof GetIncidentsSummaryRequest
>;
