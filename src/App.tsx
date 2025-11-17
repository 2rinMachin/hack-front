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
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { UserPage } from "./pages/UserPage";
import IncidentsDetailPage from "./pages/incidents/IncidentsDetailPage";
import GuidePage from "./pages/GuidePage";

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
              <Route path="profile" Component={UserPage} />
              <Route path="guide" Component={GuidePage} />

              <Route element={<ProtectedRoute />}>
                <Route path="incidents" Component={IncidentsPage} />
                <Route path="incidents/:id" Component={IncidentsDetailPage} />
              </Route>

              <Route path="unauthorized" Component={UnauthorizedPage} />
            </Routes>
          </div>
        </AuthProvider>
      </ClientsProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
export default App;
