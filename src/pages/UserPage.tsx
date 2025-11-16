import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { LuUser } from "react-icons/lu";
import { useClients } from "../hooks/use-clients";

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
      alert("¡Suscripción exitosa! Revisa tu correo para confirmar.");
    } catch (err) {
      alert("Suscripción fallida. ¿Quizá este correo ya está suscrito?");
      console.error(err);
    }
  };

  if (auth.loading)
    return <p className="text-center mt-8 text-text">Loading...</p>;

  if (!auth.user) return <Navigate to="/login" replace />;

  return (
    <main className="py-20 flex flex-col items-center justify-center bg-[var(--color-bg)] p-4">
      <div className="bg-[var(--color-surface)] rounded-xl shadow-md p-8 w-full max-w-md border border-[var(--color-border)]">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-[var(--color-border)] flex items-center justify-center">
            <LuUser size={64} />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center text-text">
          {auth.user.username}
        </h1>
        <div className="space-y-4 text-text">
          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
            <span className="font-semibold">Email:</span>
            <span>{auth.user.email}</span>
          </div>
          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
            <span className="font-semibold">Role:</span>
            <span className="capitalize">{auth.user.role}</span>
          </div>
        </div>
      </div>

      <div className="my-8 bg-surface rounded-lg px-6 py-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Suscribir</h2>
        <p className="my-6">Entérate de nuevos incidentes por correo y SMS.</p>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 p-2 rounded border border-border"
            />
            <button
              onClick={handleSubscribeEmail}
              className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-sky-500"
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
              className="flex-1 p-2 rounded border border-border"
            />
            <button
              onClick={handleSubscribePhone}
              className="px-4 py-2 rounded bg-primary text-black font-semibold hover:bg-sky-500"
            >
              Suscribir
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
