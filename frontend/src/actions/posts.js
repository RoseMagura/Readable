import {
    RECEIVE_ALL_POSTS,
    ADD_POST,
    EDIT_POST,
    VOTE_ON_POST,
    REMOVE_POST,
    UPDATE_POST,
} from './types.js';

export function receivePosts(posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts,
    };
}

export function addPost(post) {
    return {
        type: ADD_POST,
        post,
    };
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post,
    };
}

export function voteOnPost(updatedPost) {
    return {
        type: VOTE_ON_POST,
        updatedPost,
    };
}

export function removePost(edited) {
    return {
        type: REMOVE_POST,
        edited,
    };
}

export function updatePost(id, value) {
    return {
        type: UPDATE_POST,
        id,
        value,
    };
}
