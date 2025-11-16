import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { LuLogOut, LuUser } from "react-icons/lu";
import { useClients } from "../hooks/use-clients";
import { twJoin } from "tailwind-merge";

const links = [
  {
    label: "Incidentes",
    to: "/incidents",
    authenticated: true,
    authorized_roles: ["staff", "authority"],
  },
];

const Header = () => {
  const { user } = useAuth();
  const { usersClient } = useClients();

  const logout = async () => {
    localStorage.removeItem("token");

    try {
      await usersClient.logout(undefined);
    } catch (e) {
      console.log(e);
    } finally {
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="h-1 bg-primary"></div>

      <div className="backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <NavLink
              to="/"
              className="flex items-center text-2xl font-extrabold select-none"
            >
              <span className="text-white">Inciden</span>
              <span className="text-primary">TEC</span>
            </NavLink>

            <nav className="flex items-center gap-6">
              {links
                .filter(
                  (l) =>
                    !l.authenticated ||
                    (user && l.authorized_roles.includes(user.role))
                )
                .map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      twJoin(
                        "relative text-neutral-300 hover:text-primary transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all",
                        isActive && "text-primary font-medium after:w-full"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
            </nav>
          </div>

          <div className="flex items-center gap-x-8 text-neutral-300">
            {user ? (
              <div className="flex items-center gap-4">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <span>{user.username}</span>
                  <LuUser className="size-8 p-1 border border-border rounded-full" />
                </NavLink>

                <button
                  onClick={logout}
                  className="p-2 rounded-md border border-border hover:bg-neutral-700 transition"
                  title="Cerrar sesión"
                >
                  <LuLogOut className="size-5 text-neutral-300" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <NavLink
                  to="/login"
                  className="px-5 py-2 rounded-md text-white bg-primary hover:bg-sky-600 transition font-medium"
                >
                  Iniciar sesión
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-5 py-2 rounded-md border border-border text-neutral-300 hover:bg-neutral-700 transition"
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
