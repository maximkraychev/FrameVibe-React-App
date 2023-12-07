import { createContext, useReducer } from "react";

import { stateReducer } from "../reducers/stateReducer";
import { STATE_FIELDS } from '../constants/stateFieldsConstants';

export const StateContext = createContext();

// STATE_FIELDS.POSTS

const initialValues = {
    [STATE_FIELDS.POSTS_EXPLORE]: [],
    [STATE_FIELDS.POSTS_PROFILE]: [],
    [STATE_FIELDS.MODAL]: false,
};

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, initialValues);

    // Post Profile
    function changePostsStateProfile(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.POSTS_PROFILE]);
        }

        const dataForReducer = { type: STATE_FIELDS.POSTS_PROFILE, value }
        dispatch(dataForReducer);
    }


    // Post Explore
    function changePostsStateExplore(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.POSTS_EXPLORE]);
        }

        const dataForReducer = { type: STATE_FIELDS.POSTS_EXPLORE, value }
        dispatch(dataForReducer);
    }

    // Modal State
    function changeModalState(x) {
        let value = x;

        if (x instanceof Function) {
            value = x(state[STATE_FIELDS.MODAL]);
        }

        const dataForReducer = { type: STATE_FIELDS.MODAL, value }
        dispatch(dataForReducer);
    }

    const values = {
        state,
        changePostsStateProfile,
        changePostsStateExplore,
        changeModalState,
    };

    return (
        <StateContext.Provider value={values} >
            {children}
        </StateContext.Provider>
    );
}