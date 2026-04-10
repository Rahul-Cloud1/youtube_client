import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protect pages that REQUIRE login
export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Prevent logged-in users from seeing login/register
export const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : children;
};