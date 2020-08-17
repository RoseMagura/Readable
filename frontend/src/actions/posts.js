export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';

export function receivePosts (posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts
    }
}

export function addPost (id, timestamp, title, body, author, category) {
    return {
        type: ADD_POST,
        post: {
            id, 
            timestamp,
            title,
            body,
            author,
            category
    }
    }
}

export function removePost (id) {
    return{
        type: REMOVE_POST,
        id
    }
}