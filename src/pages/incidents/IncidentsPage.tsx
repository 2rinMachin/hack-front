import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClients } from "../../hooks/use-clients";
import IncidentList from "../../components/IncidentList";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { env } from "../../env";
import { useEffect } from "react";
import { Incident } from "../../schemas/incident";
import { BroadcastMessage } from "../../schemas/broadcast-message";

const IncidentsPage = () => {
  const queryClient = useQueryClient();
  const { incidentsClient } = useClients();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    env.VITE_WEBSOCKET_URL,
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;

    sendMessage(JSON.stringify({ action: "subscribe" }));
    console.log("ready!");
  }, [sendMessage, readyState]);

  useEffect(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);
    if (!data.kind) return;

    const msg = BroadcastMessage.parse(data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryClient.setQueryData(["incidents-list"], (oldData: any) => {
      let incidents: Incident[] = oldData?.body ?? [];

      if (msg.kind === "incident_create") {
        incidents = [msg.data, ...incidents];
      } else if (msg.kind === "incident_status_update") {
        incidents = incidents.map((i) =>
          i.id === msg.data.id ? { ...i, ...msg.data } : i,
        );
      }

      return { ...oldData, body: incidents };
    });
  }, [queryClient, lastMessage]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["incidents-list"],
    queryFn: () => incidentsClient.listIncidents(),
  });

  const incidents = data?.body;

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-12">
      <section className="w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-10 text-neutral-100">
          Incidentes actuales
        </h1>

        {isError ? (
          <p className="text-center text-neutral-400">Error inesperado :(</p>
        ) : isFetching || incidents === undefined ? (
          <p className="text-center text-neutral-400">Buscando incidentes...</p>
        ) : incidents?.length === 0 ? (
          <p className="text-center text-neutral-400">
            No se encontraron incidentes.
          </p>
        ) : (
          <IncidentList incidents={incidents} />
        )}
      </section>
    </main>
  );
};

export default IncidentsPage;
