import { useLocation } from "react-router-dom";

export const Post = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
        <h1>Works</h1>
    );
}