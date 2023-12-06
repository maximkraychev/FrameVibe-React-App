import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { StateContext } from "../contexts/StateContext";

export const useDetailsModal = () => {
    const { changeDetailsModalState, changeDetailsLoadedPost } = useContext(StateContext);
    const navigate = useNavigate();

    function initHandlerDetailsModal(post, e) {
        e.preventDefault();
        history.pushState({}, '', `/p/${post._id}`);
        changeDetailsLoadedPost({ ...post })
        changeDetailsModalState(true);
    }

    function closeHandlerDetailsModal() {
        changeDetailsModalState(false);
        changeDetailsLoadedPost('');
        navigate(-1);
    }

    function clearDetailsModalState() {
        changeDetailsModalState(false);
        changeDetailsLoadedPost('');
    }

    return {
        initHandlerDetailsModal,
        closeHandlerDetailsModal,
        clearDetailsModalState
    }
}