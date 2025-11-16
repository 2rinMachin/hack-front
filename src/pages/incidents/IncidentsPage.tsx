import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClients } from "../../hooks/use-clients";
import IncidentList from "../../components/IncidentList";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { env } from "../../env";
import { useEffect, useState } from "react";
import { Incident } from "../../schemas/incident";
import { WebSocketMessage } from "../../schemas/websocket-message";
import { LuCircle } from "react-icons/lu";
import { useAuth } from "../../hooks/use-auth";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { z } from "zod";
import {
  IncidentKind,
  IncidentStatus,
  IncidentUrgency,
} from "../../schemas/incident-enums";

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#d4d4d8",
        font: {
          size: 14,
          weight: "normal",
        },
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: "rgba(24,24,27,0.9)",
      titleColor: "#fff",
      bodyColor: "#e4e4e7",
      borderColor: "rgba(255,255,255,0.05)",
      borderWidth: 1,
      padding: 10,
      displayColors: false,
    },
  },

  elements: {
    arc: {
      borderWidth: 0,
    },
  },
} as const;

const IncidentFiltersSchema = z.object({
  kind: IncidentKind.optional(),
  status: IncidentStatus.optional(),
  urgency: IncidentUrgency.optional(),
  location: z.string().optional(),
});

type IncidentFilters = z.infer<typeof IncidentFiltersSchema>;

type IncidentsListData = {
  body: Incident[];
};

const IncidentsPage = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { incidentsClient } = useClients();

  const [filters, setFilters] = useState<IncidentFilters>({
    kind: undefined,
    status: undefined,
    urgency: undefined,
    location: undefined,
  });

  const havePermissions = !!(user && user.role !== "student");

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    havePermissions ? env.VITE_WEBSOCKET_URL : null
  );

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) return;

    sendMessage(JSON.stringify({ action: "subscribe" }));
  }, [sendMessage, readyState]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);
    if (!data.kind) return;

    const msg = WebSocketMessage.parse(data);

    if (msg.kind === "subscription_success") {
      setReady(true);
      return;
    }

    if (msg.kind === "subscription_failed") return;

    queryClient.setQueryData<IncidentsListData>(
      ["incidents-list"],
      (oldData) => {
        let incidents: Incident[] = oldData?.body ?? [];

        if (msg.kind === "incident_create") {
          incidents = [msg.data, ...incidents];
        } else if (msg.kind === "incident_status_update") {
          incidents = incidents.map((i) =>
            i.id === msg.data.id ? { ...i, ...msg.data } : i
          );
        }

        return { ...oldData, body: incidents };
      }
    );
  }, [queryClient, lastMessage]);

  const filterParams = {
    kind: filters.kind,
    status: filters.status,
    urgency: filters.urgency,
    location: filters.location,
  };

  const {
    data: summaryData,
    isFetching: isFetchingSummary,
    isError: isErrorSummary,
  } = useQuery({
    queryKey: ["incidents-summary", filterParams],
    queryFn: () => incidentsClient.getIncidentsSummary({ query: filterParams }),
    enabled: havePermissions,
  });

  const { data, isFetching, isError, isEnabled } = useQuery({
    queryKey: ["incidents-list", filterParams],
    queryFn: () => incidentsClient.listIncidents({ query: filterParams }),
    enabled: havePermissions,
  });

  const incidents = data?.body;
  const summary = summaryData?.body;

  const generateChartData = (data: Record<string, number>) => ({
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#FF4144", "#05DF72", "#FFC534", "#4BC0C0"],
      },
    ],
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      kind: undefined,
      status: undefined,
      urgency: undefined,
      location: undefined,
    });
  };

  return (
    <main className="min-h-screen w-full flex justify-center px-4 py-12">
      <section className="w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center mb-2 text-neutral-100">
          Incidentes actuales
        </h1>

        <div className="flex justify-center mt-4 mb-8">
          <div className="bg-surface rounded-full px-4 py-2 flex items-center gap-x-2">
            <LuCircle
              size={10}
              className={
                ready
                  ? "text-green-400 fill-green-400"
                  : "text-yellow-400 fill-yellow-400"
              }
            />{" "}
            <span>{ready ? "Conectado" : "Conectando..."}</span>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div>
            <select
              name="kind"
              value={filters.kind || ""}
              onChange={handleSelectChange}
              className="px-4 py-2 bg-neutral-800 text-neutral-100 rounded"
            >
              <option value="" disabled>
                Tipo
              </option>
              <option value="behavior">Comportamiento</option>
              <option value="aggression">Agresión</option>
            </select>
          </div>

          <div>
            <select
              name="status"
              value={filters.status || ""}
              onChange={handleSelectChange}
              className="px-4 py-2 bg-neutral-800 text-neutral-100 rounded"
            >
              <option value="" disabled>
                Estado
              </option>
              <option value="pending">Pendiente</option>
              <option value="attending">En procceso</option>
              <option value="done">Resuelto</option>
            </select>
          </div>

          <div>
            <select
              name="urgency"
              value={filters.urgency || ""}
              onChange={handleSelectChange}
              className="px-4 py-2 bg-neutral-800 text-neutral-100 rounded"
            >
              <option value="" disabled>
                Urgencia
              </option>
              <option value="high">Alta</option>
              <option value="mid">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              name="location"
              value={filters.location || ""}
              onChange={handleFilterChange}
              placeholder="Filtrar por ubicación"
              className="px-4 py-2 bg-neutral-800 text-neutral-100 rounded"
            />
          </div>

          <div>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-red-500 text-neutral-100 rounded hover:bg-red-600"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        <div className="bg-surface rounded-lg p-4 mb-4 flex items-center justify-center">
          {summary ? (
            <p className="text-xl font-semibold text-center">
              Total de Incidentes: {summary.total_incidents}
            </p>
          ) : (
            <p className="text-xl font-semibold text-center">Cargando...</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {summary &&
            !isFetchingSummary &&
            !isErrorSummary &&
            summary.kind_count && (
              <div className="bg-surface rounded-lg p-4">
                <h2 className="text-xl font-semibold text-center">
                  Incidentes por Tipo
                </h2>
                <Pie
                  data={generateChartData(summary.kind_count)}
                  options={options}
                />
              </div>
            )}

          {summary &&
            !isFetchingSummary &&
            !isErrorSummary &&
            summary.urgency_count && (
              <div className="bg-surface rounded-lg p-4">
                <h2 className="text-xl font-semibold text-center">
                  Incidentes por Urgencia
                </h2>
                <Pie
                  data={generateChartData(summary.urgency_count)}
                  options={options}
                />
              </div>
            )}

          {summary &&
            !isFetchingSummary &&
            !isErrorSummary &&
            summary.status_count && (
              <div className="bg-surface rounded-lg p-4">
                <h2 className="text-xl font-semibold text-center">
                  Incidentes por Estado
                </h2>
                <Pie
                  data={generateChartData(summary.status_count)}
                  options={options}
                />
              </div>
            )}
        </div>

        {!isEnabled ? (
          <p className="text-center text-neutral-400">No debería suceder...</p>
        ) : isError ? (
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
