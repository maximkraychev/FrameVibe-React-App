import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext"
import { PATH } from "../constants/paths";

export const AuthGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return <Outlet />;
}