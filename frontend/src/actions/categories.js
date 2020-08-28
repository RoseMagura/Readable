import {
    RECEIVE_CATEGORIES,
    UPDATE_CATEGORY,
    ADD_POSTS_TO_CATEGORY,
} from './types';

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    };
}

export function updateCategory(post, index) {
    return {
        type: UPDATE_CATEGORY,
        post,
        index,
    };
}

export function addPostsToCategory(posts) {
    return {
        type: ADD_POSTS_TO_CATEGORY,
        posts,
    };
}
