import { createContext, useReducer } from "react";

import { stateReducer } from "../reducers/stateReducer";
import { STATE_FIELDS } from '../constants/stateFieldsConstants';

export const StateContext = createContext();

const initialValues = {
    [STATE_FIELDS.POSTS]: [],
    [STATE_FIELDS.MODAL]: false,
    [STATE_FIELDS.COMPONENT]: '',
};

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initialValues);

    function changePostState(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.POSTS]);
        }

        const dataForReducer = { type: STATE_FIELDS.POSTS, value }
        dispatch(dataForReducer);
    }

    function changeModalState(boolean) {
        const dataForReducer = { type: STATE_FIELDS.MODAL, value: boolean }
        dispatch(dataForReducer);
    }

    function changeBackgroundComponent(component) {
        const dataForReducer = { type: STATE_FIELDS.COMPONENT, value: component }
        dispatch(dataForReducer);
    }

    const values = {
        state,
        changePostState,
        changeModalState,
        changeBackgroundComponent
    };

    return (
        <StateContext.Provider value={values} >
            {children}
        </StateContext.Provider>
    );
}