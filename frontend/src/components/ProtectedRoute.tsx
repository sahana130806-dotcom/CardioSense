import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("cardiosense_user");

  // 🔒 if not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ if logged in → allow access
  return children;
};

export default ProtectedRoute;