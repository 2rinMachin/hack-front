import type { Incident } from "../schemas/incident";
import { useAuth } from "../hooks/use-auth";
import { useClients } from "../hooks/use-clients";
import dayjs from "../util/dayjs";

const urgencyColor = {
  low: "text-green-400",
  mid: "text-yellow-400",
  high: "text-red-400",
};

const urgencyLabel = {
  low: "Baja",
  mid: "Media",
  high: "Alta",
} as const;

const statusColor = {
  pending: "text-neutral-300",
  attending: "text-sky-400",
  done: "text-green-400",
};

interface Props {
  incident: Incident;
  refetch: () => void;
}

const IncidentDetail = ({ incident, refetch }: Props) => {
  const { user } = useAuth();
  const { incidentsClient } = useClients();

  const canUpdate = user?.role === "staff" || user?.role === "authority";

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const status = e.target.value as Incident["status"];

    await incidentsClient.updateIncidentStatus({
      params: { id: incident.id },
      body: { status },
    });
    refetch();
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 shadow-lg space-y-6 text-neutral-100">
      <h2 className="text-2xl font-bold">
        Incidente <code>{incident.id}</code>
      </h2>

      <div className="space-y-4">
        <p>
          <span className="font-semibold text-neutral-400">Tipo:</span>{" "}
          <span className="capitalize">{incident.kind}</span>
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Descripción:</span>{" "}
          {incident.description}
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Ubicación:</span>{" "}
          {incident.location}
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Urgencia:</span>{" "}
          <span className={`font-semibold ${urgencyColor[incident.urgency]}`}>
            {urgencyLabel[incident.urgency]}
          </span>
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Estado:</span>{" "}
          {canUpdate ? (
            <select
              value={incident.status}
              onChange={handleStatusChange}
              className="bg-surface border border-neutral-500 text-neutral-100 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">pending</option>
              <option value="attending">attending</option>
              <option value="done">done</option>
            </select>
          ) : (
            <span className={`font-semibold ${statusColor[incident.status]}`}>
              {incident.status}
            </span>
          )}
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Autor:</span>{" "}
          {incident.author.username}
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Historial: </span>
          <span className="text-neutral-500">
            {incident.history.length === 0 && "(Vacío)"}
          </span>
        </p>
        <ul className="pl-4 list-disc space-y-1">
          {incident.history.map((h, idx) => (
            <li key={idx} className="text-sm text-neutral-400">
              {h.status} por {h.actor.username} el{" "}
              {dayjs(h.date).locale("es").format("DD MMM YYYY - HH:mm")}
            </li>
          ))}
        </ul>

        <p>
          <span className="font-semibold text-neutral-400">
            Fecha de creación:
          </span>{" "}
          {dayjs(incident.created_at)
            .locale("es")
            .format("DD MMM YYYY - HH:mm")}
        </p>

        {incident.image_url ? (
          <div>
            <p className="font-semibold text-neutral-400 mb-4">
              Imagen adjunta:
            </p>
            <img src={incident.image_url} className="rounded-lg w-full" />
          </div>
        ) : (
          <p className="text-center text-neutral-500 mt-8">
            Este incidente no tiene una imagen adjunta.
          </p>
        )}
      </div>
    </div>
  );
};

export default IncidentDetail;
