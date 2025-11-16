import { useState, useRef } from "react";
import { useAuth } from "../hooks/use-auth";
import { CreateIncidentRequest } from "../schemas/create-incident-request";
import { useClients } from "../hooks/use-clients";
import { INCIDENT_KINDS, IncidentKind } from "../schemas/incident-enums";

const schema = CreateIncidentRequest;

const kindLabels = {
  aggression: "Agresión",
  behavior: "Comportamiento",
} as const;

const CreateIncidentForm = () => {
  const { user } = useAuth();
  const { incidentsClient } = useClients();

  const [kind, setKind] = useState<IncidentKind | "">("");
  const [pending, setPending] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const disabled = !user;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const parsed = schema.safeParse({
      kind,
      description,
      location,
      urgency,
      image,
    });

    if (!parsed.success) {
      setError("Datos inválidos");
      return;
    }

    try {
      setPending(true);
      await incidentsClient.createIncident({ body: parsed.data });
      setSuccess(true);
      setKind("");
      setDescription("");
      setLocation("");
      setUrgency("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError("No se pudo crear el incidente");
      console.error(err);
    } finally {
      setPending(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") setImage(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md p-6 rounded-2xl bg-neutral-900 border border-neutral-700 flex flex-col gap-4"
    >
      <h2 className="text-white text-xl font-semibold text-center">
        Registrar Incidente
      </h2>

      <select
        value={kind}
        onChange={(e) => setKind(e.target.value as IncidentKind)}
        className={`w-full px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
          kind === "" ? "text-neutral-400" : "text-white"
        }`}
      >
        <option value="" disabled hidden>
          Tipo de incidente
        </option>

        {INCIDENT_KINDS.map((k) => (
          <option key={k} value={k}>
            {kindLabels[k]}
          </option>
        ))}
      </select>

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
        <option value="" disabled hidden>
          Urgencia
        </option>
        <option value="low">Baja</option>
        <option value="mid">Media</option>
        <option value="high">Alta</option>
      </select>

      <label className="w-full flex flex-col gap-1">
        <span className="text-white">Imagen (opcional)</span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={`w-full px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-700
            ${image ? "text-white" : "text-neutral-400"}
            file:${image ? "text-white" : "text-neutral-300"}
            file:bg-neutral-700 file:border-0 file:mr-4 
            file:px-3 file:py-1 file:rounded-lg
            focus:outline-none focus:ring-2 focus:ring-sky-500`}
        />
        {image && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-green-400">Imagen seleccionada</p>
            <button
              type="button"
              onClick={removeImage}
              className="text-red-400 text-sm underline"
            >
              Eliminar
            </button>
          </div>
        )}
      </label>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      {success && (
        <p className="text-green-400 text-sm text-center">
          ¡Incidente creado! Será atendido en breve.
        </p>
      )}

      <button
        disabled={disabled || pending}
        className="w-full py-2 rounded-xl bg-sky-500 text-white disabled:bg-neutral-700 disabled:text-neutral-400"
      >
        Registrar
      </button>
    </form>
  );
};

export default CreateIncidentForm;
