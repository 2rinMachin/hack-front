import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useClients } from "../../hooks/use-clients";
import { useState } from "react";
import { RegisterRequest } from "../../schemas/register-request";
import { LuUserPlus } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const RegisterPage = () => {
  const { usersClient, refreshClients } = useClients();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterRequest),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    const res = await usersClient.register({ body: data });

    if (res.status === 407) {
      setError("Este correo ya está en uso.");
      return;
    }

    const loginRes = await usersClient.login({ body: data });

    if (loginRes.status === 401) {
      setError("Algo salió mal :(");
      return;
    }

    localStorage.setItem("token", loginRes.body.token);
    refreshClients(loginRes.body.token);
    window.location.href = "/";
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-8 text-neutral-100">
          Crear cuenta
        </h1>

        <form
          className="bg-surface border border-border rounded-2xl shadow-sm px-6 py-8 space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <input
              type="text"
              placeholder="Nombre de usuario"
              className="bg-neutral-900 border border-border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary text-white"
              {...form.register("username")}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Correo"
              className="bg-neutral-900 border border-border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary text-white"
              {...form.register("email")}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="bg-neutral-900 border border-border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary text-white"
              {...form.register("password")}
            />
          </div>

          <div>
            <select
              className="bg-neutral-900 border border-border rounded-lg px-3 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-primary"
              {...form.register("role")}
            >
              <option className="text-black" value="student">
                Estudiante
              </option>
              <option className="text-black" value="staff">
                Personal
              </option>
              <option className="text-black" value="authority">
                Autoridad
              </option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white rounded-lg py-2.5 font-medium flex items-center justify-center gap-2 hover:bg-sky-600 transition"
          >
            <LuUserPlus className="size-4" />
            Registrarse
          </button>
        </form>

        <p className="text-sm text-neutral-400 text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <NavLink
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Inicia sesión
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;
