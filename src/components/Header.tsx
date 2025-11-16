import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { LuLogOut, LuPencil, LuUser } from "react-icons/lu";
import { useClients } from "../hooks/use-clients";

const links = [
  { label: "Incidentes", to: "/incidentes", authenticated: false },
] as const;

const Header = () => {
  const { user } = useAuth();
  const { usersClient } = useClients();

  const logout = async () => {
    localStorage.removeItem("token");

    try {
      await usersClient.logout(undefined);
    } catch (e) {
      console.error(e);
    } finally {
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="h-1 bg-blue-600"></div>

      <div className="bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className="flex items-center text-2xl font-extrabold bg-blue-600 bg-clip-text text-transparent select-none"
            >
              <LuPencil className="inline-block mr-2" />
              IncidenTEC
            </NavLink>

            <nav className="flex items-center gap-6">
              {links
                .filter((l) => !l.authenticated || user)
                .map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `relative text-slate-700 hover:text-blue-600 transition-colors
                       after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5
                       after:w-0 after:bg-blue-600
                       hover:after:w-full after:transition-all
                       ${
                         isActive
                           ? "text-blue-600 font-medium after:w-full"
                           : ""
                       }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-x-8">
            {user ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to={`/users/${user.id}`}
                  className="flex items-center gap-3 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <span>{user.username}</span>
                  <LuUser className="size-8 p-1 border border-slate-400 rounded-full" />
                </NavLink>

                <button
                  onClick={logout}
                  className="p-2 rounded-md border border-slate-300 hover:bg-slate-100 transition enabled:cursor-pointer"
                  title="Cerrar sesión"
                >
                  <LuLogOut className="size-5 stroke-slate-600" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  className="px-5 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition font-medium"
                >
                  Iniciar sesión
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-5 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                >
                  Crear cuenta
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
