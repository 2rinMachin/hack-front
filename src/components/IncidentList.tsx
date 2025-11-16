import type { Incident } from "../schemas/incident";
import dayjs from "../util/dayjs";
import { useNavigate } from "react-router-dom";

interface IncidentListProps {
  incidents: Incident[];
}

const urgencyLabel = {
  low: "Baja",
  mid: "Media",
  high: "Alta",
} as const;

const urgencyColor = {
  low: "text-green-400 bg-green-400/10 border-green-400/30",
  mid: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  high: "text-red-400 bg-red-400/10 border-red-400/30",
} as const;

const statusLabel = {
  pending: "Pendiente",
  attending: "En atención",
  done: "Resuelto",
} as const;

const statusColor = {
  pending: "text-neutral-300 bg-neutral-500/10 border-neutral-500/30",
  attending: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  done: "text-green-400 bg-green-400/10 border-green-400/30",
} as const;

const IncidentList = ({ incidents }: IncidentListProps) => {
  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/incidents/${id}`);
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="rounded-2xl border border-border bg-surface shadow-md overflow-hidden">
        <table className="min-w-full text-neutral-100">
          <thead className="bg-neutral-800/60 backdrop-blur-sm">
            <tr>
              <th className="py-3 px-6 text-left font-medium">Tipo</th>
              <th className="py-3 px-6 text-left font-medium">Descripción</th>
              <th className="py-3 px-6 text-left font-medium">Ubicación</th>
              <th className="py-3 px-6 text-left font-medium">Urgencia</th>
              <th className="py-3 px-6 text-left font-medium">Estado</th>
              <th className="py-3 px-6 text-left font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                onClick={() => handleRowClick(incident.id)}
                className="border-t border-neutral-700 hover:bg-neutral-800/50 hover:cursor-pointer transition-all"
              >
                <td className="py-3 px-6 capitalize">{incident.kind}</td>
                <td className="py-3 px-6">{incident.description}</td>
                <td className="py-3 px-6">{incident.location}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                      urgencyColor[incident.urgency]
                    }`}
                  >
                    {urgencyLabel[incident.urgency]}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                      statusColor[incident.status]
                    }`}
                  >
                    {statusLabel[incident.status]}
                  </span>
                </td>
                <td className="py-3 px-6">
                  {dayjs(incident.created_at).locale("es").fromNow()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentList;
