import { createContext } from "react";
import type { UsersApiClient } from "../api/users";

export interface ClientsContextValue {
  usersClient: UsersApiClient;
  refreshClients: (token: string | null) => void;
}

export const ClientsContext = createContext<ClientsContextValue | null>(null);
