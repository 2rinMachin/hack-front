import {
  initClient,
  initContract,
  type InitClientArgs,
  type InitClientReturn,
} from "@ts-rest/core";
import { z } from "zod";
import { env } from "../env";
import { Incident } from "../schemas/incident";
import { CreateIncidentRequest } from "../schemas/create-incident-request";
import { UpdateStatusRequest } from "../schemas/update-status-request";
import { EmailSubscribeRequest } from "../schemas/email-subscribe-request";
import { SmsSubscribeRequest } from "../schemas/sms-subscribe-request";

const c = initContract();

export const contract = c.router(
  {
    listIncidents: {
      method: "GET",
      path: "/incidents",
      responses: {
        200: z.array(Incident),
      },
    },
    getIncident: {
      method: "GET",
      path: "/incidents/:id",
      responses: {
        200: Incident,
        404: z.unknown(),
      },
    },
    createIncident: {
      method: "POST",
      path: "/incidents",
      body: CreateIncidentRequest,
      responses: {
        201: Incident,
        400: z.unknown(),
      },
    },
    updateIncidentStatus: {
      method: "PATCH",
      path: "/incidents/:id/status",
      body: UpdateStatusRequest,
      responses: {
        200: Incident,
        400: z.unknown(),
        404: z.unknown(),
      },
    },
    subscribeEmail: {
      method: "POST",
      path: "/subscribe/email",
      body: EmailSubscribeRequest,
      responses: {
        200: z.unknown(),
        400: z.unknown(),
      },
    },
    subscribeSms: {
      method: "POST",
      path: "/subscribe/sms",
      body: SmsSubscribeRequest,
      responses: {
        200: z.unknown(),
        400: z.unknown(),
      },
    },
  },
  { strictStatusCodes: true }
);

const clientArgs = {
  baseUrl: env.VITE_INCIDENTS_URL,
  throwOnUnknownStatus: true,
  validateResponse: true,
} as const satisfies InitClientArgs;

export type IncidentsApiClient = InitClientReturn<
  typeof contract,
  typeof clientArgs
>;

export const createIncidentsClient = (
  token: string | null
): IncidentsApiClient => {
  return initClient(contract, {
    ...clientArgs,
    baseHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
