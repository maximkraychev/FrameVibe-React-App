import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { Details } from "./Details";

export const PostWithModal = () => {

    const navigation = useNavigate()

    function closePostModal () {
        navigation(-1);
    }

    return (
        <Modal closeModal={closePostModal}>
            <Details />
        </Modal>
    )
};