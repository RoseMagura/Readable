export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_ON_POST = 'VOTE_ON_POST';
export const REMOVE_POST = 'REMOVE_POST';
// export const RECEIVE_POSTS_FOR_CATEGORY = 'RECEIVE_POSTS_FOR_CATEGORY' 
// export const DELETE_COMMENT_FROM_POST = 'DELETE_COMMENT_FROM_POST';
export const UPDATE_POST = 'UPDATE_POST';

export function receivePosts (posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts
    }
}

export function addPost (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function editPost (id, title, body) {
    return {
        type: EDIT_POST,
        id,
        title,
        body
    }
}

export function voteOnPost (updatedPost) {
    return {
        type: VOTE_ON_POST,
        updatedPost
    }
}

export function removePost (id) {
    return{
        type: REMOVE_POST,
        id
    }
}

export function updatePost (id, value) {
    return {
        type: UPDATE_POST,
        id,
        value
    }
}