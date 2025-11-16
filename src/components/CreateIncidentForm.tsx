import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { CreateIncidentRequest } from "../schemas/create-incident-request";
import { useClients } from "../hooks/use-clients";

const schema = CreateIncidentRequest;

const CreateIncidentForm = () => {
  const { user } = useAuth();
  const { incidentsClient } = useClients();

  const [kind, setKind] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState(""); // ⬅ placeholder inicial
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const disabled = !user;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const parsed = schema.safeParse({ kind, description, location, urgency });
    if (!parsed.success) {
      setError("Datos inválidos");
      return;
    }

    try {
      await incidentsClient.createIncident({ body: parsed.data });
      setSuccess(true);
      setKind("");
      setDescription("");
      setLocation("");
      setUrgency(""); // ⬅ vuelve al placeholder
    } catch (err) {
      setError("No se pudo crear el incidente");
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md p-6 rounded-2xl bg-neutral-900 border border-neutral-700 flex flex-col gap-4"
    >
      <h2 className="text-white text-xl font-semibold text-center">
        Crear Incidente
      </h2>

      <input
        value={kind}
        onChange={(e) => setKind(e.target.value)}
        placeholder="Tipo"
        className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ubicación"
        className="w-full px-4 py-2 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <select
        value={urgency}
        onChange={(e) => setUrgency(e.target.value)}
        className={`w-full px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
          urgency === "" ? "text-neutral-400" : "text-white"
        }`}
      >
        {/* Placeholder */}
        <option value="" disabled hidden>
          Urgencia
        </option>

        <option value="low">Baja</option>
        <option value="mid">Media</option>
        <option value="high">Alta</option>
      </select>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-400 text-sm text-center">
          ¡Incidente creado! Será atendido en breve.
        </p>
      )}

      <button
        disabled={disabled}
        className="w-full py-2 rounded-xl bg-sky-500 text-white disabled:bg-neutral-700 disabled:text-neutral-400"
      >
        Crear
      </button>
    </form>
  );
};

export default CreateIncidentForm;
