import { useContext } from "react"

import { StateContext } from "../contexts/StateContext"
import { STATE_FIELDS } from "../constants/stateFieldsConstants";

export const usePostStateExplore = () => {
    const { state, changePostsStateExplore } = useContext(StateContext);

    // function getExplorePosts() {
    //     return state[STATE_FIELDS.POSTS_EXPLORE];
    // }

    function changeExplorePosts(posts) {
        changePostsStateExplore(() => [...posts]); // This will set a new posts with new reference;
    }

    function clearExplorePosts() {
        changePostsStateExplore({}); // This should clear the explore posts; 
    }

    return {
        state,
        changeExplorePosts,
        clearExplorePosts,
    }
}