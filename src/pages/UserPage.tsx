import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { LuUser } from "react-icons/lu";
import { useClients } from "../hooks/use-clients";

const roleLabel = {
  student: "Estudiante",
  staff: "Personal administrativo",
  authority: "Autoridad",
} as const;

export const UserPage = () => {
  const auth = useAuth();
  const { incidentsClient } = useClients();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubscribeEmail = async () => {
    if (!email) return;

    try {
      await incidentsClient.subscribeEmail({ body: { email } });
      setEmail("");
      alert("¡Suscripción exitosa! Revisa tu correo para confirmar.");
    } catch (err) {
      alert("Suscripción fallida. ¿Quizá este correo ya está suscrito?");
      console.error(err);
    }
  };

  const handleSubscribePhone = async () => {
    if (!phone) return;

    try {
      await incidentsClient.subscribeSms({ body: { sms: phone } });
      setPhone("");
      alert("¡Suscripción exitosa! Revisa tu teléfono para confirmar.");
    } catch (err) {
      alert("Suscripción fallida. ¿Quizá este número ya está suscrito?");
      console.error(err);
    }
  };

  if (auth.loading)
    return <p className="text-center mt-8 text-white">Cargando...</p>;

  if (!auth.user) return <Navigate to="/login" replace />;

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-4 bg-neutral-950">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-8 shadow-xl flex flex-col items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
          <LuUser size={64} className="text-neutral-300" />
        </div>

        <div className="w-full text-center">
          <h1 className="text-3xl font-bold text-white">
            {auth.user.username}
          </h1>

          <div className="mt-6 space-y-4 text-neutral-300 text-sm">
            <div className="flex justify-between border-b border-neutral-700 pb-2">
              <span className="font-semibold text-neutral-200">Email:</span>
              <span>{auth.user.email}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-700 pb-2">
              <span className="font-semibold text-neutral-200">Rol:</span>
              <span>{roleLabel[auth.user.role]}</span>
            </div>
          </div>
        </div>

        {/* Suscripción */}
        <div className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-center text-white">
            Suscripciones
          </h2>

          <p className="text-neutral-400 text-center text-sm">
            Recibe alertas cuando aparezcan nuevos incidentes en la universidad.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={handleSubscribeEmail}
                className="px-4 py-2 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-400"
              >
                Suscribir
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="+51 999 999 999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                onClick={handleSubscribePhone}
                className="px-4 py-2 rounded-xl bg-sky-500 text-white font-semibold hover:bg-sky-400"
              >
                Suscribir
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
