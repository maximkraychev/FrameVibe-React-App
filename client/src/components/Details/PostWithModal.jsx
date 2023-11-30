import { Modal } from '../Modal/Modal';
import { Details } from './Details';

export const PostWithModal = () => {
    //TODO... you may use this method to show hide errors with modal
    // const { isVisible, reverseVisibilityState } = useModalState();
    // const handleUrlOnDetailsClose = useContext(DetailsContext);
    // function changeVisibility() {
    //     reverseVisibilityState();

    //     if (handleUrlOnDetailsClose) {
    //         handleUrlOnDetailsClose();
    //     }
    // }

    //TODO... remove this component if is not used
    return (
        <>
            <Modal >
                <Details />
            </Modal>
        </>
    );
};