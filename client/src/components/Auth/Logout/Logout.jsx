import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import { logoutService } from "../../../services/authService";
import { PATH } from "../../../constants/paths";
import { StateContext } from "../../../contexts/StateContext";
import { usePostStateExplore } from "../../../hooks/usePostStateExplore";
import { usePostStateProfile } from "../../../hooks/usePostStateProfile";

export const Logout = () => {

    const navigate = useNavigate();
    const { clearState } = useContext(AuthContext);
    const { changeErrorModalMsgState } = useContext(StateContext);
    const { clearExplorePosts } = usePostStateExplore()
    const { clearProfilePosts } = usePostStateProfile()

    useEffect(() => {
        logoutService()
            .then(() => {
                clearState();
                clearExplorePosts();
                clearProfilePosts();
                navigate(PATH.LOGIN);
            })
            .catch(err => {
                console.error(err);
                changeErrorModalMsgState(err.message);
            })
    }, []);

    return null;
}