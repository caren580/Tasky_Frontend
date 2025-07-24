import { type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";

interface ProtectedProps {
  children: ReactElement;
  redirectPath?: string;     
}

export default function Protected({
  children,
  redirectPath = "/login",
}: ProtectedProps) {
  const user = useUserStore((s) => s.user); 
  const location = useLocation();

  if (!user) {
    
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
}