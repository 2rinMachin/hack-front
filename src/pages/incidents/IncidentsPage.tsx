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
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 py-16">
      <section className="max-w-4xl mx-auto px-4">
        <h1 className="font-semibold text-3xl text-center mb-10 bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Incidentes actuales
        </h1>

        {isError ? (
          <p className="text-center text-neutral-500 animate-pulse">
            Error inesperado :(
          </p>
        ) : isFetching || incidents === undefined ? (
          <p className="text-center text-neutral-500 animate-pulse">
            Buscando incidentes...
          </p>
        ) : incidents?.length === 0 ? (
          <p className="text-center text-neutral-500">
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
