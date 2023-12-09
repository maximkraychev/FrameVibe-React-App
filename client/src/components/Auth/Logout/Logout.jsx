import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { logoutService } from "../../../services/authService";
import { PATH } from "../../../constants/paths";
import { StateContext } from "../../../contexts/StateContext";

export const Logout = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { changeErrorModalMsgState } = useContext(StateContext);

    useEffect(() => {
        logoutService()
            .then(() => {
                logout();
                navigate(PATH.LOGIN);
            })
            .catch(err => {
                console.error(err);
                changeErrorModalMsgState(err.message);
            })
    }, []);

    return null;
}