import { createContext, useReducer } from "react";

import { stateReducer } from "../reducers/stateReducer";
import { STATE_FIELDS } from '../constants/stateFieldsConstants';

export const StateContext = createContext();

const initialValues = {
    [STATE_FIELDS.POSTS]: [],
    [STATE_FIELDS.DETAILS_VISIBILITY]: false,
    [STATE_FIELDS.DETAIL_POST]: '',
};

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initialValues);

    function changePostsState(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.POSTS]);
        }

        const dataForReducer = { type: STATE_FIELDS.POSTS, value }
        dispatch(dataForReducer);
    }

    function changeDetailsModalState(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.DETAILS_VISIBILITY]);
        }

        const dataForReducer = { type: STATE_FIELDS.DETAILS_VISIBILITY, value }
        dispatch(dataForReducer);
    }

    function changeDetailsLoadedPost(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.DETAIL_POST]);
        }

        const dataForReducer = { type: STATE_FIELDS.DETAIL_POST, value }
        dispatch(dataForReducer);
    }

    const values = {
        state,
        changePostsState,
        changeDetailsModalState,
        changeDetailsLoadedPost
    };

    return (
        <StateContext.Provider value={values} >
            {children}
        </StateContext.Provider>
    );
}