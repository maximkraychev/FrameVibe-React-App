import { useLocation } from "react-router-dom"
import { COMPONENTS } from "../constants/components";

export const useFindBackgroundComponent = () => {
    const location = useLocation();
    const backgroundComponent = COMPONENTS[location.state];
    return backgroundComponent;
}