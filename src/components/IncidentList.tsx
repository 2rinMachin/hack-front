import type { Incident } from "../schemas/incident";

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList = ({ incidents }: IncidentListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md border border-neutral-200">
        <thead>
          <tr className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
            <th className="py-3 px-6 text-left">Tipo</th>
            <th className="py-3 px-6 text-left">Descripción</th>
            <th className="py-3 px-6 text-left">Ubicación</th>
            <th className="py-3 px-6 text-left">Urgencia</th>
            <th className="py-3 px-6 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6 text-neutral-600">
                {incident.description}
              </td>
              <td className="py-3 px-6 text-neutral-600">{incident.kind}</td>
              <td className="py-3 px-6 text-neutral-600">
                {incident.location}
              </td>
              <td className="py-3 px-6 text-neutral-600">{incident.urgency}</td>
              <td className="py-3 px-6 text-neutral-600">{incident.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
