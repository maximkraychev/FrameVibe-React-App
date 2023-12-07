import { useContext } from "react"
import { useNavigate } from "react-router-dom";

import { StateContext } from "../contexts/StateContext";

export const usePostModal = () => {
    const { changeLoadedModalPost } = useContext(StateContext);
    const navigation = useNavigate()


    function loadPostForModal(post) {
        changeLoadedModalPost({ ...post });
    }

    function clearLoadedPostForModal() {
        changeLoadedModalPost('');
    }

    function closePostModal() {
        navigation(-1);
    }

    return {
        loadPostForModal,
        clearLoadedPostForModal,
        closePostModal
    }
}