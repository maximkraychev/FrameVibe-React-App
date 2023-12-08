import { useContext } from "react"

import { StateContext } from "../contexts/StateContext"

export const usePostStateProfile = () => {
    const { state, changePostsStateProfile } = useContext(StateContext);

    function changeProfilePosts(posts) {
        changePostsStateProfile(posts);
    }

    function clearProfilePosts() {
        changePostsStateProfile([]); // This should clear the explore posts; 
    }

    function updatePostStateProfile(updatedPost) {
        changePostsStateProfile((posts) => {
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
        changeProfilePosts,
        clearProfilePosts,
        updatePostStateProfile
    }
}