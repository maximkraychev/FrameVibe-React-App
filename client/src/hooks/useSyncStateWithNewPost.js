import { useContext } from "react";

import { usePostStateExplore } from "./usePostStateExplore";
import { usePostStateProfile } from "./usePostStateProfile";
import { StateContext } from "../contexts/StateContext";

import { STATE_FIELDS } from "../constants/stateFieldsConstants";

export const useSyncStateWithNewPost = () => {
    const { state } = useContext(StateContext);
    const { updatePostStateExplore } = usePostStateExplore()
    const { updatePostStateProfile } = usePostStateProfile()

    function syncState(newPost) {
        // If we have this post in explore state update it
        if (state[STATE_FIELDS.POSTS_EXPLORE].find((post) => post._id === newPost._id)) updatePostStateExplore(newPost);

        // If we have this post in Profile state update it 
        if (state[STATE_FIELDS.POSTS_PROFILE].find((post) => post._id === newPost._id)) updatePostStateProfile(newPost);
    }

    return {
        state,
        syncState
    }
}