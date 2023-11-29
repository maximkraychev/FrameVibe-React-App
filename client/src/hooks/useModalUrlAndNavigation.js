import { useNavigate } from "react-router-dom";

export const useModalUrlAndNavigation = (path) => {

    const navigate = useNavigate();

    function handleUrlOnDetailsClose() {
        navigate(path);
    };

    return {
        handleUrlOnDetailsClose
    }
}