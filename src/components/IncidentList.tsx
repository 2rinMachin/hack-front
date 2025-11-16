import type { Incident } from "../schemas/incident";

interface IncidentListProps {
  incidents: Incident[];
}

const urgencyColor = {
  low: "text-green-400 bg-green-400/10 border-green-400/30",
  mid: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  high: "text-red-400 bg-red-400/10 border-red-400/30",
};

const statusColor = {
  pending: "text-neutral-300 bg-neutral-500/10 border-neutral-500/30",
  attending: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  done: "text-green-400 bg-green-400/10 border-green-400/30",
};

const IncidentList = ({ incidents }: IncidentListProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-md overflow-hidden">
        <table className="min-w-full text-neutral-100">
          <thead className="bg-neutral-800/60 backdrop-blur-sm">
            <tr>
              <th className="py-3 px-6 text-left font-medium">Tipo</th>
              <th className="py-3 px-6 text-left font-medium">Descripción</th>
              <th className="py-3 px-6 text-left font-medium">Ubicación</th>
              <th className="py-3 px-6 text-left font-medium">Urgencia</th>
              <th className="py-3 px-6 text-left font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-t border-neutral-700 hover:bg-neutral-800/40 transition cursor-pointer"
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
                    {incident.urgency}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium border ${
                      statusColor[incident.status]
                    }`}
                  >
                    {incident.status}
                  </span>
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
