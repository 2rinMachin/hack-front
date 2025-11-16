import { useQuery } from "@tanstack/react-query";
import { useClients } from "../../hooks/use-clients";
import IncidentList from "../../components/IncidentList";

const IncidentsPage = () => {
  const { incidentsClient } = useClients();

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
