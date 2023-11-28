import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { logoutService } from "../../../services/authService";
import { PATH } from "../../../constants/paths";

export const Logout = () => {

    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    
    useEffect(() => {
        logoutService()
            .then(() => {
                logout();
                navigate(PATH.LOGIN);
            })
            .catch(err => {
                console.log(err);
                //TODO handle Error;
            })
    }, []);

    return null;
}