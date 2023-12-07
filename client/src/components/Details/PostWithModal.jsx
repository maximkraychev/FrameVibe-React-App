import { usePostModal } from "../../hooks/usePostModal";
import { Modal } from "../Modal/Modal";
import { Details } from "./Details";

export const PostWithModal = () => {

    const { closePostModal } = usePostModal();

    return (
        <Modal closeModal={closePostModal}>
            <Details />
        </Modal>
    )
};