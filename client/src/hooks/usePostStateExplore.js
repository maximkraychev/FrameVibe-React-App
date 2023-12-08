import { useContext } from "react"

import { StateContext } from "../contexts/StateContext"

export const usePostStateExplore = () => {
    const { state, changePostsStateExplore } = useContext(StateContext);

    function changeExplorePosts(posts) {
        changePostsStateExplore(posts);
    }

    function clearExplorePosts() {
        changePostsStateExplore([]); // This should clear the explore posts; 
    }

    function updatePostStateExplore(updatedPost) {
        changeExplorePosts((posts) => {
            const index = posts.findIndex((post) => post._id === updatedPost._id);
            if (index == -1) {
                return posts;
            } else {
                posts[index] = updatedPost;
                return posts;
            }
        });
    }

    return {
        state,
        changeExplorePosts,
        clearExplorePosts,
        updatePostStateExplore
    }
}