import { useState } from "react";

export const useModalState = () => {
    const [visibility, setVisibility] = useState(true);

    function reverseVisibilityState() {
        setVisibility(value => !value);
    }

    return {
        isVisible: visibility,
        reverseVisibilityState
    }
}