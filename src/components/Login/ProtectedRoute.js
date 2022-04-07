import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({children}){
    const {user}=useAuth();
    if (!user) return <Navigate to ="/Login"/>
    return <>{children}</>
}