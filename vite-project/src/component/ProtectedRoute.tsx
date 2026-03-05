import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../useAuthStore.ts";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;
