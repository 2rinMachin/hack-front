import { useParams } from "react-router-dom";
import { useClients } from "../../hooks/use-clients";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Incident } from "../../schemas/incident";
import IncidentDetail from "../../components/IncidentDetail";
import { env } from "../../env";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";
import { WebSocketMessage } from "../../schemas/websocket-message";

const IncidentsDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { incidentsClient } = useClients();

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    env.VITE_WEBSOCKET_URL,
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;

    sendMessage(JSON.stringify({ action: "subscribe" }));
  }, [sendMessage, readyState]);

  useEffect(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);
    if (!data.kind) return;

    const msg = WebSocketMessage.parse(data);

    if (msg.kind === "subscription_success") return;
    if (msg.kind === "subscription_failed") return;

    if (msg.kind !== "incident_status_update" || msg.data.id !== id) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryClient.setQueryData(["incident", id], (oldData: any) => {
      let incident: Incident | null = oldData?.body ?? null;

      if (incident && incident.id === msg.data.id) {
        incident = { ...incident, ...msg.data };
      }

      return { ...oldData, body: incident };
    });
  }, [queryClient, lastMessage, id]);

  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["incident", id],
    queryFn: () => incidentsClient.getIncident({ params: { id: id! } }),
    enabled: !!id,
  });

  if (isFetching || !data)
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-12">
        <p className="text-neutral-400 animate-pulse">Cargando incidente...</p>
      </main>
    );

  if (isError)
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-12">
        <p className="text-neutral-400">Error al cargar el incidente.</p>
      </main>
    );

  if (data.status === 404)
    return (
      <main className="min-h-screen w-full flex items-center justify-center px-4 py-12">
        <p className="text-neutral-400">No se encontró el incidente :(</p>
      </main>
    );

  const incident: Incident = data.body;

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-12">
      <section className="w-full max-w-3xl">
        <IncidentDetail incident={incident} refetch={refetch} />
      </section>
    </main>
  );
};

export default IncidentsDetailPage;
