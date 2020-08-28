import {
    RECEIVE_CATEGORIES,
    UPDATE_CATEGORY,
    ADD_POSTS_TO_CATEGORY
} from './types';

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    };
}

export function updateCategory(
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    commentCount,
    index
) {
    return {
        type: UPDATE_CATEGORY,
        post: {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore,
            deleted,
            commentCount,
        },
        index,
    };
}

export function addPostsToCategory(posts) {
    return {
        type: ADD_POSTS_TO_CATEGORY,
        posts
    }
}