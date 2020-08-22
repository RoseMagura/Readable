export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_ON_POST = 'VOTE_ON_POST';
export const REMOVE_POST = 'REMOVE_POST';
// export const RECEIVE_POSTS_FOR_CATEGORY = 'RECEIVE_POSTS_FOR_CATEGORY' 
export const DELETE_COMMENT_FROM_POST = 'DELETE_COMMENT_FROM_POST';

export function receivePosts (posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts
    }
}

export function addPost (id, timestamp, title, body, author, 
    category, voteScore, deleted, commentCount) {
    return {
        type: ADD_POST,
        post: {
            id, 
            timestamp,
            title,
            body,
            author,
            category,
            voteScore, 
            deleted, 
            commentCount
    }
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

export function voteOnPost (id, option) {
    return {
        type: VOTE_ON_POST,
        // might not need id?
        id, 
        option
    }
}

export function removePost (id) {
    return{
        type: REMOVE_POST,
        id
    }
}

// export function receiveCategoryPosts (posts) {
//     return {
//         type: RECEIVE_POSTS_FOR_CATEGORY,
//         posts
//     }
// }

export function deleteCommentFromPost (id) {
    return {
        type: DELETE_COMMENT_FROM_POST,
        id
    }
}