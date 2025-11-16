import { createContext } from "react";
import type { UsersApiClient } from "../api/users";
import type { IncidentsApiClient } from "../api/incidents";

export interface ClientsContextValue {
  usersClient: UsersApiClient;
  incidentsClient: IncidentsApiClient;
  refreshClients: (token: string | null) => void;
}

export const ClientsContext = createContext<ClientsContextValue | null>(null);
