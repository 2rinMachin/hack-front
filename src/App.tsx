import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/Homepage";
import { ClientsProvider } from "./components/ClientsProvider";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";
import RegisterPage from "./pages/auth/RegisterPage";
import IncidentsPage from "./pages/incidents/IncidentsPage";
<<<<<<< HEAD
import IncidentsDetailPage from "./pages/incidents/IncidentsDetailPage";
=======
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { UserPage } from "./pages/UserPage";
>>>>>>> a8d006badc757be492229a6ee0aba08014195c05

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ClientsProvider>
        <AuthProvider>
          <Header />
          <div className="px-8 bg-bg">
            <Routes>
              <Route index Component={HomePage} />
              <Route path="*" Component={NotFoundPage} />
              <Route path="login" Component={LoginPage} />
              <Route path="register" Component={RegisterPage} />
<<<<<<< HEAD
              <Route path="incidents" Component={IncidentsPage} />
              <Route path="incidents/:id" Component={IncidentsDetailPage} />
=======
              <Route path="users/:id" Component={UserPage} />

              <Route element={<ProtectedRoute />}>
                <Route path="incidents" Component={IncidentsPage} />
              </Route>

              <Route path="unauthorized" Component={UnauthorizedPage} />
>>>>>>> a8d006badc757be492229a6ee0aba08014195c05
            </Routes>
          </div>
        </AuthProvider>
      </ClientsProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
export default App;
