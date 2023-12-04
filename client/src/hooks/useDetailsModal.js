import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { StateContext } from "../contexts/StateContext";

export const useDetailsModal = () => {
    const { changeDetailsModalState, changeDetailsLoadedPost } = useContext(StateContext);
    const navigate = useNavigate();

    function initHandlerDetailsModal(post, e) {
        e.preventDefault();
        history.pushState({}, '', `/p/${post._id}`);
        changeDetailsLoadedPost({...post})
        changeDetailsModalState(state => !state);
    }

    function closeHandlerDetailsModal() {
        changeDetailsModalState(state => !state);
        changeDetailsLoadedPost('');
        navigate(-1);
    }

    return {
        initHandlerDetailsModal,
        closeHandlerDetailsModal
    }
}