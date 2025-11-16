import { NavLink } from "react-router-dom";
import CreateIncidentForm from "../components/CreateIncidentForm";
import { useAuth } from "../hooks/use-auth";

const HomePage = () => {
  const auth = useAuth();

  return (
    <main className="min-h-[80vh] w-full flex items-center justify-center px-6 py-10 overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-neutral-100 leading-tight">
            Reporta Incidentes en la <span className="text-primary">UTEC</span>
          </h1>

          <p className="text-neutral-300 text-lg max-w-xl leading-relaxed mx-auto md:mx-0">
            Este sistema permite a los estudiantes reportar situaciones de
            riesgo o incidentes dentro del campus. Nuestro equipo de atención
            responderá con rapidez para brindar soporte.
          </p>

          <p className="text-neutral-400 max-w-md text-sm mx-auto md:mx-0">
            Tu reporte será revisado por personal acreditado.
          </p>
        </div>

        {auth.loading ? null : auth.user ? (
          <CreateIncidentForm />
        ) : (
          <div className="text-2xl">
            ¡
            <NavLink to="/login" className="text-primary font-semibold ">
              Inicia sesión
            </NavLink>{" "}
            para reportar un incidente!
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
