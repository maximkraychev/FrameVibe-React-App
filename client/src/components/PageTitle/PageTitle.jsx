import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export const PageTitle = ({ title, children }) => {

    const titlePrefix = 'FrameVibe | '

    useDocumentTitle(`${titlePrefix}${title}`);

    return (
        <>
            {children}
        </>
    );
};