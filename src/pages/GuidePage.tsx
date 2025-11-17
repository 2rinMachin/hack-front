const studentSteps = [
  {
    title: "Paso 1: Inicia sesión o crea tu cuenta",
    image: "assets/paso_1.png",
    description:
      "Accede a la aplicación con tu cuenta UTEC o crea una nueva. Tus reportes quedarán vinculados a tu perfil.",
  },
  {
    title: "Paso 2: Completa y envía tu reporte",
    image: "assets/paso_2.png",
    description:
      "Selecciona el tipo de incidente, agrega descripción, ubicación, urgencia y opcionalmente una imagen. Luego presiona Publicar para enviar el reporte.",
  },
];

const adminFeatures = [
  {
    title: "Actualizaciones en tiempo real",
    image: "src/assets/panel_incidentes.png",
    description:
      "Panel con lista de incidentes, gráficos y filtros en tiempo real.",
  },
  {
    title: "Gestión del incidentes",
    image: "assets/detalle_incidente.png",
    description:
      "Actualizar estado, revisar historial y ver cambios en tiempo real.",
  },
  {
    title: "Notificaciones",
    image: "assets/notificaciones.png",
    description:
      "Suscríbete a alertas por SMS o correo para recibir reportes instantáneamente.",
  },
];

const GuidePage = () => {
  return (
    <main className="min-h-[90vh] w-full px-6 py-12 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-20">
        <section className="space-y-12">
          <h2 className="text-4xl font-extrabold text-neutral-100 text-center">
            Guía rápida para <span className="text-primary">Estudiantes</span>
          </h2>

          <p className="text-neutral-300 text-center max-w-2xl mx-auto">
            Reportar un incidente es sencillo y pensado para tu seguridad. Solo
            sigue estos pasos:
          </p>

          <div className="grid md:grid-cols-2 gap-12 mt-10">
            {studentSteps.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-4"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-60 object-cover rounded-xl border border-neutral-700"
                />
                <h3 className="text-xl font-semibold text-neutral-100">
                  {s.title}
                </h3>
                <p className="text-neutral-300 text-sm max-w-xs">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-12">
          <h2 className="text-4xl font-extrabold text-neutral-100 text-center">
            Funcionalidades para{" "}
            <span className="text-primary">Staff y Administradores</span>
          </h2>

          <p className="text-neutral-300 text-center max-w-2xl mx-auto">
            Gestiona los incidentes de manera eficiente con estas
            funcionalidades:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 text-neutral-300">
            {adminFeatures.map((f, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-neutral-700 bg-neutral-900/40 text-center space-y-3"
              >
                <img
                  src={f.image}
                  className="w-full h-40 object-cover rounded-lg border border-neutral-700"
                  alt={f.title}
                />
                <h3 className="text-lg font-semibold text-neutral-100">
                  {f.title}
                </h3>
                <p className="text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default GuidePage;
