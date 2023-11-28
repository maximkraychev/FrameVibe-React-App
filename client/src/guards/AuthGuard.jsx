import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext"
import { PATH } from "../constants/paths";

export const AuthGuard = () => {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    return <Outlet />;
}