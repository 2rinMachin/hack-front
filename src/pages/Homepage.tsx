import CreateIncidentForm from "../components/CreateIncidentForm";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-neutral-100 leading-tight">
            Reporta Incidentes en la{" "}
            <span className="text-[var(--color-primary)]">UTEC</span>
          </h1>

          <p className="text-neutral-300 text-lg max-w-xl leading-relaxed mx-auto md:mx-0">
            Este sistema permite a los estudiantes reportar situaciones de
            riesgo o incidentes dentro del campus. Nuestro equipo de atención
            responderá con rapidez para brindar soporte.
          </p>

          <p className="text-neutral-400 max-w-md text-sm mx-auto md:mx-0">
            Tu reporte es anónimo para otros estudiantes y será revisado por
            personal acreditado.
          </p>
        </div>

        <CreateIncidentForm />
      </div>
    </main>
  );
};

export default HomePage;
