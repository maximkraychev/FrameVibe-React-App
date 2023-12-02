import { useContext } from "react"
import { Navigate, Outlet, useParams } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext"
import { PARAMS, PATH } from "../constants/paths";

export const AuthGuard = () => {
    const { auth } = useContext(AuthContext);
    const params = useParams();
    const postId = params[PARAMS.POSTID]

    if (!auth) {
        if (postId) {
            return <Navigate to={PATH.POST_FN(postId)} />
        }
        return <Navigate to={PATH.LOGIN} />;
    }

    return <Outlet />;
}