import type { Incident } from "../schemas/incident";
import { useAuth } from "../hooks/use-auth";
import { useClients } from "../hooks/use-clients";
import dayjs from "../util/dayjs";
import { twJoin } from "tailwind-merge";

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

const statusBgColor = {
  pending: "bg-neutral-500/10 border-neutral-500/30",
  attending: "bg-sky-400/10 border-sky-400/30",
  done: "bg-green-400/10 border-green-400/30",
};

const statusLabel = {
  pending: "pendiente",
  attending: "en atención",
  done: "resuelto",
} as const;

interface Props {
  incident: Incident;
  refetch: () => void;
}

const IncidentDetail = ({ incident, refetch }: Props) => {
  const { user } = useAuth();
  const { incidentsClient } = useClients();

  const canUpdate = user?.role === "staff" || user?.role === "authority";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-lg text-neutral-100 space-y-4">
        <h2 className="text-2xl font-bold">
          Incidente <code>{incident.id}</code>
        </h2>

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
          <span
            className={twJoin("font-semibold", urgencyColor[incident.urgency])}
          >
            {urgencyLabel[incident.urgency]}
          </span>
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Estado:</span>{" "}
          {canUpdate ? (
            <div className="flex gap-2 mt-2">
              {(["pending", "attending", "done"] as const).map((status) => {
                const selected = incident.status === status;
                return (
                  <button
                    key={status}
                    onClick={async () => {
                      await incidentsClient.updateIncidentStatus({
                        params: { id: incident.id },
                        body: { status },
                      });
                      refetch();
                    }}
                    className={twJoin(
                      "px-3 py-1 rounded-lg border text-sm transition-colors",
                      "hover:bg-neutral-700/40 hover:border-neutral-500",
                      selected
                        ? "border-primary text-primary bg-neutral-700/60"
                        : "border-neutral-600 text-neutral-300"
                    )}
                  >
                    {statusLabel[status]}
                  </button>
                );
              })}
            </div>
          ) : (
            <span
              className={twJoin("font-semibold", statusColor[incident.status])}
            >
              {incident.status}
            </span>
          )}
        </p>

        <p>
          <span className="font-semibold text-neutral-400">Autor:</span>{" "}
          {incident.author.username}
        </p>

        <p>
          <span className="font-semibold text-neutral-400">
            Fecha de creación:
          </span>{" "}
          {dayjs(incident.created_at)
            .locale("es")
            .format("DD MMM YYYY - HH:mm")}
        </p>

        {incident.image_url && (
          <div>
            <p className="font-semibold text-neutral-400 mb-4">
              Imagen adjunta:
            </p>
            <img src={incident.image_url} className="rounded-lg w-full" />
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-lg space-y-3">
        <h3 className="text-xl font-bold text-neutral-100 mb-4">Historial</h3>
        {incident.history.length === 0 ? (
          <p className="text-neutral-500">(Vacío)</p>
        ) : (
          <ul className="space-y-2">
            {incident.history.map((h, idx) => (
              <li
                key={idx}
                className={twJoin(
                  "flex justify-between items-center p-3 rounded-lg border text-sm",
                  statusBgColor[h.status],
                  statusColor[h.status]
                )}
              >
                <span>
                  Estado cambiado a{" "}
                  <span className="font-semibold">{statusLabel[h.status]}</span>{" "}
                  por <span className="font-medium">{h.actor.username}</span>
                </span>
                <span className="text-neutral-400 text-xs">
                  {dayjs(h.date).locale("es").format("DD MMM YYYY - HH:mm")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default IncidentDetail;
