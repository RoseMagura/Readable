export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';

export function receivePosts (posts) {
    return {
        type: RECEIVE_ALL_POSTS,
        posts
    }
}