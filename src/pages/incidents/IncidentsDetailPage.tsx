import { useParams } from "react-router-dom";
import { useClients } from "../../hooks/use-clients";
import { useQuery } from "@tanstack/react-query";
import type { Incident } from "../../schemas/incident";
import IncidentDetail from "../../components/IncidentDetail";

const IncidentsDetailPage = () => {
  const { id } = useParams();
  const { incidentsClient } = useClients();

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
