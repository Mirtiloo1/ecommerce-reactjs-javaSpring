import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-white text-xl">Verificando autenticação...</p>
      </div>
    );
  }

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  if (!user || !isAdmin) {
    return (
      <Navigate to={user ? "/" : "/login"} state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedRoute;
